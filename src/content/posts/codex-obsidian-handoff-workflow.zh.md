---
title: '我的长期 AI 工作流交接：从 Obsidian 迁移到 Hermes/Codex/OMX'
postSlug: codex-obsidian-handoff-workflow
published: 2026-04-08
description: 用 personal-llm-wiki 项目记录、项目仓库状态文档和 omx 会话交接，搭建可快速恢复上下文的长期工作流。
tags: [Hermes, Codex, OMX, 工作流, 项目管理, AI协作]
category: Workflow
draft: false
lang: zh_CN
---

先说结论：这篇原本围绕 Obsidian 四件套的版本在现阶段已经不再是主流程。

现在的目标仍然不变：**一句短指令就能恢复上下文**。变化在于“上下文到底放哪里”以及“谁负责推进到哪里”。

当前栈分工：

- **Hermes**：总控、任务边界判断、知识库与会话信息协同。
- **Codex**：本地改码、构建、验证。
- **OMX**：执行层组织（持久化、团队化、Ralph/计划护栏）。
- **personal-llm-wiki**：项目管理主记忆库（长周期口径）。
- **项目仓库**：执行真相层（`PROJECT_STATUS.md`、`HANDOFF.md` 等）。

这篇文章只更新“交接模型”，不是否定旧法，只是说明**迁移到新默认结构**。

## 核心原则（更新版）

### 1. 管理层 / 执行层 / 交接层必须分离

过去的问题不是“东西不够多”，而是不同生命周期信息混在一起。

- **管理层（长期）**：放在 `personal-llm-wiki/wiki/projects/<project>.md`。
  - 当前状态、风险、关注点、下一步
  - 不直接等于实现细节，起到“项目恢复入口”作用
- **执行层（短周期真相）**：放在项目仓库。
  - `PROJECT_STATUS.md`、`HANDOFF.md`、`NEXT-SESSION-START.md`
  - 以及仓内 plan/notes/analysis 目录里的事实文件
- **交接层（会话）**：补充 `omx` 的会话记录与仓库 handoff。
  - 用于下次接手时的最短恢复入口

### 2. 统一入口，但入口是**个人库项目页**，不是“单点文件夹”

每个项目仍保留一个入口：

- `personal-llm-wiki/wiki/projects/<slug>.md`

这个入口承载的是：

- 项目主路径（如 `/home/weathour/文档/CPS-Papers/papers/vehicle-platoon-review`）
- 当前阶段与下一步
- 项目风险与阻塞
- 可恢复的简要上下文

不再要求所有项目硬塞 `Prompt/Plan/Implement/Documentation` 四文件。若项目仓库已有成熟 `PROJECT_STATUS/HANDOFF`，仓内文档优先权更高。

### 3. 旧的“今日日志”改为“可执行的任务快照”

现在的长期交接里，`daily todo` 更依赖于 `personal-llm-wiki/wiki/_meta/maintenance/daily-todo-registry.md` + cron 推送。

它负责“今天要推进什么”，不是托管项目真相。

## 更新后的实践结构

### 一、项目管理页（个人库）

- 路径：`personal-llm-wiki/wiki/projects/<slug>.md`
- 作用：
  - 让 Hermes/Human 快速确认项目边界
  - 保证 daily todo 可抽取
  - 固化项目主源路径（避免跨会话跑错目录）

### 二、仓库真相页（实施层）

在对应项目仓库内，优先看：

1. `PROJECT_STATUS.md`（当前状态）
2. `HANDOFF.md`（会话级交接）
3. `NEXT-SESSION-START.md`（下一次接手建议）
4. `docs/CURRENT_PLAN.md`（若存在）

### 三、会话交接（可追溯）

每次结束补写：

- 这次决策与产出
- 哪些文件变更（可定位）
- 下一轮最优先的 1–3 条任务
- 未清风险与验证口径

同时补上 `omx` 会话记录（如 `.omx/wiki/session-log-*.md`）以便全局检索。

## 具体启动 / 收尾

### 启动（续接一句）

我只需要说：

- `继续推进 vehicle-platoon-review`
- `继续 security-state-aware-mixed-platoon`
- `先处理 yxj-wiki 仓库维护`

然后执行顺序为：

1. 读 `personal-llm-wiki/wiki/projects/<slug>.md`
2. 读项目仓库的 `PROJECT_STATUS.md` / `HANDOFF.md`
3. 读 `NEXT-SESSION-START.md`（有的话）
4. 读最近相关 `omx` 会话记录

### 收尾（交接一句）

我只需要说：

- `今天先到这里，补一条交接`
- `先把状态写清楚，别丢风险`

然后同步：

1. 仓库 `HANDOFF.md`（本轮 done / 下一步）
2. 仓库 `PROJECT_STATUS.md`（状态演进）
3. `personal-llm-wiki` 项目页（关键口径更新）
4. 生成/补齐会话交接记录（本地检索面）

## 为什么这么改

这不是为了“更花哨”，而是为了减少下面的问题：

- 项目真相与管理记忆混淆
- 某些旧日志过期但被当作当前依据
- 各层文件更新节奏不一致导致续接误差

更新后，续接路径更短：**先查个人库确认方向，再下仓库确认真相，最后写交接留痕**。

如果你愿意，我下一步可以再给一版 **“可直接粘贴给自己使用的模板清单”**（包括`PROJECT_STATUS.md`与`NEXT-SESSION-START.md`的最小字段）。
