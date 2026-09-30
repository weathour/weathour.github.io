---
title: "Models and Engineering · III | What a Model Retains: Presentation, Semantics, and Observation"
postSlug: inside-the-model
published: 2026-08-21
updated: 2026-09-30
image: './inside-the-model/cover-2026.webp'
description: "Invertible coordinates, hidden-unit permutations, probability support, and causal intervention distinguish presentation, semantics, and observation—and what identical answers preserve."
tags: ["mathematical models", "formal semantics", "neural networks", "probability", "causal models"]
category: Engineering Practice
draft: false
lang: en
---

Water in a tank can be measured by height or volume. With fixed cross-sectional area $A>0$, the relation is $V=Ah$. Height and volume equations look different, yet with corresponding initial conditions their processes can correspond one to one.

Calling models “the same” whenever they give the same results leaves a question: which results? Two probability models may both allow zero and one but assign different probabilities to one. Two causal models can even give identical observational distributions and different answers to an intervention.

To examine the inside of a model, follow these differences. How an equation is written is one layer. The objects and relations it specifies are another. The information extracted to answer a question is a third. These layers connect, sometimes losing information along the way.

## How Processes Correspond Across Expressions

Use the fixed-area tank from the [previous essay](/en/posts/from-observation-to-model/), fixing area, flows, and measurement grounds. Write the outflow relation generally as $F(h)$ to examine a change of variables. In height coordinates,

$$
\frac{dh}{dt}=\frac{q_{\mathrm{in}}(t)-F(h)}A,
\qquad h(0)=h_0.
$$

Substituting $V=Ah$ gives

$$
\frac{dV}{dt}=q_{\mathrm{in}}(t)-F(V/A),
\qquad V(0)=Ah_0.
$$

The initial condition changes too. Altering the variable name and right-hand side while feeding the old height value into the volume model would leave the conversion incomplete. Units and initial values must correspond.

Fix the same time interval and input process. Multiplying any differentiable height trajectory satisfying the first equation by $A$ yields a volume trajectory satisfying the second. Dividing a trajectory of the second by $A$ recovers one of the first. Because $A>0$, the map is reversible and preserves nonnegativity. The trajectory families correspond throughout the equations' applicable interval.

This is stronger than visually similar curves: it supplies a map and its inverse. To ask whether height exceeds $H$, compare volume with $AH$; to ask stored volume in height coordinates, take $Ah$. The question must transform with the expression for answers to match.

Different-looking equations may therefore describe corresponding processes. Units, equation arrangements, and other reversible coordinates may also change. Preservation must be established through a relation; naming a change of variables does not supply it.

## An Equals Sign Does Not Exhaust Meaning

The tank equation specifies more than a number at an instant: it specifies allowed trajectories under chosen inputs, initial conditions, and state ranges. Equations, variable domains, and initial conditions form its mathematical presentation. The trajectories those conditions permit form its semantics in this example.

One expression can have different semantics. Over the reals, $x^2=1$ defines $\{-1,1\}$; restricting $x$ to nonnegative reals leaves $\{1\}$. The equality is unchanged but the answer changes with the domain. Continuous or discrete time, nonnegative volume or signed deviation, and fixed or variable initial conditions similarly help specify a dynamical object.

Conversely, one object can have different presentations. Over the reals, $x^2=1$ and $(x-1)(x+1)=0$ define the same solution set. Height and volume equations define corresponding trajectory sets through an invertible map. Distinguishing presentation and semantics identifies conditions that must be explicit and supports comparison after rewriting.

Computation attempts to obtain the result for given conditions. A solver produces an approximate curve for a particular inflow and initial state; another inflow may yield another curve. Changes in input, parameters, or solution procedure can all produce “a different result,” through different causes. Immediately attributing result differences to a changed model can misidentify the objects under comparison.

## Different Network Parameters Can Define the Same Function

In learned models, the distinction appears between parameters and functions. Take a fully connected network with one hidden layer:

$$
f_\theta(x)=W_2\sigma(W_1x+b_1)+b_2,
$$

Here $x\in\mathbb R^d$, there are $m$ hidden units, $W_1\in\mathbb R^{m\times d}$, $b_1\in\mathbb R^m$, $W_2\in\mathbb R^{r\times m}$, and $b_2\in\mathbb R^r$. The same activation $\sigma$ acts on each coordinate.

Reorder the hidden units with an $m\times m$ permutation matrix $P$, transforming adjacent weights and biases together:

$$
W'_1=PW_1,\qquad b'_1=Pb_1,
\qquad W'_2=W_2P^{-1},\qquad b'_2=b_2.
$$

Coordinatewise activation satisfies $\sigma(Pz)=P\sigma(z)$, so substitution yields

$$
f_{\theta'}(x)
=W_2P^{-1}\sigma\bigl(P(W_1x+b_1)\bigr)+b_2
=f_\theta(x).
$$

Parameters and hidden coordinates are reordered, while the entire input-output function stays fixed. Comparing parameter files or identically numbered units records a change; comparing function values on every input records none. This construction follows from the network structure without inspecting training data.

Its meaning has limits. Equal functions do not establish equal future trajectories under a training algorithm. Inserting an operation at a numbered hidden unit requires rechecking the equivalence. Whether another architecture admits this reordering depends on its connections and operations. This proof uses coordinatewise activation and transformation of weights on both sides.

Model identity can therefore refer to several things: unchanged architecture, parameters, input-output function, or outputs on current data. These comparisons are related but do not replace each other. Agreement on several samples need not imply equal functions everywhere; equal functions everywhere need not imply identical parameters.

## Equal Possible Values Do Not Preserve Equal Probabilities

Height-volume conversion and hidden-unit permutation supply reversible correspondences. Other operations discard information. For a binary outcome $Y\in\{0,1\}$, let $\theta\in[0,1]$ be the probability of one:

$$
\mathbb P_\theta(Y=1)=\theta,
\qquad \mathbb P_\theta(Y=0)=1-\theta.
$$

At either $\theta=0.2$ or $0.8$, both outcomes have positive probability. Retaining only possible values gives $\{0,1\}$ in both cases. Asking the probability of one gives different answers. The possible-value set has lost weights.

For $N\ge1$ independent identically distributed outcomes, every binary sequence is possible under both models. The all-ones event has probabilities $0.2^N$ and $0.8^N$.[^bernoulli] Their ratio is $4^N$, growing rapidly with $N$. A judgment about failure probability needs precisely the weights discarded by a list of possible failures.

On this finite space, taking distributional support collects every positive-probability outcome into a set. It can answer whether an outcome is possible, but cannot recover the distribution. Many distributions share that support, so the compressed object cannot answer weighting questions.

Probabilistic semantics must retain a distribution rather than become uniformly an unweighted behavior set. For a network's class probabilities, the largest class and the full vector serve different purposes. Two vectors may select the same class with different probabilities. Reducing the vector to a class preserves the selection and loses both other weights and the probability assigned to the selected class.

## Equal Observational Distributions Can Answer Interventions Differently

A full observational distribution may still omit structure needed for another question. Construct two linear causal models. The first uses $X$ in generating $Y$:

$$
M_1:\qquad X=\varepsilon_X,\qquad
Y=X+\varepsilon_Y,
$$

The independent variables $\varepsilon_X,\varepsilon_Y$ are both normal with mean zero and variance one. The second uses $Y$ in generating $X$:

$$
M_2:\qquad Y=\eta_Y,\qquad
X=\tfrac12Y+\eta_X,
$$

Here $\eta_Y\sim\mathcal N(0,2)$ and $\eta_X\sim\mathcal N(0,\tfrac12)$ are independent. Each model has its own exogenous variables, and the second normal-distribution parameter denotes variance.

In the first model, $X$ has variance one, $Y$ variance two, and their covariance is one. In the second, $Y$ has variance two, $X$ variance $(1/2)^2\cdot2+1/2=1$, and covariance $(1/2)\cdot2=1$. Both therefore induce the same zero-mean joint Gaussian distribution, with covariance

$$
\begin{pmatrix}1&1\\1&2\end{pmatrix}.
$$

Observing $(X,Y)$ cannot distinguish these models, even with arbitrarily precise knowledge of that distribution. Now externally fix $X$ at $x_0$: what happens to $Y$? In a structural causal model, this intervention replaces the equation generating $X$ with $X=x_0$ and leaves the other mechanisms intact.[^scm]

In $M_1$, $Y=x_0+\varepsilon_Y$ still holds, giving mean $x_0$. In $M_2$, $Y=\eta_Y$ remains unchanged, giving mean zero:

$$
\mathbb E_{M_1}[Y\mid\operatorname{do}(X=x_0)]=x_0,
\qquad
\mathbb E_{M_2}[Y\mid\operatorname{do}(X=x_0)]=0.
$$

At $x_0\ne0$ the answers differ. Equal observational distributions do not give equal intervention distributions. Rearranging $Y=X+\varepsilon_Y$ as $X=Y-\varepsilon_Y$ does not produce the second structural model: the new error term has a different relation to $Y$, and algebraic rearrangement does not determine which generating mechanism an intervention replaces.

The example exposes a deeper loss of information. Observational distributions answer questions about observed-event probabilities. Changing a generating mechanism requires structural assumptions, intervention information, or other grounds for identifying causal direction. Whether these observationally identical models count as the same depends on whether interventions are among the questions.

## What Observation Brings into View

The comparisons can now be joined. Height and volume differ in expression yet correspond through a reversible map. A probability distribution reduced to support loses event weights. Causal structure reduced to an observational distribution loses answers to some interventions. Each comparison must identify what is extracted rather than call everything an output.

Call this extraction observation: taking from the model's objects the information currently of interest. It may be a full height trajectory or a few samples, a distribution or an argmax class, an intervention distribution or naturally occurring joint records.

First fix the input and query range. Models giving identical observed information on those questions may be called equivalent relative to that observation. The judgment extends only as far as the information retained. Curves may agree at sparse samples and differ between them; probability vectors may share the largest class and differ in weights; structural models may share a joint observational distribution and differ under intervention. The constructions establish the latter two explicitly.

Equivalence relative to observation has practical content. If a use needs only function values over a specified input domain, hidden-unit numbering may not matter. Continued training or operations on internal units require more structure. An observation boundary makes the comparison definite and allows compressed information to return when needed.

The [next essay](/en/posts/model-transformations/) turns comparison into a computational choice: after replacing continuous drainage with a recurrence, can nonnegative volume, decay, and accuracy all survive? Approximate correspondence will require a different proof from the complete recoverability supplied by invertible coordinates here.

---

**Models and Engineering: the six core essays**

1. [How Mathematics Forms Problems](/en/posts/mathematical-language-and-problems/)
2. [How a Tank Becomes a Model](/en/posts/from-observation-to-model/)
3. [What a Model Retains](/en/posts/inside-the-model/)
4. [Which Conclusions Survive a Model Change?](/en/posts/model-transformations/)
5. [How a Model Becomes a Component](/en/posts/model-as-open-component/)
6. [From Models to Engineering Judgment](/en/posts/engineering-model-chain/)

[^bernoulli]: Bob Carpenter et al., *Stan: A Probabilistic Programming Language*, 2017, §2.1, pp.2–3, provides a standard independent Bernoulli formulation. The support and event-probability comparison at $0.2$ and $0.8$ is constructed from it here. [Paper](https://www.jstatsoft.org/article/view/v076i01).

[^scm]: Judea Pearl, *Causal Inference in Statistics: An Overview*, 2009, §3.2.1, pp.107–108, equations (6)–(7), describes intervention by replacing generating equations. The two linear Gaussian models, covariance calculation, and intervention means are constructed here. [Author PDF](https://ftp.cs.ucla.edu/pub/stat_ser/r350.pdf).
