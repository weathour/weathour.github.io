---
layout: default
title: 文章
---

<section class="section">
  <div class="section-heading">
    <h1>全部文章</h1>
    <p>按时间查看我发布的所有内容。</p>
  </div>

  <div class="post-grid">
    {% for post in site.posts %}
    <article class="post-card">
      <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
      <a class="text-link" href="{{ post.url | relative_url }}">阅读全文 →</a>
    </article>
    {% endfor %}
  </div>
</section>
