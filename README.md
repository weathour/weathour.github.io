# GitHub Pages Jekyll 博客

这是一个可直接用于 `username.github.io` 的 Jekyll 博客骨架，兼容 GitHub Pages。

## 仓库要求

- GitHub 用户主页仓库名必须是 `你的用户名.github.io`
- 仓库建议设为 `Public`
- 推送到 `main` 后即可由 GitHub Pages 构建

## 当前结构

- `_config.yml`：站点配置
- `_layouts/default.html`：基础布局
- `_posts/2026-04-03-welcome-to-my-blog.md`：第一篇示例文章
- `index.md`：首页
- `assets/css/style.css`：样式

## 本地提交与推送

```powershell
git add .
git commit -m "Initialize Jekyll blog"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

## GitHub Pages 设置

如果仓库没有自动发布：

- 打开仓库 `Settings` → `Pages`
- 在 `Build and deployment` 下选择 `Deploy from a branch`
- 选择 `main` 和 `/ (root)`
- 保存后等待几分钟

## 后续写文章

在 `_posts` 目录新增文件，命名格式：

```text
YYYY-MM-DD-your-post-title.md
```

例如：

```text
2026-04-03-my-first-note.md
```
