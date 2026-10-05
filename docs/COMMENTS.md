# 文章评论

文章末尾使用官方 `giscus` Web Component，评论存放于
`weathour/weathour.github.io` 的 GitHub Discussions / Announcements 分类。
仓库与分类 ID 在 `src/config.ts` 的 `commentsConfig` 中。

- 读者可以直接查看评论，发表评论或反应需要 GitHub 登录。
- 中英文版本共用 `posts/<postSlug>`，采用严格匹配。修改标题不会改变评论关联；
  已有评论的文章不应随意改 `postSlug`。
- 评论界面语言随文章版本切换，明暗主题跟随博客设置。
- 使用官方组件处理 Swup 页面替换后的初始化和监听清理。
- iframe 懒加载；评论服务无法访问或禁用 JavaScript 时，可使用卡片中的 GitHub 链接。
- 首次有人评论或反应时由 giscus 自动创建 discussion，不需要逐篇预建。

## GitHub 前置设置

1. 仓库保持公开并开启 Discussions。
2. 在 <https://github.com/apps/giscus/installations/new> 安装 giscus，
   使用 Only select repositories，仅选 `weathour.github.io`。
3. 不要删除配置中的 Announcements 分类；迁移分类时同步更新名称和 ID。

无令牌、数据库或独立评论服务器需要加入博客。

## 验证

```bash
pnpm verify
pnpm preview --host 127.0.0.1 --port 18082
# 另一个终端；需要本机已有的 Chromium 和 Python websocket-client
python3 scripts/check-comments.py
```

浏览器回归检查阻断外部 HTTPS 请求，验证站内跳转、线程映射、当前登录回跳地址、
主题和手机宽度。它不代替上线后对真实 giscus 加载和 GitHub App 安装状态的检查。
发布仍按 `docs/WRITING_PUBLISHING.md` 执行。
