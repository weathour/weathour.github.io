---
title: 'What Is Inside a Model? Common Structure Across Equations, Probability Distributions, and Neural Networks'
postSlug: inside-the-model
published: 2026-08-21
updated: 2026-08-22
description: 'Starting with a traffic-flow curve, this essay separates formal presentation, mathematical semantics, computational realization, and empirical representation, then tests what "the same model" must preserve across probabilistic, optimization, causal, and agent models.'
tags: [mathematical models, formal semantics, model theory, neural networks, causal models, philosophy of science]
category: 'Engineering Practice'
draft: false
lang: en
---

## How a Curve Becomes a Model

A congested road can be compressed into a flow-density diagram. The horizontal axis $k$ records the number of vehicles per unit length of road, while the vertical axis $q$ records the number passing a cross section per unit time. In their macroscopic theory of traffic flow, Lighthill and Whitham summarized the connection with a constitutive relation:

$$
q=\phi(k).
$$

This equation shifts the object of study from the car-following actions of individual vehicles to the continuous traffic flow formed by many vehicles. [The previous essay](/en/posts/engineering-model-chain/) used it to show how a static relation can enter an engineering model chain. Here the question is its mathematical identity.[^traffic-wave]

Read in isolation, $q=\phi(k)$ is only a string of characters. A reader still needs the value domains and units of $q$ and $k$, along with the class of functions to which $\phi$ belongs. If $k$ is measured in vehicles per kilometer and $q$ in vehicles per hour, then $\phi$ must at least map a density domain to a flow domain. Once this information is supplied and $\phi$ is interpreted as a particular function, the expression determines the relation

$$
R_\phi=\{(k,q):q=\phi(k)\}.
$$

$R_\phi$ collects the density-flow pairs allowed by the constitutive relation. It contains neither spatial propagation nor future states. Given $k$, computing $q$ is one common use, but the relation itself imposes no direction. An engineer may instead infer possible densities from a given flow, test whether an observed pair lies on the relation, or study the extrema of the curve. The available operations depend on the mathematical object assigned to the expression.

Congestion moves along a road. For a short road segment, the change in the number of vehicles equals inflow minus outflow. Letting the segment length tend to zero while retaining $q=\phi(k)$ gives the conservation law

$$
\partial_t k+\partial_x\phi(k)=0.
$$

$\phi$ remains the flow-density function, now in the role of a flux function. The equation constrains a space-time field $k(x,t)$. The earlier model permits density-flow pairs in a plane; this one permits families of solutions in which density varies over position and time.[^traffic-wave]

A single partial differential equation still does not select one definite evolution. The road domain, initial density, and boundary inflows must be supplied. If several candidate solutions exist, the model must also state a solution concept and a selection rule. Only after the problem is well posed and the roles of the inputs are clear can an engineer treat it as a single-valued operator from initial and boundary conditions to a solution field.

The constitutive relation and conservation model share the same $\phi$, but make different mathematical commitments. Their admissible objects have changed from point pairs to space-time evolutions. The same characters also acquire different meanings when placed under different types, units, or interpretation rules.

Probability and optimization appear when we push the inquiry further along the same road. A researcher interested in stochastic demand or unmodeled disturbances asks for the probability that the next state lies in an event $A$. A task that selects ramp flows or speed advisories must also specify feasible controls and an ordering of objectives.

![The same congested road becomes a static flow-density relation, a conservation PDE, a probabilistic state-transition kernel, or a control optimization problem, depending on the question.](./inside-the-model/one-road-many-models.en.svg)

*Figure 1. Four modeling objects for the same road preserve, respectively, a static relation, space-time evolution, state-transition probabilities, and a control choice. Click the image to enlarge it.*

A formal presentation identifies a mathematical object only within a system of types and interpretation rules. Purpose may also lead a modeler to choose another set of variables and queries. The first essay collected these distinctions inside the semantic model $M$ so it could follow the engineering relations around it. This essay asks which rules belong to the modeling language and which content belongs to one particular model.

## Taking a Model Apart, Layer by Layer

Let $\Sigma$ denote a typed signature. It declares sorts of objects, constants or parameters, function and relation symbols, and the types of variables in a presentation. An engineering extension may also record units, time bases, and port roles. A simplified signature for the static traffic relation contains a density domain $\mathcal K$, a flow domain $\mathcal Q$, and the function symbol

$$
\phi:\mathcal K\longrightarrow\mathcal Q.
$$

The expression $q=\phi(k)$ becomes a well-formed presentation under this signature. A conservation model must add types for space, time, and fields, such as $k:D\times[0,T]\to\mathcal K$. The signature first decides whether a statement can be written at all. It also prevents quantities with incompatible units, time scales, or interface roles from being connected without an explicit conversion.

The signature has not yet assigned concrete mathematical objects to its symbols. Given $\Sigma$, a formal structure $\mathbf A\in\operatorname{Mod}(\Sigma)$ supplies mathematical interpretations for each carrier, function symbol, and relation symbol. A valuation $g$ assigns values to free variables. For a formula $\varphi$, model theory writes

$$
\mathbf A,g\models_\Sigma\varphi.
$$

Once $\phi^{\mathbf A}$ selects a particular function in the structure, the valuations satisfying $q=\phi(k)$ form the relation

$$
R_{q=\phi(k)}^{\mathbf A}
=
\left\{
(\kappa,\upsilon)\in
\mathcal K^{\mathbf A}\times\mathcal Q^{\mathbf A}
:
\upsilon=\phi^{\mathbf A}(\kappa)
\right\}.
$$

Formal interpretation gives the symbols mathematical meaning; satisfaction determines whether a formula holds in a structure under a valuation. If $T$ is a set of sentences, its class of admissible structures is

$$
\operatorname{Mod}_\Sigma(T)
=
\{\mathbf A:\mathbf A\models_\Sigma T\}.
$$

A specification may therefore admit several non-isomorphic structures.[^institution] Satisfaction here remains entirely within mathematics. It does not say that a real stretch of road satisfies the theory.[^formal-empirical]

Traffic relations, probabilistic programs, optimization problems, and automata do not share one semantic codomain. I use $\tau$ to mark a semantic kind. Relations or solution sets, probability kernels, optimization problems with feasibility and ordering, and systems of admissible executions occupy different semantic domains. Later reasoning must retain their different contents.

For fixed $\Sigma$ and $\tau$, let $\operatorname{Pres}_\tau(\Sigma)$ be the set of well-formed presentations and $\operatorname{Sem}_\tau(\Sigma)$ the corresponding semantic domain. The interpretation map is

$$
\llbracket-\rrbracket_{\tau,\Sigma}:
\operatorname{Pres}_\tau(\Sigma)
\longrightarrow
\operatorname{Sem}_\tau(\Sigma).
$$

Relative to a selected modeling formalism, a particular formal specification is

$$
\mathsf{Spec}=(\Sigma,p),
\qquad
p\in\operatorname{Pres}_\tau(\Sigma).
$$

$p$ is how the model is written: a set of equations, a graph, a collection of constraints, or a probabilistic program. Its interpretation is

$$
\mathsf{Sem}
=
\llbracket p\rrbracket_{\tau,\Sigma},
\qquad
\mathcal M=(\mathsf{Spec},\mathsf{Sem}).
$$

I call $(\Sigma,p)$ the formal specification or formal presentation, and the record that binds it to its corresponding $\mathsf{Sem}$ the interpreted model. If $p=T$ is a set of model-theoretic sentences, $\mathsf{Sem}$ may be $\operatorname{Mod}_\Sigma(T)$. For another semantic kind, it may instead be a probability kernel, an optimization ordering, or an execution system. The brackets $\llbracket p\rrbracket$ are a generic notation; a model-theoretic satisfaction class is one instance.

This $\mathsf{Spec}$ differs from the engineering requirement $S$ in the previous essay. The former records the model's formal presentation; the latter records a requirement the system is expected to meet. Making the notation more explicit prevents a shared letter or everyday word from crossing an object boundary unnoticed.

The signature, well-formed presentations, semantic domains, and interpretation map belong to the shared modeling formalism, rather than to fields repeated inside every model. Institution theory separates signatures, sentences, models, and satisfaction in a more general setting, and requires satisfaction to remain compatible with translation when signatures change. I borrow this layering discipline without claiming that every engineering model belongs to one complete institution.[^institution]

Many engineering models come in families. A traffic-flow function $\phi_\theta$ may carry capacity or free-flow-speed parameters. Neural-network weights index particular functions, and stochastic-model parameters index a family of measures. Let $\Theta$ be the index space:

$$
p:\Theta\longrightarrow\operatorname{Pres}_\tau(\Sigma),
$$

$$
\mathsf{Spec}_\Theta=(\tau,\Sigma,\Theta,p),
\qquad
\mathsf{Sem}_\Theta:\Theta\longrightarrow
\operatorname{Sem}_\tau(\Sigma),
\qquad
\theta\longmapsto
\llbracket p(\theta)\rrbracket_{\tau,\Sigma},
\qquad
\mathcal M_\Theta=(\mathsf{Spec}_\Theta,\mathsf{Sem}_\Theta),
$$

while a fixed instance is

$$
\mathsf{Spec}_\theta=(\Sigma,p(\theta)),
\qquad
\mathsf{Sem}_\theta=
\mathsf{Sem}_\Theta(\theta)=
\llbracket p(\theta)\rrbracket_{\tau,\Sigma},
\qquad
\mathcal M_\theta=
(\mathsf{Spec}_\theta,\mathsf{Sem}_\theta).
$$

Fixing $\theta$ selects one model instance. A parameter change usually stays within the same family as long as the signature and semantic kind remain fixed. If an index changes the state space, variable types, or set of ports, a fixed signature is no longer accurate. We then need $\Sigma_\theta$ or a higher-level organization of several signatures. Internal edges can sometimes stay inside $p(\theta)$, while changes to node types or interface sets often reach the signature.

Model comparison also requires an observation specification $v$ and an observation map $\Omega_v$. I abbreviate the retained behavior as

$$
B_{\theta,v}=\Omega_v(\mathsf{Sem}_\theta).
$$

The meta-level determines what counts as a well-formed expression. A family of presentations acquires semantics through interpretation. The observation specification belongs to the comparison layer and selects what the comparison will preserve.

![A modeling formalism specifies signatures, well-formed presentations, semantic kinds, and interpretation rules. A parameterized family of formal presentations is interpreted as a family of models and semantic instances; an observation map then retains selected behavior. Empirical representation lies outside the model boundary.](./inside-the-model/model-semantic-stack.en.svg)

*Figure 2. A model contains a typed formal presentation and a semantic instance. An observation map at the comparison layer extracts the required behavior. The modeling rules belong to the meta-level, while the model's reference to reality belongs to an external representation relation.*

The ocher region at the bottom of the figure only marks a boundary. Formal interpretation explains how symbols acquire mathematical meanings. A model's ability to refer to a real road depends on another relation. The nearer question concerns identity: can two models still express the same thing after their coordinates, state names, and equations have changed?

## State Variables Do Not Define Model Identity

A tank with constant cross-sectional area can be described by two equally natural sets of equations. Let $A>0$ be the area and let $q_{\mathrm{in}}$ and $q_{\mathrm{out}}$ be the inflow and outflow. The first formulation uses liquid level $h$ as its state:

$$
\dot h
=
\frac{q_{\mathrm{in}}-q_{\mathrm{out}}}{A},
\qquad
y=h.
$$

The second records the volume of water $V$:

$$
\dot V
=
q_{\mathrm{in}}-q_{\mathrm{out}},
\qquad
y=\frac{V}{A}.
$$

The variables and differential equations differ on the page. One state has units of length, the other volume, and their variable names and numerical values will not match line by line in code. If their initial conditions satisfy $V_0=Ah_0$ and both receive the same flow signals, however, they generate the same liquid-level curve. The map

$$
\Psi:h\longmapsto Ah=V
$$

sends every solution trajectory of the first formulation to one of the second, while the inverse map $\Psi^{-1}(V)=V/A$ sends it back. Both satisfy the same relation over their shared external variables:

$$
A\dot y=q_{\mathrm{in}}-q_{\mathrm{out}}.
$$

This correspondence covers the admissible initial conditions and input trajectories and preserves both time evolution and the output relation. It is much stronger than the coincidence of two simulation runs. Liquid level and volume provide two coordinate systems for one dynamic relation. A state variable matters for modeling and computation, but it is not a unique identity card carried by the model.

Many engineering systems lack such an obvious invertible change of state. Users may require only that two objects generate the same trajectories at specified ports, without a componentwise correspondence between internal states. They must first state the observation specification $v$: which quantities are inputs and outputs, their units and time scales, the allowed initial conditions and inputs, and the queries to be asked. In the tank example, $v$ treats $(q_{\mathrm{in}},q_{\mathrm{out}})$ as inputs and liquid level $y$ as the output.

If the models use different signatures or coordinate systems, define separate maps into a common observation space:

$$
\Omega_{v,1}:
\operatorname{Sem}_{\tau_1}(\Sigma_1)
\longrightarrow
\operatorname{Obs}_v,
\qquad
\Omega_{v,2}:
\operatorname{Sem}_{\tau_2}(\Sigma_2)
\longrightarrow
\operatorname{Obs}_v.
$$

Behavioral equivalence relative to $v$ is

$$
\mathcal M_1\equiv_v\mathcal M_2
\quad\Longleftrightarrow\quad
\Omega_{v,1}(\mathsf{Sem}_1)
=
\Omega_{v,2}(\mathsf{Sem}_2).
$$

The observation images of both tank models are the same set of admissible $(q_{\mathrm{in}},q_{\mathrm{out}},y)$ trajectories, so the equality holds. The behavioral approach studies dynamic systems through such exposed trajectories. States can remain internal, while behavior over exposed variables defines the boundary for comparison and interconnection.[^behavior]

![The same tank uses liquid level or volume as its internal state. Observation maps produce the same external relation. Below, textual identity, structural isomorphism, membership in one class, behavioral equivalence, and task substitutability appear as five criteria that do not form a hierarchy.](./inside-the-model/behavior-realization-identity.en.svg)

*Figure 3. The liquid-level and volume presentations produce the same boundary behavior under their observation maps. Five common identity criteria appear below; the text discusses several more.*

In practice, "the same model" can name several nonequivalent judgments:

| Objects compared | What "same" preserves |
|---|---|
| Files or expressions | Identical bytes, parsed equations, graphs, or rules |
| Formal structures | Equality up to renaming or a declared invertible structural transformation |
| Theory class | Both structures satisfy the same axioms or loose specification |
| Exact semantics | The same relation, measure, ordering, or execution system in the declared semantic domain |
| External behavior | Equality of their images under the respective observation maps in a common observation space |
| Approximate models | Sufficient proximity over a declared domain, observed quantities, and error bound |
| Representation case | The model user, model used, real-world target, purpose, and denotation/empirical-interpretation relation remain fixed |
| Application task | Interchangeable conclusions for a specified decision and threshold |
| Computational artifact | The same discretization, code, dependencies, precision, and runtime configuration |
| Governance lineage | Several versions are recorded as one line of development |

These relations do not form a single hierarchy from weaker to stronger, and without additional conditions they cannot replace one another. Two structures may belong to the same theory class without being isomorphic. Equal external behavior can coexist with different hidden states. Task substitutability must be decided again for each task. Before a team says "the model did not change," it needs to name both the objects under comparison and the preservation relation.

The observation specification must precede the comparison. If we shrink the input domain or delete discrepant outputs after inspecting the result, any two systems can be made "equivalent." Agreement between two programs on a finite test set establishes a fact about those samples. Behavioral equivalence requires equal observation images across the entire declared domain.

Approximate models also require a distance and a tolerance. For example,

$$
d_v\!\left(
\Omega_{v,1}(\mathsf{Sem}_1),
\Omega_{v,2}(\mathsf{Sem}_2)
\right)
\leq\varepsilon.
$$

This relation has substantial engineering value, although it is usually not a mathematical equivalence relation. The first and second models may differ by at most $\varepsilon$, and the second and third may also differ by at most $\varepsilon$, while the triangle inequality often gives only a $2\varepsilon$ bound between the first and third. A claim of substitutability must carry its validity domain, error quantity, and task threshold with it.

The position of the tank area $A$ can be identified by the same reasoning. Changing an $A$ fixed in the equation changes the admissible liquid-level trajectories, so it belongs to the model instance. Ruler readings and experiment records used to estimate $A$ belong to the construction process. An inflow curve supplied for one run is an interface input that selects one trajectory from all those allowed. Nouns such as parameter, data, and input do not assign an item permanently to the inside or outside of a model. Its logical role does.

## What Each Semantic Kind Must Preserve

An observation map preserves the result relevant to a present question and deliberately drops other structure. This suggests a tempting unification: reduce every model to an input-output function or a set of possible behaviors. Probability models reveal the first gap. A set of possible outcomes records whether each event can occur, whereas a probability model also assigns weight to every outcome. The optimal-solution set of an optimization problem retains the winners but discards how the objective ranks the alternatives. The observational distribution of a structural causal model records how variables vary together, but not which generating mechanism an intervention should replace.

These three compressions can be written as forgetful maps. Take a finite discrete $\mathcal Y$, and restrict $\operatorname{SCM}(\mathcal V)$ to well-defined models that induce a unique observational distribution:

$$
\begin{aligned}
\operatorname{forget}_{\mathrm{prob}} &:
\operatorname{Prob}(\mathcal Y)\to2^{\mathcal Y},
&\mu&\longmapsto\operatorname{supp}(\mu),\\
\operatorname{forget}_{\mathrm{opt}} &:
\operatorname{Opt}(\mathcal X)\to2^{\mathcal X},
&(\mathcal F,J)&\longmapsto
\operatorname*{argmin}_{x\in\mathcal F}J(x),\\
\operatorname{forget}_{\mathrm{causal}} &:
\operatorname{SCM}(\mathcal V)\to
\operatorname{Prob}(\mathcal X_{\mathcal V}),
&M&\longmapsto P_M^{\mathrm{obs}},
\end{aligned}
$$

where $\mathcal X_{\mathcal V}$ is the joint value space of all endogenous variables. These maps are generally not injective. Distinct objects in the native semantic domain can have the same image after information is forgotten.

Consider a Bernoulli model first. For $N$ independent and identically distributed binary observations, the outcome space is $\mathcal Y=\{0,1\}^N$. With $\theta_1=0.2$ and $\theta_2=0.8$, both support sets equal all of $\mathcal Y$: every finite binary sequence has positive probability. Yet the probabilities of $N$ consecutive successes are $0.2^N$ and $0.8^N$. Identical support can yield risk assessments separated by many orders of magnitude. A trajectory support tells us which paths are possible; a stochastic-process law also assigns probability mass across those paths.[^bernoulli]

Optimization reaches the same problem by another route. Suppose the feasible alternatives are only $a,b,c$. Two objectives both make $a$ the unique optimum while reversing the order of the other alternatives:

$$
J_1(a)=J_2(a)=0,
\qquad
0<J_1(b)<J_1(c),
\qquad
0<J_2(c)<J_2(b).
$$

Therefore,

$$
\operatorname*{argmin}_{x\in\{a,b,c\}}J_1(x)
=
\operatorname*{argmin}_{x\in\{a,b,c\}}J_2(x)
=
\{a\}.
$$

If a road closure, actuator saturation, or new constraint removes $a$ from the feasible set, the first objective selects $b$ and the second selects $c$. The `argmin` alone does not define an optimization model capable of answering such queries. At minimum, we need to retain the feasible set and the ordering required by the present query. Questions about objective gaps or near-optimality also require numerical structure.[^optimization]

Here $J$ is the objective function inside the optimization model. It also takes the role of an operational criterion in the previous essay's engineering model chain only when an engineer uses it as a proxy for an engineering requirement.

The information lost from a causal model is harder to discover through ordinary prediction error. Consider two linear Gaussian structural models:

$$
\begin{aligned}
M_{\rightarrow}:&
\quad X=\epsilon_X,\qquad
Y=X+\epsilon_Y,\\
M_{\leftarrow}:&
\quad Y=\eta_Y,\qquad
X=\tfrac12Y+\eta_X.
\end{aligned}
$$

In the first model, $\epsilon_X,\epsilon_Y$ are independent and both follow $\mathcal N(0,1)$. In the second, $\eta_Y\sim\mathcal N(0,2)$ and $\eta_X\sim\mathcal N(0,\tfrac12)$, again independently. Both models give $(X,Y)$ a zero-mean joint Gaussian distribution with covariance matrix

$$
\begin{pmatrix}
1&1\\
1&2
\end{pmatrix}.
$$

More observational samples only estimate this joint distribution more precisely. They do not record which structural equation an intervention should replace. In $M_{\rightarrow}$, applying $\operatorname{do}(X=x_0)$ gives

$$
\mathbb E_{M_{\rightarrow}}[Y\mid \operatorname{do}(X=x_0)]=x_0.
$$

In $M_{\leftarrow}$, $Y$ is generated by its own exogenous variable. Replacing the equation for $X$ leaves $Y$ unchanged, so

$$
\mathbb E_{M_{\leftarrow}}[Y\mid \operatorname{do}(X=x_0)]=0.
$$

The two models have the same observational distribution and give different intervention results. The direction of the structural assignments specifies a mechanism; algebraic rearrangement cannot reverse that semantics.[^scm]

All three examples show that a projected result cannot recover the native semantics. Systems that evolve over time must also preserve execution structure. Continuous flows, guards, invariants, and resets jointly generate the admissible executions of a hybrid system. A single simulation path is only one selection from them.[^hybrid]

![Six full-width cards show relations, solutions and executions, probability weights, optimization orderings, causal queries, and closed-loop agent-environment semantics. Each model kind must retain different information.](./inside-the-model/semantic-kinds-stress-test.en.svg)

*Figure 4. Six semantic objects display the structure that each must retain: probability weights, optimization orderings, causal queries, executions through time, and agent-environment closed-loop behavior.*

The common structure lies at the level of typed presentation and semantics. Once we have identified a model's native semantic kind, we can ask whether a grid, loss function, or solver approximates that model or rewrites it.

## When Does the Solver Enter the Model?

Neural ODEs push the implementation boundary into the training process. The continuous hidden-state dynamics are written as

$$
\dot z(t)=f_\theta(z(t),t),
\qquad
z(t_0)=z_0.
$$

A training program usually cannot evaluate the exact flow map of this equation, so it uses a numerical integrator. Let $h$ be the step size and let $r$ collect the algorithm and tolerance configuration. One discrete update can be written as

$$
\hat z_{n+1}
=
\Phi_{h,r}(t_n,\hat z_n;f_\theta).
$$

The loss compares the finite-precision trajectory $\hat z_n$ generated by the solver with observations.

After fixing $f_{\hat\theta}$, reducing the step size or tightening the tolerance may make several admissible algorithms converge to the same continuous solution. In that case, the solver's bias can be classified as realization error. Training introduces feedback, however. The network can alter its vector field so that parameter error compensates for the integrator's truncation error, making a particular solver produce a trajectory closer to the data at training times. Zhu and colleagues analyze this phenomenon with an inverse modified differential equation. Under the numerical methods and regularity conditions stated in their paper, learned dynamics may approach the inverse modified differential equation associated with the solver. A good fit between discrete trajectories does not require the learned vector field to equal the target continuous dynamics.[^neural-ode-solver]

Changing the training solver may produce a new parameter record $\hat\theta'$, altering both the parameter instance and its construction lineage. The functional identity of the network then depends on a comparison between $\mathsf{Sem}_{\hat\theta'}$ and $\mathsf{Sem}_{\hat\theta}$. Once training is over, a fixed vector field can exist independently of the training solver. If the deployed object is defined by the discrete trajectories jointly generated by the network and integrator, then $r$ belongs to the formal presentation of that larger model.

The first essay compressed this responsibility into a realization relation from semantic model to computational artifact:

$$
\mathcal M
\xrightarrow{\mathrm{realize/refine}}
C.
$$

Suppose a realization choice $r$ produces computational artifact $C_r$, whose execution semantics is $\llbracket C_r\rrbracket_{\mathrm{run}}$. Model behavior and program output do not normally occupy the same space. Continuous trajectories, floating-point arrays, and timestamped results must first pass through their own observation maps. If $d_v$ is a metric or pseudometric on the shared observation space, a sequence of increasingly refined realizations $r_n$ may be required to satisfy

$$
d_v\!\left(
\Omega_{v,r_n}\bigl(\llbracket C_{r_n}\rrbracket_{\mathrm{run}}\bigr),
\Omega_{v,M}(\mathsf{Sem})
\right)
\longrightarrow0.
$$

The observation specification $v$ states the input domain, exposed variables, and time base. The choice of $d_v$ must fit the semantic kind: functions may use a norm, while probability models require a distance between distributions. If refinement rather than distance is appropriate, write the relation separately as $\Omega_{v,r}(\llbracket C_r\rrbracket_{\mathrm{run}})\preceq_v\Omega_{v,M}(\mathsf{Sem})$. Together, these conditions specify the objects being compared when we claim that "the code realizes the model."

A deletion test offers a practical check. First fix the semantic kind $\tau$, signature $\Sigma$, solution concept, and observation specification. Then replace the solver, grid, or realization configuration. If every admissible refinement path converges to $\Omega_{v,M}(\mathsf{Sem})$, the variation stays within computational realization $C_r$. A program that times out, fails to converge, or contains an implementation error is an invalid realization.

If the formal specification omits a necessary solution or event-selection rule, different realizations may fill the gap differently and produce different trajectories. The missing rule must first be written back into $p$ before we can ask which realization preserves the semantics. If a project defines the fixed-step update $\Phi_{h,r}$ itself as the deployed object, that discrete map is part of the model presentation; the continuous vector field supplies its construction source.

Neural operators move the same check to function representations. Write the target operator as

$$
\mathcal G^\dagger:\mathcal A\longrightarrow\mathcal U,
$$

where both inputs and outputs are functions. A learned operator with fixed weights is $\mathcal G_{\hat\theta}:\mathcal A\to\mathcal U$. A program can read only a finite grid, point cloud, or vector of basis coefficients, and therefore needs

$$
P_h:\mathcal A\to\mathcal A_h,
\qquad
C_h:\mathcal A_h\to\mathcal U_h,
\qquad
I_h:\mathcal U_h\to\mathcal U.
$$

$P_h$ projects an input function to a discrete representation, $C_h$ computes over that representation, and $I_h$ reconstructs an output function. Let $d_v$ be a distance on $\mathcal U$ or its observation image. Under pointwise convergence, one testable condition for classifying the grid mainly as part of the realization layer is

$$
\forall a\in\mathcal A:\qquad
d_v\!\left(
I_hC_hP_h a,
\mathcal G_{\hat\theta}(a)
\right)
\longrightarrow0,
\qquad h\to0
$$

A stronger claim may demand uniform convergence over the input domain, or convergence relative to an input distribution; the intended mode must be stated. When the parameters stay fixed and the discretization error is controlled, changing the grid changes the computational artifact. Kovachki and colleagues define discretization invariance in function spaces. Architecture and approximation results must establish the property; the label "neural operator" does not confer it by itself.[^neural-operator]

Two distinct error relations appear here. Whether $C_h$ preserves $\mathcal G_{\hat\theta}$ is a model-to-artifact realization question. Whether $\mathcal G_{\hat\theta}$ approximates the target operator $\mathcal G^\dagger$ depends on the training distribution, finite data, and generalization evidence. Grid convergence can support the former and does not establish the latter. In a fixed-grid network, the shapes of weight arrays, positional encodings, or adjacency structures may bind the model to particular discrete points. A grid change can then alter $p$ or the entire model family.

PINNs bring target semantics, training criterion, and realization closer together. Consider the target problem

$$
\mathcal L u=f\quad\text{in }D,
\qquad
u\big|_{\partial D}=g.
$$

Once the function space, domain, and solution concept have been supplied, these conditions determine a solution set. A training program selects a network $u_\theta$ and evaluates

$$
\begin{aligned}
J_{\mathrm{PINN}}(\theta)
=&
\lambda_{\mathrm{res}}\frac{1}{N_{\mathrm{res}}}
\sum_{i=1}^{N_{\mathrm{res}}}
\left|
\mathcal L u_\theta(x_i)-f(x_i)
\right|^2\\
&+
\lambda_{\mathrm{bd}}\frac{1}{N_{\mathrm{bd}}}
\sum_{j=1}^{N_{\mathrm{bd}}}
\left|
u_\theta(\tilde x_j)-g(\tilde x_j)
\right|^2.
\end{aligned}
$$

Here $\lambda_{\mathrm{res}},\lambda_{\mathrm{bd}}>0$, the $x_i$ are interior collocation points, and the $\tilde x_j$ are boundary collocation points.

A low $J_{\mathrm{PINN}}$ says that the network has a small empirical residual at the selected finite points under the chosen weighting. The residual over the continuous domain, behavior between collocation points, and distance to a target solution remain separate claims. Experiments by Krishnapriyan and colleagues show how ill-conditioned optimization of the composite loss can leave training at a high-error point. The solution semantics of the target equation does not change with that training failure.[^pinn]

The boundary condition can occupy different places depending on its presentation. For a Dirichlet condition of this kind, extend the boundary function $g$ to a function $\tilde g$ over the domain and set $u_\theta=\tilde g+d\,n_\theta$, where $d|_{\partial D}=0$. The boundary structure then enters the model presentation. If the program enforces it only through a penalty at finitely many boundary points, it belongs first to the training criterion. After training, the forward evaluation of fixed $u_{\hat\theta}$ no longer reads those collocation points. They are construction data, while new coordinates supplied by a user are runtime inputs.

The claim that "a PINN solved the PDE" compresses at least two claims. The optimization process produced a function $u_{\hat\theta}$, and that function approximates a PDE solution over a chosen validity domain and norm. Training loss participates in the first claim. An error estimate or convergence argument connects the first to the second.

Neural ODEs, neural operators, and PINNs bring us back to the same test: state the semantics promised by the model, then examine whether the algorithm, grid, and training process preserve it under the specified observations. Training feedback, omitted solution-selection rules, or discretization binding can change the resulting semantic instance. Even if the semantics exposed by the chosen observation map remains unchanged, the computational artifact and construction lineage have changed.

An agent selects actions during execution, receives observations or results from an environment, and updates its context. Its admissible behavior is therefore determined jointly by fixed weights, scheduling, tool protocols, and stopping rules.

## Where Does an Agent End?

Conway's Game of Life supplies a closed-loop example that does not depend on language models. In a finite grid window $\Lambda$, each cell $i\in\Lambda$ stores a binary state $x_i(t)\in\{0,1\}$, and $N_i\subseteq\Lambda$ is its neighborhood:

$$
n_i(t)=\sum_{j\in N_i}x_j(t)
$$

is the number of live neighbors. The local rule can be written as

$$
x_i(t+1)=1
\iff
n_i(t)=3
\ \lor\
\bigl(x_i(t)=1\land n_i(t)=2\bigr).
$$

This expression only specifies how one cell updates. The complete model also says that every cell reads its neighbors at the same time $t$ and commits its state for $t+1$ only after all updates have been computed. The local rule thereby induces the synchronous global transition

$$
F_{\mathrm{sync}}:
\{0,1\}^{\Lambda}
\longrightarrow
\{0,1\}^{\Lambda}.
$$

If a program updates cells according to an ordering of $\Lambda$, $\sigma=(i_1,\ldots,i_{|\Lambda|})$, later cells read states already overwritten during the current sweep. In general, this gives

$$
F_\sigma\neq F_{\mathrm{sync}}.
$$

The same local rule can generate different space-time patterns under different schedules, so the schedule enters the global transition semantics. The ODD protocol likewise gives "process overview and scheduling" its own category because the timing and order of agent rules can change the model as a whole.[^abm-schedule]

Where scheduling belongs depends on the observation specification $v$. A fixed-point query may permit it to remain external, while queries about periods, propagation, or complete trajectories make order part of the semantics.

ReAct carries the same issue into an open environment. It uses a history-conditioned policy to select the next action from an expanded action space. Language actions update the context and environment actions trigger new observations. In the paper, `search[...]` and `lookup[...]` are tool actions, while `finish[...]` is a terminating task action.[^react]

To analyze a more general agent, I extend this operational pattern with context updates, an environment kernel, and stopping semantics. Write the raw history before an environment-interaction decision as

$$
h_t=(o_1,a_1,o_2,a_2,\ldots,o_t),
$$

Protocol parameters $\gamma$ transform that raw history into the context seen by the model, after which the policy provides an action:

$$
c_t=U_\gamma(h_t),
\qquad
a_t\sim\pi_\theta(\,\cdot\mid c_t).
$$

Write the formal environment as $E=(\nu_E,K_E)$, where $\nu_E$ is a distribution over initial observations or states and the transition kernel returns

$$
o_{t+1}\sim K_E(\,\cdot\mid h_t,a_t).
$$

The formulas record decision points at the environment interface. Thought tokens enter the context through $U_\gamma$, while $E$ processes environment actions. A complete agent $A_{\theta,\gamma}$ also specifies memory updates, action grammar, error handling, and stopping conditions; $\gamma$ packages these protocol responsibilities.

Connecting the same base-model weights to a different prompt, memory update, or tool protocol produces a different $A_{\theta,\gamma}$. A particular client belongs to the computation and integration layer. User input and tool results from one run are runtime inputs. Caches, timeouts, or exception branches enter the agent specification if they change action or termination semantics.

The status of decoding rules also depends on the object under study. If $\pi_\theta$ denotes the complete action probability kernel, temperature and top-k or top-p truncation change its probability mass and enter the kernel's definition. The random-number generator and an algorithm that samples from the specified kernel usually belong to the realization. If the object is defined as a deterministic decoding function, the decoding rule itself enters the presentation. Training data enters the weights and their construction lineage through training; the closed-loop execution reads the policy that training has produced.

When we study the agent itself, environment $E$ remains external. When we study the agent-environment loop, the two jointly define the composite object

$$
\operatorname{Close}(A_{\theta,\gamma},E).
$$

Its semantics is a history-dependent set or distribution of trajectories. Changing $E$ changes closed-loop behavior without turning the environment into an organ inside the agent. The named object has expanded, and its boundary has moved. If scheduling of concurrent tool calls, environment latency, or races between stopping events alter the admissible trajectories, they need a place in the closed-loop specification.

Here $E$ is a formal environment model. It may be a finite-state machine, a probability kernel, an abstraction of a simulator interface, or a stipulated rule for tool returns. It is distinct from the referent system $W$ in the first essay. Real APIs, online users, and physical roads belong to the runtime system or referent system. An engineer must abstract their transitions before obtaining a formal object that can be written into $E$. A live service also changes over time; treating it as a fixed transition kernel erases version and time conditions.

The closed-loop specification determines the admissible trajectories for given $A_{\theta,\gamma}$ and $E$. Using those trajectories to make claims about a warehouse, road, or population requires the referent system $W$, purpose $P$, and an empirical bridging relation.

## How Mathematical Structure Points to the World

In $q=\phi(k)$, the signature can require $k$ to take nonnegative real values, a structure can interpret $\phi$, and satisfaction can determine whether a pair of numbers belongs to $R_\phi$. These operations give mathematical values to formal variables. An empirical bridging relation identifies the particular motorway, period, and detectors to which they refer.

The $k$ measured on a road still requires measurement and aggregation choices. Researchers must state whether they count per lane or over the whole road segment, how long the spatial window is, how timestamps align, and how missed detections are treated. $q$ requires a counting interval and unit as well. The raw traffic process passes through sensing, filtering, and aggregation to produce records. Researchers then construct a data model that can be compared with the theoretical object. Experimental records, data models, and theoretical models are distinct objects. Formal satisfaction supplies no reason by itself to accept an empirical claim.[^formal-empirical]

The formal judgment

$$
\mathbf A\models_\Sigma T
$$

says that structure $\mathbf A$ satisfies theory $T$. Applicability to a road also involves a real-world target, operational definitions, a purpose, and error criteria. A numerical program may implement an equation accurately while the equation's continuum scale remains unsuitable for the safety of one vehicle. Formal error, realization error, and empirical mismatch occur along different relations and should be located separately.

Hughes distinguishes three acts in model representation: denotation, demonstration, and interpretation. A modeler lets a model object denote aspects of a real target, performs mathematical work within the model, then interprets the result back into a claim about the target.[^ddi] Denotation in this account occupies a different layer from the formal semantic value $\llbracket p\rrbracket$. I use DDI as diagnostic grammar. Actual modeling repeatedly revises variables, measurements, and equations.

When a purpose includes empirical testing, write the predicted object obtained from reasoning inside the model as $\widehat Z$, and the data object produced by sensing, sampling, and processing as $Z$. A comparison becomes well defined only after the same empirical bridging relation, denoted $\rho$ below, maps both into a common observation space. Numerical predictions may use an error metric. Set-valued models require coverage or refinement relations. A causal comparison must ensure that both sides answer the same observational or intervention query. Any claim that results are "close" is indexed by observed quantity, scale, and purpose.

Giere adds a model user and a purpose to model and world: "$S$ uses $X$ to represent $W$ for purposes $P$." I write the model user as $a$ and add a bridge package $\rho$:

$$
\operatorname{Rep}(a,\mathcal M,W,P;\rho),
$$

where $\rho$ is an additional record introduced here for denotation, operational definitions, and empirical interpretation. The model user may be a research team or operating organization. The purpose may be to explain congestion waves, estimate travel time, or support ramp control. A change of purpose need not alter the formal model, but it changes the observations to retain and the criteria for adequacy, thereby creating a new representation case.[^representation]

$\rho$ cannot be generated from variable names. Calling $k$ "density" says nothing about the road or time window. Calling $q$ "flow" supplies no counting protocol. Operational definitions connect the model's continuous fields to comparable sensor records.

"Interpretation" therefore names two different operations here. A formal structure $\mathbf A$ gives mathematical interpretations to the symbols in a signature, and a satisfaction relation or semantic map assigns mathematical content to presentation $p$. The bridge $\rho$ lets a model user connect the model to a referent system for a purpose and interpret model-internal results back into empirical claims.

![A model user selects a referent system and a model for a purpose. Within the model, a formal presentation acquires semantics and supports a demonstration. Outside it, denotation and empirical interpretation connect the model to reality; observed data and model predictions meet over common observables.](./inside-the-model/model-world-two-bridges.en.svg)

*Figure 5. On the left, denotation and empirical interpretation connect the model to its referent; data and prediction meet in a common observation space. On the right, a formal structure interprets symbols, a semantic map gives the presentation mathematical content, and demonstration proceeds within the model.*

Empirical representation must also withstand tests of data quality, error range, validity domain, and purpose-specific thresholds. If the model user, purpose, or operational definitions change, the $\operatorname{Rep}$ relation has changed even when the model file and parameters remain fixed.

Lighthill and Whitham's constitutive relation addresses large numbers of vehicles on sufficiently long congested roads.[^traffic-wave] When researchers use it to study macroscopic congestion waves, $\rho$ can connect density, flow, and space-time scales to the observation system. Adding the conservation law then supports an internal demonstration about wave propagation. If the purpose changes to deciding whether one vehicle can brake safely under communication delay, the original signature lacks individual-vehicle state, actuators, and communication processes. The formal model can remain coherent while the empirical claim exceeds the current representation relation.

The reverse variation also occurs. Researchers can build a probabilistic transition kernel for the same road, while a traffic-control team can add a feasible set and objective function to a model of road evolution. These models share a referent system but use different $\rho$ packages to select different aspects of the road. In practice, the questions use different signatures and semantic kinds, so they produce different formal models. Even if the formal model remains fixed, a changed purpose produces a new representation case.

The previous essay followed the engineering chain through data, code, deployment, and qualification. This essay has unpacked that $M$. The two views reconnect at the realization and representation relations: a computational artifact must preserve the declared formal semantics, while an application claim must state how the model refers to reality. Evidence can then attach to particular relations and versions.

## Three Views of Engineering Models

This essay opens one model and examines its signature, formal presentation, semantic structure, observation map, and identity criteria. [*From Model to Engineering System*](/en/posts/engineering-model-chain/) follows the engineering relation chain into computation, deployment, and evidence. [*How a Model Becomes a Component*](/en/posts/model-as-open-component/) fixes open boundaries and studies how modeled components are wired, assigned responsibilities through contracts, and replaced.

The three views can overlap and recur within a model, among system components, or across deployed modules; they are neither levels nor mutually exclusive axes. Behavioral equivalence here compares models under a declared observation map. Even approximate behavioral agreement over a finite domain, together with a task threshold, does not establish contextual substitutability. We must also declare the admissible contexts and show that error propagation remains within the decision margin and that the preservation relation survives composition.

### What We Must Specify When We Say "the Same Model"

Whenever we call two things "the same model," we should specify the objects being compared, the preservation relation, and the observation boundary and purpose under which the relation holds. Together, they form a testable claim of model identity.

---

[^traffic-wave]: M. J. Lighthill and G. B. Whitham, "[On Kinematic Waves II: A Theory of Traffic Flow on Long Crowded Roads](https://doi.org/10.1098/rspa.1955.0089)," *Proceedings of the Royal Society A* 229, 1955, Abstract, Sections 1–2, eqs. (1)–(7); P. I. Richards, "[Shock Waves on the Highway](https://doi.org/10.1287/opre.4.1.42)," *Operations Research* 4(1), 1956, pp. 43–44, eqs. (4)–(6). The former supplies the flow-density hypothesis, its intended scale, and the qualitative empirical comparisons available at the time; the latter states the traffic-conservation PDE directly.

[^institution]: Joseph Goguen and Rod Burstall, "[Institutions: Abstract Model Theory for Specification and Programming](https://doi.org/10.1145/147508.147524)," *Journal of the ACM* 39(1), 1992, pp. 101–103, Definitions 1–2; pp. 112–113.

[^formal-empirical]: Alfred Tarski, "[The Semantic Conception of Truth and the Foundations of Semantics](https://doi.org/10.2307/2102968)," 1944, p. 345, pp. 361–362; Patrick Suppes, "[A Comparison of the Meaning and Uses of Models in Mathematics and the Empirical Sciences](https://web.stanford.edu/group/csli-suppes/techreports/IMSSS_33.pdf)," 1960, pp. 289–291, 297–300.

[^behavior]: Jan C. Willems, "[The Behavioral Approach to Open and Interconnected Systems](https://doi.org/10.1109/MCS.2007.906923)," *IEEE Control Systems Magazine* 27(6), 2007, pp. 51–53, 63–64, 70–72.

[^bernoulli]: Bob Carpenter et al., "[Stan: A Probabilistic Programming Language](https://www.jstatsoft.org/article/view/v076i01)," *Journal of Statistical Software* 76(1), 2017, Section 2.1, pp. 2–3.

[^optimization]: Stephen Boyd and Lieven Vandenberghe, *[Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)*, 2004, Section 4.1, eq. (4.1), pp. 127–129; for the distinction between a problem and a solution method, see Section 1.1.2, pp. 4–5.

[^scm]: Judea Pearl, "[Causal Inference in Statistics: An Overview](https://doi.org/10.1214/09-SS057)," *Statistics Surveys* 3, 2009, Section 2.2, pp. 98–101; Sections 3.1–3.2.1, pp. 103–108, eqs. (1)–(7); Definition 2, p. 109.

[^hybrid]: Thomas A. Henzinger, "[The Theory of Hybrid Automata](https://www2.eecs.berkeley.edu/Pubs/TechRpts/1996/3019.html)," 1996, Section 1.1, Definition 1.1 and Example 1.1; Section 1.2, Definitions 1.2–1.3; Section 1.3, Definitions 1.4–1.5.

[^neural-ode-solver]: Aiqing Zhu et al., "[On Numerical Integration in Neural Ordinary Differential Equations](https://proceedings.mlr.press/v162/zhu22f.html)," *ICML 2022*, Abstract, Section 2.1, and Sections 3.1–3.3, especially Theorems 3.1–3.2.

[^neural-operator]: Nikola Kovachki et al., "[Neural Operator: Learning Maps Between Function Spaces with Applications to PDEs](https://www.jmlr.org/papers/v24/21-1524.html)," *Journal of Machine Learning Research* 24, 2023, Sections 2.1–2.3, especially Definition 4; for the error decomposition, see Section 3, pp. 11–12.

[^pinn]: Maziar Raissi, Paris Perdikaris and George Karniadakis, "[Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations](https://doi.org/10.1016/j.jcp.2018.10.045)," *Journal of Computational Physics* 378, 2019, Sections 2.1–2.2; Aditi Krishnapriyan et al., "[Characterizing Possible Failure Modes in Physics-Informed Neural Networks](https://proceedings.neurips.cc/paper_files/paper/2021/hash/df438e5206f31600e6ae4af72f2725f1-Abstract.html)," *NeurIPS 2021*, Sections 3–4.1.

[^abm-schedule]: Volker Grimm et al., "[A Standard Protocol for Describing Individual-Based and Agent-Based Models](https://doi.org/10.1016/j.ecolmodel.2006.04.023)," *Ecological Modelling* 198, 2006, Sections 2.1–2.7, especially Section 2.3, pp. 118–119; Uri Wilensky, "[NetLogo Life model](https://ccl.northwestern.edu/netlogo/models/Life)," 1998, HOW IT WORKS.

[^react]: Shunyu Yao et al., "[ReAct: Synergizing Reasoning and Acting in Language Models](https://openreview.net/forum?id=WE_vluYUL-X)," *ICLR 2023*, Section 2, p. 3; Sections 3.1–3.2, pp. 4–5.

[^ddi]: R. I. G. Hughes, "[Models and Representation](https://doi.org/10.1086/392611)," *Philosophy of Science* 64, 1997, pp. S329, S333, S335.

[^representation]: Ronald Giere, "[How Models Are Used to Represent Reality](https://doi.org/10.1086/425063)," *Philosophy of Science* 71, 2004, p. 743, pp. 747–750.
