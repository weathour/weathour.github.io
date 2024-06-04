---
layout:     post
title:      "自动控制原理笔记（二）"
subtitle:   "时域分析法和根轨迹法"
date:       2024-06-04 12:00:00
author:     "Weathour"
header-img: "img/control-engineering.png"
catalog: true
tags:
    - 笔记
    - 自动控制原理
mathjax: true
---

紧接着控制系统的数学模型，进入时域分析与矫正还有根轨迹法中。


<p id = "build"></p>

# 时域分析法

时域法是最基本的分析方法，是学习复域法、频域法的基础。

1. 直接在时间域中对系统进行分析校正，直观，准确。
2. 可以提供系统时间响应的全部信息。
3. 基于求解系统输出的解析解，比较繁琐。

**输入信号**有：

![srxh](/img/in-post/post-autocontrol/2shuruxinhao.png)

**线性系统的性能指标**

- 稳
- 准
- 快

其中对于**快**一般有四个动态性能指标，分别是**上升时间**、**峰值时间**、**调节时间**、**超调量**。其中调节时间和超调量是最常用到的。

![dtzb](/img/in-post/post-autocontrol/2dongtaizhibiao.png)

## 一阶系统

以一阶微分方程作为运动方程的控制系统，成为一阶系统。

微分方程为：$T\dot{c}(t)+c(t)=r(t)$

传递函数为：$\Phi(s)=\frac{C(s)}{R(s)}=\frac{1}{Ts+1}$

不同响应的图：

![btxy](/img/in-post/post-autocontrol/2butongxiangying.png)