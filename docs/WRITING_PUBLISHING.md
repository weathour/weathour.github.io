# 写作与发布协议

最后核对：2026-08-25。

本文档是本仓库发布流程的事实来源。`package.json` 中的 `pnpm verify` 是本地与 GitHub Actions 共用的唯一质量门禁，`.github/workflows/publish.yml` 是唯一发布工作流。

## 完成标准

一次发布需要同时满足四项条件：

1. `pnpm verify` 在本地通过。
2. `git push origin main` 成功，且远端 `main` 与本地 `HEAD` 是同一个 SHA。
3. 该 SHA 对应的 `Verify and deploy` 工作流成功。
4. 构建日志包含目标路由；涉及公开页面、站内链接或媒体时，`verify:push` 后从公开 HTML 核对本次变更、语言路由和实际媒体 URL。

`git push` 的成功输出只证明 GitHub 接收了提交。它不证明检查通过，也不证明 Pages 已完成部署。

## 2026-08-17 故障复盘

近期记录里没有发现 Git 传输失败。`3bcd3fd` 已经存在于远端并触发 Actions，实际问题发生在推送之后。

| 提交／Run | 现象 | 根因 | 处理 |
| --- | --- | --- | --- |
| `7805008` / Code quality `32040447280` | `biome: command not found` | `setup-biome` 无法为 `version: latest` 找到 release，未安装可执行文件，下一步因此找不到 `biome` | `c86a5bd` 曾临时固定 `2.2.5`；现改为直接使用仓库依赖和 `pnpm verify` |
| `3bcd3fd` / Code quality `32042136338` 初次 attempt | job 在 `Set up job` 失败 | GitHub runner 下载 `setup-biome` 时收到 `429 Too Many Requests` | 删除独立 Biome setup 与重复工作流，减少 action 下载次数 |
| `3bcd3fd` / Build and Check `32042136342` 初次 attempt | 两个 job 都未运行仓库命令 | 下载 `pnpm/action-setup` 时收到 `502`，重试后又收到 `429` | 把检查、构建和上传收进一个 job；此类外部瞬断只重跑同一 SHA |
| `3bcd3fd` / Pages `32042136363` | 部署成功，但另外两套检查失败 | 三个工作流互相独立，部署没有等待质量检查 | 现在只有 `build -> deploy` 一条依赖链；build 失败时 deploy 不会开始 |
| `32040447272`、`27695769944` | Pages run 显示 cancelled | 新 push 触发 `cancel-in-progress`，旧发布被主动取消 | 新工作流不主动取消正在执行的 run；仍以精确 SHA 判断被替换的 pending run |
| 本地发布清单 | `pnpm typecheck` 不存在；`pnpm type-check` 又因 `--isolatedDeclarations` 失败 | 文档、脚本和 CI 长期漂移 | 增加稳定的 `typecheck` 与 `verify`，CI 不再自行拼装另一套命令 |

2026-08-18 在不修改该提交的情况下重跑 `32042136338` 与 `32042136342`，两者均成功，确认 429/502 属于瞬时基础设施故障。重跑还显示旧 actions 使用的 Node 20 runtime 已弃用；新的唯一工作流固定使用 Node 24 兼容的 checkout 与 Astro action 链。

这些记录说明，过去的红色状态包含配置错误、GitHub 基础设施瞬断和主动取消，不能统称为“push failed”。诊断时先确认失败发生在哪一层。

## 唯一验证入口

```bash
pnpm verify
```

该命令顺序执行：

1. `pnpm lint`：只读 Biome 检查，不修改源码。
2. `pnpm typecheck`：Astro 内容／组件检查，加 TypeScript `tsc --noEmit`。
3. `pnpm build`：生成静态站点，并建立 Pagefind 索引。

自动修复只能显式执行：

```bash
pnpm lint:fix
```

执行后必须重新查看 diff，再运行 `pnpm verify`。不得把会写文件的命令伪装成验证命令。

## 标准发布步骤

```bash
# 1. 确认工作区与远端状态
git status --short --branch
git fetch origin main
git rev-list --left-right --count HEAD...origin/main

# 2. 验证将要提交的内容
pnpm install --frozen-lockfile
pnpm verify
git diff --check

# 3. 只暂存本次范围，检查后提交
git add -- <explicit-paths>
git diff --cached --check
git diff --cached --stat
git commit -m "<specific message>"

# 4. 只有在用户明确要求发布或同步后才推送
git push origin main

# 5. 按精确 SHA 等待发布链，不依据“latest”猜测
pnpm verify:push
```

`verify:push` 通过后，把精确提交 SHA、工作流、已核路由与媒体以及当前 published／pending 状态写回对应的 `../drafts/<slug>/article-packet.md`。若推送只完成了其中一轮修订，要明确保留哪一轮仍待推送；不得让过程记录继续保留与远端状态相反的旧句。

`git rev-list --left-right --count` 的第二个数字表示本地落后远端的提交数。该数字非零时，先检查远端变更；不得对 `main` 使用强制推送。

## 推送后的机器校验

`pnpm verify:push` 会执行四项只读检查：

1. 比较本地 `HEAD` 与 `origin/main` 的 SHA。
2. 等待该 SHA 对应的 `publish.yml` push run 出现。
3. 使用 `gh run watch --exit-status` 等待完整的 `build -> deploy` 链。
4. 工作流结束后重新读取本地与远端 SHA，防止等待期间的新 push 被误报为已验证。

以下任一情况都会返回非零：提交尚未推送、远端指向其他 SHA、工作流没有注册、build 失败或 deploy 失败。脚本需要已登录且拥有 Actions 读取权限的 GitHub CLI。

## 失败分流

### Git 拒绝或传输失败

先运行：

```bash
git ls-remote origin refs/heads/main
git fetch origin main
git rev-list --left-right --count HEAD...origin/main
```

若远端已有新提交，检查和整合后再推送。不得用 `git push --force` 覆盖 `main`。

### 仓库命令失败

如果日志已经进入 `pnpm verify`，失败属于当前提交。读取首个失败命令，修复后重新运行完整门禁并创建新提交。不得靠重跑同一 SHA 把确定性错误变绿。

### Actions 在 `Set up job` 失败

如果仓库命令尚未开始，且日志显示下载 action 时出现 `429`、`502` 或连接超时，这是 GitHub 基础设施故障。代码不需要为此改动。恢复方式：

```bash
gh run rerun <run-id> --failed
gh run watch <run-id> --exit-status
```

同一故障连续出现时，记录 run URL 和 HTTP 状态，停止制造“修复 CI”的空提交。

### Run 被取消

先按 SHA 检查是否已有更新提交取代它。当前工作流不会主动取消正在执行的同分支 run；GitHub concurrency 最多保留一个 running 和一个 pending，同组出现第三个 run 时，较早的 pending 仍可能被替换。`pnpm verify:push` 必须针对仍位于远端 `main` 的 SHA 成功；人工取消应记录原因。

## 发布检查表

- [ ] 改动范围只包含本次任务文件。
- [ ] 中英文文章的 slug、脚注、图片顺序与路由对应；构建产物包含正文实际引用的每个媒体文件。
- [ ] 新增或修改站内链接时，目标存在于构建路由且语言前缀正确；系列导航覆盖该系列声明的成员；系列级标题调整已核对所有既有成员的中英文前缀、序号和互链。
- [ ] `pnpm verify` 通过，且验证过程没有产生未审阅改动。
- [ ] `git diff --check` 与暂存区检查通过。
- [ ] 用户已明确要求发布或同步。
- [ ] 本地 SHA 与远端 `main` SHA 一致。
- [ ] `pnpm verify:push` 返回成功。
- [ ] 每个变更路由返回 200 且包含本次变更标记；从部署 HTML 取得新媒体 URL，确认其返回 200 和预期 MIME 类型。
- [ ] 对应 article packet 已回写精确 SHA、工作流、公开路由／媒体和实际发布状态，不再保留失效的“待推送”记录。

只在以上项目完成后使用“已发布”“已同步”或“线上可见”。
