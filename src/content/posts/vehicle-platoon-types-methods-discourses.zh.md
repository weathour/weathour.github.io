---
title: '从纵向控制到网络化 CPS：车辆队列研究的类型、方法、层次与话语轮转'
postSlug: vehicle-platoon-types-methods-discourses
published: 2026-04-09
description: '基于 2025–2026 年车辆队列相关文献，从研究类型、方法谱系、场域—本体论—认识论—目的论与四大话语动态轮转几条线并行梳理该领域，说明其如何从纵向控制问题外扩为通信—计算—控制协同的网络化 CPS 问题。'
tags: [车辆队列, 文献综述, 控制理论, 车路协同, 信息物理系统]
category: 研究
draft: false
lang: zh_CN
---

这篇文章是我最近在做车辆队列中文综述时的一次阶段性整理。它不直接替代正式综述，而是想先回答一个更基础的问题：**如果只把车辆队列研究看作“纵向跟驰控制”，我们会漏掉什么？**

我的判断是：会漏掉很多。近两年的代表性文献已经相当清楚地表明，这个领域虽然仍以安全、串稳定和协同控制为核心，但它的研究边界已经明显向 V2X、云控、协同感知、数字孪生测试平台乃至信息物理系统（CPS）语境外扩了 [1](#ref-1)[2](#ref-2)[12](#ref-12)[13](#ref-13)。

换句话说，车辆队列研究今天最值得重新梳理的地方，不是“又多了几个控制器”，而是**研究对象、本体、方法与问题意识都在一起变化**。更进一步说，仅仅把四大话语静态地并排摆出来还不够，关键还要看到：正是这些话语位置的动态轮转，把这个领域一步步推出了原先的纵向控制边界。文中的引用编号都可以直接点击，跳到文末的参考索引部分。

## 为什么现在要重写车辆队列研究

如果把较新的研究放在一起看，会发现一个非常明显的变化：车辆队列不再只是“若干辆车按某种间距稳定跟驰”的问题，而越来越像一个受通信、计算、感知、基础设施和部署条件共同塑造的系统问题。

一方面，综述型工作已经不再只谈控制策略，而是主动把建模、通信与系统前景放进同一框架 [1](#ref-1)。另一方面，V2X 与协同安全研究也开始把“安全”从单车感知问题改写为跨车—路—云协作的智能问题 [2](#ref-2)。再往外看，匝道云控中的异构车辆群体控制、含真人在环的混合数字孪生测试平台，也说明所谓“车队控制”正从单纯算法问题转成系统组织问题 [12](#ref-12)[13](#ref-13)。

因此，如果今天还用一套过于狭窄的目录去写综述，很容易把真正重要的变化压扁成“补充材料”。我更愿意把当前的研究状态概括成一句话：

> 车辆队列研究正在从“纵向控制问题”转化为“通信—计算—控制协同的网络化 CPS 问题”。

## 车辆队列研究已经形成了哪些研究类型

把 2025–2026 年的主线核心与次级相关文献合起来看，至少可以分出五类工作。它们不是彼此割裂的，而是共同构成了今天这个领域的知识图景。

| 研究类型 | 核心关切 | 代表文献 |
| --- | --- | --- |
| 综述与问题框定型 | 界定车辆队列研究的对象、边界与未来方向 | [1](#ref-1), [2](#ref-2), [16](#ref-16) |
| 稳定性与控制器设计型 | 在时延、切换与不确定性下保证安全与串稳定 | [3](#ref-3), [4](#ref-4), [10](#ref-10), [11](#ref-11) |
| 鲁棒预测与数据驱动控制型 | 处理非线性、模型失配、扰动、攻击与异构性 | [5](#ref-5), [6](#ref-6), [12](#ref-12) |
| 学习增强与知识融合型 | 将 DRL、知识蒸馏、自学习纳入稳定性与部署约束 | [7](#ref-7), [8](#ref-8), [9](#ref-9), [15](#ref-15) |
| 系统协同与实验平台型 | 将车、路、云、感知与测试平台纳入统一语境 | [2](#ref-2), [13](#ref-13), [14](#ref-14) |

### 1）综述与问题框定型

这类工作真正决定的是：**什么才算车辆队列研究的“正题”**。`Vehicle platoon in road traffic` 这篇综述最重要的贡献，并不只是罗列文献，而是把建模、通信、控制与前景放进一个共同叙述里 [1](#ref-1)。中文专著《考虑通信延时的货车队列纵向控制优化》则更集中地展示了国内控制脉络中对通信延时、信息流拓扑与稳定性补偿问题的系统组织方式 [16](#ref-16)。

这类工作有一个基础作用：它们为整个领域提供了一个“读图方式”。研究者不是先面对杂乱无章的论文，而是先被告知，哪些问题是主线，哪些问题是扩展，哪些问题构成未来方向。

### 2）稳定性与控制器设计型

这是车辆队列研究中最经典、也最“硬”的一条主线。它的核心问题非常明确：在通信延迟、系统不确定性、控制切换和队形变化存在的情况下，如何维持车队安全与串稳定 [3](#ref-3)[4](#ref-4)[10](#ref-10)[11](#ref-11)。

比如，`ruan2025stability` 使用 Lyapunov–Krasovskii 方法与 H∞ 控制处理时变通信延迟和不确定性 [3](#ref-3)；`tian2026mpcbased` 则关注当通信延迟越过理论边界时，如何从 CACC 切换到 ACC 以维持安全运行 [4](#ref-4)。这说明领域中的问题表述已经不只是“设计一个更优控制器”，而是“系统在边界状态下如何有序降级”。

### 3）鲁棒预测与数据驱动控制型

如果说上一类工作强调可证性，那么这一类工作强调的是：**现实世界并不满足理想模型**。混合交通、非线性、扰动、攻击与模型失配迫使研究者把数据驱动与鲁棒控制真正接起来 [5](#ref-5)[6](#ref-6)[12](#ref-12)。

`li2025robust` 将 T-S 模糊模型与鲁棒 MPC 结合，用来处理混合车队中前后车不确定动力学 [5](#ref-5)。`li2026robust` 更进一步，引入 Koopman 算子与可达性分析，把数据驱动预测控制推进到含噪声、扰动和攻击的安全约束场景 [6](#ref-6)。而 `shi2026robust` 把问题放入匝道云控与异构车辆群体中，说明所谓“车队控制”已经开始外扩为更一般的车群协同轨迹跟踪问题 [12](#ref-12)。

### 4）学习增强与知识融合型

近两年真正值得注意的变化，不是简单地“深度学习进来了”，而是学习方法开始被要求服从稳定性、安全性和部署约束。换句话说，学习不是替代控制，而是在控制框架中寻找可接受的位置。

`pan2026reinforcement` 用分散式强化学习处理混合车队中的生态安全控制问题 [7](#ref-7)；`wang2025knowledgeguided` 在含通信延迟的混合车队中引入知识引导的自学习控制，使学习策略被稳定性、舒适性与能耗共同约束 [8](#ref-8)；`wang2025knowledgeinformed` 则进一步利用大语言模型抽取交通知识，并通过蒸馏将这些知识压入轻量级、稳定性敏感的模型结构中 [9](#ref-9)。再加上 `liu2025robust` 这类在车路协同感知误差下做意图预测的工作，可以看出学习线已经从控制决策延伸到感知与行为建模 [15](#ref-15)。

### 5）系统协同与实验平台型

这是最能说明领域边界外扩的一类工作。它们不再满足于“算法在仿真里有效”，而是开始重写实验对象本身：测试平台如何搭，云控如何接，车辆和基础设施如何共同构成系统，风险又如何被概念化 [2](#ref-2)[13](#ref-13)[14](#ref-14)。

`zhang2025cooperative` 用 SPD 框架组织 V2X 协同安全智能，把感知、预测与决策之间的跨层耦合明确地说了出来 [2](#ref-2)。`dong2026multisource` 用 mixed digital twin + human-in-the-loop 平台把物理车、虚拟车和真人驾驶放进一个统一的实验回路 [13](#ref-13)。`gao2026concept` 则从“人—车—路耦合”出发提出驾驶风险熵，提示研究正在从控制性能评价走向更广义的系统风险表征 [14](#ref-14)。

## 方法谱系：这个领域是如何组织自己的

从方法上看，当前车辆队列研究并不是“传统控制”和“AI 方法”彼此替代的简单叙事，而更像一个多层缠绕的结构。

### 控制理论仍然是规范中心

无论研究者采用的是 MPC、H∞、切换控制、ADRC、Youla 参数化，还是数据驱动预测控制，最后都必须回到几个几乎不可绕开的评价标准：安全、串稳定、鲁棒性与可部署性 [3](#ref-3)[4](#ref-4)[9](#ref-9)[11](#ref-11)。也就是说，控制理论依然是这个领域最稳固的规范中心。

### 纯模型方法正在被混合方法改写

与此同时，纯粹依赖理想化模型的研究框架正在被混合方法改写。模型、数据、知识与实验平台不再彼此分离，而是越来越多地被组织成“控制骨架 + 数据增强 + 学习补偿 + 系统验证”的复合结构 [6](#ref-6)[8](#ref-8)[12](#ref-12)[13](#ref-13)。这不是某种风格偏好，而是现实部署复杂性倒逼出来的方法变形。

### 学习方法进入了“受约束的位置”

这一点尤其重要。当前更有价值的学习工作，不是声称“端到端更强”，而是主动回答：学习在多大程度上可以被安全、稳定与部署约束驯化？`wang2025knowledgeinformed` 的意义就在这里——它让知识蒸馏与稳定性目标共同进入训练过程 [9](#ref-9)。这种研究路线比“把黑箱模型直接接到控制器输出端”更接近工程上真正可接受的方向。

### 验证方式正在成为方法问题的一部分

过去我们可能把验证当作附属环节，但新近文献表明，验证方式本身已经变成研究方法的一部分。台架、缩比实验、真实数据集、human-in-the-loop 与混合数字孪生平台，不只是“多做一点实验”，而是在重新定义什么样的证据才足以支撑“可部署”这个判断 [12](#ref-12)[13](#ref-13)[15](#ref-15)[16](#ref-16)。

## 场域—本体论—认识论—目的论：这个领域正在怎样改写自己

如果说研究类型与方法谱系回答的是“有哪些工作、它们怎么做”，那么场域—本体论—认识论—目的论这条线回答的就是：**这个领域究竟把什么当作自己的世界、什么当作真实对象、用什么方式去认识它、又为了什么组织这些知识。** 从这一层看，车辆队列已经不能只被理解为控制理论内部的一个局部专题，而更像一个处在控制理论、交通工程、车联网、车路协同、云控、数字孪生平台与 CPS 语言交叉处的复合场域 [1](#ref-1)[2](#ref-2)[12](#ref-12)[13](#ref-13)[14](#ref-14)。

| 层次 | 当前主导变化 | 典型体现 |
| --- | --- | --- |
| 场域 | 从单纯控制子领域外扩为控制—交通—通信—计算—基础设施的交叉场 | 综述开始并列建模、通信、控制与系统前景；V2X 与云控文献进入主线 [1](#ref-1)[2](#ref-2) |
| 本体论 | 从“线性车队”转向“车—路—云—人耦合的异构协同系统” | 混合车队、异构车辆群、human-in-the-loop 数字孪生、风险耦合对象 [12](#ref-12)[13](#ref-13)[14](#ref-14) |
| 认识论 | 从“模型 + 稳定性证明”扩展为“证明 + 预测 + 数据 + 知识蒸馏 + 平台验证”的混合证据结构 | Lyapunov/MPC、Koopman 数据驱动预测、知识引导学习、数字孪生平台 [3](#ref-3)[6](#ref-6)[8](#ref-8)[9](#ref-9)[13](#ref-13) |
| 目的论 | 从“保持车距与串稳定”扩展为“可部署安全、协同智能、能效优化与系统风险治理” | eco-safe control、协同安全智能、风险熵与部署导向验证 [2](#ref-2)[7](#ref-7)[14](#ref-14) |

先看场域。今天的车辆队列研究已经不再只在控制理论的内部循环，而是在智能交通、V2X、云控、协同感知和 CPS 的共同语境中重新被命名。也就是说，它的“领域位置”本身正在变化：研究者越来越需要同时说控制、通信、感知、计算与部署，而不能只说控制器。

再看本体论。过去最典型的对象，是一列车辆及其纵向间距；现在越来越多的论文其实把对象重写成异构车辆群、车路协同系统、云端调度下的群体轨迹，甚至人—车—路耦合的风险结构 [12](#ref-12)[13](#ref-13)[14](#ref-14)。对象不再只是“几辆车怎么跟”，而是“多种主体如何在信息、控制和基础设施约束下协同运行”。

认识论层面也同样在移动。可证性仍然重要，但单一的稳定性证明已经不足以独占真理位置。新的知识形态更像是证明、预测、数据、蒸馏和验证平台的组合：控制理论给出规范中心，数据驱动和知识蒸馏补足理想模型之外的复杂性，平台与实验则重新界定什么样的证据才算“足够可信” [6](#ref-6)[8](#ref-8)[9](#ref-9)[13](#ref-13)。

目的论的变化则最能解释整个领域为什么会外扩。若目标只是保持车距和串稳定，那么很多外围材料都可以被视为附属；但当目标变成可部署安全、协同智能、生态效率与系统风险治理时，V2X、云控、风险熵、human-in-the-loop 与数字孪生就不再是“补充方向”，而会变成主线的一部分 [2](#ref-2)[7](#ref-7)[14](#ref-14)。

### 为什么这种分层阅读本身已经是一种“大学话语式”的前沿解读

需要特别说明的是：上面这种场域—本体论—认识论—目的论的分层图，本身就已经是一种典型的表层科学阅读方式。它的优点是，把一个复杂领域整理成专家可识别、可比较、可继续推进的地图；它的风险则是，容易把仍在运动中的裂口和症状，暂时冻结成整齐的分类框架。

也正因为如此，我更愿意把这一步叫作一种**大学话语式的前沿解读**：它先把对象、方法、证据和目标组织成一个可教学的知识盘面，让我们先看清“这个领域表面上是如何被组织的”；但如果只停在这里，我们仍然看不见：究竟是谁在设题，哪些裂口在逼问，为什么新的锚点会反复生成。于是，下一步就必须进入更深一层的四大话语分析。

## 用四大话语看这个领域：谁在组织问题，谁在逼迫扩张

如果只从技术分类看，车辆队列研究会显得像一套不断累加的方法清单；但如果从学术话语结构看，它其实由四种不同的位置共同组织。

| 话语 | 它在领域中做什么 | 它遮蔽了什么 | 它生产了什么 |
| --- | --- | --- | --- |
| Master | 规定什么问题最重要 | 高位命名并不等于真实可解 | 研究合法性与主线方向 |
| University | 将对象分类、建模、标准化 | 知识背后的规范性命令 | 论文、综述、指标、控制器谱系 |
| Hysteric | 用现实裂口持续追问现有答案 | 不存在一次性终结的总答案 | 更多问题与更多知识增殖 |
| Analyst | 从症状出发重写问题结构 | 综述并非中立镜像 | 新的锚点与新的问题表述 |

### Master：高位能指如何规定主线

在车辆队列研究中，最典型的主导能指就是：**安全、串稳定、协同、效率、零事故、可部署**。这些词并不只是“目标描述”，它们实际上在规定：哪些问题天然值得研究，哪些技术路线更容易获得正当性 [2](#ref-2)[3](#ref-3)[4](#ref-4)[7](#ref-7)。

一旦这些词占据中心，后续的知识工作就会围绕它们展开。也正因为如此，很多论文虽然方法不同，但摘要里的问题设置却高度相似——它们首先要向这些高位能指对齐。

### University：当前领域的主导盘面

从现实的论文生产方式看，车辆队列研究最主要的运作方式其实是 University discourse。领域的大多数工作都在做同一件事：把对象分类、把问题标准化、把方法放入可比较矩阵，然后产出可评审、可教学、可复现的知识装置 [1](#ref-1)[5](#ref-5)[6](#ref-6)[16](#ref-16)。

这正是为什么我们总能看到相似的结构：对象模型、信息拓扑、时延设定、控制器设计、稳定性分析、仿真对比。它高效、必要，但也容易把对象客体化为“工况”和“指标”，从而遮蔽掉真正推动领域变化的裂口。

### Hysteric：现实中的裂口如何不断逼出新问题

真正推动领域不断外扩的，不是知识本身的自然增长，而是现实中的剩余物总在逼问现有框架：通信时延怎么办？混合交通怎么办？异构车群怎么办？感知误差怎么办？云控规划与实际轨迹偏差怎么办？真实部署如何验证 [6](#ref-6)[7](#ref-7)[12](#ref-12)[13](#ref-13)[15](#ref-15)？

这些“怎么办”就是 Hysteric discourse 的动力来源。它不会让问题结束，反而会持续制造出新的知识生产要求。因此，那些看上去像“外围扩展”的论文，很多时候恰恰是在暴露主线内部无法被一次性吸收的剩余物。

### Analyst：高质量综述真正应该占据的位置

如果综述只做一次更完整的分类，它当然有价值，但仍然停留在 University discourse 的内部。更进一步的工作，是把领域内部那些不断冒出来的裂口重新组织成问题结构：为什么稳定性总是回到中心？为什么学习方法总是被拉回到工程约束？为什么验证平台突然变得如此重要？为什么 V2X、云控和协同感知会逐步进入同一条线 [2](#ref-2)[14](#ref-14)？

我越来越觉得，一篇有贡献的综述，不只是总结“已经知道什么”，而是指出：**这个领域被什么驱动、遮蔽了什么、又因此生产了什么。** 如果说前面的三种话语解释了领域如何运转，那么综述最好的位置，是尝试占据第四种——从症状出发，重写问题。

## 四大话语不是静态并列，而是一个动态轮转机制

真正让我觉得这篇文章前一版还差“画龙点睛”的地方，不是少了一张分类表，而是还没有把四大话语的**动态轮转**说透。形式上，四大话语来自同一组要素 `S1`、`S2`、`$`、`a` 在同一网格中的四分之一转位：

```text
Master      S1 -> S2    / $  X a
University  S2 -> a     / S1 X $
Hysteric    $  -> S1    / a  X S2
Analyst     a  -> $     / S2 X S1
```

但落到车辆队列研究这一学术场域，更可读的并不是一个机械的公式，而是一条反复出现的结构链：**主导能指设题 → 知识装置定型 → 现实裂口逼问 → 症状性重写与新锚点生成 → 再次设题**。

这并不是说每篇论文都会整齐地走完一圈，也不是要把近两年的文献机械地切成几个年代阶段。更准确地说，不同论文和子方向会同时占据不同的话语位置；但如果从场域整体的运动看，这样的轮转确实在反复发生。

| 轮转环节 | 结构动作 | 在车辆队列研究中的体现 |
| --- | --- | --- |
| Master → University | 高位能指把问题设成必须回答的主线 | 安全、串稳定、协同、可部署把方法研究拉入共同议程 [2](#ref-2)[3](#ref-3)[4](#ref-4)[7](#ref-7) |
| University → Hysteric | 知识装置在对象化过程中遭遇无法彻底吸收的剩余物 | 时延、异构、混合交通、感知误差、部署落差不断返回 [6](#ref-6)[12](#ref-12)[13](#ref-13)[15](#ref-15) |
| Hysteric → Analyst | 症状不再只是边界工况，而被提升为重新组织问题的入口 | V2X SPD、数字孪生、人车路风险语言开始改变问题组织方式 [2](#ref-2)[13](#ref-13)[14](#ref-14) |
| Analyst → 新的 Master | 新锚点重新规定何为真正的前沿问题 | 车辆队列被重写为通信—计算—控制协同的网络化 CPS 单元 [1](#ref-1)[2](#ref-2)[12](#ref-12)[13](#ref-13)[14](#ref-14) |

### 1）从 Master 到 University：主导能指把知识机器发动起来

当“安全”“串稳定”“协同”“可部署”占据高位时，它们并不直接给出答案，但会先把研究共同体组织起来。于是综述、专著、控制器谱系、性能指标、标准工况等知识装置被迅速建立，用来回答这些被设定为正当且紧迫的问题 [1](#ref-1)[3](#ref-3)[4](#ref-4)[16](#ref-16)。换句话说，Master discourse 的作用不是“求解”，而是“设题”；University discourse 则接过这个设题，把它翻译成可建模、可证明、可比较的知识系统。

### 2）从 University 到 Hysteric：知识装置越完整，剩余物越清晰

但知识装置越成熟，它的边界也越清楚。正因为控制器、拓扑、指标和验证流程被组织得越来越规范，那些无法被完全吸收的东西才会不断显形：混合交通中的人类驾驶行为，感知误差带来的意图偏差，时延越界后的降级问题，异构车辆群在云端规划中的轨迹失配，以及“仿真有效”与“部署有效”之间的落差 [4](#ref-4)[6](#ref-6)[12](#ref-12)[13](#ref-13)[15](#ref-15)。这些剩余物就是 Hysteric discourse 的动力来源：它们不断逼问既有权威——你说安全、稳定、协同，那么这些裂口怎么解释？

### 3）从 Hysteric 到 Analyst：症状被提升为重新组织问题的入口

如果场域只能不断回答这些“怎么办”，它就会一直在 University discourse 内部加码，生产更多模型、更多控制器和更多补丁。真正的转折发生在某些工作开始把这些裂口本身当作诊断入口：为什么 V2X、协同感知、云控、数字孪生和风险熵会在同一时期同时涌现？这意味着问题对象已经不再是单纯的纵向控制链条，而是跨车、路、云、人、多源信息和实验平台的系统耦合 [2](#ref-2)[13](#ref-13)[14](#ref-14)。在这个意义上，Analyst discourse 不是给出一版更细的分类，而是迫使场域承认：过去被当作边角料的“症状”，其实正在重写对象本身。

### 4）从 Analyst 回到新的 Master：新锚点如何开启下一轮循环

一旦这种重写被接受，一个新的 `S1` 就会出现。对当前车辆队列研究来说，这个新锚点可以表述为：**车辆队列不是单纯的纵向控制问题，而是通信—计算—控制协同的网络化 CPS 单元。** 这个新的主导能指并不会取消旧的安全与串稳定，恰恰相反，它会把它们重新安置到更大的系统框架里：为什么需要协同感知，为什么要引入边缘/云控，为什么验证平台会成为核心方法问题，为什么风险建模开始进入同一条研究线 [1](#ref-1)[2](#ref-2)[12](#ref-12)[13](#ref-13)[14](#ref-14)。而一旦这个新 `S1` 稳定下来，它又会召唤出下一轮 University discourse——新的分类、新的 benchmark、新的系统架构语言。

### 5）为什么这种轮转对综述写作尤其重要

这也是为什么我越来越不满足于把综述写成“方法大全”。如果只按控制器、学习算法、测试平台平铺展开，文章仍然主要停留在 University discourse。更强的写法，是把章节组织成一条轮转链：先写哪些高位能指在设题，再写知识装置如何定型，再写哪些现实裂口逼出了扩张，最后写这些裂口如何迫使领域生成新的问题锚点。这样写，综述就不只是“汇总已有知识”，而会显出这个领域如何动态发展、如何自我重组，以及为什么它今天必然走向网络化 CPS 的问题表述。

## 这对综述写作意味着什么

如果接受前面的判断，尤其接受四大话语不是静态并列而是动态轮转，那么一篇今天的车辆队列综述，最好不要再把全文仅仅写成“控制方法大列表”。更值得做的，是把以下几条主线同时写出来：

- 领域如何在“设题—体系化—裂口—重写—再设题”的轮转中生成新的研究前沿；
- 车辆队列为什么长期由安全与串稳定主导；
- 通信时延、信息流拓扑和异构性如何把纯控制问题转化为网络控制问题；
- 数据驱动、知识蒸馏与强化学习为什么没有替代控制理论，而是被拉进其约束框架；
- 车路协同、云控、协同感知和测试平台为什么正在把车队研究推向更完整的 CPS 语境。

如果把这些线索收束成一句能统领全文的话，我目前最认可的版本是：

> 车辆队列研究正在从“纵向控制问题”转化为“通信—计算—控制协同的网络化 CPS 问题”。

这句话的价值不在于取代所有既有分类，而在于它能把看似分散的材料重新放进同一个问题结构里：为什么控制理论仍然重要，为什么数据驱动方法会兴起，为什么学习方法必须被约束，为什么系统验证正在上升为核心议题。

## 结语

我现在越来越不把车辆队列研究看成一个狭义的小专题。它当然起源于跟驰、稳定和控制，但它今天正在变成一个非常典型的交叉场：控制理论、交通工程、车联网、边缘/云控、协同感知、风险建模、实验平台与 CPS 语言都在这里相遇。

所以，真正值得写清楚的，不只是“有哪些方法”，而是**这些方法如何围绕某些高位目标被组织起来，又如何在现实部署的裂口面前不断分化、修补、重组，并在四大话语的轮转中生成新的研究锚点。** 对我来说，这才是这条综述线最有意思的地方。

## 参考索引

<ol>
  <li id="ref-1"><strong>Li, H.</strong>, Meng, W., Han, Z., Zhang, Z., &amp; Yang, Y. (2025). <em>Vehicle platoon in road traffic: A survey of modeling, communication, controlling and perspectives</em>. <em>Physica A</em>. <a href="https://doi.org/10.1016/j.physa.2025.130757">DOI</a>. <code>li2025vehiclea</code></li>
  <li id="ref-2"><strong>Zhang, J.</strong>, Xu, Q., Li, Z., Xu, C., &amp; Li, K. (2025). <em>Cooperative safety intelligence in V2X-enabled transportation: A survey</em>. <a href="https://doi.org/10.48550/arXiv.2512.00490">arXiv</a>. <code>zhang2025cooperative</code></li>
  <li id="ref-3"><strong>Ruan, T.</strong>, Chen, Y., Li, X., Wang, J., Liu, Y., &amp; Wang, H. (2025). <em>Stability analysis and controller design of the cooperative adaptive cruise control platoon considering a rate-free time-varying communication delay and uncertainties</em>. <em>Transportation Research Part C</em>. <a href="https://doi.org/10.1016/j.trc.2024.104913">DOI</a>. <code>ruan2025stability</code></li>
  <li id="ref-4"><strong>Tian, B.</strong>, Guo, Q., Xu, Z., Wang, M., &amp; Qu, X. (2026). <em>MPC-based controller switching strategy for string stability and safety of vehicle platoons considering communication delays boundary</em>. <em>IEEE Transactions on Vehicular Technology</em>. <a href="https://doi.org/10.1109/TVT.2026.3662390">DOI</a>. <code>tian2026mpcbased</code></li>
  <li id="ref-5"><strong>Li, Y.</strong>, Liu, C., &amp; Zheng, F. (2025). <em>Robust fuzzy model predictive control for connected and automated vehicles in mixed platoons using a bidirectional vehicle dynamics strategy</em>. <em>Expert Systems with Applications</em>. <a href="https://doi.org/10.1016/j.eswa.2024.126057">DOI</a>. <code>li2025robust</code></li>
  <li id="ref-6"><strong>Li, S.</strong>, Wang, J., Yang, K., Xu, Q., Wang, J., &amp; Li, K. (2026). <em>Robust nonlinear data-driven predictive control for mixed vehicle platoons via koopman operator and reachability analysis</em>. <em>Transportation Research Part C</em>. <a href="https://doi.org/10.1016/j.trc.2025.105410">DOI</a>. <code>li2026robust</code></li>
  <li id="ref-7"><strong>Pan, X.</strong>, Yuan, X., Ling, Z., Li, Z., Liu, K., &amp; Wang, Y. (2026). <em>A reinforcement learning-based decentralized control strategy for eco-safe mixed platooning with CAVs and HDVs</em>. <em>IEEE Transactions on Intelligent Transportation Systems</em>. <a href="https://doi.org/10.1109/TITS.2025.3631474">DOI</a>. <code>pan2026reinforcement</code></li>
  <li id="ref-8"><strong>Wang, J.</strong>, Wang, H., Song, J., Chen, X., Guo, J., Li, K., Li, X., &amp; Huang, B. (2025). <em>Knowledge-guided self-learning control strategy for mixed vehicle platoons with delays</em>. <em>Nature Communications</em>. <a href="https://doi.org/10.1038/s41467-025-62597-x">DOI</a>. <code>wang2025knowledgeguided</code></li>
  <li id="ref-9"><strong>Wang, C.</strong>, Jia, D., Wang, W., Ngoduy, D., Peng, B., &amp; Wang, J. (2025). <em>A knowledge-informed deep learning paradigm for generalizable and stability-optimized car-following models</em>. <em>Communications in Transportation Research</em>. <a href="https://doi.org/10.1016/j.commtr.2025.100211">DOI</a>. <code>wang2025knowledgeinformed</code></li>
  <li id="ref-10"><strong>Liu, G.</strong>, Zheng, N., &amp; Wang, H. (2025). <em>Cooperative control method for connected and automated vehicle platoon based on arbitrary time headway switched system</em>. <a href="https://doi.org/10.2139/ssrn.5132633">SSRN</a>. <code>liu2025cooperative</code></li>
  <li id="ref-11"><strong>Ruan, T.</strong>, Chen, Y., Han, G., Wang, J., Li, X., Jiang, R., Wang, W., &amp; Wang, H. (2025). <em>Cooperative adaptive cruise platoon controller design considering switching control and stability</em>. <em>Transportation Research Part C</em>. <a href="https://doi.org/10.1016/j.trc.2025.105024">DOI</a>. <code>ruan2025cooperative</code></li>
  <li id="ref-12"><strong>Shi, J.</strong>, Guan, S., Zhong, W., Chen, C., Li, K., &amp; Luo, Y. (2026). <em>Robust predictive control of heterogeneous vehicle groups in the ramp cloud-control system using historical trajectory features</em>. <em>IEEE Transactions on Vehicular Technology</em>. <a href="https://doi.org/10.1109/TVT.2026.3668288">DOI</a>. <code>shi2026robust</code></li>
  <li id="ref-13"><strong>Dong, J.</strong>, Wang, J., Yang, C., Cai, M., Chen, C., Xu, Q., Wang, J., &amp; Li, K. (2026). <em>Multi-source human-in-the-loop digital twin testbed for connected and autonomous vehicles in mixed traffic flow</em>. <a href="https://doi.org/10.48550/arXiv.2603.17751">arXiv</a>. <code>dong2026multisource</code></li>
  <li id="ref-14"><strong>Gao, H.</strong>, Yang, H., Zhu, J., Su, H., Tang, C., Wang, X., Shi, J., Shen, C., &amp; Liu, Z. (2026). <em>Concept, principle, and modeling of driving risk entropy based on human-vehicle-road coupling model for autonomous vehicle</em>. <em>Neurocomputing</em>. <a href="https://doi.org/10.1016/j.neucom.2025.132395">DOI</a>. <code>gao2026concept</code></li>
  <li id="ref-15"><strong>Liu, K.</strong>, Yuan, X., Li, Z., Pan, X., &amp; Wang, Y. (2025). <em>Robust driving intention prediction based on multi-stage learning under vehicle–infrastructure cooperative perception</em>. <em>IEEE Transactions on Intelligent Transportation Systems</em>. <a href="https://doi.org/10.1109/TITS.2025.3552417">DOI</a>. <code>liu2025robust</code></li>
  <li id="ref-16"><strong>徐志刚</strong>、田彬、张宇琴（2025）。<em>考虑通信延时的货车队列纵向控制优化</em>。中国科技出版传媒股份有限公司。<a href="https://book.cppinfo.cn/Encyclopedias/home/index?id=4875430">链接</a>。<code>xuzhigang2025kaolutongxinyanshidehuocheduiliezongxiangkongzhiyouhua</code></li>
</ol>
