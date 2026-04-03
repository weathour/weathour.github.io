---
layout: default
title: 首页
---

<section class="hero">
  <div class="hero-copy">
    <p class="eyebrow">PERSONAL BLOG</p>
    <h1>{{ site.author.name }}</h1>
    <p class="hero-title">{{ site.author.title }}</p>
    <p class="hero-text">{{ site.author.bio }}</p>
    <div class="hero-actions">
      <a class="button" href="{{ '/posts/' | relative_url }}">查看文章</a>
      <a class="button button-secondary" href="{{ '/about/' | relative_url }}">了解我</a>
    </div>
  </div>
  <div class="hero-panel">
    <div class="profile-card">
      <img class="avatar" src="{{ site.author.avatar }}" alt="{{ site.author.name }} avatar" />
      <h2>个人主页</h2>
      <p><strong>地点：</strong>{{ site.author.location }}</p>
      <p><strong>邮箱：</strong>{{ site.author.email }}</p>
      <p><strong>GitHub：</strong><a href="{{ site.author.github }}">@weathour</a></p>
      <p>这里适合放个人介绍、项目方向、研究兴趣和近期计划。</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-heading">
    <h2>搜索文章</h2>
    <p>输入标题、摘要或标签，前端实时筛选。</p>
  </div>
  <div class="search-box">
    <input id="search-input" type="text" placeholder="搜索文章、关键词、标签..." />
  </div>
  <div id="search-empty" class="search-empty" hidden>没有找到相关文章。</div>
  <div id="post-list" class="post-grid">
    {% for post in site.posts %}
    <article class="post-card" data-search-item data-title="{{ post.title | downcase }}" data-summary="{{ post.excerpt | strip_html | strip_newlines | downcase }}" data-tags="{{ post.tags | join: ' ' | downcase }}">
      <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
      <a class="text-link" href="{{ post.url | relative_url }}">阅读全文 →</a>
    </article>
    {% endfor %}
  </div>
</section>

<section class="section highlights">
  <div class="highlight-card">
    <h3>写作</h3>
    <p>整理学习笔记、方法论、项目复盘。</p>
  </div>
  <div class="highlight-card">
    <h3>研究</h3>
    <p>沉淀论文阅读、实验记录和知识图谱。</p>
  </div>
  <div class="highlight-card">
    <h3>工具</h3>
    <p>分享 Obsidian、LaTeX、自动化工作流经验。</p>
  </div>
</section>
