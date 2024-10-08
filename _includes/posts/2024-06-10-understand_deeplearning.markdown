---
layout:     post
title:      "理解深度学习（一）"
subtitle:   "Introduction"
date:       2024-06-10 12:00:00
author:     "Weathour"
header-img: "img/control-engineering.png"
catalog: true
tags:
    - 笔记
    - 深度学习
mathjax: true
---

这个系列是阅读Simon J.D. Prince的Understanding Deep Learning。

整体上就是照搬原文，但是不会逐句翻译。



<p id = "build"></p>

# 介绍

Artificial Intelligence，人工智能，也叫AI，是模拟智能行为的系统。 它包含了广义上的接近，基于逻辑、搜索、概率等原因。而机器学习是一个AI的子集，用数学模型和数据去做决定，这个领域现在在爆炸式成长，几乎可以等同于AI领域了。

深度神经网络是一种机器学习模型，当它被用于数据，就叫深度学习。在这篇文章写的时候，深度网络是最有力、可行性最高的机器学习模型。一般来说，翻译文本用NLP(natural language processing)算法，图像的对象检测用机器视觉系统，与数字助手交流用语言识别。以上这些应用都有深度学习的助力。

本文是要帮助读者在这个领域理解深度学习背后的法则，既没有太多的数学理论证明，也几乎没有应用的代码。目标就是去表达深度学习的想法，ideas。看完后读者可以在新的情况下应用深度学习。

机器学习方法可以粗暴分为三个类型：**监督学习**、**无监督学习**、**强化学习**。

![machine](/img/in-post/post-understand-deeplearning/1machine.png)

## 监督学习

监督学习定义了一个从输入到输出预测的地图。往后将讲输入、输出、模型本身、还有模型的训练。

### 回归和分类问题

下面图片罗列了许多的回归和分类问题，在这些例子里，输入了现实世界的句子或声音或图像之类的，然后编码成数字的向量，这些向量就是规范后的模型输入。模型通过这些输入来输出表示其真实世界预测所对应的向量。我们关注输入和输出，而把模型当作黑盒，那么模型就是一个将输入的数字向量输出为另一个数字向量的黑盒。

图中的前两个是回归问题，得出来的是一个或多个连续的数字。而后面的几个是分类问题，是在确定的离散的类别中得出预测结果。

![inandout](/img/in-post/post-understand-deeplearning/1inputandoutput.png)


### 输入

在上面的第一个房价预测输入中，是标准化的数据，没有内部结构，如果我们改变输入的顺序重新训练模型的话，预测的结果也不会有什么不同。而后面的餐厅例子里，输入的顺序就很重要了，文字的顺序改变对其所指影响很大。这些文字必须在训练模型之前就编码好，建一个词库之类的去连接这些词。在后面的音乐分类案例中，输入向量可能被规范过大小，但是维度已然很高，数字音频经常以44.1kHZ和十六比特被编码，所以一段十秒的音频一般被441000个整形组成。还有后面的图像的输入里，每个像素点被规范化为一个PGB编码。

如果考虑分子的熔点，一个分子可能有非常多的原子连接方式，那我们的输入就得把模型的几何结构和原子构成都考虑进去。

### 机器学习模型

到现在，我们是将机器学习看成是一个输入向量然后输出向量的一个黑盒子。但是这个黑盒子里面到底是什么呢？那我们考虑一个预测不同年龄孩子的身高的模型。如下图：

![inandout](/img/in-post/post-understand-deeplearning/1predictChildHeight.png)

这一个机器学习模型是一个自变量为年龄因变量为平均身高的数学等式。我们训练的数据集是橙色的点，经过训练后得到的这条青色的线就是我们的模型，然后我们输入年龄就能有相应的身高预测输出。而这个模型也正是由这些同样形式的输入输出的元组训练出来的。

### 深度神经网络

本书讨论的深度神经网络是一种非常有用的机器学习模型，它们是能够展示输入与输出非常多种关系的等式。

深度神经网络可以处理非常大量的、多种长度、乃至多种内部结构的输入。然后可以输出单或多个实数（回归问题）、多个类型（分类问题）。输出也是可以非常大、多种可变长度、拥有多种内部结构的。

### 结构化的输出



## 无监督学习


### 生成模型



### 潜在变量


### 连接监督与无监督学习



## 强化学习



### 两个案例



## 道德


