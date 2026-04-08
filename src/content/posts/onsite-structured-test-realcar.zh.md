---
title: '从仿真仓库到实车联调：onsite-structured-test-master 的架构、功能、启动流程与上车实践'
postSlug: onsite-structured-test-realcar
published: 2026-04-08
description: 一篇面向实操的项目总览：梳理 onsite-structured-test-master 的架构、运行链路、核心功能、Ubuntu 验证、域控制器启动方式、上车前检查和使用教程。
tags: [自动驾驶, ROS, Ubuntu, 实车调试, 系统架构, 工程实践]
category: Engineering
draft: false
lang: zh_CN
---

`onsite-structured-test-master` 原本更像一个带有 OnSite / TessNG 历史包袱的仿真工程，但这轮工作的重点已经明确转向 **真实车辆 ROS 运行链路**：不另起新仓库、不直接推翻原有结构，而是在原仓库中逐步收口边界、整理主链路，并完成本地 `Ubuntu 20.04 + ROS Noetic` 下的最小联调验证。

这篇文章不只是罗列命令，也不只是重复 README。我希望把这个项目现在的 **架构、功能、设计思路、启动流程、使用教程，以及上车前真正重要的检查项** 讲清楚，给后续自己或团队成员留下一个可以直接接手的入口。

## 一、这个项目现在到底是什么

如果压缩成一句话，这个仓库当前可以理解为：

> 一个从历史仿真/评测工具链中抽出“实车 ROS 主链路”的工程化项目，当前已经具备本地 Ubuntu 最小联调能力，并保留了原始仿真体系的部分历史能力与资源。

它不是一个全新重写的项目，而是一个 **在原仓库内持续重构、逐步清理历史遗留、让真实运行路径变得更清晰可验证** 的工程版本。

当前仓库路径：

- `D:\My_Research_data\programs\real-car\onsite-structured-test-master`

理解这个项目时，最好先分清两层：

- **当前活动主链路**：面向 ROS + 实车联调
- **历史能力体系**：面向 OnSite / TessNG / scenario 的仿真与回放

也正因为如此，既不能只看 `main.py`，也不能只看最早那版 README，而要看清楚“现在到底哪条链路还在被真实使用”。

## 二、这一轮工作的核心结论

### 1. 代码重构阶段已经基本收口

这轮工作里，我没有继续默认深挖 `planner/IDM/idm.py` 的每一个历史细节，而是把重点从“继续拆 helper、继续做深层重写”切换到了：

- Ubuntu 环境验证
- ROS topic 联调
- 控制输出证据采集
- 上车前检查项整理
- 启动教程和交付文档补齐

这意味着项目状态已经从“仍在大幅重构中”，转向“进入可验证、可启动、可交接阶段”。

### 2. 当前主链路已经不再是最早的仿真运行方式

当前更合理的理解方式是：

`main.py`  
-> `app/bootstrap.py`  
-> `app/runtime.py`  
-> `demo/RosMsg.py`  
-> `adapters/ros/*`  
-> `domain/services/*`  
-> `planning/idm/*`  
-> `planner/IDM/idm.py`

换句话说：

- `main.py` 仍然是入口
- 真正负责运行编排的是 `app/runtime.py`
- ROS 输入输出职责已经被收拢到 `adapters/ros`
- 中间业务语义由 `domain/services` 承接
- `planner/IDM/idm.py` 仍然重要，但已经不再承担所有外围职责

### 3. Ubuntu 最小联调已经跑通，但这不等于“毫无风险直接上车”

这轮已经在本地 `Ubuntu-20.04 + ROS Noetic` 下完成了最小联调验证，确认：

- `main.py` 可以启动
- 自定义 ROS 消息包可正常解析
- `demo/mock_inputs.py + rosbag play` 可以驱动主循环
- 在 bag 播放期间，`/debug/cicv_control_cmd` 能实时输出控制消息

这说明 **主链路已经从“理论可跑”变成“本地已验证能跑”**。  
但是否可以直接上车，还取决于一个前提：**车辆侧接口契约是否和以前成功上车时保持一致**。

这也是为什么我最终给出的判断是：

- 如果车辆侧 topic、消息定义、符号约定、单位解释、接管流程与历史成功版本一致，那么可以进入 **受控上车启动**
- 如果这些条件有变化，就必须先回到台架或域控静态验证

## 三、仓库当前承担的功能边界

### 1. ROS 输入接入

系统当前主要消费三类运行时输入：

- `cicv_location`：自车定位
- `tpperception`：感知障碍物
- `test_trajectory_req`：请求/参考轨迹

相关逻辑主要在：

- `adapters/ros/subscribers.py`
- `demo/RosMsg.py`
- `adapters/ros/converters.py`

其中 `RosMsg` 负责维护 ego、obstacle、trajectory 的缓存，转换层负责把 ROS 侧数据变成规划链路可消费的内部结构。

### 2. 规划执行

规划核心仍然是 IDM 体系，但其职责边界已经比以前清楚很多，核心文件包括：

- `planning/idm/local_planning.py`
- `planning/idm/collision_flow.py`
- `planning/idm/decision_flow.py`
- `planning/idm/reference_path.py`
- `planning/idm/obstacle_filter.py`
- `planning/idm/ttc.py`
- `planner/IDM/idm.py`

这轮整理的收益不是“形式上更好看”，而是实践上更容易回答这些问题：

- 路径打包在哪做
- TTC / 碰撞判定在哪做
- 决策切换在哪做
- 哪些逻辑还留在 legacy `idm.py` 中

### 3. 控制输出发布

最终输出仍然是 `ControlCmd`，相关链路主要经过：

- `adapters/ros/publishers.py`
- `adapters/ros/converters.py`
- `domain/services/safety_service.py`

当前控制命令的关键字段包括：

- `speed`：单位 `m/s`
- `acceleration`：单位 `m/s^2`
- `wheel_angle`：方向盘/前轮转角语义
- `gear=3`：通常表示 D 挡

这层非常关键，因为它是 **规划结果到车辆执行链之间的最后桥梁**。

### 4. 可视化/调试输出

系统还会发布：

- `Local_Path`
- `Global_Path`

虽然这不是最终执行链，但在联调、观测和问题定位时非常有价值。

### 5. 历史仿真能力与资源

仓库中仍然保留了：

- `OnSiteReplay/`
- `TessNG/`
- `scenario/`
- `assets/`
- `config/`

这些内容不是当前最小实车运行链路的核心，但它们也并非无意义垃圾，而是解释了为什么这个仓库在形态上仍然带有明显的“仿真工程遗留结构”。

## 四、现在应该怎样理解这个项目的架构

如果从工程分层来看，我现在更倾向于把它理解成四层。

### 1. App 层：运行时编排层

这一层回答三个问题：

- 程序从哪里进入
- 主循环在哪里
- 谁来组织 ROS、规划、发布与安全检查

核心文件：

- `main.py`
- `app/bootstrap.py`
- `app/runtime.py`

其中最值得优先阅读的是 `app/runtime.py`，因为它定义了系统节奏：

1. 初始化 ROS 接口
2. 初始化场景/路径/规划服务
3. 等待新鲜 ego 消息
4. 构建 observation
5. 调用 planner
6. 经过 safety 处理
7. 发布 control/path 输出

### 2. Adapter 层：ROS 适配层

这一层回答：

- 订阅哪些 topic
- 发布哪些 topic
- topic 名称如何配置
- ROS 消息怎样转换成内部对象
- 规划输出怎样重新打包成 ROS 消息

核心目录：

- `adapters/ros/`

它的价值在于：你不用一头扎进 `idm.py`，就能先把系统接口契约理解清楚。

### 3. Domain 层：中间语义层

这一层回答：

- 什么是 observation
- 什么是 control command
- path service / safety service 各自负责什么
- 不同模块之间如何解耦

核心目录：

- `domain/models/`
- `domain/services/`

这层让代码从“ROS 消息直接推到 planner”逐渐过渡为“先进入一层稳定语义结构，再进行规划处理”，因此更利于持续维护。

### 4. Planning 层：决策与轨迹生成层

这一层才是规划真正发生的地方：

- `planning/idm/*` 负责拆分后的规划逻辑
- `planner/IDM/idm.py` 保留了 legacy 规划器主体

这轮并没有把 legacy `idm.py` 彻底消灭，而是做了一个更现实的选择：

- 保留其在当前系统中仍然有效的能力
- 把外围职责逐步从中抽离
- 先确保能验证、能运行、能上车前检查，再决定下一步是否继续深拆

## 五、这轮验证和修复到底做了什么

这部分对后续接手者很重要，因为很多“为什么现在能跑了”的原因，不在 README，而在这轮修复里。

### 1. 修复了 Ubuntu smoke test 阶段的运行阻塞

在 `planner/IDM/idm.py` 中，补回了用于 `build_path_handoff_context(...)` 之前需要的 `best_index`，同时修复了若干旧变量引用，改为从 `planning_state` 获取：

- `planning_state.ego_state`
- `planning_state.current_speed`
- `planning_state.lead_car_state`

这些问题在本地 Ubuntu 联调里会直接导致运行时失败，不是“代码洁癖问题”，而是实打实的启动阻塞。

### 2. 修复了 smoke test 脚本与 `set -u` 的兼容问题

`run-minimal-ros-smoketest.sh` 原先在 `set -u` 下 source ROS 环境时有兼容性问题。现在脚本已经调整为在必要位置临时 `set +u`，从而保证 ROS 环境加载不再直接报错。

### 3. 去掉了隐藏很深的障碍物 ID 阻塞项

这是这轮最关键的一个隐患。

之前 `adapters/ros/converters.py` 中存在硬编码障碍物 ID `5215` 的逻辑，相当于默认只接受这个特定 ID；这会导致一旦现场障碍物 ID 不匹配，规划链路虽然启动了，但实际输入会被静默过滤。

现在已经调整为：

- 默认 **不过滤 obstacle id**
- 只有在特殊调试场景下，才通过环境变量 `REAL_CAR_OBSTACLE_ID_FILTER` 主动收窄

这意味着当前默认行为更符合真实联调场景，也更接近“历史成功上车”的合理假设。

### 4. 清理了明显的垃圾文件和历史遗留

本轮已经：

- 删除 `venv/`、`.idea/`、`__pycache__/`、`.pyc/.pyo`
- 删除临时日志目录
- 把不建议继续放在主仓库根部的历史文件迁移到 `.legacy_archive/2026-04-08-cleanup`

迁移内容包括：

- `planner/IDM/idm (copy).py`
- `planner/IDM/global_path_12 (copy).py`
- `planner/IDM/test_01.py` 到 `test_04.py`
- `start.sh`
- `run_ubuntu.sh`
- `testPath-inside/`

这样处理的好处是：

- 主仓库更干净
- 历史材料没有粗暴丢失
- 后续若还要追溯旧逻辑，也有专门归档区

## 六、当前推荐的启动方式

### 1. 不再直接使用旧的 `start.sh`

旧 `start.sh` 已经归档，不再作为当前推荐入口。原因很简单：

- 它绑定了旧路径
- 它隐含历史 topic 假设
- 它不利于显式确认运行环境
- 它不利于联调时逐步观察每个环节

当前推荐入口是：

`main.py -> app/bootstrap.py -> app/runtime.py`

### 2. Ubuntu 本地最小联调流程

推荐优先跑：

- `D:\My_Research_data\programs\real-car\setup\run-minimal-ros-smoketest.sh`

如果这个脚本失败，再按四终端手动拆解：

#### 终端 1：启动 ROS Core

```bash
source /opt/ros/noetic/setup.bash
source ~/real-car-ws/chajian/devel/setup.bash
roscore
```

#### 终端 2：准备输入

如果用 mock：

```bash
python3 demo/mock_inputs.py
```

如果用 bag：

```bash
rosbag play 2025-03-20-11-43-06.bag
```

#### 终端 3：启动主程序

```bash
cd /mnt/d/My_Research_data/programs/real-car/onsite-structured-test-master
source /opt/ros/noetic/setup.bash
source ~/real-car-ws/chajian/devel/setup.bash
python3 -u main.py
```

#### 终端 4：实时监听控制输出

```bash
rostopic echo /debug/cicv_control_cmd
```

验证重点不是“程序没报错就算完”，而是要确认：

- bag 在播
- 主循环在跑
- 控制消息持续输出
- 输出字段看起来符合基本物理常识

### 3. 上车启动流程

上车时推荐参考：

- `docs/oncar_startup_guide.md`
- `docs/pre_drive_checklist.md`

简化后的标准流程是：

1. 在域控制器上 source ROS Noetic 和自定义消息 workspace
2. 确认车辆侧 `cicv_location`、`tpperception`、`test_trajectory_req` 正常更新
3. 启动 `main.py`
4. 在独立终端观察 `cicv_control_cmd`
5. 在确认 topic、频率、符号、单位正常后，再进入低速受控放行

## 七、域控制器中的实际操作有哪些

如果按当前推荐方法，上车时域控上的操作比以前更 **显式**，但并不更复杂。

### 以前更像什么

以前更像：

- 跑一个历史脚本
- 依赖脚本里的隐式 source、路径和 topic 约定
- 出问题时很难快速判断卡在哪个环节

### 现在更像什么

现在更像：

1. 显式 source 环境
2. 显式确认输入 topic 活着
3. 显式启动 `main.py`
4. 显式观察控制输出 topic
5. 必要时通过环境变量切换 topic 名称或 debug 输出

所以区别不是“功能变了”，而是：

- **入口更明确**
- **问题定位更容易**
- **不再依赖旧脚本里那些不透明的历史假设**

## 八、项目现在适合怎样使用

### 1. 作为本地联调/回放验证工程

这是当前最稳的使用方式：

- 在 Ubuntu 20.04 + ROS Noetic 下
- 用 mock 或 rosbag 驱动输入
- 观察控制输出和 path 输出
- 验证规划链路是否通畅

### 2. 作为受控上车启动工程

在满足以下条件时，可以进入受控上车：

- 车辆侧接口契约未发生变化
- 历史成功上车所依赖的消息定义未变
- 控制链符号/单位约定未变
- 现场有安全员、接管流程和急停保障

### 3. 作为后续继续重构的基础工程

现在这个仓库也已经比以前更适合继续往下做两类工作：

- 持续收敛 `planner/IDM/idm.py`
- 进一步把 ROS/Domain/Planning 边界做得更稳定

但这些已经不再是“必须先做完才能验证”的前置条件。

## 九、当前文档入口

如果你现在接手这个项目，建议按这个顺序阅读：

1. `docs/refactor_delivery_note.md`
2. `docs/ubuntu_validation_plan.md`
3. `docs/ubuntu_realcar_smoketest_tutorial.md`
4. `docs/pre_drive_checklist.md`
5. `docs/oncar_startup_guide.md`
6. 再回到 `main.py`、`app/runtime.py`、`adapters/ros/`、`planning/idm/`

这样比直接一头扎进 `planner/IDM/idm.py` 更容易先建立正确的系统视角。

## 十、最后的判断

如果只问一句：**这个项目现在是什么状态？**

我的回答会是：

> 它已经不是一个“只剩历史包袱、无法接手”的混乱仓库，而是一个已经完成最小联调验证、完成关键阻塞修复、完成初步清理，并且补齐了启动与上车文档的可继续工程化项目。

它距离“彻底优雅、完全现代化、毫无 legacy 痕迹”当然还有距离；  
但它已经足够进入下一阶段：

- 继续受控验证
- 继续台架/回放测试
- 在条件满足时重新上车
- 为后续团队协作留下清晰交接面

如果后续还要继续推进，我认为最有价值的方向不是盲目重写，而是继续坚持这条路线：

- 先保证链路清楚
- 再保证验证证据完整
- 再逐步消解历史结构
- 最后再决定是否需要更大规模的架构升级

对于一个曾经能上车、现在重新整理并恢复验证能力的项目来说，这才是最现实、也最稳妥的工程路径。
