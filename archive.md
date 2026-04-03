---
layout: default
title: 归档
permalink: /archive/
---

<section class="section">
  <div class="section-heading">
    <h1>文章归档</h1>
    <p>按年份整理所有文章。</p>
  </div>

  {% assign grouped_posts = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  {% for year in grouped_posts %}
    <h2 class="archive-year">{{ year.name }} 年</h2>
    <ul class="archive-list">
      {% for post in year.items %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span class="archive-date">{{ post.date | date: "%m-%d" }}</span>
      </li>
      {% endfor %}
    </ul>
  {% endfor %}
</section>
