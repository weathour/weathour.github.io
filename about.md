---
layout: default
title: 关于
---

<section class="about-page">
  <p class="eyebrow">ABOUT</p>
  <h1>{{ site.author.name }}</h1>
  <img class="avatar avatar-large" src="{{ site.author.avatar }}" alt="{{ site.author.name }} avatar" />
  <p>{{ site.author.title }}</p>

  <p>
    这里是个人主页页面。你可以介绍你的研究方向、职业经历、兴趣领域和正在进行的项目。
  </p>

  <h2>我关注的内容</h2>
  <ul>
    <li>知识管理与写作工作流</li>
    <li>科研效率工具与自动化</li>
    <li>论文阅读、代码实验与复盘</li>
  </ul>

  <h2>联系我</h2>
  <p>邮箱：{{ site.author.email }}</p>
  <p>位置：{{ site.author.location }}</p>
  <p>GitHub：<a href="{{ site.author.github }}">{{ site.author.github }}</a></p>
</section>
