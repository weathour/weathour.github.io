---
layout: default
title: 标签
permalink: /tags/
---

<section class="section">
  <div class="section-heading">
    <h1>标签页</h1>
    <p>按标签查看相关文章。</p>
  </div>

  {% assign sorted_tags = site.tags | sort %}
  {% for tag in sorted_tags %}
    <h2 class="archive-year">{{ tag[0] }}</h2>
    <ul class="tag-list">
      {% for post in tag[1] %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span class="archive-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      </li>
      {% endfor %}
    </ul>
  {% endfor %}
</section>
