---
title: '模型内部有什么：从方程、概率分布到神经网络的共同结构'
postSlug: inside-the-model
published: 2026-08-21
updated: 2026-08-30
image: './inside-the-model/inside-the-model-cover.webp'
description: '从道路和水箱出发，分清模型的形式呈现、数学语义、观察边界、计算实现与经验表征，并检验“同一个模型”究竟需要保持什么。'
tags: [数学模型, 形式语义, 模型论, 神经网络, 因果模型, 科学哲学]
category: '工程实践'
draft: false
lang: zh_CN
---

## 同一段道路，四种数学对象

一段拥挤道路可以被压缩成一张流量—浓度图。横轴 $k$ 表示单位道路长度上的车辆数，纵轴 $q$ 表示单位时间内通过某个断面的车辆数。Lighthill 和 Whitham 用一条构成关系概括两者的联系：

$$
q=\phi(k).
$$

若 $k$ 取车辆每公里，$q$ 取车辆每小时，$\phi$ 就把浓度域映到流量域。选定具体的 $\phi$ 后，这行式子规定关系

$$
R_\phi=\{(k,q):q=\phi(k)\}.
$$

$R_\phi$ 收集允许的浓度—流量对。它没有描述拥堵怎样沿道路传播，也没有规定未来状态。工程师可以由 $k$ 求 $q$，由 $q$ 反求可能的 $k$，或检查一个观测对是否落在曲线上。关系本身没有预先指定计算方向。[《从模型到工程系统》](/posts/engineering-model-chain/)曾用这个例子说明静态关系也能进入工程模型链；这里继续追问它允许怎样的数学推理。[^traffic-wave]

拥堵会移动。令 $x$ 表示位置，$t$ 表示时间，$k=k(x,t)$ 表示局部浓度。取一小段道路，区间内车辆数的变化等于入口流量减去出口流量；让区间长度趋于零，并令流量服从同一个 $q=\phi(k)$，得到

$$
\partial_t k+\partial_x\phi(k)=0.
$$

$\phi$ 仍是流量—浓度函数，此时充当通量函数。方程约束的对象已经变成时空场 $k(x,t)$。道路区间、初始浓度、边界流入和解概念共同确定允许的演化；缺少这些条件时，一行偏微分方程可能对应多个候选解。[^traffic-wave]

两个写法共享 $\phi$，保存的数学信息已经改变。构成关系保存浓度与流量的静态对应，守恒模型保存时空演化。沿着同一条道路换一个问题，还会得到概率状态转移核，或者带可行域和目标函数的控制问题。

![同一段拥挤道路因问题不同，被写成流量浓度静态关系、守恒偏微分方程、概率状态转移核和控制优化问题。](./inside-the-model/one-road-many-models.zh.svg)

*图 1　同一段道路上的四种建模对象，分别保存静态关系、时空演化、状态转移概率和控制选择。图片可点击放大。*

道路没有变，两个写法甚至共享同一个 $\phi$，保存的对象和查询已经不同。模型身份还取决于符号的类型、呈现取得何种数学语义，以及比较时准备观察什么。

## 一只水箱把层次显出来

一只横截面积恒定的水箱可以写成两套方程。设横截面积 $A>0$，流入和流出分别为 $q_{\mathrm{in}}$ 与 $q_{\mathrm{out}}$。第一套用液位 $h$ 作状态，第二套记录体积 $V$；点号表示对时间求导，$y$ 是外露输出：

$$
\dot h=\frac{q_{\mathrm{in}}-q_{\mathrm{out}}}{A},
\qquad y=h,
$$

$$
\dot V=q_{\mathrm{in}}-q_{\mathrm{out}},
\qquad y=\frac{V}{A}.
$$

读这两套式子时，我们已经在使用一组未写出的规则。$h$ 是长度，$V$ 是体积，$q_{\mathrm{in}}$ 和 $q_{\mathrm{out}}$ 是体积流量，$t$ 是时间，$y$ 是外露输出。这些对象、值域、单位和角色组成有类型签名，记作 $\Sigma$。签名决定哪些表达式写得通，也迫使单位换算和端口适配显式出现。

方程本身是形式呈现 $p$。它可以是一组等式、一张图、一组约束或一个程序式规则。呈现经过解释后，才得到允许的关系、解轨迹、概率测度、排序或执行。用 $\tau$ 标记这类数学对象的种类，可以把一份规格及其语义写成

$$
\mathsf{Spec}=(\Sigma,p),
\qquad
\mathsf{Sem}=\llbracket p\rrbracket_{\tau,\Sigma},
\qquad
\mathcal M=(\mathsf{Spec},\mathsf{Sem}).
$$

在水箱中，$\tau$ 是连续时间轨迹语义，$\mathsf{Sem}$ 是满足方程、初值条件和输入约定的轨迹族。对静态道路关系，$\tau$ 可以是关系；对概率程序，它可以是概率核；对优化问题，它要保存可行集、排序和值。下文用 $\mathcal M$ 表示包含呈现来源的解释后规格包，用 $M:=\mathsf{Sem}$ 表示进入实现、部署和经验表征关系的狭义语义对象。$\llbracket-\rrbracket_{\tau,\Sigma}$ 是针对已选建模语言的元层解释记号，规定合法呈现怎样取得相应类型的语义。

模型论把同一层关系写得更细。形式结构 $\mathbf A$ 为签名中的符号指定数学对象，变量赋值 $g$ 再为自由变量取值；$\mathbf A,g\models_\Sigma\varphi$ 表示公式 $\varphi$ 在这套结构和赋值中成立。一组句子 $T$ 可能允许多个互不同构的结构，其语义可以写成 $\operatorname{Mod}_\Sigma(T)=\{\mathbf A:\mathbf A\models_\Sigma T\}$。Institution theory 把签名、句子、模型和满足关系分开，并要求换签名时满足关系与翻译相容。这项分层纪律让道路方程、概率核和神经网络仍在各自的语义域中解释。[^institution]

参数把具体实例组织成模型族。若参数空间 $\Theta$ 中的 $\theta$ 索引水箱面积、交通流参数或网络权重，可以写成

$$
\mathsf{Spec}_\theta=(\Sigma,p(\theta)),
\qquad
\mathsf{Sem}_\theta=
\llbracket p(\theta)\rrbracket_{\tau,\Sigma},
\qquad
\mathcal M_\theta=(\mathsf{Spec}_\theta,\mathsf{Sem}_\theta).
$$

固定 $\theta$ 得到一个实例。在上述固定 $\Sigma$ 和 $\tau$ 的写法中，参数变化留在同一族；若参数会改变状态空间、变量类型或端口集合，签名也要改写。$\Sigma$、$p$、$\tau$ 和 $\theta$ 回答不同问题，不能当作几列互相独立的元数据。

![建模形式系统规定签名、合法呈现、语义类型和解释规则；参数化形式呈现族经形式解释形成解释后的模型族与语义实例，观察映射再保留选定行为；经验表征位于模型边界之外。](./inside-the-model/model-semantic-stack.zh.svg)

*图 2　有类型的形式呈现经解释得到语义对象；观察映射从中提取比较所需的行为。建模规则位于元层，模型与现实的联系由外部关系建立。*

第一篇把 $M$ 当作工程关系链中的狭义语义对象，追踪它怎样被实现、部署和资格化。这里提高分辨率，追踪 $M$ 怎样由签名、呈现和语义类型产生，并用 $\mathcal M$ 保存这份形式来源。符号怎样对应一段真实道路，暂时留在模型边界之外。[^formal-empirical]

## 观察会保留什么

回到水箱。只要初值满足 $V_0=Ah_0$，两套方程接收相同的流量信号，就会生成同一条液位曲线。可逆变换

$$
\Psi:h\longmapsto Ah=V
$$

把第一套方程的解轨迹送到第二套，逆变换 $\Psi^{-1}(V)=V/A$ 又把它送回来。两边在外部变量上都满足 $A\dot y=q_{\mathrm{in}}-q_{\mathrm{out}}$。这项对应覆盖允许的初值和输入轨迹，比两次仿真在几个采样点上重合强得多。

工程师经常只比较指定端口上的行为。观察规格 $v$ 要先声明外露变量、单位、时间尺度、允许的输入与初值，以及准备提出的查询。$\operatorname{Sem}_{\tau_i}(\Sigma_i)$ 表示签名 $\Sigma_i$ 上、语义类型为 $\tau_i$ 的完整语义对象类；$\Omega_{v,i}$ 把其中一个对象送到观察对象空间 $\operatorname{Obs}_v$，动态系统中通常得到一组外露轨迹。若两个模型使用不同签名或坐标，就分别把它们送入同一观察空间：

$$
\Omega_{v,i}:
\operatorname{Sem}_{\tau_i}(\Sigma_i)
\longrightarrow\operatorname{Obs}_v,
\qquad i\in\{1,2\}.
$$

相对于 $v$ 的行为等价为

$$
\mathcal M_1\equiv_v\mathcal M_2
\quad\Longleftrightarrow\quad
\Omega_{v,1}(\mathsf{Sem}_1)
=
\Omega_{v,2}(\mathsf{Sem}_2).
$$

水箱案例的 $v$ 把 $(q_{\mathrm{in}},q_{\mathrm{out}})$ 作为输入，把液位 $y$ 作为输出。两个观察像都是允许的 $(q_{\mathrm{in}},q_{\mathrm{out}},y)$ 轨迹集合，因此行为等价。行为方法正是从外露轨迹研究开放动态系统，内部状态可以采用不同实现。[^behavior]

![同一水箱分别使用液位和体积作为内部状态，两种实现经观察映射得到相同外部关系；下方并列文本相同、结构同构、同属一类、行为等价和用途可替换五种不构成等级的判据。](./inside-the-model/behavior-realization-identity.zh.svg)

*图 3　液位与体积两种状态呈现经观察映射得到同一边界行为；下方的身份判据回答不同问题。*

“同一个模型”可以指向多种保持关系：

| 比较对象 | 声明保持的内容 |
|---|---|
| 文件或形式呈现 | 字节、解析后的方程、图或规则 |
| 形式语义 | 同一语义域中的关系、测度、排序或执行系统 |
| 形式结构 | 重命名或声明的可逆结构变换下同构 |
| 理论类 | 都属于同一组公理或宽松规格所允许的模型类 |
| 外部行为 | 经各自观察映射进入共同空间后相同 |
| 近似模型 | 给定域、观察量和误差界内接近 |
| 应用任务 | 对指定决策和阈值可替换 |
| 表征案例 | 主体、现实目标、用途及经验桥接关系保持 |

团队在比较完成后缩小输入域，或删去不一致的输出，可以把原有差异藏起来。观察规格必须先于比较确定。有限测试只覆盖已经运行的样本；行为等价覆盖的是声明域中的全部观察像。

近似判断还要记录度量、容差和用途阈值。若相邻两次替换各引入至多 $\varepsilon$ 的误差，组合误差可能达到 $2\varepsilon$；上下文还会放大或抑制误差。[《模型怎样成为组件》](/posts/model-as-open-component/)进一步量化允许的布线、环境假设和反馈，讨论上下文可替换。这里的 $\equiv_v$ 只处理固定观察边界下的模型行为。

水箱面积 $A$ 的位置也可据此辨认。固定在方程中的 $A$ 改变了允许的液位轨迹，属于模型实例；用于估计 $A$ 的尺子读数属于构造证据；一次运行给定的流入曲线是接口输入，从轨迹族中选出一条。参数、数据和输入的名字不能替它们决定边界。

## 三种回不去的压缩

观察映射是一种有目的的压缩，只保留当前查询需要的信息。恢复原来的语义对象还需要被舍去的概率权重、方案排序或生成结构。概率、优化和因果模型分别给出三个清楚的例子。取有限离散结果空间 $\mathcal Y$、决策空间 $\mathcal X$；优化问题中的 $\mathcal F\subseteq\mathcal X$ 是可行集，$J$ 是目标函数。令 $\mathcal X_{\mathcal V}$ 表示内生变量集 $\mathcal V$ 的联合值空间，并把因果模型限于能够唯一诱导观察分布的良定结构，可以写出

$$
\begin{aligned}
\operatorname{forget}_{\mathrm{prob}}&:
\operatorname{Prob}(\mathcal Y)\to2^{\mathcal Y},
&\mu&\longmapsto\operatorname{supp}(\mu),\\
\operatorname{forget}_{\mathrm{opt}}&:
\operatorname{Opt}(\mathcal X)\to2^{\mathcal X},
&(\mathcal F,J)&\longmapsto
\operatorname*{argmin}_{x\in\mathcal F}J(x),\\
\operatorname{forget}_{\mathrm{causal}}&:
\operatorname{SCM}(\mathcal V)\to
\operatorname{Prob}(\mathcal X_{\mathcal V}),
&M&\longmapsto P_M^{\mathrm{obs}}.
\end{aligned}
$$

三张映射通常都不是单射。不同语义对象经过压缩后可能落到同一个结果。

先看 Bernoulli 模型。对 $N$ 次独立同分布的二元观测，结果空间为 $\mathcal Y=\{0,1\}^N$。取 $\theta_1=0.2$ 与 $\theta_2=0.8$，两者的支持集都是整个 $\mathcal Y$，每一种有限二元序列都具有正概率；连续 $N$ 次成功的概率分别为 $0.2^N$ 与 $0.8^N$。可能结果集合已经相同，事件权重随 $N$ 增大可相差多个数量级。[^bernoulli]

优化模型会在只保存最优解时丢掉排序。设可行方案为 $a,b,c$，两个目标都把 $a$ 作为唯一最优解，同时满足

$$
J_1(a)=J_2(a)=0,
\qquad
0<J_1(b)<J_1(c),
\qquad
0<J_2(c)<J_2(b).
$$

若 $a$ 因道路封闭或新约束退出可行集，第一个目标选 $b$，第二个选 $c$。同一个 `argmin` 没有保存其余方案的次序；研究近优性、灵敏度或约束变化时，还需要目标值与可行域。[^optimization]

因果模型的差异藏在干预中。令外生变量 $\epsilon_X,\epsilon_Y$ 独立服从 $\mathcal N(0,1)$，$\eta_Y\sim\mathcal N(0,2)$、$\eta_X\sim\mathcal N(0,\tfrac12)$ 且彼此独立。考虑

$$
\begin{aligned}
M_{\rightarrow}:&\quad X=\epsilon_X,\qquad Y=X+\epsilon_Y,\\
M_{\leftarrow}:&\quad Y=\eta_Y,\qquad X=\tfrac12Y+\eta_X.
\end{aligned}
$$

这两组外生变量使两个模型诱导同一个零均值联合高斯观察分布，协方差矩阵都是 $\left(\begin{smallmatrix}1&1\\1&2\end{smallmatrix}\right)$。对任意 $x_0\in\mathbb R$，干预 $\operatorname{do}(X=x_0)$ 后分别得到

$$
\mathbb E_{M_{\rightarrow}}[Y\mid\operatorname{do}(X=x_0)]=x_0,
\qquad
\mathbb E_{M_{\leftarrow}}[Y\mid\operatorname{do}(X=x_0)]=0.
$$

即使这个观察分布已被任意精确地知道，在没有干预、时序信息或结构假设时，这两个模型仍无法区分。代数移项不能反转干预时被替换的机制。[^scm]

![六个全宽卡片分别展示关系、解与执行、概率权重、优化排序、因果查询和 agent—环境闭环语义，说明不同模型类型必须保留不同信息。](./inside-the-model/semantic-kinds-stress-test.zh.svg)

*图 4　不同语义类型各有原生结构：概率模型保存权重，优化模型保存可行域与排序，因果模型保存干预查询，动态与开放系统保存执行和闭环。*

这些反例把共同结构限定在有类型的呈现—语义关系上。计算实现接手某个语义对象后，还要证明它保存了当前观察边界中的结果。

## 网格、求解器与环境何时改变模型

Neural ODE 把实现边界带进训练过程。令 $z(t)$ 为连续状态，$f_\theta$ 为参数化向量场；算法 $\Phi$ 使用步长 $h$ 和求解配置 $r$，从 $t_n$ 时刻的近似状态 $\hat z_n$ 计算下一步：

$$
\dot z(t)=f_\theta(z(t),t),
\qquad
\hat z_{n+1}=\Phi_{h,r}(t_n,\hat z_n;f_\theta),
$$

其中 $h$ 是步长，$r$ 记录算法与容差。固定 $f_{\hat\theta}$ 后，若减小步长或收紧容差使不同合格算法收敛到同一个连续解，积分器带来的偏差属于实现误差。训练时，网络参数会反过来补偿积分器的截断误差。Zhu 等人以逆修正微分方程分析了这种耦合：特定求解器参与训练后，学到的向量场可能随之改变。[^neural-ode-solver]

设精化路径 $r_m$ 产生计算制品 $C_{r_m}$，例如令步长 $h_m\to0$ 并收紧容差。$\llbracket C_{r_m}\rrbracket_{\mathrm{run}}$ 表示制品的运行语义，例如可执行轨迹集；$\Omega_{v,r_m}$ 与 $\Omega_{v,\mathcal M}$ 分别把运行语义和模型语义送入同一观察空间。当该空间带有数值距离 $d_v$ 时，一项典型的实现主张写成

$$
d_v\!\left(
\Omega_{v,r_m}(\llbracket C_{r_m}\rrbracket_{\mathrm{run}}),
\Omega_{v,\mathcal M}(\mathsf{Sem})
\right)\longrightarrow0,
\qquad m\to\infty.
$$

$v$ 声明输入域、外露变量和时间基；证据还要说明该极限对允许输入和初值逐点成立，还是在声明域上一致成立。关系型时序语义不使用“距离趋零”。以轨迹集为例，定义 $X\preceq_v Y$ 表示 $X$ 中每一条观察行为都被 $Y$ 允许，即左侧精化右侧；此时写成

$$
\Omega_{v,r}(\llbracket C_r\rrbracket_{\mathrm{run}})
\preceq_v
\Omega_{v,\mathcal M}(\mathsf{Sem}).
$$

各条合格精化路径指向同一观察语义时，网格和算法可以留在计算制品中。若规格有意允许多种轨迹，实现选中其中一种可以构成精化；只有当前用途要求唯一输出或不同实现可替换时，解选择规则才需要写回模型呈现。

神经算子把目标放在从输入函数空间 $\mathcal A$ 到输出函数空间 $\mathcal U$ 的映射 $\mathcal G^\dagger:\mathcal A\to\mathcal U$ 上，程序则通过网格或基函数读取输入。固定参数、声明离散精化路径并控制重构误差以后，换网格主要改变计算制品；训练分布仍决定哪些输入获得证据覆盖。离散化不变性需要由架构和逼近关系建立，名称本身不给出保证。[^neural-operator]

PINN 把目标 PDE、有限配点损失和训练后的函数放得更近。目标 PDE 与边界条件是否属于形式呈现，取决于规格是否声明它们。函数构造可以精确实现已声明的边界条件；有限配点惩罚只是计算判据，低训练损失只覆盖所选配点与权重。连续域误差及其与目标解的距离仍需误差估计或收敛论证。[^pinn]

同一个判断也适用于运行时反馈。Game of Life 的局部规则若同步提交，会诱导全局转移 $F_{\mathrm{sync}}$；逐格异步更新通常得到另一个转移。调度改变允许的时空轨迹时，它就在模型语义内。[^abm-schedule]

ReAct 一类 agent 还要接收环境观察、更新上下文、调用工具并决定何时停止。把基础策略参数记作 $\theta$，把记忆更新、工具协议、错误处理与停止条件组成的运行协议记作 $\gamma$，二者共同定义 $A_{\theta,\gamma}$；形式环境的转移规则记作 $E$，闭环对象为

$$
\operatorname{Close}(A_{\theta,\gamma},E).
$$

同一组基础权重接上不同工具协议或停止条件，会形成不同 agent；同一个 agent 接入不同形式环境，又会形成不同闭环。真实 API 和现场并不等同于 $E$，工程师需要从运行世界中抽取可分析的转移关系。一次工具返回是运行观测，缓存、超时和并发调度若会改变允许轨迹，则进入闭环规格。[^react]

网格和求解器沿声明的精化路径保持观察语义时，属于计算制品；调度、工具协议或环境转移改变允许轨迹时，比较对象已经换成新的模型或闭环。[第三篇](/posts/model-as-open-component/)将继续固定接口和上下文。形式闭环确定以后，还剩它怎样指向真实道路或 API。

## 数学结构怎样指向现实

道路上的 $k$ 需要测量和聚合。研究者要说明按单车道还是整段道路计数，空间窗口多长，时间戳怎样对齐，检测器漏检如何处理。$q$ 也依赖计数区间与单位。原始交通过程经过传感、筛选和聚合形成记录，研究团队再把记录构造成能与模型输出比较的数据对象。

形式语义只能处理已经给定的符号和结构。$\mathbf A\models_\Sigma T$ 表示结构 $\mathbf A$ 满足理论 $T$；它没有指定 $\mathbf A$ 对应哪条高速公路，也没有给出接受一项经验断言的误差标准。Tarski 对形式满足的讨论与 Suppes 对理论、结构和数据模型的区分，正好划出这道边界。[^formal-empirical]

Hughes 用 denotation、demonstration、interpretation 区分指称、模型内推演和经验回译。Giere 又把使用模型的主体和用途写入表征关系。令 $a$ 为使用模型的研究共同体或运行机构，$M$ 为狭义语义对象，$W$ 为参照系统，$P$ 为用途，$\rho$ 为经验桥接包。一个经验表征案例可以记作

$$
\operatorname{Rep}(a,M,W,P;\rho).
$$

若参数化的解释后规格包是 $\mathcal M_\theta=(\mathsf{Spec}_\theta,\mathsf{Sem}_\theta)$，这里的 $M=\mathsf{Sem}_\theta$。桥接包 $\rho$ 记录三类工作：模型符号指向现实中的哪些对象，测量与聚合怎样形成可比较的量，模型内结果怎样回译成关于 $W$ 的主张。$\rho$ 是这组三篇文章处理经验指称时采用的最高分辨率；第一篇中的模型节点 $M$ 不再把这些桥接关系收进自身。[^ddi][^representation]

若模型给出预测对象 $\widehat Z$，传感和处理产生数据对象 $Z$，$\rho$ 要把二者送到同一观察尺度，再选择误差、覆盖或精化关系。概率预测要比较分布，集合值模型要检查覆盖。因果查询若涉及干预，$Z$ 必须来自相应的干预设计，或者 $\rho$ 必须记录把观察数据连接到干预目标的识别假设。

![主体为用途选择参照系统和模型。模型内部由形式呈现得到语义结构并完成推演；外部通过指称和经验回译连接现实，观测数据与模型预测在共同观察量上比较。](./inside-the-model/model-world-two-bridges.zh.svg)

*图 5　形式解释在模型内部给符号确定数学含义；$\rho$ 在外部建立指称、操作定义和经验回译，使模型结果与观测数据进入共同尺度。*

Lighthill 与 Whitham 的构成关系面向大量车辆和足够长的拥挤道路。[^traffic-wave] 研究者用它分析宏观拥堵波时，$\rho$ 指定密度、流量、道路范围与时间尺度，守恒模型再推演波的传播。若任务换成判断一辆车在通信延迟下能否安全制动，原签名里没有单车状态、执行器和通信过程；那项安全主张找不到从当前模型通向现实的桥。

下次说“模型没有变”时，先补全这句话：比较的是哪两个对象，要求保持哪种语义，观察域和用途是什么，它们又通过哪一组 $\rho$ 指向现实。这组限定会把答案定位到方程、代码、组件或工程关系中的具体一处。

---

[^traffic-wave]: M. J. Lighthill and G. B. Whitham, “[On Kinematic Waves II: A Theory of Traffic Flow on Long Crowded Roads](https://doi.org/10.1098/rspa.1955.0089),” *Proceedings of the Royal Society A* 229, 1955，Abstract、Sections 1–2、eqs. (1)–(7)；P. I. Richards, “[Shock Waves on the Highway](https://doi.org/10.1287/opre.4.1.42),” *Operations Research* 4(1), 1956, pp. 43–44, eqs. (4)–(6)。前者给出流量—浓度假设、适用尺度及当时定性的经验比较，后者直接写出交通守恒 PDE。

[^institution]: Joseph Goguen and Rod Burstall, “[Institutions: Abstract Model Theory for Specification and Programming](https://doi.org/10.1145/147508.147524),” *Journal of the ACM* 39(1), 1992, pp. 101–103, Definitions 1–2；pp. 112–113。

[^formal-empirical]: Alfred Tarski, “[The Semantic Conception of Truth and the Foundations of Semantics](https://doi.org/10.2307/2102968),” 1944, p. 345、pp. 361–362；Patrick Suppes, “[A Comparison of the Meaning and Uses of Models in Mathematics and the Empirical Sciences](https://web.stanford.edu/group/csli-suppes/techreports/IMSSS_33.pdf),” 1960, pp. 289–291、297–300。

[^behavior]: Jan C. Willems, “[The Behavioral Approach to Open and Interconnected Systems](https://doi.org/10.1109/MCS.2007.906923),” *IEEE Control Systems Magazine* 27(6), 2007, pp. 51–53、63–64、70–72。

[^bernoulli]: Bob Carpenter et al., “[Stan: A Probabilistic Programming Language](https://www.jstatsoft.org/article/view/v076i01),” *Journal of Statistical Software* 76(1), 2017, Section 2.1, pp. 2–3。

[^optimization]: Stephen Boyd and Lieven Vandenberghe, *[Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)*, 2004, Section 4.1, eq. (4.1), pp. 127–129；问题与求解方法的区分见 Section 1.1.2, pp. 4–5。

[^scm]: Judea Pearl, “[Causal Inference in Statistics: An Overview](https://doi.org/10.1214/09-SS057),” *Statistics Surveys* 3, 2009, Section 2.2, pp. 98–101；Sections 3.1–3.2.1, pp. 103–108, eqs. (1)–(7)；Definition 2, p. 109。

[^neural-ode-solver]: Aiqing Zhu et al., “[On Numerical Integration in Neural Ordinary Differential Equations](https://proceedings.mlr.press/v162/zhu22f.html),” *ICML 2022*, Abstract, Section 2.1 and Sections 3.1–3.3, especially Theorems 3.1–3.2。

[^neural-operator]: Nikola Kovachki et al., “[Neural Operator: Learning Maps Between Function Spaces with Applications to PDEs](https://www.jmlr.org/papers/v24/21-1524.html),” *Journal of Machine Learning Research* 24, 2023, Sections 2.1–2.3, especially Definition 4；误差分解见 Section 3, pp. 11–12。

[^pinn]: Maziar Raissi, Paris Perdikaris and George Karniadakis, “[Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations](https://doi.org/10.1016/j.jcp.2018.10.045),” *Journal of Computational Physics* 378, 2019, Sections 2.1–2.2；Aditi Krishnapriyan et al., “[Characterizing Possible Failure Modes in Physics-Informed Neural Networks](https://proceedings.neurips.cc/paper_files/paper/2021/hash/df438e5206f31600e6ae4af72f2725f1-Abstract.html),” *NeurIPS 2021*, Sections 3–4.1。

[^abm-schedule]: Volker Grimm et al., “[A Standard Protocol for Describing Individual-Based and Agent-Based Models](https://doi.org/10.1016/j.ecolmodel.2006.04.023),” *Ecological Modelling* 198, 2006, Sections 2.1–2.7, especially Section 2.3, pp. 118–119；Uri Wilensky, “[NetLogo Life model](https://ccl.northwestern.edu/netlogo/models/Life),” 1998, HOW IT WORKS。

[^react]: Shunyu Yao et al., “[ReAct: Synergizing Reasoning and Acting in Language Models](https://openreview.net/forum?id=WE_vluYUL-X),” *ICLR 2023*, Section 2, p. 3；Sections 3.1–3.2, pp. 4–5。

[^ddi]: R. I. G. Hughes, “[Models and Representation](https://doi.org/10.1086/392611),” *Philosophy of Science* 64, 1997, pp. S329、S333、S335。

[^representation]: Ronald Giere, “[How Models Are Used to Represent Reality](https://doi.org/10.1086/425063),” *Philosophy of Science* 71, 2004, p. 743、pp. 747–750。
