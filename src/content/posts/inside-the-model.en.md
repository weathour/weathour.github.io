---
title: "Models and Engineering · III | What Is Inside a Model: Presentation, Semantics, Observation, and Identity"
postSlug: inside-the-model
published: 2026-08-21
updated: 2026-09-30
image: './inside-the-model/cover-2026.webp'
description: "Develop typed presentations, heterogeneous semantics, and identity through constraints, dynamics, probability, optimization, causality, stateful programs, network symmetries, and structure-preserving maps."
tags: ["Mathematical models", "Semantics", "Model identity", "Neural networks"]
category: Engineering Practice
draft: false
lang: en
---

A tank can be described by level or by volume. Hidden units in a network can be rearranged while its output function stays the same. These correspondences suggest saying that the presentation has changed but the model has not. Other correspondences require separating that claim. Two probability laws can both permit zero and one while assigning different success probabilities. Two optimization problems can have the same optimum while ranking other choices oppositely. Two causal models can produce the same observational distribution and different consequences after a variable is changed.

The distinctions already belong to these objects. Their domains, permitted operations, interpretations, and retained observations all affect a judgment of sameness. An unweighted set of possible outcomes can express some relations while losing probability and intervention. Treating every model as a function may remove multiple solutions, history, and interaction. Seeing the internal content requires letting objects take mathematical forms appropriate to their relations.

The first two essays established problem formation and empirical representation. Here we keep empirical connections at their explicit addresses and enter formal objects themselves: how a presentation acquires semantics, how a family becomes an instance, how observation extracts internal content, and how identity depends on these choices. We then reconnect computation and empirical relations. Internal analysis can make those connections more precise, while the connections can also prompt internal revision.

## How an expression acquires mathematical content

Consider $x^2+1=0$. It has no real solution and two complex solutions, $i$ and $-i$. The same characters, interpreted over different domains, produce different solution sets. This is not an accidental difference in one computation. The domain changes permitted elements, interpretation of operations, and the satisfiers of the problem.

Now consider $x^2=1$. Its real solutions are $-1,1$. Writing $(x-1)(x+1)=0$ gives the same solution set under the same real interpretation. Textual identity differs while the current semantics agree. The reasoning also uses the absence of zero divisors in the reals. In the integers modulo eight, $1,3,5,7$ all square to one. Factorization remains valid, but a zero product need not have a zero factor. Carrying the real-domain inference over unchanged fails at its structural assumption, rather than at the expression's appearance.

These elementary examples separate three tasks. A presentation provides symbols and conditions to interpret. Interpretation specifies elements and operations. Reasoning uses properties of that structure. Explaining an equation therefore takes more than a line with an equals sign. Domains, parameters, variables, and satisfaction all participate in forming the object. A shared context may allow some omissions; comparison across contexts requires recovering them.

In logic, a “model” can mean a structure satisfying a theory. Group axioms, for example, admit different groups as models, each interpreting multiplication, identity, and inverse. A dynamical model usually specifies evolution, a statistical model a probability family, and an actual tank is an empirical reference apparatus. All can enter rigorous mathematical discussion; sharing a name does not make them the same referent. Satisfiers of group axioms and drainage trajectories require their own interpretations and comparisons.

Formal satisfaction and empirical validity also separate here. A function satisfying a differential equation is a formal solution under its conditions. Whether it matches an apparatus's level requires the measurement and representation relations established in the second essay. An equation can have an exact solution without covering a real outlet's low-level mechanism. An empirical predictor can perform well on specified data without recovering the apparatus's generating relations. Stating both results fully makes the remaining gap easier to locate.

## What is preserved between level and volume?

Continue with the constant-area tank. Fix $A>0$, a time interval $[0,T]$, initial level, and a shared continuous input $q(t)$. Let $F(h)$ be an outflow function specified on the nonnegative-level domain under discussion. It may be $\kappa\sqrt h$ on the preceding essay's valid interval; here we first examine correspondence under a given function. The level description is

$$
A\dot h=q(t)-F(h),\qquad h(0)=h_0.
$$

Define $V=Ah$. The volume description becomes

$$
\dot V=q(t)-F(V/A),\qquad V(0)=Ah_0.
$$

Every differentiable level solution gives $V(t)=Ah(t)$, with $\dot V=A\dot h$, satisfying the second equation. Conversely, every volume solution gives $h=V/A$, satisfying the first. The conversions are inverse maps, establishing a bijection between solution sets. Since $A>0$, $h\ge0$ corresponds to $V\ge0$, and the threshold $h\le a$ to $V\le Aa$. Initial conditions, allowed domain, and queried conditions change together with the coordinates.

This is stronger than similar-looking output curves. The correspondence covers all allowed solutions and explains how each enters the other presentation. Threshold queries follow the same map. Changing the right-hand variable while retaining the numerical value $h_0$ as the volume initial condition generally creates a different problem. Units already reveal this: meters and cubic meters are different initial-condition types, and identical numbers do not establish conversion.

Outputs must also return to a shared observation domain. The level description observes $h$ directly; the volume description can observe $V/A$. Corresponding solutions then give exactly the same level history. Observing raw coordinates instead yields meters on one side and cubic meters on the other, with no reason to demand direct equality. A structural correspondence and a shared observation together make “two descriptions of the same process” a precise judgment.

Coordinate change has conditions. For time-varying area, $\dot V=A\dot h+\dot A h$, so the constant-area derivation no longer applies unchanged. For area varying with height, correspondence must be established using $V(h)$ and its invertible range. Stating what the original map preserves also locates what to check under new conditions. Invertibility is not an automatic property of every change of variable; preservation must be calculated for the selected objects.

This introduces isomorphism. A reversible map between structured objects, with both it and its inverse preserving the specified relations, gives an isomorphism for that structure. The level-volume correspondence preserves evolution, initial conditions, nonnegative domains, and transformed queries. A different structure, such as one concerned only with the cardinality of solution sets, requires much less preservation. Calling a correspondence an isomorphism requires specifying the structure and morphisms; the word does not select them for us.

## How a typed presentation forms a semantic instance

The tank already involves time, length, volume, flow, constants, functions, and trajectories. Types and interpretation make them connect. The function $h$ maps time to length, $A$ is a fixed positive area, and $F$ maps height to flow. Thus $F(V/A)$ makes sense, while $F(V)$ need not. Matrices and vectors have analogous conditions: dimensions determine permitted products, while physical or statistical coordinate meanings determine comparison. Types organize legal operations before we ask about their results.

Let $\Sigma$ denote a typed signature retaining the kinds of objects, symbols, operations, and relations in use. For the tank it can declare $t\in[0,T]$, $h\in C^1([0,T];\mathbb R_{\ge0})$, and $A>0$, and specify domains and codomains of $q$ and $F$. Here $C^1$ means that the function and its first derivative are continuous. The signature specifies materials and legal connections. Equations, initial conditions, and further constraints form a presentation $p$. Declaring the type of $h$ does not specify evolution; the differential equation restricts allowed trajectories.

We must also choose a semantic kind $\tau$ and a corresponding semantic domain $\mathcal S_\tau$. For studying every allowed level trajectory, semantics can be the solution set satisfying $p$. For an evolution operator under a given input, we need uniqueness and an explicit domain. Probability semantics may instead concern trajectory laws or conditional kernels. The kind $\tau$ gives interpretation a definite target and reminds us that the same symbols can enter different organizations of objects.

Under specified interpretation rules, write

$$
s=\llbracket p\rrbracket\in\mathcal S_\tau.
$$

The brackets denote the result of interpreting the presentation under current rules. They presuppose rules rather than producing them. For the tank we use reals, derivatives, and equality; for a finite-state program, execution steps may define a transition relation; for a logical theory, the objects may be all structures satisfying its axioms. Selecting an interpretation appropriate to the question remains mathematical work. Compact notation cannot omit that task.

A presentation may lack conditions needed for its intended interpretation. “The next state is the equation's solution” usually does not determine a unique next state without an initial condition. A proposed density lacking nonnegativity or unit integral does not define a probability law. We can add conditions, or use a relation of allowed solutions that retains nonexistence and multiplicity. The latter change has its own benefit: questions excluded by a function description acquire a mathematical object.

Families and fixed instances occupy different positions. Let parameters range over $\Theta$, with each $\theta$ specifying $p_\theta$ and $s_\theta$, forming a family $\theta\mapsto s_\theta$. Fixing $(A,\kappa)$ selects a tank semantic instance. Fixing input and initial conditions further selects a solving problem, and uniqueness then gives a particular trajectory. Family, instance, solving conditions, and run connect through different selections; “this is the model” cannot make them interchangeable.

Parameters and inputs are distinguished according to the change under study. The preceding essay treated the fixed outlet's coefficient as a parameter and inflow history as input, allowing comparison of one apparatus under different inputs. For a controlled valve, its opening must become an input or state. Across a population of tanks, area may vary. A number fixed in one computation is not thereby a parameter in every problem. Changing the object changes the addresses of family and instance.

An observation specification $v$ states what to retain, and an observation map $\Omega_v$ extracts that content from the corresponding semantic object. A tank may be observed through a shared level trajectory. A network may be observed through its function on every input, or through predictions on a sample set. Domains, queries, aggregation, and units jointly determine comparison; precise conditions follow below. Placing observation after semantics prevents one visible output from becoming the whole internal content.

A computational realization $r$ and empirical representation $\rho$ also have places. Realization uses an algorithm and artifact to solve or execute the selected object. Representation connects the formal object to a reference world and purpose; the second essay already gave its conditions. Each may change our semantic understanding, but each still requires its own preservation relation: what code returned, what an error concerns, and where records originated. Distinguishing roles makes comparison traceable without treating eight roles as independent coordinates every model must fill.

| Role | What it distinguishes in the current question |
|---|---|
| $\tau$ | A semantic kind: solutions, evolution, laws, optimization, or others |
| $\Sigma$ | Types of objects, symbols, and legal operations |
| $p$ | A presentation of equations, rules, constraints, and conditions |
| $s=\llbracket p\rrbracket$ | The formal object obtained by the selected interpretation |
| Family and instance | What can vary and which conditions are fixed |
| $v,\Omega_v$ | Which shared observations are extracted from which object |
| $r$ | Realization used to solve or execute, and its results |
| $\rho$ | Empirical connections among formal objects, reference objects, data, and purpose |

The table brings developed relations together. Their role becomes clearer in comparisons among heterogeneous objects: the questions can be shared while semantics retain their own mathematical structures. The organization of inquiry is shared; probability laws, optimization orderings, and causal mechanisms do not become one kind of unweighted behavior set.

## Why constraints and nondeterministic behavior need relations

A function assigns one output to each input, a powerful organization that already requires single-valuedness. Many problems begin with an allowed range and then a choice. Compressing the range to a function too early may retain just one plan. The first essay's schedule works this way: a shared resource allows two orders, a scheduler selects an arrangement, and the model of allowed arrangements must retain both.

Take a relation $R\subseteq U\times Y$ with $U=Y=\mathbb R$, defined by $|y-u|\le1$. For fixed $u$, allowed outputs are $R(u)=[u-1,u+1]$. Both $f(u)=u$ and $g(u)=u+1$ select outputs permitted by the relation. Treating $f$ as its complete semantics would misclassify the other allowed output as a violation.

Relations also retain a quantifier distinction. The statement $\forall u\,\exists y:\ |y-u|\le1$ holds, allowing output to vary with input. The statement $\exists y\,\forall u:\ |y-u|\le1$ fails: one fixed output cannot cover all real inputs. Replacing “an output can always be found” with “a universal output exists” changes the formal question. Selecting a function may additionally require continuity, measurability, or causality; pointwise nonemptiness does not prove those requirements.

Relations have an explicit composition. If $R_1\subseteq U\times Z$ and $R_2\subseteq Z\times Y$, then

$$
(R_2\circ R_1)(u,y)
\quad\Longleftrightarrow\quad
\exists z:\ R_1(u,z)\ \land\ R_2(z,y).
$$

The intermediate value is hidden after satisfying both constraints. If each stage permits an error of at most one, composition permits a deviation of at most two from input to output. Conversely, every such output is realizable in this real-interval construction by choosing $z=(u+y)/2$. This establishes exact equality of relations. More complicated constraints require their own reachability and preservation checks.

Existential quantification can hide the method of making a choice. Knowing that some $z$ exists does not imply that a component seeing only currently available information can choose it in time. If validity of $z$ depends on future input, a complete-history solution may exist without an online causal realization. The first essay distinguished these guarantees through a one-time choice under identical initial information; the fifth will place the issue within interfaces and interconnection. Retaining choices and histories in internal semantics gives the question a precise object.

Constraint semantics may be a feasible set or include structure among relations. Nonemptiness does not say which points are better. Keeping an optimum alone loses other feasible choices. The optimization example below develops that gap. Semantics often connect in actual problems; explaining what each retains makes connection possible without substituting a different object for the previous one.

## Dynamics retains evolution; a run is one instance of it

A dynamical presentation usually organizes state, time, input, initial conditions, and evolution. Even if only a final value is observed, the intervening trajectory may determine when a boundary is crossed, which states are visited, and how changes are answered. Keeping dynamics as a final value loses these queries. Keeping all trajectories as one computational output loses behavior under other initial conditions and inputs.

For $\dot x=-x$, fixing $x(0)=x_0$ gives $x(t)=e^{-t}x_0$. Different $x_0$ produce different trajectories. The family also defines evolution maps $\Phi_t(x_0)=e^{-t}x_0$, satisfying $\Phi_{t+s}=\Phi_t\circ\Phi_s$ and $\Phi_0=\mathrm{id}$. Advancing by $s$ and then $t$ equals advancing by their sum. This concatenation adds structure beyond a list of final values and supports questions about time advancement, disturbances, and composition.

For input-driven systems, concatenation must also retain how input segments connect. A second input segment selected from the first segment's state couples internal evolution and policy. “The same model” may concern the same controlled object while closed-loop trajectories change with the policy. Replay comparison under one saved input directly observes only its corresponding history. Comparing all permitted inputs requires retaining and quantifying over that input domain.

Fixing an initial condition does not guarantee uniqueness. Construct $x\ge0$, $\dot x=2\sqrt x$, and $x(0)=0$. For every waiting time $c\ge0$,

$$
x_c(t)=
\begin{cases}
0,&0\le t\le c,\\
(t-c)^2,&t>c
\end{cases}
$$

is a continuously differentiable solution. Its derivative is zero while waiting and $2(t-c)=2\sqrt{x_c}$ while growing; the derivatives on both sides of the joining point are zero. The all-zero function is another solution. The same initial state permits different futures, so these conditions do not define a unique evolution function.

A solver may return the zero trajectory; an added selection may make growth immediate. Its returned trajectory needs explanation through the algorithm and selection conditions. A single numerical output does not prove that the original equation is single-valued. We can add a selection rule to refine the presentation or retain all solutions in the semantics. The resulting objects support different questions: selected evolution, or whether every permitted solution has a property.

For example, “some solution remains at most one for all time” holds here, while “every solution remains at most one” fails because immediate growth eventually exceeds one. Existential and universal quantifiers change the strength of a guarantee. If maximum possible response matters, discarding other solutions removes part of the question. If an additional mechanism actually permits only one selection, including it gives grounds for shrinking the solution set.

Dynamical semantics can therefore involve an evolution operator, trajectory set, input-dependent solution relation, or trajectory law, according to the conditions. Time, initial state, domain, uniqueness, and concatenation each carry content. Making them explicit prepares coordinate changes, discrete approximations, and open boundaries to establish their own preservation relations.

## Probability weights and dependence across histories

Let $B_\theta\in\{0,1\}$ equal one with probability $\theta$, where $\theta\in[0,1]$. For $\theta=0.2$ and $0.8$, both outcomes have positive probability, giving the same support $\{0,1\}$. Observing only which outcomes are possible gives the same answer; observing success probability separates them. Support retains possibility, while a probability law also retains weights.

Now take $N\ge1$ independent, identically distributed outcomes. Both models permit every binary sequence, but the all-one event has probabilities $0.2^N$ and $0.8^N$, a ratio of $4^N$. The ratio grows with $N$ while both absolute probabilities tend to zero. A large ratio does not mean the event becomes increasingly common in the second model. Weights and the selected comparison jointly determine what is growing.

Keeping each time's marginal law can still lose the joint history. Construct two two-step processes. The first draws one fair bit and outputs it at both times. The second draws a fresh independent fair bit at each time. Every time is equally likely to show zero or one. In the first process, $(0,0)$ has probability one half and $(0,1)$ zero. In the second both have probability one quarter. Single-time observations agree; two-time answers differ.

These are two distinct losses. Passing from a law to its support removes weights. Passing from a joint law to marginals removes dependence between times. The preceding essay's paired measurements also used the latter relation. Marginals may suffice for a current success proportion. Consecutive failures, waiting times, and state updates require joint structure or a transition mechanism producing it. Probability semantics often include kernels, processes, or history laws, rather than one predicted probability number.

For finite states, a transition kernel $K(y\mid x)$ assigns an output distribution to each $x$, with nonnegative entries summing to one. Given an initial distribution and a Markov assumption, multiplying the initial weight by transition weights yields a finite history's probability. If state has not retained the history needed for prediction, that assumption may fail. Adding state or using history-conditioned kernels revises the object. The previous essay distinguished readings and beliefs; here their effect on joint semantics becomes visible.

Deterministic observation also has an explicit probabilistic connection. For a measurable map $H:X\to Y$ and a probability law $\mu$ on $X$, the observed law $H_\#\mu$ satisfies

$$
(H_\#\mu)(B)=\mu(H^{-1}(B)).
$$

The queried event's weight aggregates all internal preimages. When two states have the same reading, their weights merge in observation and their individual identities may not be recoverable. The new observation retains probabilities of visible events rather than probabilities of every original internal state. This map returns in the fourth essay's representation distributions, with a sampling object that must be specified separately.

Probability objects must also be distinguished from empirical frequencies. A network's category probability is a number supplied by its current formal instance. Connecting it to actual correctness requires population, labels, calibration, and tests. Internal semantics makes probability calculation legitimate; empirical relations put those probabilities into actual judgments. We can separately check normalization, correctness of a risk calculation under its law, and support for the numbers in a target population. These checks do not replace one another.

## Why the same optimum need not mean the same optimization problem

Optimization needs a feasible domain and objective, or the preference ordering induced by that objective. An optimizer's returned point is one result of that structure. Observing it can answer where the optimum is; studying alternatives, changed constraints, or search requires more than one point.

On the reals, take

$$
f(x)=x^2,\qquad g(x)=x^2+10\sin^2x.
$$

Both equal zero at zero and are positive elsewhere because $x^2>0$. Both therefore have the unique global optimum zero. Compare $\pi/2$ and $\pi$: for $f$, the former has value $\pi^2/4$, less than $\pi^2$; for $g$, it has value $\pi^2/4+10$, greater than $\pi^2$, since $10>3\pi^2/4$. The same optimum has not retained the ordering of these two nonoptimal alternatives.

A new constraint allowing only $\{\pi/2,\pi\}$ immediately separates the optimal choices. The lost information has a visible consequence: the old unconstrained optima agree, but that agreement cannot predict the same answer on a new feasible set. Retaining the objective or ordering supports recomputation after constraints change. Retaining only the old answer generally does not reconstruct the problem.

On a fixed feasible domain, transforming an objective to $af+b$ with $a>0$ preserves all rankings and optima. An absolute cost budget must also be transformed if that query is to remain the same. Changing the objective but keeping the budget number changes the query. More generally, a strictly increasing transformation preserves ordering without necessarily preserving differences, gradients, or numerical conditioning. The retained content determines whether a transformation gives equivalence, approximation, or a changed problem.

A training algorithm brings the distinction into the process. Even though $f$ and $af+b$ have identical orderings, fixed-rate gradient steps use $\nabla f$ and $a\nabla f$. The same Euclidean update requires dividing the learning rate by $a$. A general monotone transformation changes the gradient by a location-dependent amount. For example, $f=x^2$ and $f^3=x^6$ rank points identically but have gradients $2x$ and $6x^5$. No fixed multiplier matches their updates for every $x$.

Feasible geometry enters too. Projected gradients require a projection distance; different coordinates or metrics on constraints may change updates. Points with identical objective values may have different feasible directions and boundary relations that determine how they move under perturbation. Optimization semantics may retain numerical objectives, preferences, constraints, and geometry according to the task. The algorithm has its own states and update rules. Distinguishing them lets us ask what an algorithm preserves and where it adds choices.

Failure to find a better solution does not automatically establish that the objective's described object is nonexistent. Local stationarity, global optimality, and algorithmic reachability are distinct relations. Computing an optimum likewise does not establish that the objective represents the actual purpose adequately. The preceding essay carried errors into action rankings, and the sixth will distinguish purpose and operational criteria further. Here feasibility, preference, results, and process become objects that can be compared separately.

## Why one observational distribution can give different intervention answers

The drainage example showed that observations under an original input may identify only a parameter combination. We now construct two complete causal models whose joint observational distributions agree while intervention answers differ. We use the structural causal model's replacement operation: intervention replaces the equation determining a variable with an externally fixed value while retaining the other mechanisms. Pearl's overview, §3.2.1, explicitly defines this operation and its post-intervention distribution.[^causal]

The first model is

$$
M_1:\quad X=U,\qquad Y=X+V,
\qquad U,V\ \text{independent, each distributed as }N(0,1).
$$

The second is

$$
M_2:\quad Y=W,\qquad X=\tfrac12Y+Z,
\qquad W\sim N(0,2),\quad Z\sim N(0,\tfrac12),\quad W\perp Z.
$$

The normal distribution's second parameter denotes variance. Each model uses its own exogenous variables. The first determines $X$ from $U$, then $Y$ from $X,V$. The second determines $Y$ from $W$, then $X$ from $Y,Z$. Their generating directions differ, and each relation is explicitly specified in the example.

In the first model, $\operatorname{Var}(X)=1$, $\operatorname{Var}(Y)=2$, and $\operatorname{Cov}(X,Y)=1$. In the second, $\operatorname{Var}(X)=\frac14\cdot2+\frac12=1$, covariance is $\frac12\cdot2=1$, and $Y$ has variance two. Both have zero means and are jointly Gaussian, giving the same joint law with covariance matrix

$$
\begin{pmatrix}1&1\\1&2\end{pmatrix}.
$$

Even arbitrarily precise knowledge of the distribution of $(X,Y)$ cannot distinguish them. Every correlation, conditional distribution, and observational event probability computed from this law agrees. This uses the fact that a joint Gaussian law is determined by its mean and covariance. Equal means and covariance do not provide that guarantee for general distributions. The conditions explain why the construction establishes complete observational agreement.

Apply the formal intervention $\operatorname{do}(X=x_0)$. In the first model, replace $X=U$ by $X=x_0$. We still have $Y=x_0+V$, with mean $x_0$ and variance one. In the second, replace $X=\tfrac12Y+Z$ while retaining $Y=W$, whose mean is zero and variance two. For $x_0\ne0$ the means differ; even at zero the variances differ.

Under original observation, the first model's $Y\mid X=x_0$ agrees with the second model's identical conditional query. Intervention changes the mechanism determining $X$, while conditioning queries a joint law generated under the original mechanism. The operations have different addresses. Seeing $X$ and $Y$ vary together does not determine how $Y$ must change when $X$ is actively set. Generating structure makes that question definable, and selecting the structure needs the empirical grounds discussed in the second essay.

The example does not establish either generating direction for a real object. It proves a failure of internal recoverability: forgetting generating and intervention structure while retaining only the observational distribution is not an injective map. For observational prediction the models can be equivalent relative to that observation; for intervention they require a larger query domain. Deleting interventions to make them “the same” changes the comparison rather than passing the earlier intervention judgment.

## Why a stateful program is more than one input-output pair

Programs also have different semantics. A pure function maps input to output. A stateful service changes its internal state after a call, making later outputs depend on history. A program with random choices also assigns weights to histories. What operations and consequences must be retained determines the semantics; an interface labeled “input” and “output” does not determine it alone.

Construct two services with only a read call and an initial counter of zero. Service A returns the current count, then increments it. Service B always returns zero and leaves the counter unchanged. Both return zero on the first call, agreeing completely on a one-call test. On the second call A returns one and B zero. Input format and first response agree; interaction behavior differs.

Write A's transition as $n\xrightarrow{\mathrm{read}/n}n+1$ and B's as $0\xrightarrow{\mathrm{read}/0}0$. Legal call sequences and output sequences form histories for comparison. Adding reset requires specifying its state change and whether later reads start from zero again. State updates and available operations are parts of semantics. Resetting before each read and reading continuously without reset are different queries too.

External effects need their own addresses. Two tools both return “done”; one has written a file and the other has not. A later program reading it turns that difference into composite behavior. Observing only the returned string sees an identical string while not observing whether writing occurred. We can include file state, effect events, or complete environment state in the object, or explicitly compare only response text. A later purpose depending on the effect requires reopening that boundary.

Random seeds also need semantic interpretation. A fixed seed, realization, and input sequence may make a run repeatable. Artifact or run identity is not probability-law identity for the random algorithm. If the target is a sampling distribution, changing the seed usually selects another run. If the target is a deterministic replay, the seed belongs to its conditions. A fixed seed preserves reproducibility information without making one sample prove distributional correctness.

Time can make the distinction sharper. Two services eventually return the same result, one before a deadline and one after. Untimed input-output observation makes them the same; timed histories separate them. Cancellation, retries, and shared reads or writes can make operation order affect results too. Time and protocol in types need to connect with interaction histories in semantics before replacement has a precise object.

This opens a relation between realization and model. A program can realize an ideal model as $r$, or become a formal object itself with semantics supplied by execution rules. The first question concerns approximation or preservation of the ideal object. The second directly studies program states, histories, and effects. They can connect recursively; execution structure affecting later behavior is retained in the corresponding semantics and observation.

## Observation maps and the queries covered by agreement

Compression in tanks, probability, optimization, causality, and programs can now enter a shared organization. An observation specification $v$ states what to extract. Even semantic objects from different spaces can enter a common observation domain $D_v$ through their respective maps. For $s_1\in\mathcal S_1$ and $s_2\in\mathcal S_2$, exact observational agreement means

$$
\Omega_{v,1}(s_1)=\Omega_{v,2}(s_2)\quad\text{in the common domain }D_v.
$$

The domain may contain level trajectories, functions on an input set, record laws, allowed histories, or families of query answers. Maps must be defined for the particular question. One vague word such as “behavior” cannot erase their types. Mapping volume back to level through $V/A$ and pushing a probability law forward are both observations, but use different operations and retain different content.

For deterministic predictors $f_1,f_2$ on a fixed input domain $U$, agreement may mean $\forall u\in U:\ f_1(u)=f_2(u)$. Agreement on a finite sample set proves agreement for those sample queries. Agreement on all inputs has a stronger quantifier. Shared tests can reveal useful differences, but their range must remain explicit so we know which identity judgment they support.

For probability laws $\mu_1,\mu_2$, equality of weights for all measurable observed events establishes equality of the corresponding laws. Comparing only means gives a smaller query domain. Causal objects can add distributions under different interventions. Agreement of means, observational laws, and intervention answers has different strengths. Explicit quantifiers make relations assessable and reveal information that has not been retained.

Queries can form a set $\mathcal Q_v$, with observation $(q(s))_{q\in\mathcal Q_v}$. If $\mathcal Q_{v_0}\subseteq\mathcal Q_{v_1}$, agreement on the larger query set implies agreement on the smaller, generally not conversely. The first essay's equal terminal products but unequal maximum prefix gains provide a construction. Expanding queries reveals a formerly invisible difference. The original agreement on the smaller domain remains valid.

Restricting input gives the same direction. Two functions can agree on $[-1,1]$ and differ outside it; expanding to all reals defeats agreement. A purpose confined to the original interval gives the original observation real value. Operations that may take the system outside it require new domain conditions. Observation should retain the queries needed by the actual question, rather than shrink arbitrarily to ensure success.

Observation maps also raise a composition risk. Forgetting intermediate states separately can make locally allowed fragments assemble into histories absent from the original system, as the first essay's spurious $0\to0\to1$ trajectory showed. After projecting output to a boundary, we must check whether later composition preserves the relation. Internal observational equivalence states precisely what already agrees; the fifth essay asks whether it suffices for replacement in every admissible context.

Observation can also organize new inquiry. If models currently produce the same outputs but may have different mechanisms, select a query on which candidates disagree. Then ask whether it is formally defined and empirically obtainable. Mathematics exposes a possible distinction; experiment and operation establish its connections. Observation and object understanding develop together, reducing information needed for a particular purpose or opening questions previously unasked.

## Which implications hold between identity criteria?

“The same model” can refer to the same text, structure, observation, or governed version. The preceding constructions make several criteria visible. Comparing what they imply is more accurate than arranging kinds of sameness on one ladder of depth. Different questions can legitimately select different criteria, but connections between criteria require proof.

Text or token identity is immediate: with a specified encoding and tokenization, presentations coincide. The same text can have different semantics under different interpretations. Different texts can have the same semantics after algebraic rewriting. Whether whitespace and layout count depends on the textual rule. Comparing parsed expression trees instead changes the identity object from original bytes. Both records can be useful; names should follow what is actually compared.

Structural isomorphism requires a reversible correspondence preserving specified structure. The tank's coordinate conversion established one item by item. Group isomorphisms preserve multiplication, dynamical isomorphisms the relevant evolution, and probability-structured correspondences the weights. A bijection of underlying sets does not establish these isomorphisms. An isomorphism also need not preserve an observation omitted from the structure: observation of one named unit may change under a structural permutation.

Exact semantic identity requires equality in a common semantic domain. Real equations can define the same solution set; functions on a specified domain can agree; probability laws can be equal. Different coordinate spaces usually require a structural correspondence into a common domain before an equality is stated. Separating isomorphism from literal equality preserves structural identity while recording a change of representation.

With fixed shared observation, equivalence can be defined by equal observation values. On one object class with one $\Omega_v$, define $s\equiv_v s'$ exactly when $\Omega_v(s)=\Omega_v(s')$. Equality gives reflexivity, symmetry, and transitivity, allowing a quotient. A different $v$ can give a different partition. “Equivalent” without fixed observation does not explain which differences are put into one class.

Approximation differs. Give the observation domain a distance $d$ and fix $\epsilon>0$. Require $d(\Omega_v(s),\Omega_v(s'))\le\epsilon$. Real observation values $0,0.75\epsilon,1.5\epsilon$ meet the requirement for both neighboring pairs but not for the endpoints. The relation is reflexive and symmetric but not transitive. The triangle inequality gives at most $2\epsilon$ between endpoints, without preserving the original $\epsilon$. Approximate agreement is a suitable description; treating it directly as equivalence classes loses the distinction.

Error can accumulate through a chain too. With tolerance $\epsilon_j$ at comparison $j$, a shared distance and comparable objects bound endpoint error by their sum. Changed units, observations, or norms require a conversion relation before addition. The fourth essay's transformations and the sixth's evidence relations will use this direction. A fixed tolerance is a comparison condition; the bound preserved by transformation is a further derivation.

Behavioral refinement usually has a direction. On the same interface and history domain, new allowed behaviors $B_1\subseteq B_0$ exclude some formerly allowed behaviors. A property satisfied by every old behavior remains true for every new one by inclusion. The converse fails. One good new behavior does not establish that every old behavior is good. An empty set also makes “every behavior is good” formally true, so realizability and nonemptiness must remain in practical guarantees.

Probability semantics tests whether inclusion is enough. Success and failure supports can agree while failure probability changes from one percent to ninety-nine percent. A support-refinement judgment has not retained risk. Preserving a risk guarantee requires a relation containing weights. Timing, termination, and external effects likewise must be retained in the appropriate behavior object. Refinement is not a universal label obtained from an unweighted set direction for all semantics.

A shared empirical purpose does not establish mathematical identity. The same tank can be represented at different resolutions for different queries, or by competing mechanisms for one prediction task. The relation $\rho$ describes supported empirical connections; a common reference object does not identify different internal structures. Conversely, using the same mathematical function with a new apparatus or population requires a new representation check. Formal identity and empirical address can be retained separately.

Artifact identity and governed lineage have their own roles. Equal file checksums directly concern the checked bytes. Programs depending on different external data or environments may still have different complete operational objects. A version name can continue through training, revision, and deployment while parameters and behavior change. Lineage records succession, procedures governing changes, and the versions to which evidence applies; it does not turn change into mathematical equality. The sixth essay will trace its effect on evidence.

Contextual substitution quantifies outside composition: in every admissible context, replacement remains well posed and preserves required overall properties. This essay's observational equivalence has not established that judgment, because admissible contexts and composition operations have not all been specified. It prepares the objects; the fifth essay develops the stronger relation's conditions. Identity criteria now form a traceable network: each implication needs a preservation relation, and failed reverse implications have constructions.

## Can equivalence classes support subsequent operations?

Observational equivalence classifies objects, but operations on those classes require compatibility. Observe real numbers through $\Omega(x)=|x|$, putting opposite signs in one class. Addition induced from real addition would need to be independent of representatives. Using $1+1$ yields absolute value two; replacing the first representative by $-1$ yields zero. Real addition therefore does not descend to a single-valued operation on this quotient.

Multiplication does: $\lvert xy\rvert=|x||y|$, unchanged when signs of representatives change. Multiplication of absolute-value classes is independent of representatives. Ordinary addition can of course be defined directly on nonnegative reals, but it is not the descent of original real addition. It is a newly defined operation requiring its own preservation relation. The example precisely identifies whether later operations still use the information discarded by quotienting.

For an update $T$, the condition is direct: $\Omega(s)=\Omega(s')$ must imply $\Omega(Ts)=\Omega(Ts')$. Only then can the current observation class determine the next. The first essay's closure proof established the necessary and sufficient directions of this criterion. Here we apply it to updates of model instances. Observation defines equivalence first; update compatibility does not come with it automatically.

Training gives a finer construction. Take $f_{a,b}(x)=abx$, with the sole training example $x=1$, target zero, and loss $L(a,b)=\tfrac12(ab)^2$. Use ordinary Euclidean gradient flow. Let the sample prediction coefficient be $F=ab$. The chain rule gives

$$
\dot a=-bF,\qquad \dot b=-aF,\qquad
\dot F=-(a^2+b^2)F.
$$

Parameters $(1,1)$ and $(2,\tfrac12)$ both give $f(x)=x$ on every input, with current $F=1$. The first has $\dot F=-2$, the second $-17/4$. Their initial functions are identical, but their immediate changes differ, without coordinate-dependent learning rates. Parameter structure forgotten by function observation still enters the update through $a^2+b^2$. The function value alone is not a closed training state in this family.

Scaling $(a,b)\mapsto(ca,b/c)$ preserves the function but generally not the Euclidean parameter metric. This explains the gradient difference structurally: a function-preserving reparameterization need not be a symmetry of optimization geometry. We can retain parameters, add the needed coefficient to function evolution, or change the training metric and reestablish compatibility. Each option has its own objects and conditions.

The next section gives another symmetry, orthogonal hidden-unit permutation, and a preservation proof under compatible losses and updates. The failure construction and preservation proof jointly show why we must ask which identity an update preserves, beyond whether functions agree. The fourth essay develops the coefficient here into a training kernel built from network parameter derivatives.

## Network parameters, functions, and continued training

Use a fully connected hidden layer to test these identities. Let input $x\in\mathbb R^d$, hidden width $m$, and output space $\mathbb R^k$. Parameters are $W_1\in\mathbb R^{m\times d}$, $b_1\in\mathbb R^m$, $W_2\in\mathbb R^{k\times m}$, and $b_2\in\mathbb R^k$, with a shared activation $\sigma$ applied coordinatewise. The network is

$$
f_\theta(x)=W_2\sigma(W_1x+b_1)+b_2.
$$

Architecture specifies parameter types and computational connections; $\theta=(W_1,b_1,W_2,b_2)$ selects an instance. Under ideal real arithmetic, it defines an input-output function and a hidden representation $z_\theta(x)=\sigma(W_1x+b_1)$. Function and representation both come from parameters but are distinct objects.

For an $m\times m$ permutation matrix $P$, rearrange hidden units while transforming neighboring parameters:

$$
W_1'=PW_1,\quad b_1'=Pb_1,\quad
W_2'=W_2P^{-1},\quad b_2'=b_2.
$$

A shared coordinatewise activation satisfies $\sigma(Pa)=P\sigma(a)$, giving

$$
f_{\theta'}(x)
=W_2P^{-1}\sigma\bigl(P(W_1x+b_1)\bigr)+b_2
=f_\theta(x)\qquad\forall x\in\mathbb R^d.
$$

This is exact equality on all inputs, stronger than agreement on finite tests. The hidden representation becomes $z_{\theta'}=Pz_\theta$, so an individual named coordinate generally changes while the representation corresponds through reversible rearrangement. Parameter arrays change too. Euclidean parameter distance may be nonzero while function distance is zero. The parameter-to-function map is explicitly not injective.

These permutations form a group under composition and act on parameter space. Quotienting identifies parameters connected by rearrangement, removing the symmetry already proved. The quotient need not capture every pair realizing the same function, because redundant units and other special relations may exist. Coordinatewise activation supports permutation without establishing arbitrary rotation symmetry. Different activations or special connections assigned to units require rechecking the legal permutation range.

Continued training requires adding the update rule. Let permutation induce a linear map $\Phi$ on all parameters; it is an orthogonal coordinate rearrangement. For fixed training data and a differentiable loss $L$ depending only on network outputs, $L(\Phi\theta)=L(\theta)$. Differentiating in an arbitrary direction $v$ gives $\nabla L(\Phi\theta)^T\Phi v=\nabla L(\theta)^Tv$, hence

$$
\nabla L(\Phi\theta)=\Phi\nabla L(\theta).
$$

Euclidean gradient steps with the same scalar learning rate $\eta$ therefore satisfy $\Phi\theta-\eta\nabla L(\Phi\theta)=\Phi(\theta-\eta\nabla L(\theta))$. Corresponding initial states remain corresponding at every step, preserving function agreement through training. Without differentiability, selected subgradients or realization rules must also be checked for compatibility. The result connects loss, data, coordinate metric, and update conditions to identity.

Momentum adds update state. For example, let $v_{t+1}=\gamma v_t+\nabla L(\theta_t)$ and $\theta_{t+1}=\theta_t-\eta v_{t+1}$. Permuting both initial parameters and initial momentum preserves correspondence by induction. Changing parameters while leaving asymmetric momentum unchanged may separate the next updates. A checkpoint intended to resume training therefore contains more than a function or parameter array; training state has its own type and address.

Coordinate-dependent rates give an explicit failure. Construct one input and two positively activated hidden units, with hidden values $(1,2)$ at $x=1$ and initial output weights $(1,1)$, giving output three. Train only output weights on the sole example $x=1$, target zero, using half the squared output as loss. The gradient is $(3,6)$. Assign fixed rate $\eta>0$ to the first coordinate and $2\eta$ to the second. The updated output is $3-27\eta$.

Rearrange hidden values to $(2,1)$ while output weights remain $(1,1)$, preserving the initial function. The gradient becomes $(6,3)$. If rates remain attached to the original coordinate positions rather than moving with permutation, the updated output is $3-18\eta$. One update separates them. A shared rate, or permutation of the rate structure as well, restores the required correspondence. Initial function equality does not decide equality of training processes alone.

The results complement each other. Training correspondence can be proved under symmetry conditions and can fail explicitly when structure is not transformed with the parameters. Comparing training objects requires selecting content among parameters, function, representation, loss, optimizer state, and updates. A failure under one condition should not become a claim that all training differs; function invariance under permutation should not become automatic compatibility of every optimizer.

The fourth essay studies how parameter changes induce changes in sample predictions, whole-input functions, and representation distributions. The spaces and maps are now prepared: parameter distance, representation coordinates, and function behavior do not share one ruler. Training time also differs from layer number and sequence position. Distinguishing the objects gives kernels, geometry, and scaling something precise to compare.

## What complete conditions are needed to understand an object through its relations?

“Understand it by looking at its relations to other objects” can be a useful intuition, but it needs specification. A few questions may lose structure; preserving a compatible system of all structure maps can support a stronger conclusion. Start with a construction involving groups. The cyclic group $\mathbb Z/4\mathbb Z$ and $\mathbb Z/2\mathbb Z\times\mathbb Z/2\mathbb Z$ both have four elements, so their underlying sets admit a bijection. The former has an element of order four; every nonidentity element of the latter has order two. The groups are therefore not isomorphic.

A group isomorphism preserves element order because it preserves identity and multiplication: $g^n=e$ holds exactly when the $n$th power of its image is the identity. Keeping cardinality alone cannot recover this group structure. Understanding through relations here means considering maps that preserve multiplication, rather than arbitrary alignments of four points. Choosing relations already chooses the structure we can see.

Organize objects and permitted structure maps into a small category $\mathcal C$. Every object has an identity map; compatible maps compose; composition is associative. Small means that the objects and arrows form sets, avoiding additional size questions in this section. Objects might be a selected collection of groups, with group homomorphisms as maps, or other specified structures. A category does not automatically know a model's world or purpose. It is formed from the objects and preservation relations we specify.

A functor $F:\mathcal C\to\mathbf{Set}$ assigns a set $F(d)$ to each object $d$ and a function $F(g):F(d)\to F(e)$ to each arrow $g:d\to e$, preserving identities and composition. It specifies how extracted information changes when structure changes. Fix an object $c$. There is also a special functor $H_c(d)=\operatorname{Hom}(c,d)$, the set of all permitted arrows from $c$ to $d$. An arrow $g$ sends $f:c\to d$ to $g\circ f:c\to e$.

To read the relations in $H_c$ compatibly as information in $F$, choose a function $\alpha_d:H_c(d)\to F(d)$ for every $d$ and require, for every $g:d\to e$ and $f:c\to d$,

$$
\alpha_e(g\circ f)=F(g)(\alpha_d(f)).
$$

This is the naturality condition here. Transforming a relation before extracting information gives the same result as extracting information before transforming it. The condition quantifies over all permitted arrows. Arbitrarily assigning a correspondence table to each object does not yet satisfy it. Such a compatible family of functions is called a natural transformation $\alpha:H_c\Rightarrow F$.

One precise statement of the Yoneda lemma is that these natural transformations correspond bijectively to elements of $F(c)$, sending $\alpha$ to $\alpha_c(\mathrm{id}_c)$.[^yoneda] We can derive this bijection directly. Given $x\in F(c)$, define $\alpha^x_d(f)=F(f)(x)$. For $g:d\to e$, preservation of composition gives $F(g\circ f)(x)=F(g)(F(f)(x))$. Thus $\alpha^x$ satisfies naturality and is an admissible transformation.

Evaluating at the identity gives $\alpha^x_c(\mathrm{id}_c)=F(\mathrm{id}_c)(x)=x$. Conversely, given any natural transformation $\alpha$, take $x=\alpha_c(\mathrm{id}_c)$. Applying naturality to $f:c\to d$ yields $\alpha_d(f)=F(f)(x)$. The recovered $\alpha^x$ is therefore the original transformation, and the two directions are inverse. The proof places its exact burden on identities, composition, and compatibility across all arrows.

The correspondence also varies compatibly with $F$. If $\beta:F\Rightarrow G$, composing $\alpha$ with $\beta$ and then evaluating at the identity gives $\beta_c(\alpha_c(\mathrm{id}_c))$. Evaluating first and then applying $\beta_c$ gives the same result. The object can vary as well. For $h:c\to d$, the map from $H_d$ to $H_c$ sends $f:d\to e$ to $f\circ h$. Precomposing $\alpha$ with this map and evaluating at $\mathrm{id}_d$ gives $\alpha_d(h)=F(h)(\alpha_c(\mathrm{id}_c))$. Transformations of objects and of extracted information are organized along the same compatibility relation.

Now apply this to structural identity. Suppose $H_c$ and $H_d$ are naturally isomorphic, with forward transformation $\alpha:H_c\Rightarrow H_d$ and inverse $\beta:H_d\Rightarrow H_c$. The bijection above associates $\alpha$ with an arrow $a:d\to c$, its components satisfying $\alpha_e(f)=f\circ a$. It associates $\beta$ with $b:c\to d$, satisfying $\beta_e(k)=k\circ b$. Both composites of the natural transformations are identities. Substituting identity arrows yields $a\circ b=\mathrm{id}_c$ and $b\circ a=\mathrm{id}_d$. Hence $c$ and $d$ are isomorphic.

The strength of this result has precise conditions. We first choose a category, retain all arrows to all objects together with their natural compatibility, and recover object isomorphism from a natural isomorphism. This gives a complete mathematical realization of identifying structure through relations. With finite tests, partial interfaces, or empirical relations, we must establish which structure maps they supply, then connect those maps to the required full collection of relations. What current finite observations can recover depends on that connection.

This viewpoint consequently helps select observations; it does not obtain evidence on their behalf. Keeping only group cardinality loses multiplication. Keeping all structure maps with naturality supports a stronger identity conclusion. The information needed for the present purpose determines the construction we adopt. Here, internal comparison moves from matching results to preserving structure. Subsequent essays must still treat finite transformations, actual interfaces, and engineering evidence in their respective settings.

## How does a computational realization connect to the object already chosen?

With semantics and observation specified, computational preservation has two explicit endpoints. Let the ideal semantic instance be $s$, and let realization $r$ produce result $z_r$ under given conditions. If ideal observation is $\Omega_v(s)$, the realized result must enter the same observation domain through an appropriate decoder $D_v$. We can then compare $D_v(z_r)$ with $\Omega_v(s)$. Array length, time grid, units, and statistical weights all belong to this connection. Matching result formats does not establish preservation by itself.

For example, a continuous trajectory $h$ belongs to a function space, whereas a numerical program returns values on a grid. Comparing error over a continuous interval requires interpolation or another reconstruction. If comparison is restricted to grid points, the observation domain is instead a sequence of values. Each comparison can have its own error bound. A close match on grid points alone cannot establish unconditional equality of continuous trajectories. The fourth essay studies this distinction further through discrete approximation. Here we first align the types of the realized result and the ideal object.

In random computation, a program outputs samples while ideal semantics may be a probability law. A sample belongs to an outcome space; a law belongs to a domain of probability objects on that space. Their types do not permit direct equality. A sample mean or empirical distribution can be a statistic, then connected to ideal observation under sampling conditions and finite-error analysis. We must check both the law actually generated by the sampling algorithm and finite-sample fluctuations. Printing a probability number does not automatically establish either relation.

For learning, optimization objectives, training programs, parameter checkpoints, and final functions connect through such relations too. Training records show how a process generated parameters; they do not merge function semantics and process semantics into one identity. Changing solvers, precision, initialization, or training state may change an artifact and may change effective behavior. Which comparisons must reopen depends on object and purpose. Excluding realization from all semantics, or treating every realization choice as a change in the empirical model, would both be too coarse.

Sometimes the algorithm itself is the current model definition. If the object studied is a discrete iteration or stateful service, execution steps already enter the interpretation of $p$. Changing step size or update rule changes the semantic instance being studied. If the object is continuous dynamics together with its numerical approximation, step size first belongs to realization conditions and requires an error relation to the continuous object. The same number has different roles in these two tasks. The name “step size” cannot assign its address in advance.

Empirical representation then reconnects to the actual object. The second essay examined how measurement, populations, and interventions support $\rho$. This essay specifies the formal semantics and observation that relation encounters. An internal proof can establish that a structural transformation preserves ideal predictions. Whether actual devices or floating-point realizations preserve the relevant behavior requires their realization and measurement relations. Each conclusion has a definite result and a definite next endpoint, allowing the three views to continue one another.

## How can research proceed after opening the interior?

The interior now contains several kinds of objects that cannot be flattened into one another. Relations preserve choices; dynamics preserve evolution and histories; probability preserves weights and dependencies; optimization preserves feasibility and preference; causality preserves generation and intervention; programs preserve state and effects. They may participate together in a system or be transformed within one problem. What a transformation retains, loses, and adds must be specified along the chosen structure. A shared label such as set or function is insufficient to organize this content.

Typed presentations and interpretation show where each role enters. $\Sigma$ specifies materials and legal combinations; $p$ states relations; $\tau$ and interpretation rules determine the semantic object. Families and instances retain the scope of choices; $v$ and $\Omega_v$ determine the current comparison. Finally, $r$ and $\rho$ reconnect computation and experience respectively. This organization can serve a small algebraic example or open one layer of a learning system. It does not require every task to use every role.

Internal precision first changes our questions. When two network functions agree, we can ask how representations correspond and whether training state moves with permutation. When two probability supports agree, we can ask about weights and joint histories. When two causal observational laws agree, we can ask about a specified intervention. When objectives share a minimizer, we can ask about a new feasible domain and algorithmic process. Each further question selects a richer object or observation, while the earlier judgment remains valid within its original scope.

This also makes failures easier to locate. If initial conditions were not transformed with a change of variables, revise the correspondence between presentations. If an equation with multiple solutions was treated as single-valued, revise the semantic kind or add a selection mechanism. If finite test agreement became agreement on all inputs, narrow the identity quantifier. If returned text concealed effects and timing, reopen the observation boundary. New understanding can add structure or give previously conflated structures their own positions.

A complete engineering purpose still raises questions the interior has not answered alone. A closed loop must choose ports, determine wiring and compatible histories, and establish whether replacement preserves whole-system properties. An actual use must check whether data, requirements, realization, operation, and evidence still address the current object. Essays five and six develop these views. They can take the semantic instances opened here as components, and they can demand another internal investigation to locate the source of a guarantee.

The next essay first studies how objects change. Network parameters induce functions and representations; scale choices affect training mechanisms; discretization, quotienting, lifting, and limits have different preservation relations. This essay has prepared the spaces, interpretations, and identities to be compared. Transformations must now work between those actual objects. Stating what is preserved permits further inference; calculating which relations change permits us to decide which question requires revision.

[^causal]: Judea Pearl, [Causal inference in statistics: An overview](https://ftp.cs.ucla.edu/pub/stat_ser/r350.pdf), Statistics Surveys 3 (2009), 96–146, §3.2.1, printed pp.107–108, equations (6)–(7): replacing the structural equation of the intervened variable while retaining the other mechanisms defines the post-intervention distribution. The two linear Gaussian models and their covariance and intervention calculations in this essay are separate author constructions.

[^yoneda]: Emily Riehl, [Category Theory in Context](https://emilyriehl.github.io/files/context.pdf), 2016, author's public text, §2.2, printed pp.61–63 / PDF pp.81–83, Theorem2.2.4 and equations (2.2.5)–(2.2.6). This essay develops the correspondence and identity consequence step by step for a small category. It draws only on this module, without claims about higher categories or recovering general objects from finite tests.

---

**The six essays in “Models and Engineering”:** [How Mathematics Forms Problems](/en/posts/mathematical-language-and-problems/) · [How Models Refer to the World](/en/posts/from-observation-to-model/) · **What Is Inside a Model** · [How Models Change](/en/posts/model-transformations/) · [How Models Enter a Whole](/en/posts/model-as-open-component/) · [From Models to Engineering Judgments](/en/posts/engineering-model-chain/). Subsequent installments are being expanded into long essays in sequence; links currently lead to each published version.
