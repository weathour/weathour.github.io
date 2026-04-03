---
layout: default
title: 首页
---

# 欢迎来到我的博客

这是一个基于 **Jekyll** 的 GitHub Pages 博客。

## 最新文章

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}

## 下一步

- 修改 `_config.yml`
- 在 `_posts` 里继续写文章
- 推送到 `你的用户名.github.io` 仓库
