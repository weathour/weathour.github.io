---
layout:     post
title:      "自动控制原理笔记（二）"
subtitle:   "时域分析法和根轨迹法"
date:       2024-06-05 12:00:00
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

### 一阶系统的数学模型

以一阶微分方程作为运动方程的控制系统，成为一阶系统。

![yjxt](/img/in-post/post-autocontrol/2yijiexitongtu.png)

微分方程为：$T\dot{c}(t)+c(t)=r(t)$

传递函数为：$\Phi(s)=\frac{C(s)}{R(s)}=\frac{1}{Ts+1}$

其特征参数为$T$。

### 二阶系统的不同响应

不同响应的图：

![btxy](/img/in-post/post-autocontrol/2butongxiangying.png)

单位阶跃响应为$c(t)=1-\mathrm{e}^{-t/T},\quad t\geqslant0$

其初始值为零，终值为该传递函数的增益，在尾1标准型中$s$的系数$T$为时间常数，在允许误差为$0.05$时，调节时间为$3T$。

显然$t_{r}=2.20T,\quad t_{s}=3T(\Delta=5\%)$或$t_{s}=4T(\Delta=2\%)$



**时间常数** $T$反映系统的惯性，所以一阶系统的惯性越小，其响应过程就越快；反之，惯性越大，响应越慢。

## 二阶系统

以二阶微分方程描述运动方程的控制系统，称为二阶系统。在控制系统中，不仅二阶系统的典型应用**极为普遍**，而且不少高阶系统在一定条件下可用二阶系统的特征来表征。

### 二阶系统的数学模型

一般典型的二阶闭环传递函数是：

$\Phi(s)=\frac{\Theta_{o}(s)}{\Theta_{i}(s)}=\frac{K}{T_{m}s^{2}+s+K}$,$K$称为开环增益，$T_m$称为机电时间常数。

其对应的微分方程为：

$T_{m}\frac{\mathrm{d}^{2}\theta_{o}(t)}{\mathrm{d}t^{2}}+\frac{\mathrm{d}\theta_{o}(t)}{\mathrm{d}t}+K\theta_{o}(t)=K\theta_{i}(t)$

为了使研究结果具有普遍的意义，将其化为标准式：

$\Phi(s)=\frac{C(s)}{R(s)}=\frac{\omega_{n}^{2}}{s^{2}+2\zeta\omega_{n}s+\omega_{n}^{2}}$

$\omega_{\mathrm{n}}=\sqrt{\frac{\mathrm{K}}{\mathrm{T}_{\mathrm{m}}}}$ ————自然频率（或无阻尼振荡频率）

$\xi=\frac{1}{2\sqrt{\mathrm{T_{m}K}}}$ ————阻尼比（或相对阻尼比）

得到二阶系统的特征方程为：$s^2+2\zeta\omega_ns+\omega_n^2=0$

其两个根（闭环极点）为：$s_{1,2}=-\zeta\omega_{n}\pm\omega_{n}\sqrt{\zeta^{2}-1}$

对应的结构图如图所示：

![ejjg](/img/in-post/post-autocontrol/2erjiejiegou.png)

### 二阶系统的单位跃迁响应

单位跃迁响应为：$c(t)=1-\frac{\mathrm{e}^{-\xi_{\theta_{\pi}}t}}{\sqrt{1-\xi^{2}}}\mathrm{sin}(_{\omega_{n}}\sqrt{1-\xi^{2}}t+\beta),\quad-1<\zeta<0,t\geqslant0$

$\zeta < 0$的时候，系统是不稳定的； $\zeta = 0$的时候，可以算出是等幅震荡，是无阻尼的情况。

$0 < \zeta = 1, \zeta = 1, \zeta > 1$的情况分别称为欠阻尼、临界阻尼、过阻尼。

一般来说，二阶系统的单位跃迁响应会分为欠阻尼、临界阻尼、过阻尼三种情况来进行讨论。

如图：

![btzn](/img/in-post/post-autocontrol/2butongzuni.png)

#### 







