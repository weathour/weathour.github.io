---
title: 'yxj-wiki：把个人知识库升级成 Agent 可用的科研写作后端'
postSlug: yxj-wiki-controlled-research-backend
published: 2026-05-15
description: 介绍 yxj-wiki 的后端设计、核心理念、资料/真值/写作/审查模块，以及如何在外部论文仓库中用 Codex、deep-interview、ralplan 和 ralph 接入这个后端完成科研写作生产。
tags: [yxj-wiki, Codex, OMX, 科研写作, 知识后端, AI协作]
category: Workflow
draft: false
lang: zh_CN
---

这篇文章记录我最近把 `yxj-wiki` 从“个人文献和笔记库”升级成“agent 可调用的科研写作后端”的阶段性结果。

这里的“后端”不是一个常驻 Web 服务，而是一套**有文件层、schema、validator、审查工件和 release 边界的本地知识系统**。Codex、OMX、Ralph、Team 或其他 agent 可以进入这个仓库，按协议查询资料、建立写作 contract、审查 claim、生成 patch、记录 handoff。人仍然是最后的判断者，尤其是 release 和强结论。

先说当前状态：它已经可以投入**受控生产使用**，但这不等于“所有资料都完全消化完”，也不等于任何文章已经可以发布。更准确的状态是：

```text
controlled_backend_production_ready = yes
release_ready = no
human_review_ready != release_ready
```

也就是说，它现在可以作为 agent 的中央资料、引用、真值、写作、审查和交接后端使用；但任何对外发布、强 claim、release packet 仍然必须经过人类明确批准。

## 为什么要做成“后端”

过去用 AI 辅助科研写作时，我反复遇到一个问题：模型本身很会生成文字，但它不知道哪些东西在我的知识系统里已经被审查过，哪些只是 source card，哪些只是 raw PDF，哪些是旧计划，哪些是可以写进论文的证据。

如果不加约束，agent 很容易把以下东西混在一起：

- “文献存在”与“文献支持这个 claim”；
- “source card 摘要”与“publication-grade evidence”；
- “某次实验结果”与“可跨论文复用的 truth evidence”；
- “human review ready”与“release ready”；
- “润色得更像人”与“把证据不足的话说得更强”。

所以 yxj-wiki 的设计目标不是让 agent 更自由，而是让 agent **在足够多的本地知识中，被正确地限制**。

我想要的系统不是：

```text
给模型一堆文献 → 让它总结 → 让它写论文
```

而是：

```text
source identity
→ source card / cluster
→ locator-backed evidence
→ reviewed truth / claim / ontology
→ writing contract
→ paragraph plan
→ draft candidate
→ audit
→ minimal patch
→ human boundary
```

这条链的重点是：每一层都知道自己能做什么，也知道自己不能越界做什么。

## 总体架构：从 raw 到 release boundary

yxj-wiki 现在大致分成这些层：

| 层 | 作用 | 不能被误用为 |
|---|---|---|
| `raw/` | 原始材料，本地保存 PDF、网页快照等 | 不能 blind scan，不能随便当证据 |
| `refs/` | source identity、citekey、BibTeX、collection/export 真相层 | 不能等同于 claim 支持 |
| `refs/analyses/` | source card、cluster、claim matrix 等可复用分析层 | 不是 publication-grade evidence |
| `truth/` | reviewed concept、evidence、claim、conflict、relation、measurement、Toulmin | 不能被 agent 直接 live mutation |
| `patches/` | truth/wiki/writing 候选修改 | pending patch 不是 live truth |
| `wiki/` | 当前架构、维护、项目、概念和说明文档 | 强 claim 仍要回到 truth/evidence |
| `writing/` | writing memory、contract、draft、review、paper workspace | draft 不等于 release |
| `status/` | 生成态 dashboard、production seal | 不是第二套真相层 |
| `graph/` / `graphify-out/` | 派生导航图 / 程序结构图 | 不是 source truth |

其中最重要的原则是：**越接近发布，越需要 schema、locator、review 和 human boundary**。

### 当前读入顺序

agent 接入 yxj-wiki 时，不应该一上来扫 `raw/`。标准顺序是：

```text
当前任务说明
→ AGENTS.md
→ 当前架构入口
→ status dashboard / production seal
→ backend interface
→ object contracts
→ refs / source cards / clusters
→ truth / writing objects
→ source-local cache
→ raw only with explicit locator reason
```

这保证了 agent 首先读到当前规则，而不是被旧文档、旧计划或未审查材料带偏。

## 核心理念一：引用不是证据，证据不是 claim

yxj-wiki 的第一条理念是把科研写作里常被混淆的对象拆开。

一篇论文被注册到 `refs/registry.jsonl`，只表示它有稳定 source identity 和 citekey。它可以被检索、导出、放入 BibTeX，但这还不意味着它支持某个具体 claim。

一个 source card 可以帮助我记住这篇文章讲了什么、有哪些可复用观点、适合放在哪个 cluster，但它也还不是 publication-grade evidence。

真正能支撑写作中强句子的，是更靠后的对象：

```text
claim_id
→ evidence_id
→ citekey
→ locator
→ support_label
→ conflict_policy
→ review gate
```

这也是为什么我不希望 agent 看到一篇文章标题后就自动写出“已有研究表明”。它必须知道：

- 这个 claim 是不是已经被审查；
- evidence 有没有 locator；
- support 是 strong、partial、weak，还是 conflict；
- 有没有冲突文献要披露；
- 这句话是否超过了证据强度。

## 核心理念二：ontology 是防止“会写但概念乱”的工具

很多 AI 写作的问题不是语法错，而是 ontology 错。比如它会把方法、机制、架构、指标、实验条件、设计目标和行动策略混成一类。

yxj-wiki 的 `truth/` 层不只存 claim，也存：

- concept；
- term / sense；
- relation；
- measurement model；
- Toulmin claim；
- conflict；
- writing claim binding。

这样做的意义不是形式主义，而是为了让 agent 在写作前先弄清楚：

- 这是一个对象、关系、功能、方法，还是指标？
- 这个词在当前论文里是哪一个 sense？
- 这个 claim 是描述事实、提出机制、还是给出评价？
- 这个实验结果支持的是性能提升、机制解释，还是工程可行性？

当 ontology 边界清楚后，写作会更自然，因为文章不会一直在概念层级之间跳来跳去。

## 核心理念三：写作不是润色，而是 reader-state control

这次升级里我最重视的是写作模块。它不是普通润色器，也不是 RAG 写手，而是一个受后端约束的 writing production layer。

它的链条是：

```text
reviewed material / source identity
→ writing memory / doctrine
→ writing brief
→ manuscript contract
→ claim-evidence contract
→ rhetorical + voice/style contract
→ paragraph plan
→ draft candidate
→ review audits
→ minimal revision patch
→ human_review_ready boundary
```

它吸收的写作理念可以概括成几条：

1. **论文不是句子集合，而是 main point + narrative arc。** 先决定读者应该经历什么，再决定每段写什么。
2. **清晰度不是“写得简单”，而是控制读者认知负荷。** 术语、背景、转折、限定都要服务于读者状态变化。
3. **metadiscourse 是读者接口。** transition、frame marker、hedge、booster、engagement 不是装饰，而是导航。
4. **claim strength 必须匹配 evidence strength。** 写得顺不代表能写得强。
5. **人类风格不是表面去 AI 腔。** 真正的人类风格来自具体判断、限定、作者责任和段落功能，而不是随机改写。
6. **revision 应该是 minimal patch。** 能改一句就不要重写整段，否则 trace 会丢。

所以我希望 agent 写作时不要只说“帮我润色”，而是先问：

- 这一节要让读者相信什么？
- 读者在进入这一段前知道什么？
- 读完这一段后应该获得什么状态？
- 哪些 claim 可以强说，哪些只能弱说？
- 哪些地方需要 hedge，哪些地方需要 booster？

## 写作模块现在有哪些组件

### 1. Writing memory

`writing/memory/` 存放写作知识和风格规则，包括：

- scientific writing principles；
- metadiscourse taxonomy；
- paragraph planning rubric；
- style profiles；
- LLM style markers；
- policy / compliance 相关规则。

这些东西主要用于改善写作生产行为，不直接作为论文引用证据。

### 2. Writing contracts

当要写某个项目或章节时，agent 不应该直接起草正文，而应该先查或建立 contract：

```text
writing/briefs/<project>.yaml
writing/contracts/manuscript/<project-section>.yaml
writing/contracts/claim_evidence/<project-section>.tsv
writing/contracts/rhetorical/<project-section>.tsv
writing/contracts/voice_style/<project-section>.yaml
writing/plans/section_claim_maps/<project-section>.tsv
writing/reviews/**/<project-section>-*.json
```

这些 contract 决定：

- 这一节的目标读者是谁；
- 主 claim 是什么；
- 哪些 evidence 可以用；
- 段落功能如何安排；
- 语气强度如何控制；
- 哪些话不能说。

### 3. P8 research paper workspace

为了支持“已经做完实验、拿到数据、准备写正常科技论文”的场景，写作层新增了 P8 paper workspace。

它的对象链是：

```text
research-paper-workspace
→ scientific-story-contract
→ reader-state-contract
→ experiment-repo-manifest
→ method-contract / experiment-contract
→ result-packet
→ figure-table-registry
→ result-claim-contract
→ narrative-safety-audit
```

一个典型论文 workspace 在：

```text
writing/papers/<paper_id>/
```

里面会登记外部实验仓库、方法说明、实验设置、结果包、图表注册、结果 claim 和审查工件。

这一步很关键：实验代码和 LaTeX 正文通常不在 yxj-wiki 里，而在外部论文仓库中。yxj-wiki 负责提供写作后端和审查控制面，不强行把所有正文和实验都搬进来。

### 4. Review / audit

写作层现在有一组 audit：

- citation grounding；
- conflict disclosure；
- rhetorical calibration；
- metadiscourse / reader navigation；
- voice drift；
- policy compliance；
- coverage omission；
- result-claim grounding；
- figure/table provenance；
- experiment reproducibility；
- narrative safety。

这意味着“写得好不好”不再只靠主观感觉，而是被拆成可检查问题：句子是否超证据、段落是否迷路、图表是否有 provenance、结果句是否强于 result claim。

## 如何在外部论文仓库使用

具体文章的 LaTeX、实验代码、图表和结果文件通常在外部仓库。此时推荐使用“双仓协议”：

```text
external paper repo
  manuscript / code / experiments / results / figures
        ⇅ manifest + contracts + audits
yxj-wiki
  refs / truth / writing memory / writing contracts / writing/papers / reviews
```

外部仓库中的 Codex 应该先建立 session handshake：

```yaml
external_repo_path: <current working directory>
yxj_wiki_path: /path/to/yxj-wiki
paper_id: <stable id>
article_type: method_experiment_results
write_intent: init_backend | update_backend | draft_patch | audit_patch
external_write_scope:
  - manuscript/sections/*.tex
yxj_write_scope:
  - writing/papers/<paper_id>/
command_execution: false by default
release_ready_mutation: forbidden
```

最常用的一句启动语可以是：

```text
使用 $yxj-backend，以 /path/to/yxj-wiki 作为受控写作后端。
当前仓库是论文生产仓库，请进入 research_paper_writer 模式。
先检查后端状态，读取写作模块和外部仓库协议；
只在允许范围内读取当前论文仓库，不执行实验，不设置 release_ready。
```

如果文章已经写了一半，也可以中途接入：

```text
使用 $yxj-backend。
当前文章已经写作一大半，请进入 mid-draft intervention 模式。
先只读稿件、实验结果、图表和 bib，诊断叙事链、claim-evidence 对齐、读者路径和文风问题；
输出最小修补 / 中等重构 / 深度重写三个方案，等我确认后再 patch。
```

我现在比较推荐的实际工作流是：

```text
题目和实验基本确定
→ deep-interview 访谈核心贡献、读者和结果
→ ralplan 生成写作计划
→ ralph 顺序执行计划
→ yxj-backend 提供资料、contract、audit 和 handoff
→ 外部论文仓库只接收经过约束的正文 patch
```

## 三种典型使用模式

### 1. 查资料和定位问题

当我只是想知道某个主题在库里有什么材料，可以让 agent 进入 query mode：

```text
使用 $yxj-backend 查询 yxj-wiki 中关于 <topic> 的 refs/source-card/wiki/truth/writing surfaces。
返回可用于论文写作的材料、已有 claim、缺口和不能越界使用的内容。
```

此时它应该优先查 registry、collections、source cards、clusters、truth objects，而不是直接扫 raw。

### 2. 从零开始写一篇方法+实验论文

当实验已经做完，但论文还没写，可以这样开始：

```text
使用 $yxj-backend + deep-interview。
我已经确定题目并完成实验，现在要写 method/experiment/results 类型论文。
请先访谈我：核心贡献、实验设置、最强结果、目标期刊、不能夸大的地方。
然后建立 paper_id 和 writing/papers/<paper_id>/ 工作区。
```

后续再用 `ralplan` 制定写作计划，用 `ralph` 执行。

### 3. 中途接管已有稿件

如果文章已经写了一大半，不要让 agent 直接“全文润色”。更好的命令是：

```text
先做诊断，不改正文。
检查 abstract/introduction/method/results/discussion 的叙事链，标出 claim-evidence 不对齐、读者状态断裂、metadiscourse 缺失、AI 腔和过度 claim。
然后给出分级修订计划。
```

这能避免 agent 把已有作者意图洗掉。

## 验证和边界

yxj-wiki 的一个重要特点是：很多操作都要留下 machine-readable evidence。

常用检查包括：

```bash
make verify
make writing-verify
make research-paper-verify
make p4-verify
make production-seal-verify
python scripts/build_system_status.py --repo-root . --check --json
git diff --check
```

对 release 相关内容，还要检查不能出现非法：

```bash
grep -RInE 'release_ready: *true|"release_ready" *: *true' writing/releases writing/reviews refs/reviews patches || true
```

现在 production seal 的状态是 warning，但 warning 是设计内的：

- 仍有 P4 residual locator queue pressure；
- P4 release packets 仍需要 human review；
- 可能存在 generated artifact freshness warning。

这不妨碍它作为 controlled backend 使用，但提醒 agent：不要把后端可用性误读成发布批准。

## 当前完成度和不足

可以投入使用的部分：

- source/citation registry 与 BibTeX 管理；
- source-card / cluster 中间层；
- reviewed truth / ontology / claim / conflict 层；
- writing memory 和 writing contracts；
- P8 method/experiment/result paper workspace；
- 外部论文仓库双仓协议；
- writing audit / policy / metadiscourse / result grounding 检查；
- production handoff 和 GitHub 同步；
- 统一 `yxj-backend` skill 入口。

仍然需要后续推进的部分：

- 很多 source 仍是 `source_identity_only`，不是 source-card 或 truth evidence；
- raw 文档没有全部深度消化为 locator-backed evidence；
- P8 的实验结果目前是 paper-local support，不是 live truth evidence；
- paragraph plan builder 和 minimal patch workflow 还可以继续 schema 化；
- 针对具体期刊的 policy profile 仍可增强；
- release 仍必须停在人类审批边界。

## 我希望它最终带来的变化

我做 yxj-wiki 后端，不是为了让 agent 代替我“自动写论文”。相反，它的目标是让 agent 在写作时更像一个知道边界的研究助手：

- 它知道哪些材料只是线索；
- 它知道哪些 claim 已经被审查；
- 它知道什么时候该 hedge；
- 它知道一段话的读者功能；
- 它知道不能把漂亮句子写得比证据更强；
- 它知道什么时候必须停下来等人类批准。

理想情况下，我只需要在外部论文仓库中告诉 Codex：

```text
使用 $yxj-backend，把 yxj-wiki 作为后端，帮我设计这篇文章的故事线并修改当前稿件。
```

然后 agent 会自动回到正确的资料层、写作层、审查层和 release 边界，而不是临场乱写。

这才是我理解的个人科研知识库后端：它不是把知识堆起来，而是让知识在写作生产中**被正确调用、被正确限制、被正确交接**。
