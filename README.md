# Weathour Blog

基于 `Astro` 和 `Fuwari` 的个人博客，部署到 `GitHub Pages`：

- 线上地址：`https://weathour.github.io/`
- 技术栈：`Astro` + `Fuwari` + `Pagefind`

## 本地开发

```powershell
corepack enable
pnpm install
pnpm dev
```

## 发布

发布前只使用仓库统一门禁：

```bash
pnpm verify
```

经明确授权推送到 `main` 后，按提交 SHA 等待 GitHub Pages 工作流完成：

```bash
git push origin main
pnpm verify:push
```

`git push` 返回成功只说明远端接收了提交；`pnpm verify:push` 成功后，才可宣布发布完成。故障分类、恢复命令与历史事故见 [`docs/WRITING_PUBLISHING.md`](docs/WRITING_PUBLISHING.md)。
