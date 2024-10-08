---
layout:     post
title:      "系统控制心法"
subtitle:   "控制系统的领会法要"
date:       2024-09-04 12:00:00
author:     "Weathour"
header-img: "img/control-engineering.png"
catalog: true
tags:
    - 强化学习
    - 自动控制原理
    - 哲学
mathjax: true
---

常





<p id = "build"></p>

# 自动控制一般概念

## 绪论

自动控制理论是研究自动控制系统组成，进行系统分析设计的一般性理论，是研究自动控制过程共同规律的技术学科。

定义：

> 在无人直接参与的情况下，利用控制装置，使用工作机械、或生产过程（被控对象）的某一个物理量（被控量）按预定规律（给定量）运行。

基本控制方式：

- 开环控制
- 闭环控制
- 复合控制

负反馈原理：将系统的输出信号引回输入端，与输入信号相比较，利用所得的偏差信号进行控制，达到减小偏差、消除偏差的目的。

闭环（反馈）控制系统的特点：

1. 系统内部存在反馈，信号流动构成闭回路
2. 偏差起调节作用

### 基本元件

将控制系统分为**被控对象**与**控制装置**，其中控制装置有：

- **测量元件**：检测被控制的物理量
- **给定元件**：给出与期望的被控量相对于的系统输入量
- **比较元件**：把测量元件的被控量实际值与给定元件给出的输入量进行比较
- **放大原件**：将比较元件给出的偏差信号进行放大
- **执行元件**：直接推动被控对象，使其被控量发生变化
- **矫正元件**：结构或参数便于调整的元部件

![jbzc](/img/in-post/post-autocontrol/basicElement.png)

### 控制系统的分类

1. 给定信号的形式：
    - 恒值系统
    - 随动（伺服）系统
    - 程控系统
2. 是否满足叠加原理：
    - 线性系统
    - 非线性系统
3. 参数是否随时间变化：
    - 定常系统
    - 时变系统
4. 信号传递形式：
    - 连续系统
    - 离散系统
5. 输入输出变量的多少：
    - 单变量系统
    - 多变量系统

### 控制系统的基本要求
系统性能指标的定性分析，再返回头去校正。

1. 稳：系统要稳定
2. 准：系统响应达到稳态时，输出跟踪精度要高
3. 快：系统阶跃响应的过渡过程要平稳、快速

有三种分析方法：
- 时域法
- 复域法
- 频域法


# 拉普拉斯变换

拉氏变换是一个线性变换，可将一个有实数变量$t(t\geq0)$的函数转换为一个变量为复数$s$的函数:

$F(s)=\int_0^\infty f(t)e^{-st}\mathrm{d}t$

有反变换：

$f(t)=\mathcal{L}^{-1}\{F\}(t)=\frac{1}{2\pi i}\lim_{T\to\infty}\int_{\gamma-iT}^{\gamma+iT}e^{st}F(s)\mathrm{d}s$


满足以下性质：
![lpls](/img/in-post/post-autocontrol/1laplace.png)

初值定理和终值定理：
$f(0^+)=\lim_{s\to\infty}sF(s)$

$f(\infty)=\lim_{s\to0}sF(s)$


# 控制系统的基本模型

时域中常用的数学模型有微分方程、差分方程和状态方程。

复数域中有传递函数、结构图。

频域中有频率特性等。

## 时域数学模型

线性、定常、集总参量控制系统得微分方程。

### 线性元件的微分方程例
以下是一个无源网络，$u_i(t)$为输入量，$u_o(t)$为输出量。
![dlt](/img/in-post/post-autocontrol/1dianlutu.png)
由基尔霍夫定律得：
$\begin{aligned}&L\frac{\mathrm{d}i(t)}{\mathrm{d}t}+\frac{1}{C}\int i(t)\mathrm{d}t+Ri(t)=u_{i}(t)\\&u_{o}(t)=\frac{1}{C}\int i(t)\mathrm{d}t
\end{aligned}$

化简后得：
$LC\frac{\mathrm{d}^2u_o(t)}{\mathrm{d}t^2}+RC\frac{\mathrm{d}u_o(t)}{\mathrm{d}t}+u_o(t)=u_i(t)$

### 线性定常微分方程求解


有例题：

![qjxx1](/img/in-post/post-autocontrol/1qiujiexianxing1.png)

![qjxx2](/img/in-post/post-autocontrol/1qiujiexianxing2.png)

一般可以归纳为以下三步：

1. 考虑初始条件，对微分方程中的每一项分别进行拉氏变换，将微分方程转换为变量$s$的代数方程。
2. 由代数方程求出输出量拉式变换函数的表达式。
3. 对输出量拉式变换函数求反变换，得到输出量的时域表达式，即为所求微分方程的解。

一般有条件：
1. 输入的$U_i(t)$规定为1(t)
2. 规定0初始条件
3. 系统的结构参数，自身特性决定系统性能


## 复数域数学模型
在复数域的数学模型有传递函数，可以表征系统的动态性能，还能用来研究系统的结构或参数变化对系统性能的影响。频率法和根轨迹法就是以传递函数为基础建立起来的。

### 传递函数
传递函数的定义为：在零初始条件下，线性定常系统输出量拉氏变换与输入量拉式变换之比。

如有n阶线性常微分方程：
$a_{0}\frac{\mathrm{d}^{n}}{\mathrm{d}t^{n}}c\left(t\right)+a_{1}\frac{\mathrm{d}^{n-1}}{\mathrm{d}t^{n-1}}c\left(t\right)+\cdots+a_{n-1}\frac{\mathrm{d}}{\mathrm{d}t}c\left(t\right)+a_{n}c\left(t\right) = b_{0}\frac{\mathrm{d}^{m}}{\mathrm{d}t^{m}}r\left(t\right)+b_{1}\frac{\mathrm{d}^{m-1}}{\mathrm{d}t^{m-1}}r\left(t\right)+\cdots+b_{m-1}\frac{\mathrm{d}}{\mathrm{d}t^{r}}\left(t\right)+b_{m}r\left(t\right)$


于是有：
$G(s)=\frac{C(s)}{R(s)}=\frac{b_0s^m+b_1s^{m-1}+\cdots+b_{m-1}s+b_m}{a_0s^n+a_1s^{n-1}+\cdots+a_{n-1}s+a_n}=\frac{M(s)}{N(s)}$


因式分解化简后可以有：
$G(s)=\frac{b_0(s-z_1)(s-z_2)\cdots(s-z_m)}{a_0(s-p_1)(s-p_2)\cdots(s-p_n)}=K^*\frac{\prod_{i=1}^m(s-z_i)}{\prod_{j=1}^n(s-p_j)}$

$z_i$是分子多项式的零点，称为传递函数的零点；$p_j$是分母多项式的零点，称为传递函数的极点。

上面的$K^* = b_0/a_0$称为传递系数或根轨迹增益。也可以是是尾1标准型，在频率法中使用较多。



传递函数的性质：
1. 传递函数是复变量$s$的有理真分式函数，具有复变函数的所有性质。
2. 传递函数是一种用系统参数表示输出量与输入量之间关系的表达式，它只取决于系统或元件的结构和参数，而与输入量的形式无关，也不反映系统内部的任何信息。
3. 传递函数与微分方程有相通性。
4. 传递函数$G(s)$的拉普拉斯变换是脉冲响应$g(t)$。


传递函数的局限性：

1. 原则上不反映非零初始条件时系统响应的全部信息。
2. 适合于描述单输入/单输出系统。
3. 只能用于表示线性定常系统。

经典环节对应的传递函数：

| 环节         | 描述                                                                                     | 传递函数 G(s)                                 |
|--------------|------------------------------------------------------------------------------------------|--------------------------------------------------|
| 比例环节     | 输出与输入成正比，无失真也无滞后。                                                    | $G(s) = K$                                     |
| 惯性环节     | 输出按指数规律上升，无阻尼自然振荡频率 $\omega_n$。                                  | $G(s) = \frac{K}{T s + 1}$                     |
| 积分环节     | 输出以固定斜率单调上升，积分时间常数 $T$。                                           | $G(s) = \frac{K}{T s}$                         |
| 振荡环节     | 无阻尼自然振荡频率 $\omega_n$ 和阻尼比 $\zeta$。                                    | $G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$ |
| 微分环节     | 输出与输入的一阶导数成正比，改善系统动态性能。                                        | $G(s) = K s$                                   |
| 一阶微分环节 | 抑制震荡，提高系统稳定性，时间常数 $\tau$。                                           | $G(s) = \frac{K}{\tau s + 1}$                  |
| 二阶微分环节 | 无极点，有两个零点，时间常数 $\tau$ 和阻尼比 $\zeta$。                              | $G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$ |



### 结构图及其等效变换

- 工作原理图 -> 方框图 -> 系统结构图
- 工作原理图 -> 微分方程组 -> 系统结构图

**系统结构图的组成**
- 信号线：信号线是带有箭头的直线，箭头表示信号的流向，在直线旁标记信号的时间函数或象函数。
- 引出线（或测量点）：引出点表示信号引出或测量的位置，从同一位置引出的信号在数值和性质方面完全相同。
- 比较点（或综合点）：比较点表示对两个以上的信号进行加减运算。
- 方框（或环节）：方框表示对信号进行的数学变换。

![jgt](/img/in-post/post-autocontrol/1jiegoutu.png)

有结构图的等效变换表格：

![dxbh1](/img/in-post/post-autocontrol/1dengxiaobianhuan1.png)

![dxbh2](/img/in-post/post-autocontrol/1dengxiaobianhuan2.png)



### 信号流图和结构图的转换

信号流图是由节点和支路组成的一种信号传递网络。

有以下基本性质：

1. 节点标志系统的变量。一般，节点自左向右顺序设置，每个节点标志的变量是所有流向该节点的信号之代数和，从而同一节点流向各支路的信号均用该节点的变量表示。
2. 支路相当于乘法器，信号流经支路时，被乘以支路增益而变换为另一信号。
3. 信号在支路上只能沿箭头单向传递，即只有前因后果的关系。
4. 对于给定的系统，节点变量的设置是任意的，因此信号流图不是唯一的。

绘制如图：
![xhlt](/img/in-post/post-autocontrol/1xinhaoliutu.png)





### 梅森(Mason)增益公式

控制工程中常应用梅森增益公式直接求取从源节点到阱节点的传递函数，而不需简化信号流图。由于系统结构图和信号流图之间有对应关系，梅森增益公式也可以直接用于系统结构图。

梅森增益公式记为：

$P=\frac{1}{\Delta}\sum_{k=1}^np_k\Delta_k$

$P$为从源节点到阱节点的传递函数(或总增益);$n$ 为从源节点到阱节点的前向通路总数$p_k$为从源节点到阱节点的第$k$条前向通路总增益；$\Delta$为 $1-\sum L_a+\sum L_bL_c-\sum L_dL_dL_f+...$称为流图特征式，其中$\sum L_a$ 为所有单独回路增益之和；$\sum L_bL_\epsilon$ 为所有互不接触的单独回路中，每次取其中两个回路的回路增益的乘积之和；$\sum L_dL_dL_f$为所有互不接触的单独回路中，每次取其中三个回路的回路增益的乘积之和；$\Delta _k$\textbf为流图余因子式,它等于流图特征式中除去与第k条前向通路相接触的回路增益项(包括回路增益的乘积项)以后的余项式。

有例题：
![mason](/img/in-post/post-autocontrol/1mason.png)










# 总结

先介绍了自动控制的一般概念，介绍了以下基本控制方式。然后讲了基本控制元件，将控制元件按功能分类，随后也给了控制系统的分类与基本要求。提出了三类分析方法，对应不同的数学模型和分析与矫正的方法。

在讲时域和复域的数学模型之前，先列出了拉普拉斯变换的基本定义与性质。

时域模型首先需要掌握的是**针对不同系统去列出微分方程组**，然后一般是**利用拉普拉斯变换对微分方程进行求解**。

在复数域中，首先提出了**传递函数**的概念，然后有传递函数对应的经典环节。

然后引出的两个利用传递函数求解的方法，分别是**结构图等效化简**与**梅森公式**。



三个要求：

- **拉氏变换解微分方程**
- **结构图等效化简**
- **信号流图与梅森增益公式**