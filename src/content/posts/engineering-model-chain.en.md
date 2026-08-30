---
title: 'From Model to Engineering System: The Chain Linking Reality, Requirements, Computation, Deployment, and Evidence'
postSlug: engineering-model-chain
published: 2026-08-21
updated: 2026-08-30
description: 'Using vehicle platoon control as its running case, this essay traces how engineers build a semantic model from a real problem, realize it as a computational artifact, integrate it into a deployed system, and bound engineering claims by evidence and version.'
image: './engineering-model-chain/engineering-model-chain-cover.webp'
tags: [engineering models, mathematical models, traffic control, control theory, model validation, VVUQ]
category: 'Engineering Practice'
draft: false
lang: en
---

## How One Name Moves from Paper to Program to Vehicle

In 2010, researchers at California PATH installed a cooperative adaptive cruise control system on two Infiniti FX45s. The lead vehicle broadcast its speed, throttle, braking, and gear position over DSRC. A PC104 computer in the following vehicle read those messages alongside its own CAN bus and the relative distance measured by LiDAR. The researchers retained the existing engine and brake controllers. The added controller generated "virtual" relative-distance and relative-speed signals for the factory ACC system to execute. When the vehicle detected by LiDAR was not the one transmitting the messages, a state machine reconnected the real LiDAR readings to the factory system.[^bu-cacc]

In the paper, the system's "model" appears as a set of longitudinal vehicle equations. Relative distance $x_r$, lead-vehicle speed $v_p$, and following-vehicle speed $v_f$ form the state. The controller identifies unknown traction, drag, and disturbance parameters online from driving data. Once the continuous equations have been discretized, a model predictive controller forecasts future behavior at each time step, constrains following distance, commanded speed, and acceleration, then selects the next speed command.

Engineers who open the running program may also call its matrices, sampling period, parameter bounds, weights, solution procedure, and state machine the "model." On the vehicle, the same word may refer to the operational system formed by clocks, messages, sensors, factory ACC, braking capacity, and the headway selected by the driver. The state-space model specifies longitudinal prediction relations. A radar–DSRC matching state machine decides the lead vehicle's identity; communication and clock logic handle message freshness; the factory ACC and actuators turn speed commands into brake force. The following response on the road is produced by this execution chain.

The paper, program, and vehicle use one word for different objects. If a researcher says "the model is stable," stability may belong to the continuous equations, the discrete control law, or the closed-loop vehicle with communication and actuators. If a developer says "the model has been validated," the evidence may address a formula, a program, or a set of road conditions. Unless the object is named, correctness can move between these addresses unnoticed.

This mismatch gives us the question that runs through the essay: **How is an engineering problem abstracted from a referent system into a semantic model, realized through computation, and brought into a decision or deployment? What does each transformation preserve, and what does it change?**

## One Name, Four Referents

Consider a common piece of engineering shorthand: "We deployed the model from the paper." The sentence crosses at least four familiar referents. One common engineering production chain is

$$
M_{\Theta}
\longrightarrow
M_{\hat\theta}
\longrightarrow
\mathcal C_v
\longrightarrow
\mathcal O_{v,d}.
$$

These three arrows record relations of production and implementation. Correctness claims attach to the objects and relations examined later. A learning system may also contain a training artifact $C_{\mathrm{train}}(M_\Theta,Z,J)$ that produces $M_{\hat\theta}$; the $C_v$ that performs inference may use different code and hardware. Theoretical work that never enters implementation may stop at a model family or study a fixed-parameter semantic instance. Each of the four terms retains its own identity.

The first term, $M_{\Theta}$, is a **semantic-model family**. It fixes a common semantic kind and uses parameter domain $\Theta$ to index a set of admissible semantic objects. A linear vehicle model, the function family defined by a neural-network architecture, or a family of probability distributions usually first appears in this form. The candidate set is typed, but no $\hat\theta\in\Theta$ and hence no corresponding semantic instance has yet been fixed.

The second term, $M_{\hat\theta}$, is a **fixed-parameter semantic-model instance**, with $\hat\theta\in\Theta$. Its parameters may come from theory, system identification, statistical estimation, calibration, or training. The PATH controller estimates the lead vehicle's dynamic parameters online and passes them into its predictive model; each parameter update leaves a new instance within the same model family. Trained neural-network weights, a point estimate from a Bayesian analysis, and a drag coefficient calibrated against experiments belong here as well. A full posterior is first a distribution over parameter instances. It becomes a concrete probabilistic model instance once it is fixed as a posterior predictive rule. The second essay uses $\mathcal M=(\mathsf{Spec},\mathsf{Sem})$ for the interpreted package that preserves its presentation source and writes the narrow semantic object used here as $M:=\mathsf{Sem}$.

The third term, $\mathcal C_v$, is a **computational artifact**. The subscript $v$ reminds us that it has a version of its own. Its behavior depends on how data structures encode state and the selected discrete semantic model, which solver handles the optimization problem, where the stopping tolerance is set, whether the computation uses single or double precision, and how libraries and hardware execute the code. Two programs can implement the same equations yet produce meaningful differences because they use different meshes, tolerances, or floating-point paths.

The fourth term, $\mathcal O_{v,d}$, is a **deployed instance with a particular installation and governed configuration $d$**. Once the PATH artifact enters a vehicle, it forms an open system with LiDAR, DSRC, CAN, the PC104 computer, factory ACC, the driver, and the road. Interfaces, units, clocks, message topology, fallback behavior, and actuator limits all begin to affect the result. Sensor aging, network congestion, vehicle load, and other road users usually enter first as the operating context encountered by the same deployed instance. A new $\mathcal O$ arises only when a sensor, protocol, or configuration crosses the declared identity boundary.

Before drawing an inference, identify which of the four objects the word "model" denotes. A useful diagnostic is: **What single change would change the object under discussion?**

- Changing one runtime input usually produces another execution of the same instance.
- Changing fixed parameters or weights creates another instance in the same model family. Changing the probability family, signature, behavioral semantics, or interpretation usually creates a new semantic model and may create a new family.
- Changing the mathematical transformation from continuous semantics to a discrete recurrence creates a new discrete semantic model $M_T$ and usually requires a new computational artifact. Changing only the solver, tolerance, code, or hardware execution path creates a new $C_v$.
- Changing a sensor, protocol, topology, or governed configuration beyond its identity boundary creates a new deployed instance. Ordinary changes in conditions and time belong to the operating context of the same instance.

Boundary conditions deserve particular care. A model may accept one as an explicit input, fix it as a parameter, or leave it only in deployment configuration. The question "Is it still the same model after the boundary condition changes?" has no general answer outside a declared signature. The object's identity depends on the role that quantity plays in the relation at hand.

![Engineering transformations among a referent system, semantic model, computational artifact, and operational setting.](./engineering-model-chain/four-objects.en.svg)

*Figure 1. The main text retains four principal objects. The operational setting divides into two paths: a result returns to an offline decision, or a computational artifact enters an operational system and acts on the referent system. Click or double-click to enlarge.*

The figure includes one object that precedes the four referents: the **referent system**. This may be the vehicles, road, flow field, organizational process, or a purely formal object domain that the model claims to address. The semantic model selects relations from it. The computational artifact implements those relations. The operational setting carries output into judgment or action. Figure 1 collapses the two model referents into $M$, adds the earlier referent system $W$, and groups offline and deployed use under the operational setting; the four-item identity chain above continues to refine $M$, $C$, and $O$. The eight roles introduced later are responsibility slots, and one entity may occupy several of them at once.

This essay reserves "model" in the narrow sense for a mathematically defined $M$. The relations among purpose, referent, data, requirements, computation, use, evidence, and version form an **engineering model system**. An engineering claim that crosses several objects depends on the transformations it actually traverses.

Once the four referents are distinct, the earliest transformation remains hidden inside a black box. A road contains countless vehicles, actions, rules, and contingencies, while an equation retains only a few variables. The way we make that reduction determines what every later computation is about.

## How the World Enters a Model

The PATH prototype began from a specific purpose: let drivers experience short headways of 0.6 to 1.1 seconds in real traffic and observe their interaction with cooperative cruise control. That purpose brought two modified FX45s, short headways, vehicle-to-vehicle communication, driver experience, and the constraints of the factory ACC system inside the problem boundary. A study of highway capacity might instead extend the boundary to a long platoon, ramps, and traffic flow. A road-safety certification task would give emergency braking, failure modes, cut-ins, and regulatory conditions greater weight.

Let $P$ denote the purpose and decision context, and let $W$ denote the referent system being studied, designed, or formalized. The arrow

$$
P\xrightarrow{\text{boundary setting}}W
$$

records how the problem selects the system boundary, scale, agents, inputs, outputs, and disturbances. Purpose first cuts a referent system from the physical setting. The same stretch of road can support a study of driver experience, controller design, traffic-flow prediction, or crash reconstruction; each inquiry selects different agents, scales, and disturbances.

### How Observation Produces a Road Record

This part of the chain applies when a model makes an empirical reference to a system, or when calibration, identification, or testing requires observations. Theoretical work over a purely formal referent domain may study a model family or a particular semantic instance without an observation kernel or empirical representation relation.

Data enters the engineering chain next. LiDAR on the following vehicle measures relative distance and speed. Its CAN bus supplies vehicle speed, engine state, and brake state, while DSRC messages carry the lead vehicle's state. The PATH team also observed that, under their test conditions, LiDAR-relative speed lagged the speed derived from vehicle communication by about 0.5 seconds. They used that feature to help determine whether the LiDAR target was the communicating lead vehicle.[^bu-cacc]

Every record passes through sensing, sampling, synchronization, selection, and estimation. Let $\mathsf Z$ be the space of possible records, and let $Z\in\mathsf Z$ be one realized record. When observation is stochastic, type the purpose-dependent observation kernel as

$$
K_{\mathrm{obs},P}:
\operatorname{Hist}(W)
\rightsquigarrow
\mathcal P(\mathsf Z),
\qquad
Z\sim K_{\mathrm{obs},P}(h_W,\cdot).
$$

Here $\operatorname{Hist}(W)$ is the space of referent-system histories, $\mathcal P(\mathsf Z)$ is the set of probability measures on $\mathsf Z$, and $h_W$ is the current history. A deterministic measurement procedure is the degenerate case. The subscript $P$ records the influence of purpose on observation. PATH collected relative distance, vehicle state, and lead-vehicle messages to control headway; those records do not contain all the quantities required for crash reconstruction, emissions assessment, or a study of driver attention.

Every data record has already been processed. A LiDAR "relative distance" depends on target detection and coordinate interpretation. A CAN signal depends on an internal vehicle protocol, and a communication message depends on how another vehicle encodes its own state. Missingness, delay, noise, and selection mechanisms belong to the way we encounter the system. Keeping data separate as $Z$ carries those conditions into later calibration, training, and validation.

### Treat the Model as a Semantic Black Box

The modeler selects states, parameters, and relations from $W$ to form a semantic model $M$ in the narrow sense. This essay asks only that the object have determinate mathematical content: its inputs, parameters, outputs, and admissible behavior must be identifiable. The second essay in the series opens the object and separates signature, formal presentation, and semantic interpretation. Here we continue along the model's external engineering relations.

When a model makes an empirical reference to $W$, its mathematical content still needs a relation of use. Following work on model representation, write

$$
\operatorname{Rep}(a,M,W,P;\rho)
$$

when a research team or operating organization $a$ uses model $M$ to represent referent system $W$ for purpose $P$. The bridge record $\rho$ contains reference, operational definitions, and empirical translation. In the PATH equations, $x_r$ refers to relative distance, while $v_p$ and $v_f$ refer to lead- and following-vehicle speed. How LiDAR, CAN, and DSRC produce records comparable with those quantities also belongs to the bridge.[^representation] Two teams may use the same formal equations yet establish different representation relations because they choose different road scales, measurement windows, or variable definitions.

Formal interpretation occurs inside the model; empirical representation lies between $M$ and $W$. Replacing a solver may create only a new computational artifact. Changing the road window used to define density, or applying the same model to another decision, changes $\operatorname{Rep}$ even when the model file is untouched. In this empirical-modeling branch, a realized observation $Z$ and a model prediction become comparable only after $\rho$ maps them into a shared observation space.

Observation records how engineers encountered the referent system. The model preserves admissible behavior under a selected abstraction. Identification, calibration, or training connects the two; engineering requirements then move the problem from what may happen to what the system should accomplish.

## How Equations Become One Actual Computation

The objective of the PATH following controller sounds straightforward: maintain the headway selected by the driver, respond promptly when the lead vehicle changes speed, and provide a ride at least as comfortable as manual driving. The physical system adds further limits. The controller has restricted access to the factory brakes, speed commands have a bounded range, following distance must remain above a safety threshold, and control actions must not saturate the actuator.

A computer still cannot act on these sentences. Let $S$ denote system-level specifications and requirements. They come from the purpose, constraints of the referent system, stakeholder judgments, and external laws or standards; they are not derived from $M$. A semantic model may expose feasibility and tradeoffs, while the normative source of the requirements remains outside it. Let $J$ denote the criterion that the algorithm computes, estimates, or constrains. The arrow from $S$ to $J$ is **operationalization**:

$$
S\xrightarrow{\mathrm{operationalize}}J.
$$

This arrow is usually context-dependent and many-to-many, and it may cover only part of the requirements. A safe distance and actuator range may become hard constraints. Acceleration or control variation may stand in for comfort, while mean squared error may represent predictive accuracy. The algorithm works directly on the quantities on the right. Engineers must state which requirements on the left those quantities cover.

### A Goal That Exactly Matches the Task

Start with a clean case. Let $G=(V,E)$ be a finite directed graph with nonnegative edge weights $c_e\ge 0$, and let the set $\mathcal P_s(s,t)$ of simple paths from $s$ to $t$ be nonempty. Define the task as finding a path in this set with minimum total edge weight. The specification itself is

$$
p^*\in
\operatorname*{argmin}_{p\in\mathcal P_s(s,t)}
\sum_{e\in p}c_e.
$$

Here the operational criterion $J(p)=\sum_{e\in p}c_e$ expresses the task exactly. Under the stated conditions, Dijkstra's algorithm returns one minimizer; the algorithm is a computational method for obtaining the specified object. When the weights, graph, feasible path set, and definition of optimality remain fixed, solving $J$ fulfills $S$.

If "shortest path" is meant to describe a route that is safe, punctual, smooth, low-carbon, and acceptable to travelers, the same edge-weight sum becomes a proxy that compresses several values. The way risk preference, travel-time reliability, and road restrictions enter $c_e$ determines which part of the larger task it covers.

Operationalization commonly takes the form of exact correspondence, conservative approximation, or empirical proxy. A conservative approximation may sacrifice performance to secure a requirement; an empirical proxy relies on a correlation observed in data. An engineering argument should identify the relation in use and leave value, specification, loss, and evidence in their respective roles.

### What an MPC Cost Function Represents

Return to the PATH controller. Let $x_r$ be relative distance, $v_f$ the following vehicle's speed, and $t_{hw}$ the headway selected by the driver. The spacing error is

$$
e_1=x_r-v_f t_{hw}.
$$

The discrete model predicts $N$ steps ahead. Its quadratic cost can be summarized as

$$
J_k=
\sum_{n=1}^{N}
\left(
\rho_e e_1(k+n)^2
+\rho_u\Delta u(k+n)^2
+\rho_v\Delta v(k+n)^2
\right),
$$

where $\Delta u$ penalizes abrupt changes in the speed command and $\Delta v$ penalizes the speed difference between the two vehicles. Positive weights $\rho_e,\rho_u,\rho_v$ trade headway tracking against control smoothness and response speed. The prediction is also subject to a lower bound on distance, limits on the speed command, and upper and lower acceleration bounds.[^bu-cacc]

The expression does not combine safety, comfort, throughput, and driver acceptance into a natural common unit. Within the current state estimate, predictive model, and finite horizon, it uses a distance threshold for part of the safety boundary, acceleration and control variation as partial proxies for comfort, then weights those terms to choose a control sequence. Road tests observe driver experience. The state machine identifies the cooperating lead vehicle. Additional analysis or testing must assess risks beyond the prediction horizon.

The precise hard-constraint claim is narrower. Under the current state estimate and finite-horizon predictive model, if the encoded optimization problem is feasible and the solver returns a solution accepted under the declared feasibility and residual criteria, then the predicted state and control sequence satisfy the encoded constraints within the declared numerical tolerance. The claim addresses only model trajectories over that finite horizon. The physical vehicle still passes through state estimation, communication, the inner speed loop, and brake actuation; the error, timing, and field evidence along those relations determine whether its trajectory remains within field requirements.

![Two comparisons among task definition, operational criterion, mathematical behavior, computational behavior, and field behavior.](./engineering-model-chain/requirements-to-behavior.en.svg)

*Figure 2. In the shortest-path example, the specification and objective can coincide exactly. In platoon control, the objective and constraints operationalize only part of the engineering requirements, while computation and field integration continue to alter behavior.*

### A Solver Operates on a Different Object

The predictive controller does not solve the continuous equations directly at every time step. The PATH team first selected a sampling period $T$ and used the recurrence $F_T$ to define the discrete semantic model

$$
M_T:\qquad
x_{k+1}=F_T(x_k,u_k;\theta),
\qquad \theta\in\Theta.
$$

At time $k$, online identification fixes $\hat\theta_k\in\Theta$ and thereby supplies the current semantic instance $M_{T,\hat\theta_k}$. The controller uses it to generate a future trajectory, solves a constrained optimization problem, applies only the first element of the control sequence, then reads new observations and solves again. Mathematical discretization defines $M_T$. Encoding its states and matrices, choosing a solver and stopping rule, setting numerical precision and runtime configuration belong to $C$; each online optimization is an execution of $C$.

Call the representation, algorithm, code, and runtime configuration that produce output the computational artifact $C$. Under given inputs, resources, and configuration, it produces output, timing, and resource traces. An implementation relation must state how those execution behaviors preserve the semantics of $M$. A numerical program may require an error bound; a compiled controller also brings tolerance and finite precision into the relation. The phrase "the algorithm implements the model" skips the arrow where some of the most consequential failures occur.

A separate multilayer platoon-control experiment gives a closer view of that arrow. Ibrahim and colleagues split each following vehicle's controller into two layers. The upper distributed MPC received lead-vehicle messages and solved a receding-horizon quadratic program at 10 Hz; the lower state-feedback layer executed desired acceleration on a 2 ms cycle. The researchers used the Fast Gradient Method, fixed matrices that could be computed offline, generated C code automatically from MATLAB, and ran it on four Cohda MK5 units. Packet loss, noise, delay, and short stalls in a non-real-time operating system all left traces in the results.[^ibrahim-dmpc]

Ibrahim's study describes a separate system. It shows how the same MPC idea takes a concrete shape in another artifact. The optimization problem in the paper specifies the object to be solved. Matrix precomputation, the iterative method, code generation, processors, and deadlines determine whether this computation finishes in time. Simulation on four embedded devices tested real-time computational feasibility; the experiments did not measure physical vehicle dynamics or road conditions.

The current discrete semantic instance therefore belongs to $M$, while the receding-horizon algorithm, code, and processor that realize it belong to $C$. Their output may remain on an engineer's screen or enter a vehicle and change the next observation.

## How Computation Returns to the World

An engineering use may stop at an offline judgment. A CFD program may calculate the flow around an airfoil so that an engineer can compare designs. A statistical model may estimate risk so that an analyst can decide whether to run another experiment. On this offline path, computational behavior and its evidence return to the original decision context:

$$
(B_C,Q)\xrightarrow{\mathrm{inform/justify}}P.
$$

For now, read $Q$ as the basis and conditions of use attached to the result. It will soon become a qualification record. An offline use has no actuator, but its output still needs an interpretation, an account of error, and an identified decision-maker.

A controller takes another path. The computational artifact is first integrated with sensors, communication, actuators, and runtime software to form an operational system $O$. Its actions then change the referent system:

$$
C\xrightarrow{\mathrm{integrate}}O
\xrightarrow{\mathrm{act}}W.
$$

Along this path, interfaces become part of the engineering claim rather than an implementation detail.

### How a Speed Command Reaches the Wheels

The PATH MPC outputs a speed command $u=v_c$, not a throttle opening or brake pressure. The following vehicle also contains a fast inner speed-servo loop. Its factory Nissan ACC accepts virtual LiDAR-relative distance and speed, then drives the engine and brakes. The team accepted this longer actuation chain because it reduced modifications to the original ECU. In return, the new controller had to include a factory controller it knew only partially in the closed loop and accept the roughly $0.3g$ braking limit available through that interface.[^bu-cacc]

Message identity matters too. The system enters CACC mode only after confirming that the LiDAR target is the same lead vehicle sending DSRC data. If the targets do not match, the state machine passes real LiDAR data back to the factory ACC. This state machine carries responsibility for mode semantics, interface routing, and fallback. Copying only the MPC formula would remove the part of the engineering design closest to its failure boundary.

The same FX45 can appear in both $W$ and $O$. As part of $W$, it is the vehicle we seek to describe and control, with mass, drag, actuation delay, and a driver. As part of $O$, it is the operational system into which the computational artifact is embedded, supplying CAN, sensing, communication, and braking interfaces. The framework distinguishes responsibilities; it does not require a separate physical object for each role.

Field feedback also changes the next round of information. A speed command changes vehicle motion, and motion changes LiDAR and CAN readings. The runtime flow of data and action is $W\to Z\to C\to O\to W$. $M$ supplies predictive semantics to $C$, while $S$ and $J$ supply requirements and selection criteria; they are computational dependencies, not runtime stages traversed by every sample. PATH also performs online identification, so it has a separate update edge $Z\to M_{T,\hat\theta_k}$, after which the new instance parameterizes the next execution of $C$. A system without online identification has no such runtime update edge.

### What Each of the Eight Roles Carries

All eight roles in the engineering model chain have now appeared:

| Role | Question in the PATH case |
|---|---|
| $P$: purpose and decision context | Why study shorter headways, and whose decision should the result support? |
| $W$: referent system | Which vehicles, roads, drivers, communication links, and disturbances belong to the problem? |
| $Z$: information and data | How are LiDAR, CAN, DSRC, and test records produced, and what delays or missing data do they contain? |
| $M$: semantic model | Which states, parameters, and dynamic relations constitute the currently admissible behavior? |
| $S$: specification and requirements | Which conditions govern spacing, comfort, actuation range, fallback, and acceptance? |
| $J$: operational criterion | Which quantities does the MPC calculate, optimize, or constrain? |
| $C$: computational artifact | How is $M_T$ encoded, how are identification and online optimization executed, and how does the artifact run under stopping and resource limits? |
| $O$: operational system | How does the artifact connect to the vehicle, protocols, clocks, driver, and field environment? |

The eight roles form a typed responsibility graph. Each node holds a kind of object, while each arrow records a transformation and its conditions. A computational budget may force engineers to shorten the prediction horizon or rewrite the objective. Interface tests may uncover an error in state interpretation, and road results may reopen the purpose and system boundary.

![The eight roles of the engineering model chain, two paths of use, and field feedback.](./engineering-model-chain/engineering-model-map.en.svg)

*Figure 3. The complete relational map of the engineering model chain. Qualification $Q$ attaches to specific claims and relations, while lifecycle trace $L$ runs along a version track, so neither appears as a ninth peer node.*

### "Correct" Needs an Object

The complete map separates correctness claims by address. From this point on, fix $M$ as the current fixed-parameter semantic model instance; at the current PATH sample it may be written $M_{T,\hat\theta_k}$. Let $q$ denote the qualification record attached to the current field claim, and let $\Xi_q$ denote the context domain declared by that record. Before comparing $M$ with $C$, also fix the qualified input class, aligned interfaces and observables, and a shared time base. The sets $B_M$ and $B_C$ below are defined relative to those conditions and are assumed nonempty. Define

$$
B_M:=\operatorname{Beh}(M),
\qquad
B_C=\llbracket C\rrbracket,
\qquad
B_O(\xi)=\operatorname{Beh}_{\mathrm{obs}}(O,\xi),
$$

as the behavior admitted by the semantic model, the execution behavior of the computational artifact, and the observable behaviors that a deployed instance may exhibit in operating context $\xi$. Specifications can be separated by the object that carries them:

$$
S=(S_M,S_C,S_O,S_R).
$$

$S_M$ constrains mathematical behavior, such as conservation or stability. $S_C$ constrains the artifact's resource use and failure behavior. $S_O$ constrains field safety and performance. $S_R$ records correspondence and error between model and artifact and between artifact and system. Here $B\models S$ means that every behavior in $B$ satisfies $S$. $R_{CM}$ carries only the $M$--$C$ part of $S_R$; the $C$--$O$ integration obligation is checked separately.

Write $b_C\sim_{CM}b_M$ when two behaviors match under the declared observation and error conditions. Implementation compatibility is

$$
R_{CM}(B_C,B_M)
\quad:\Longleftrightarrow\quad
\forall b_C\in B_C\;\exists b_M\in B_M:
b_C\sim_{CM}b_M.
$$

This is a one-way statement from $C$ to $M$: every computational behavior is compatible with some model behavior. It establishes neither reverse coverage nor behavioral equivalence, performance, field correctness, or substitutability. A layered check can place four separate claims side by side:

$$
B_M\models S_M,
\qquad
R_{CM}(B_C,B_M),
\qquad
B_C\models S_C,
\qquad
\forall\xi\in\Xi_q,\;
\Bigl(
B_O(\xi)\neq\varnothing
\;\land\;
\forall b\in B_O(\xi),\;b\models S_O
\Bigr).
$$

A mathematical proof may support the first claim; error analysis or refinement evidence examines $R_{CM}$; artifact tests examine the third. The field claim also needs integration evidence for $C\to O$ and coverage of the context domain $\Xi_q$ carried by qualification record $q$. Because the first three claims do not contain those conditions, the following formal nonimplication remains:

$$
\bigl(
B_M\models S_M
\;\land\;
R_{CM}(B_C,B_M)
\;\land\;
B_C\models S_C
\bigr)
\nRightarrow
\forall\xi\in\Xi_q,\;
\Bigl(
B_O(\xi)\neq\varnothing
\;\land\;
\forall b\in B_O(\xi),\;b\models S_O
\Bigr).
$$

PATH road tests observe responses for finite vehicles under finite conditions; they do not carry a quantifier over arbitrary platoon length. Abstract proof, software testing, and road experiments supply evidence along different relations. Qualification connects them to the present use.

## Trust Has an Address and a Time

"This model has been validated" sounds complete, but it lacks an object and conditions. Which claim was validated, for what use, with which version, and over what domain? Accuracy on a held-out test set, mesh convergence in a fluid solver, a stability proof for a control law, and one public-road test can all be strong evidence. They support different claims.

Collect claim-specific qualification records as $Q=\{q_k\}$; the $q$ introduced above is one such record. Each record states the use, assumptions, evidence, uncertainty, context or validity domain, residual risk, and version. $Q$ gives every engineering judgment an address: the object or relation on which the claim falls, the source of evidence, and the operational setting that the evidence can support.

The PATH paper can support a claim of this form: in the reported proving-ground scenarios and one public-road test, the prototype tracked selected headways between 0.6 and 1.1 seconds; a three-vehicle test also observed an improved following response under CACC compared with the factory ACC. The paper records the two-vehicle architecture, the roughly $0.3g$ braking limit, the purpose of studying short headways, and the test scenarios. Rewriting the claim as "any CACC platoon is safe on public roads" changes its subject, quantifier, and use beyond the evidence.

NASA's standard for models and simulations incorporates this relation into engineering procedure. NASA-STD-7009B defines permissible use through intended use, assumptions and abstractions, model limitations, and the verification and validation domains. When a proposed use arises, engineers must compare it again with the permissible use and record both the actual use and the specific version.[^nasa-7009] Qualification therefore addresses a concrete capability: whether a particular version can produce the required class of results for a specified use and validity domain.

### Two Evidence Paths Address Different Relations

The Turbulence Modeling Resource (TMR) makes evidence addresses unusually clear. It fixes a turbulence-model version, equations, boundary conditions, meshes, and reference results so that different CFD implementations can be compared around the same problem. The pages for the standard Spalart-Allmaras (SA) model expose two distinct evidence paths.[^tmr]

In the three-dimensional bump-in-channel verification case, CFL3D and FUN3D each compute solutions on five nested mesh levels. Engineers inspect trends under mesh refinement and compare how different codes implement the same equations and boundary conditions. Where quantities from both codes converge along a common trend, agreement strengthens the case that the programs consistently solve the declared mathematical problem. The TMR page keeps this question separate from whether the model matches experiments well.

In the two-dimensional convex-curvature validation case, results from three codes on the same $513\times193$ mesh nearly coincide and are then compared with revised experimental data. Code agreement makes a code defect a less likely explanation for any discrepancy. The remaining gap between computation and experiment must still be interpreted among model form, discretization error, boundary conditions, and experimental uncertainty. The page also states that it contains no full grid study, so the results are representative comparisons rather than "truth."

The two paths address different relations. Code and solution verification examines the implementation relation between $C$ and $M$, including whether the artifact solves the specified mathematical problem and with how much numerical error. Model validation examines the empirical representation relation: how far computed results lie from the experimental referent for a given use, condition, and quantity of interest. Uncertainty quantification then traces how inputs, parameters, numerical error, and model discrepancy enter the claim. Industrial VVUQ practice therefore records code verification and experimental comparison separately.[^nist-vvuq]

![A traffic runtime loop and semantic dependency, the two TMR evidence paths, and the effects of version changes on qualification.](./engineering-model-chain/evidence-address-and-version.en.svg)

*Figure 4. Evidence has an object address and a version address. Code agreement, physical validation, and field performance accumulate along different relations. When an object changes, engineers must check which old claims can still carry their evidence.*

Once evidence has an object address, the next question is whether it survives a change to that object.

### A Change Determines How Far Old Evidence Can Travel

Let $\mathcal G_t$ denote the objects and relations in the current case. $L$ is a set of lifecycle entries; each entry stores one change, the claims it affects, and the requalification decision:

$$
L=\{\ell_t\}_t,
\qquad
\ell_t:\quad
\mathcal G_t\xrightarrow{\Delta_t}\mathcal G_{t+1}.
$$

$\Delta_t$ records what the change touched; merely recording that an "upgrade" occurred lacks that resolution. Replacing a solver may leave the semantic model intact while invalidating prior numerical evidence. A parameter update creates a new model instance, while some solver tests may still carry over.

| Change | Where the new identity usually lies | Relation to recheck first |
|---|---|---|
| Online identification produces new fixed parameters | $M_{\hat\theta}$ | Parameter validity domain, prediction error, and control qualification |
| The mathematical discretization scheme changes | $M_T$, and usually a new $C_v$ as well | Discrete semantics, approximation error, and $R_{CM}$ |
| Solver, tolerance, numerical precision, or code changes | $C_v$ | $R_{CM}$, numerical error, and real-time performance |
| Sensor, protocol, or message topology changes | $O_{v,d}$ | Observation, interface, closed-loop behavior, and fallback |
| The same result is used for a new decision | $P$ and $Q$ | Proposed use against existing permissible use |
| Training data or objective changes and the system is retrained | $Z,J$; after retraining, a new $M_{\hat\theta}$ | Data lineage, proxy relation, and downstream behavior |

Old evidence can migrate only when the objects and assumptions on which it depends remain unaffected. A version number locates the change; impact analysis and any necessary retesting determine whether prior evidence can still be used.

Adaptive systems bring this question into runtime. A change in parameters, structure, objective, or interface places at least one new object or relation in $\mathcal G_{t+1}$; its identity lies in $M$, $J$, $C$, or $O$ according to where the update occurs. A governed system lineage can reuse old evidence only when its update range, triggers, acceptance criteria, monitoring, and fallback have already been recorded. The FDA's predetermined change control plan for AI-enabled medical-device software provides one regulated example.[^fda-pccp]

For online learning, the qualified object includes current weights, the update rule, and fallback arrangements. When a change leaves the established envelope, $Q$ must reassess fitness for the new objects and relations.

## Where the Chain Contracts

A relational map that requires every case to fill the same nodes is only another property sheet. A static traffic relation supplies a missing-feature case.

### Remove "Dynamics": Static Relations Still Pass Through the Engineering Chain

The macroscopic traffic-flow theory of Lighthill and Whitham begins with a static relation: flow $q$ depends on vehicle concentration $k$,

$$
q=f(k).
$$

This relation has no temporal state. Combining it with vehicle conservation yields what is now called the kinematic-wave equation,

$$
\partial_t k+\partial_x f(k)=0.
$$

The extended semantic model therefore contains both a static flow-concentration relation and a differential operator constraining the full space-time field. The original paper situates its continuum approximation among many vehicles on long, congested roads and describes the empirical support available at the time as qualitative agreement. That boundary belongs to the model's interpretation along with the equation.[^lwr]

If an engineer uses only $q=f(k)$ for one capacity calculation, the computational artifact may shrink to a lookup table or a manual calculation procedure. Field deployment $O$ can be marked not applicable. Purpose $P$, referent $W$, semantic model $M$, computation $C$, and qualification $Q$ remain. With no data, $Z$ need not be invented. With no optimization task, $J$ can also be absent.

An absent role changes the kinds of claims available. Without field deployment, the definition and computational procedure can still establish whether a capacity calculation is correct. But a claim about closed-loop vehicle behavior has no evidence address here, because the material contains no such observations. A mathematical object that has not entered an engineering judgment or module needs no invented purpose, deployment, or qualification record. The chain addresses only the part of its history in engineering work.

### Generality Lies in the Relations

A static relation has no temporal state, TMR's offline computation has no deployment loop, and the PATH prototype traverses the full closed loop. One table of internal model properties cannot accommodate these differences. The questions at the relational level remain the same: how does purpose bound a referent, how does semantics become computation, where is the result used, and which version does the evidence cover?

"Chain" means a chain of reasons. Engineers can follow it from purpose to result or trace an anomaly backward through versions, interfaces, and assumptions. The internal mathematics of $M$ belongs to the specific modeling language.

## Five Questions to Ask About Your Model

Return to the two Infinitis. An engineering discussion may use "model" for the vehicle equations in the paper, the parameters obtained through online identification, the control program running on the PC104, and the vehicle-following system on public roads. We can now see the transformations hidden by that name. Purpose sets a boundary around the road. Sensors produce delayed data. Equations define admissible behavior. Objectives and constraints operationalize engineering requirements. A discrete recurrence defines the semantic model used at the current time scale, while its encoding and solver produce actual output. Interfaces deliver that output to the factory ACC, and tests provide evidence for a particular version under specified conditions.

You do not need to draw the full eight-node graph before discussing your own model. Begin with the most important engineering claim on your desk and ask five questions in sequence:

1. **Which object am I talking about?** A model family, a calibrated or trained instance, an executable artifact, or a deployed instance with a specified installation and configuration?
2. **What does it refer to?** Which referent system did the present purpose select? What did we observe as $Z$, and what did we posit as $M$?
3. **How does mathematics become computation?** How does the real specification $S$ enter operational criterion $J$, how do continuous semantics become a discrete model $M_T$, and how do encoding, solution, and hardware form $C$?
4. **Where does the output go?** Does it return one offline judgment, or enter $O$ and change $W$ through interfaces, clocks, and actuators?
5. **How far can the evidence accompany the claim?** Which assumptions, validity domain, and versions support the claim, and which changes would trigger requalification?

Engineers still choose the equations, controllers, network architectures, and validation standards. These five questions return each kind of knowledge to the position it can support and keep transformation losses visible. Once the objects, relations, and evidence are named, an engineering judgment has a chain of reasons that others can inspect and requalify.

### Further Reading: Three Views of Engineering Models

This essay treats $M$ as a semantic object in the narrow sense and follows its external relations to referent, computation, deployment, and evidence. [*What Is Inside a Model?*](/en/posts/inside-the-model/) opens the black box and separates formal interpretation from empirical representation. [*How a Model Becomes a Component*](/en/posts/model-as-open-component/) handles the open boundary. In the deterministic or nondeterministic trace-semantics branch, suppose $\operatorname{Beh}_{\Sigma}(M)\subseteq\operatorname{Tr}(\Sigma)$ and $I$ is formed from exposed quantities of $\Sigma$ together with declared timing and protocol conventions. The restriction map and boundary behavior are then

$$
\pi_I:\operatorname{Tr}(\Sigma)\to\operatorname{Tr}(I),
\qquad
\mathcal B_m:=\pi_I\bigl[\operatorname{Beh}_{\Sigma}(M)\bigr].
$$

Probabilistic, optimization, and causal components retain their own semantic objects rather than being forced into this trace formula. The third essay owns the choice of $I$, wiring, contracts, and replacement obligations. The three essays change observational scale without competing for the same definition.

---

[^bu-cacc]: Fanping Bu, Han-Shue Tan, and Jihua Huang, "Design and Field Testing of a Cooperative Adaptive Cruise Control System," *Proceedings of the 2010 American Control Conference*, pp. 4616-4621, [DOI: 10.1109/ACC.2010.5531155](https://doi.org/10.1109/ACC.2010.5531155). See Sections II-III.A for the system architecture and fallback, Section III.C for the model, online identification, MPC cost, and constraints, and Section IV for the finite-vehicle and road tests.

[^representation]: Ronald Giere, "How Models Are Used to Represent Reality," *Philosophy of Science* 71, 2004, pp. 742-752, [DOI: 10.1086/425063](https://doi.org/10.1086/425063). Giere's original formulation describes an agent using a model to represent the world for a purpose; this essay adds $\rho$ as a record of reference, operational definitions, and empirical translation.

[^ibrahim-dmpc]: Amr M. E. Ibrahim et al., "Multi-layer Multi-rate Model Predictive Control for Vehicle Platooning under IEEE 802.11p," *Transportation Research Part C* 124, 2021, article 102905, [DOI: 10.1016/j.trc.2020.102905](https://doi.org/10.1016/j.trc.2020.102905), [open full text](https://publications.tno.nl/publication/34637756/t9G0Ez/ibrahim-2021-multi-layer.pdf). See Sections 3 and 8 for the control architecture, and Section 10 for the embedded implementation and experimental scope.

[^nasa-7009]: NASA, *NASA-STD-7009B: Standard for Models and Simulations*, 2024, [standard page](https://standards.nasa.gov/standard/nasa/nasa-std-7009), [PDF](https://standards.nasa.gov/sites/default/files/standards/NASA/B/1/NASA-STD-7009B-Final-3-5-2024.pdf). See Sections 4.2.1.7 and 4.3.1, and Appendix F.

[^tmr]: Turbulence Modeling Resource, [TMR home page](https://tmbwg.github.io/turbmodels/), [standard-SA 3D bump verification](https://tmbwg.github.io/turbmodels/bump3d_sa.html), and [standard-SA convex-curvature validation](https://tmbwg.github.io/turbmodels/smitscurve_val_sa.html). The resource is now guided by the Turbulence Model Benchmarking Working Group of the AIAA Fluid Dynamics Technical Committee.

[^nist-vvuq]: DongHun Yeo, *A Summary of Industrial Verification, Validation, and Uncertainty Quantification Procedures in Computational Fluid Dynamics*, NISTIR 8298, 2020, [DOI: 10.6028/NIST.IR.8298](https://doi.org/10.6028/NIST.IR.8298), [NIST page](https://www.nist.gov/publications/summary-industrial-verification-validation-and-uncertainty-quantification-procedures).

[^fda-pccp]: US Food and Drug Administration, *Marketing Submission Recommendations for a Predetermined Change Control Plan for Artificial Intelligence-Enabled Device Software Functions*, final guidance, August 2025, [official page and PDF](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence). The guidance places predetermined modifications, verification and acceptance criteria, impact assessment, and ongoing monitoring in one governance record; a modification that fails preset criteria and cannot be corrected should be recorded as failed and withheld. See Sections III and V-VIII.

[^lwr]: M. J. Lighthill and G. B. Whitham, "On Kinematic Waves II. A Theory of Traffic Flow on Long Crowded Roads," *Proceedings of the Royal Society A* 229, 1955, [DOI: 10.1098/rspa.1955.0089](https://doi.org/10.1098/rspa.1955.0089), [open reprint](https://onlinepubs.trb.org/Onlinepubs/sr/sr79/79-002.pdf). See Sections 1-2 for the static flow-concentration assumption and the conservation derivation.
