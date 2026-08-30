---
title: 'How a Model Becomes a Component: Ports, Behavior, Contracts, and Substitutability'
postSlug: model-as-open-component
published: 2026-08-22
updated: 2026-08-30
description: 'Starting with the replacement of one controlled vehicle in a heterogeneous platoon, this essay explains how a model acquires an open boundary, how wiring produces system behavior, and which forms of contract refinement can justify substitution in context.'
image: './model-as-open-component/model-as-open-component-cover.webp'
tags: [engineering models, model composition, contract theory, formal methods, traffic control, systems engineering]
category: 'Engineering Practice'
draft: false
lang: en
---

## One Plug, Two System Behaviors

Consider a four-vehicle platoon undergoing a version upgrade. An engineer plans to replace the control module on the second follower with a candidate release. Both modules use the same connector, read the same CAN and V2V fields, and output desired acceleration over the same range. The candidate has passed single-vehicle replay tests and even reduced the spacing-tracking error. A change process that asks only whether the interface matches and the new version is more accurate would approve the replacement.

The engineer changes only the control module; the relevant unit of comparison and qualification is the controlled vehicle before and after the upgrade. Its unchanged communication stack, state estimator, low-level actuators, and vehicle dynamics remain inside the common boundary because they join the control module in determining the messages and motions visible to the platoon.

The platoon integration engineer withholds approval. The original system publishes a platooning control message every 50 ms; the candidate controller produces a new computation every 100 ms. A slower control computation does not by itself set the packet rate. The failure case therefore needs explicit integration assumptions: the candidate's PCM publisher advances its sequence number and generation time only after a new computation, no 20 Hz hold-last publisher or rate adapter is present, and the neighboring-vehicle monitor resets its watchdog only for a frame it judges fresh. Fresh PCMs are then 100 ms apart. Losing one extends that interval to 200 ms, crosses the 150 ms timeout, and initiates a front split or back split. The ENSEMBLE multi-brand specification supplies the 20 Hz PCM rate, 50 ms update expectation, and 150 ms timeout; the publisher and freshness rules belong to this constructed integration case.[^ensemble-protocol]

With an adapter that continues publishing at 20 Hz, the transport watchdog may keep resetting. The obligation then moves to the age of repeated fields and the resulting closed-loop error: a new sequence number does not imply a new control computation, while generation time or field-level timestamps reveal how old the downstream data is.

A field table records the shape of instantaneous data; the system difference lies in the interaction history. The candidate "plugs in" and performs better on a single-vehicle metric. Conclusions about platoon cohesion, disturbance propagation, and safe headway each depend on a larger context.

An auditable substitution claim names the object, admissible environments, observations, and properties to preserve, then gives the result of carrying the local relation through wiring, feedback, and hidden signals. Platooning exposes the requirement because one vehicle's action becomes the next vehicle's input. The isolated comparison ends there.

## A Model Becomes a Component at Its Boundary

Start by deciding where to draw the box. The same platoon-control problem admits at least three cuts. The box may contain only the control law, leaving vehicle dynamics, state estimation, the communication stack, and actuators in the environment. It may instead contain the controller and vehicle, with radar observations, V2V messages, management commands, and vehicle motion at the exposed surface. Pull the boundary out once more and the entire platoon becomes a component whose environment is road traffic and a dispatch system.

The three cuts answer different questions. Replacing a control law requires the candidate to fit an existing vehicle. Replacing a controlled vehicle moves its dynamics and low-level actuators inside the candidate component. Presenting the whole platoon to a higher-level scheduler turns inter-vehicle communication and following errors into internal variables. A change of boundary changes the referents of "same interface" and "preserved behavior."

Herbert Simon used near decomposability to explain why complex systems sometimes support hierarchical study. An observer may provisionally encapsulate detail when interactions within a component are stronger, on the relevant time scale, than interactions between components. That warrant depends on scale and purpose. A vehicle controller may form a separate unit in a millisecond execution loop. A study of a platoon on a long descent may have to enlarge the boundary to include brake temperature, payload, and the responses of following vehicles.[^simon]

A component boundary can be described by the typed signature

$$
I=(\mathsf{Ports},\operatorname{type},\operatorname{role},\operatorname{clock}).
$$

$\mathsf{Ports}$ is the set of ports. $\operatorname{type}$ records value domains, units, or dimensions; $\operatorname{role}$ distinguishes inputs, outputs, and physical ports with no predetermined causal direction; $\operatorname{clock}$ records continuous time, discrete sampling, message freshness, and permitted protocol order. The previous essay used $\Sigma$ for every well-formed symbol and type inside a model. Here $I$ consists of the quantities exposed for composition together with the timing, protocol, and capability conventions declared for this use. It is an open-interface view, not a replacement for the complete signature. Without a unit annotation, meters per second and kilometers per hour both pass a floating-point memory-layout check. Without a clock, a 10 Hz message port and a 20 Hz port look identical.

For follower $i$, a schematic control boundary might begin with

$$
u_i=
\pi_i\bigl(
d_i,\Delta v_i,a_{i-1}^{\mathrm{msg}},
x_i^{\mathrm{est}},r_i
\bigr).
$$

Here $d_i$ is distance to the preceding vehicle, $\Delta v_i$ is relative velocity, $a_{i-1}^{\mathrm{msg}}$ is the predecessor acceleration received over the communication link, $x_i^{\mathrm{est}}$ is the vehicle's estimated state, and $r_i$ contains the reference speed or desired time gap. The output $u_i$ is desired acceleration. This equation exposes only the functional interface of the control law. If the replacement object is a controlled vehicle, the boundary must also accommodate sensor timestamps, message sequence numbers, vehicle length, road grade, actuator requests, state broadcasts to the following vehicle, and join, leave, and failure modes.

Port roles cannot all be flattened into software-function inputs and outputs. Voltage and current at an electrical port, or force and velocity at a mechanical port, are often connected through conservation laws or power-conjugate variables. Forcing a causal direction onto such a physical connection can manufacture an ordering that does not exist in the composed model. Software messages, by contrast, often have a clear sender, receiver, and protocol state. A useful type system preserves that distinction.

![A controlled-vehicle boundary labels ports by value domain, unit, role, and clock. An acceleration message connects only when these agree; a unit mismatch or an event-triggered versus 10 Hz periodic timing mismatch cannot connect directly.](./model-as-open-component/typed-ports-wiring.en.svg)

*Figure 1. Port matching licenses an engineer to write down a wiring relation. It does not establish a closed-loop solution, an operating behavior, or a system guarantee.*

First restrict attention to deterministic or nondeterministic trace semantics. Let $\operatorname{Tr}(\Sigma)$ denote the type-correct histories over the complete signature and $\operatorname{Tr}(I)$ the type-correct boundary histories over the interface. Suppose the narrow semantic object $M$ admits full histories $\operatorname{Beh}_{\Sigma}(M)$ and $I$ is formed from the exposed quantities and timing and protocol conventions above. Then

$$
\begin{aligned}
\operatorname{Beh}_{\Sigma}(M)&\subseteq\operatorname{Tr}(\Sigma),
&
\pi_I&:\operatorname{Tr}(\Sigma)\to\operatorname{Tr}(I),\\
\mathcal B_m&:=\pi_I\bigl[\operatorname{Beh}_{\Sigma}(M)\bigr]
\subseteq\operatorname{Tr}(I),
&
m&=(I,\mathcal B_m).
\end{aligned}
$$

$\pi_I$ restricts a full history to its exposed quantities and timing, so $\mathcal B_m$ contains only the boundary behaviors that the component permits. Internal state equations, neural-network layers, filters, and solvers may all generate these histories. Distinct internal presentations may define the same model at the current observation boundary when their restricted admissible behaviors agree. Probability kernels, optimization orders, and causal intervention structures retain measures, values and order, and intervention semantics rather than being flattened into unweighted trace sets; the later cross-domain counterexamples change the boundary object with the semantic kind.

If a team also needs to state the conditions for reuse, it can attach a local contract $K$ to the behavioral model:

$$
c=(m,K).
$$

$m$ specifies what may happen at the boundary, while $K$ states the component's promise under specified environmental conditions. A mathematical model remains complete without an open boundary. Component identity arises only after a team chooses a purpose-specific contact surface, permitted connections, and observation scheme; drawing a box alone does not make the model reusable.

## Which Histories Survive Wiring

Connect the predecessor's message to the controller, the controller output to the low-level actuator, and vehicle motion back to the radar and the following vehicle. The lines on the drawing first prescribe how variables are equated, transformed, sampled, or conserved. A system run exists only when the local histories satisfy all those relations together.

Let $m_i=(I_i,\mathcal B_i)$ be a family of components and let $\omega$ be a wiring arrangement. Construct a common history space $\operatorname{Tr}_\omega$ that contains every external and internal port. A wiring relation $R_\omega\subseteq\operatorname{Tr}_\omega$ constrains histories in that space, while restriction maps $r_i:\operatorname{Tr}_\omega\to\operatorname{Tr}(I_i)$ send a global history to component $i$'s boundary. Once internal ports are hidden, the external behavior lies in $\operatorname{Tr}(I_{\mathrm{ext}})$:

$$
\mathcal B_{\omega(m_1,\ldots,m_n)}
=
\operatorname{proj}_{\operatorname{Tr}(I_{\mathrm{ext}})}
\left(
R_\omega\cap\bigcap_i r_i^{-1}(\mathcal B_i)
\right).
$$

The intersection requires every local model and every wire to describe the same run consistently. Projection forgets signals that an external observer cannot see. An external history enters the composite behavior only when at least one internal history makes all component behaviors and wiring constraints hold at once. Hiding removes the observer's ability to distinguish the witness; its constraints remain in the result.

Willems's behavioral approach describes a dynamical system by a time axis, a signal space, and a set of admissible trajectories. Interconnection imposes joint constraints through shared variables, after which existential quantification hides latent variables and leaves the manifest behavior. This treatment avoids assuming in advance which variable is an input and which is an output, a useful feature for physical systems and feedback connections.[^willems] The notation $\mathcal B_m$ follows that discipline here. Probability distributions, optimization orderings, and causal interventions require their own semantic objects.

Typed wiring diagrams provide a syntax for nesting connected boxes. Vagner, Spivak, and Lerman organize boxes and wiring into an operad, then let the semantics of open dynamical systems follow nested composition.[^wiring] This structure keeps hierarchical expansion from changing the composite arbitrarily. Engineers choose the ports, delay limits, and properties to preserve; the composition operation follows the system's semantic type.

![Two open components share internal variables through a wiring relation. Intersection preserves histories that satisfy local behaviors and wiring constraints, and projection hides internal ports; two internal implementations can yield the same boundary relation under a selected observation.](./model-as-open-component/black-box-hiding.en.svg)

*Figure 2. Black-boxing preserves wiring constraints through the existence of an internal witness while forgetting the witness's value. Different implementations can produce the same boundary behavior under a chosen semantics and observation.*

Passive linear circuits provide a rigorous instance. Baez and Fong hide internal nodes to obtain a relation between potentials and currents at the terminals, and prove that this black-boxing operation preserves circuit composition. Different internal topologies can therefore have the same external relation.[^blackbox] Their result concerns passive linear networks, specified terminals, and Lagrangian relations. Other systems require their own black-box semantics.

A controlled-vehicle black box can hide internal differences in the same fashion. One release may use a Kalman filter and another a moving-horizon estimator. If both permit the same message and motion histories at the chosen boundary, the behavioral model can identify them. A following vehicle that relies on confidence intervals will expose a difference if the old boundary exports only point estimates. The next level of observation and context must decide whether the black box has hidden too much.

## Observation and Context Determine the Black Box

A replay bench feeds a candidate controller a fixed set of predecessor trajectories. Frame by frame, the candidate produces nearly the same acceleration as the old controller, building a collection of records in which the two appear behaviorally equivalent. Once installed, acceleration changes the vehicle's position; that position changes the next radar gap and the disturbance received by the following vehicle. The replay bench fixes the input history. In closed loop, the component helps generate its future inputs. These experiments place the component in different contexts.

We can reuse the observation scheme developed in the previous essay. An observation specification $v$ selects the external ports and time scale to retain, together with a deterministic projection, aggregation, or query. For a history-level observation, write $o_v:\operatorname{Tr}(I)\to\mathcal O_v$ and define $\Omega_v(\mathcal B)=o_v[\mathcal B]\in\mathcal P(\mathcal O_v)$ as the image of a behavior set. A set-level aggregation or query instead has type $\Omega_v:\mathcal P(\operatorname{Tr}(I))\to\mathcal O_v$. In either case, the compared objects land in one common observation space. Exact behavioral equivalence is

$$
m\equiv_v m'
\quad\Longleftrightarrow\quad
\Omega_v(\mathcal B_m)
=
\Omega_v(\mathcal B_{m'}).
$$

If $v$ retains only desired acceleration sampled at 10 Hz, it may filter out 2 ms scheduling jitter. A deadline property requires that same jitter to remain visible. A query restricted to mean spacing error may also erase a brief unsafe approach. The retained quantities define what counts as the same black box. The equation above states exact equality under the selected observation. An approximate-substitution claim supplies its own error-propagation model and purpose-specific tolerance.

Finite replay compares only the histories covered by a test set. Contextual substitution carries a stronger quantifier. Let $E[-]$ denote a system with one component-sized hole. The family $\mathcal C_{\mathrm{adm}}$ contains only contexts whose hole has the interface type shared by $m$ and $m'$, and whose composite behaviors pass through $v$ into the same observation space. Observational equivalence can then be lifted to

$$
\forall E[-]\in\mathcal C_{\mathrm{adm}},
\qquad
\Omega_v\!\left(
\mathcal B_{E[m]}
\right)
=
\Omega_v\!\left(
\mathcal B_{E[m']}
\right).
$$

$\mathcal C_{\mathrm{adm}}$ may be restricted to one-vehicle-look-ahead topologies, a stated speed domain, bounded communication delays and losses, and neighbors that pass compatibility checks. The quantifier must cover the use domain promised by the change claim. A test of one four-vehicle formation supports that formation; arbitrary lengths, reorderings, and post-split formations require new context quantifiers and evidence.

In their work on concurrent processes, Hennessy and Milner connect observational equivalence with substitution into contexts. Equivalent processes can be placed in larger expressions without changing observations only when the equivalence is a congruence for the language's composition operators.[^context-equivalence] For an engineering component, substitution becomes a counterfactual conditional: if the candidate occupies the same position in an admissible context, selected observations agree or required properties continue to hold. The engineering task supplies the context family, physical domain, and error criteria.

This account also clarifies the philosophical status of a boundary. A component boundary is a cut made for reasoning, and black-boxing is a form of forgetting with an explicit retention rule. The object does not determine one purpose-independent black-box specification. A team selects the interactions to expose, then uses experiment or proof to show that hidden differences leave its present conclusion intact. Two controllers may produce similar commands on the same replay set because both capture the relevant vehicle dynamics, or because the test never excites their differences.

An observation relation turns "they look the same" into an auditable statement. Better performance under low network latency establishes a behavioral fact over one domain. A contract then states who provides that latency and what the controller promises when the network leaves the domain.

## Contracts Attach Conditions to Guarantees

Suppose the old controller guarantees that the propagation gain between adjacent vehicles remains below $0.9$ when communication delay is at most 50 ms, messages arrive at 20 Hz, and actuator lag stays within a specified interval. The candidate reduces the gain to $0.7$, and its proof domain ends at 20 ms. Candidate guarantees are absent for the 20-to-50 ms histories covered by the old controller.

For the platoon calculation, one assume-guarantee contract over a fixed universe of boundary behaviors is enough:[^contracts]

$$
K=(A,G),
\qquad
A,G\subseteq\operatorname{Tr}(I).
$$

$A$ and $G$ are predicates, or subsets, over complete boundary histories. $A$ primarily constrains coordinates controlled by the environment; $G$ constrains coordinates for which the component is responsible, or the joint history as a whole. A behavioral model $m=(I,\mathcal B_m)$ satisfies the contract exactly when

$$
m\models K
\quad\Longleftrightarrow\quad
\mathcal B_m\cap A\subseteq G.
$$

During composition, engineers first lift each local predicate along the port maps into a common global history space. Here $A$ and $G$ are trace properties; state machines, probability bounds, and resource budgets require their own satisfaction relations and composition operations. When an environment history belongs to $A$, the component behavior must belong to $G$.

For a common alphabet, common property universe, and normalized representation, the following strong conditions provide a convenient sufficient check:

$$
A_{\mathrm{old}}\subseteq A_{\mathrm{new}},
\qquad
G_{\mathrm{new}}\subseteq G_{\mathrm{old}}.
$$

The first inclusion makes the candidate accept every environment accepted by the old component; the second narrows the candidate's admitted behavior. Under the current normalized trace-property representation, these inclusions suffice for contract refinement. The 20 ms candidate achieves a smaller gain only in its narrow domain, leaving the old controller's 20-to-50 ms range without a candidate guarantee. Narrowing the network delay requires one system change that also includes monitoring and fallback logic.

Once contracts are composed, no local $G_i$ can be used without support. For component $i$, the external assumptions, wiring relations, and partner guarantees must jointly imply its assumption:

$$
R_\omega\land A_{\mathrm{ext}}
\land\bigwedge_{j\ne i}G_j
\models A_i.
$$

The second obligation derives the required system guarantee from all local guarantees and the wiring relation:

$$
R_\omega\land A_{\mathrm{ext}}
\land\bigwedge_iG_i
\models G_{\mathrm{sys}}.
$$

These formulas list proof obligations. In an acyclic connection, assumptions can be discharged in topological order using established partner guarantees. Feedback requires a temporal assume-guarantee rule with a base case and inductive invariant, or a separate noncircular global closure lemma. Setting $A_1=G_2$ and $A_2=G_1$ spends each conclusion before proving it. After assumption closure fails, the local proof remains mathematically correct but its premise is absent from the composition. A failed system implication may likewise leave the tail-disturbance bound or lost-link split behavior without an owner.

![The figure has three panels. The first derives the component result from environment E satisfying A and component m keeping behavior inside G under A. The second uses external assumptions, wiring, and peer guarantees to close every local assumption, then derives the system guarantee from local guarantees. The third shows one open assumption interrupting the system inference.](./model-as-open-component/assume-guarantee-closure.en.svg)

*Figure 3. A guarantee is conditional. A composition proof supplies every local assumption and derives the system property from local guarantees. The arrows mark proof obligations; a circular dependency leaves an assumption open.*

Delay, loss, actuator capability, and topology can enter a platoon contract. Each condition needs a measurable runtime predicate. A monitor cannot decide when to fall back if $A$ says only that "network conditions are good." A 20 ms delay limit needs a timestamp semantics, a measurement point, and defined behavior when the limit is exceeded. Enforceable conditions give a contract its engineering value; set notation alone does not.

## When Local Refinement Survives Composition

The next step uses a different candidate. Assume that it preserves the ports and passes the contract-inclusion check above; feedback well-posedness still requires a separate check. The platoon engineer establishes that the connected equations have a solution and that the relevant composition operations preserve local refinement. Contract compatibility asks whether an acceptable environment exists. Feedback well-posedness requires a unique, causal internal response for every external excitation.

Consider the feedback connection

$$
u=\Delta(y)+d_u,
\qquad
y=F(u)+d_y,
$$

and define

$$
\Phi(u,y)=
\bigl(u-\Delta(y),\,y-F(u)\bigr).
$$

Here $F$ and $\Delta$ are feedback operators on compatible extended signal spaces. $G$ continues to denote the contract guarantee used above, while $P$ in the first essay denotes purpose and decision context. In the control-theoretic definition used by Megretski and Rantzer, the interconnection is well posed when $\Phi^{-1}$ exists and is causal. Given an external disturbance $(d_u,d_y)$, the internal signals $(u,y)$ are then unique and cannot depend on the future. A further claim of $L_2$ stability requires $\Phi^{-1}$ to have finite induced gain on $L_2$.[^well-posedness]

Two scalar ports already provide counterexamples. The wiring

$$
y_1=y_2,
\qquad y_2=y_1
$$

has infinitely many solutions, while

$$
y_1=y_2+1,
\qquad y_2=y_1
$$

has none. At the type level, both systems connect scalar ports without a unit or role mismatch. The semantics of the closed-loop equations decides whether the system can run.

Let $c$ be the original component, $c'$ the candidate, and $\Psi_{\mathrm{req}}$ the set of properties to preserve. Write $X\downarrow$ when the composite object $X$ is well posed. The contextual substitution target is

$$
c'\sqsubseteq_{\mathcal C_{\mathrm{adm}},\Psi_{\mathrm{req}}}c
\quad\Longleftrightarrow\quad
\forall E[-]\in\mathcal C_{\mathrm{adm}},
\quad E[c]\downarrow\Rightarrow
\left(
E[c']\downarrow
\ \land\
\forall\psi\in\Psi_{\mathrm{req}},\quad
E[c]\models\psi\Rightarrow E[c']\models\psi
\right).
$$

The context family, property set, and satisfaction relation in this definition each require an operational meaning. $\mathcal C_{\mathrm{adm}}$ lists the system environments that may occur. $\Psi_{\mathrm{req}}$ lists the properties that this change must preserve. $\models$ uses the judgment appropriate to each property. Whenever the baseline composition is well posed, the candidate composition must remain well posed and retain each target property already satisfied by the baseline. In a platoon, the judgment may use trace inclusion or induced gain. Other semantic objects require other satisfaction relations.

The symbol $\preceq_{\mathrm{loc}}$ is defined separately for each concrete semantics: it may denote trace inclusion, contract refinement, or a simulation relation, with direction and premises fixed by that semantics. Once the relation is fixed, modular reasoning requires it to be a precongruence for the wiring operations in use:

$$
c'\preceq_{\mathrm{loc}} c
\quad\Longrightarrow\quad
\omega(\ldots,c',\ldots)
\preceq_{\mathrm{loc}}
\omega(\ldots,c,\ldots).
$$

Each operator in use changes the semantics: hiding, renaming, serial or parallel composition, and feedback. Local contract refinement is modular only after monotonicity has been proved for those operators. The contextual relation is a precongruence only when $\mathcal C_{\mathrm{adm}}$ is closed under the relevant composition, and it remains distinct from local refinement. Work on input/output automata proves preservation for specified operators and has also exposed boundaries that require correction under more general nondeterminism.[^precongruence]

![The figure has three panels. The baseline places component c in an admissible context E[-] and checks that the composition is well posed and satisfies property ψ. Candidate c′ must cover A_old and, within A_old, keep admitted behavior inside G_old; wiring must preserve local refinement, and the candidate composition must remain well posed and satisfy ψ. Same-interface candidate c″ can still invalidate the system claim through new boundary behavior, extra environmental conditions, or ill-posed feedback.](./model-as-open-component/contextual-substitution.en.svg)

*Figure 4. The set relations check whether the candidate covers the old environment and narrows admitted behavior within $A_{\mathrm{old}}$. Monotonicity under wiring, feedback well-posedness, and preservation of property $\psi$ are separate system-level obligations.*

This definition also limits the inflated reading of "all contexts." Purpose and contract determine the admissible family. A component specified only for constant-time-headway following on highways need not be equivalent in low-speed mining convoys, urban cut-in traffic, or racetrack operation. Conversely, an engineer cannot validate against one convenient set of neighbors and then declare that the vehicle supports arbitrary formations.

An evidence address records the claim, object, use domain, and version to which a piece of evidence is bound. The contextual relation first constrains semantic models. If a change also reaches generated code, a processor, or a vehicle, the computational artifact and deployed instance require renewed evidence at their own addresses. A precongruence theorem cannot test deadlines on a new processor or measure the response lag of a new braking system.

## Replacing That One Vehicle in the Platoon

Return to the opening candidate controlled vehicle and place it in the second-follower position. Its boundary contains the communication stack, state estimator, low-level actuation, and vehicle dynamics. Message arrival and vehicle response form one causal chain, so the platoon is the evaluation address for disturbance propagation and safety.

### Clock and Vehicle Jointly Shape the Propagation Channel

The ENSEMBLE platooning control message carries position, motion state, generation time, and a sequence number. Position and heading must be interpreted with message age, while CAN and GNSS fields may update at different rates. Feedback from the seven-brand tests therefore called for separate timestamps for field groups. At a nominal 50 ms period, two consecutive losses place the next frame exactly 150 ms after the last reception. Whether that frame arrives in time depends on a strict $>$ versus inclusive $\ge$ timeout test, the ordering of receive and timer tasks, and scheduling jitter. "Two losses are tolerated" is therefore not an unconditional result. A split status sent once may also disappear without warning. Fields, timing, and the rules after loss jointly define the communication port.[^ensemble-spec]

Under the opening's three assumptions—a computation-coupled publisher, no rate adapter, and a watchdog that counts only fresh frames—the 10 Hz controller produces fresh PCMs 100 ms apart. One loss extends the interval to 200 ms, unambiguously crossing the 150 ms watchdog. A resulting split changes the topology and the address of every propagation result proved for the fixed formation. With a 20 Hz hold-last adapter, the one-loss timeout caused by the 10 Hz computation no longer follows. Ordinary consecutive packet losses still face the 150 ms boundary described above, and the engineer must also trace field age into $H_i$ and the closed-loop error.

The same control formula on a different vehicle forms a different closed loop with sensor delay and actuator lag. In Wang and colleagues' linear constant-time-headway ACC model, powertrain lag $\tau_i$, sensing delay $\xi_i$, target headway $t_{d,i}$, and controller gains all enter the propagation channel:

$$
H_i(s)=
\frac{
(k_{v,i}s+k_{s,i})e^{-\xi_i s}
}{
\tau_i s^3+s^2+
(k_{v,i}+t_{d,i}k_{s,i})se^{-\xi_i s}
+k_{s,i}e^{-\xi_i s}
}.
$$

Any change to sensor filtering, brake response, or target headway rewrites $H_i$. Wang and colleagues derive sufficient conditions and run simulations for a linearized, unconnected, heterogeneous ACC model. The test domain is that model and its parameter range; CACC protocol failures, physical road behavior, and nonlinear emergency braking lie outside the claim domain.[^wang]

### Full Formation, Split Point, and Safety Envelope Have Different Addresses

Let $E_i$ be the spacing error at follower position $i$, with

$$
E_i(s)=H_i(s)E_{i-1}(s),
\qquad
\|H_i\|_{\mathcal H_\infty}\le\gamma_i.
$$

For stable causal LTI channels in cascade under equilibrium initial conditions, submultiplicativity of the induced norm gives

$$
\|E_n\|_2
\le
\left(\prod_{i=1}^{n}\gamma_i\right)
\|E_0\|_2.
$$

If every channel in the admissible contexts satisfies $\gamma_i\le1$, then a stable candidate channel with $\gamma_k'\le1$ preserves nonamplification at each vehicle along the same kind of cascade. If the team checks only

$$
\gamma_k'
\prod_{i\ne k}\gamma_i
\le1,
$$

it has established a head-to-tail bound for the full formation. Reordering position-independent scalar $\gamma_i$ values leaves the full product unchanged but changes prefix products and the location of amplification. If $H_i$ depends on neighbors, position, or mode, reordering also redefines the factors. Panels 4(b) and 4(e) of Wang et al. show a four-vehicle case in which the middle follower amplifies a disturbance and the last follower attenuates it. A split after the middle follower removes that attenuation. The simulation supports the endpoint bound for the complete formation; a post-split prefix has a different address.

A second-predecessor message adds a port and an environmental obligation, and it changes the propagation channel. Ploeg and colleagues' one-vehicle and two-vehicle look-ahead conditions apply to different topologies; the latter can define a new design, but it is not a local refinement under the original single-predecessor contract.[^ploeg] A loss of connectivity that changes CACC into ACC likewise changes ports, controller, and guarantees. Each mode and switching trace needs its own behavioral conditions.

String-stability analysis compares the $L_2$ energy of complete error histories; minimum distance at each instant is a pointwise safety constraint. Vehicles may have small $L_2$ errors between successive followers yet cross a safety limit during a short braking peak. Actuator saturation, cut-ins, and tire adhesion also sit outside the linear propagation channel.

ENSEMBLE assigns these responsibilities separately in its Platooning Support Function. Drivers normally choose a target headway between 1.4 s and 1.6 s, while the realized headway must remain at or above 0.8 s. A separate steady-state requirement prevents velocity disturbances from growing. Before the collision-warning sequence is complete, the initial brake request is limited to $-3.5\,\mathrm{m/s^2}$; stronger braking requires additional sensors to verify the risk. The specification also treats brake temperature, tire type and wear, payload, and road conditions as factors that alter braking capability.[^ensemble-spec]

Under the stable causal LTI assumptions above, $\|H_i\|_{\mathcal H_\infty}$ gives the induced $L_2$ energy gain of the spacing-error channel. The 0.8 s requirement is a pointwise lower bound on realized time headway, while braking rules govern mode transitions and actuator action. If a lower propagation gain demands a larger instantaneous brake command, the PSF physical envelope decides whether the candidate can be deployed.

### Code and Vehicle Carry Different Evidence Addresses

Ibrahim and colleagues deployed an upper-layer 10 Hz optimizer and lower-level feedback running every 2 ms on four Cohda MK5 units. MATLAB generated the code, continuous-to-discrete conversion used an approximation, and an external library supplied eigenvalue calculations. After packet loss, the upper layer held the previous desired acceleration. Occasional lower-level delays under Ubuntu briefly "froze" the simulated vehicle state.[^ibrahim]

This HIL experiment tests the embedded realization while vehicle states remain simulated. Physical dynamics and real sensors belong to another validation. After a change to generated code, a library, or a processor, unaffected mathematical steps can be reused; deadline evidence for the old binary stays at the old artifact address.

ENSEMBLE's white-label truck provides a concrete composition case. The project specified a common tactical layer, state and attribute exchange, and V2X protocol across multiple vehicle brands, while allowing each OEM to implement its own longitudinal control, sensors, and braking system. Capability information also enters the composition: vehicles propagate constraints such as maximum acceleration request and desired maximum velocity through the platoon, allowing upstream control to adapt to its most limited member. The project implemented, tested, and evaluated the Platooning Support Function across seven brands.[^ensemble-spec]

These results establish interoperability for the tested seven-brand Platooning Support Function under its common protocol and capability propagation rules. A hot swap of any schema-compatible controller and an arbitrary platoon length exceed the test. The corresponding Platooning Autonomous Function work remained a theoretical specification.

After replacing the old controller, engineers recompute propagation along the clocked external boundary and use the original vehicle and actuator envelope to check the candidate's delay, loss handling, constraints, and fallback behavior. The substitution holds only if the platoon remains inside its headway and braking envelope after one-vehicle-look-ahead wiring and topology changes. A change to code, ECU, communication configuration, or vehicle reopens the corresponding evidence; records remain reusable where both object and address are unchanged.

## Carrying the Substitution Test into Other Systems

Three short counterexamples test the substitution relation away from platooning. Each retains an open boundary and context quantifier while using its own semantic object.

### FMI: Rollback Capability Belongs to the Co-Simulation Interface

FMI 3.0.2 allows an importer to restore each FMU to a prior state after a failed step and retry with a shorter step. An importer that relies on this path adds an explicit capability to its slot: the candidate FMU must support the required get/set state operations. A candidate may preserve every scalar variable yet interrupt the rollback algorithm when state save and restore are absent. The substitution check therefore covers the state capability used by the importer and its version, not only the variable schema.[^fmi]

### Probabilistic Perception: Confidence Needs Distributional Semantics

A LiDAR detector outputs a class, a three-dimensional bounding box, and a confidence value. A candidate network preserves the tensor shape and reaches roughly the same mean average precision as its predecessor. Let $Y$ be the true class, $\hat Y$ the predicted class, and $\hat P$ the reported confidence. If the downstream planner treats confidence as an event probability, its contract also depends on calibration. Idealized classification calibration under deployment distribution $D$ is

$$
\Pr_D(\hat Y=Y\mid\hat P)=\hat P
\qquad D\text{-a.s.}
$$

Under finite confidence binning, predictions near $0.9$ should be correct about nine times in ten. Object detection also needs matching and IoU rules. Feng and colleagues evaluate classification and bounding-box regression calibration; Ovadia and colleagues record calibration degradation under distribution shift.[^calibration] A tensor schema guarantees that the planner can read class, box, and confidence. If the old contract promises a calibration-error bound over a distribution family, the candidate must be tested under the same family and scoring rule. Mean accuracy on one IID set supports a different claim domain.

### Tool-Using Agents: The Response Matches While Reality Changes Twice

Suppose an agent calls `create_ticket`. The request and response conform to the same JSON schemas, and the old service deduplicates requests by `request_id`. The first request creates a ticket, but its response is lost in transit, so the client retries. The old service recognizes the repeated `request_id` and leaves one ticket. A candidate without an idempotency check creates a second ticket and still returns the same successful response shape.

The tool's boundary semantics must therefore include at least a state-transition kernel

$$
T(\,\cdot\mid s,x)
\in
\mathcal P\!\left(S\times(Y\sqcup E)\right),
$$

where $S$ is the external state space, $X$ the request space, and $Y$ and $E$ the response and error spaces. For $(s,x)\in S\times X$, the kernel assigns a distribution to post-call state and outcome. A partial failure may change $S$ even when it returns an error. Under an $X\to Y$ view, the two services appear identical. Once the observation includes state changes and failure traces, the duplicate ticket becomes visible.

MCP tool schemas specify the shapes of arguments and results; annotations such as `idempotentHint` only advise the client. HTTP likewise links automatic retry to method idempotency because a failed response does not reveal how far the server progressed.[^tool-semantics] A tool with external effects must put retry, deduplication, and partial failure into its contract. The duplicate-ticket case is a constructed counterexample, not a report about a particular MCP service.

FMI tests state rollback capability, probabilistic perception tests a distributional promise, and a tool call tests external state transition. Their common structure ends there: the substitution claim is evaluated in the actual composition.

## Back to 50 ms

["From Model to Engineering System"](/en/posts/engineering-model-chain/) follows a model into computation, deployment, and evidence. ["What Is Inside a Model?"](/en/posts/inside-the-model/) separates a complete signature, semantic instance, and observation. The composition task selects an open interface $I$ from that structure, and projection supplies boundary behavior $\mathcal B$ for wiring and contracts.

The candidate in the opening completes one control computation every 100 ms. If the PCM publisher advances fresh frames with that 10 Hz computation, no 20 Hz adapter is present, and the watchdog counts only fresh frames, one loss creates a 200 ms interval and triggers the 150 ms timeout. The resulting split removes the evidence address of the fixed-topology propagation proof. With a 20 Hz hold-last adapter, the topology may stay intact, but the proof's field-age and closed-loop-error premises require renewed checks. The team reuses mathematical steps whose addresses remain valid and updates the evidence for the new clock, topology, code, and vehicle. Only then does "the same plug" become an engineering conclusion that a reviewer can approve or reject.

---

[^ensemble-protocol]: Boris Atanassow et al., *[Platooning Protocol Definition and Communication Strategy](https://publications.tno.nl/publication/34640511/YQUtYF/atanassow-2022-platooning.pdf)*, ENSEMBLE Deliverable D2.8, 2022, Section 4.2, pp. 31-32, and Section 4.4.5, pp. 44-46, especially `PCM_TIMEOUT = 150 ms` and REQ_V2V_040-044. The document establishes protocol and state-machine requirements, not control-stability results. The candidate publisher, fresh-frame rule, and absence of an adapter in the body are assumptions of the constructed integration case.

[^simon]: Herbert A. Simon, "[The Architecture of Complexity](https://doi.org/10.2307/985254)," *Proceedings of the American Philosophical Society* 106(6), 1962, pp. 474-475. This essay uses near decomposability only to make boundaries relative to interaction strength and time scale; it does not treat hierarchical decomposition as a fact about every system.

[^willems]: Jan C. Willems, "[The Behavioral Approach to Open and Interconnected Systems](https://doi.org/10.1109/MCS.2007.906923)," *IEEE Control Systems Magazine* 27(6), 2007, pp. 51-54, 62-64, and 70-72. The behavioral kernel, interconnection, and latent/manifest projection come from these sections. The generic trace notation here does not cover every probabilistic, optimization, or causal semantics.

[^wiring]: Dmitry Vagner, David Spivak, and Eugene Lerman, "[Algebras of Open Dynamical Systems on the Operad of Wiring Diagrams](https://tac.mta.ca/tac/volumes/30/51/30-51.pdf)," *Theory and Applications of Categories* 30, 2015, Definition 2.7, Definition 3.1, Proposition 3.11, Definition 4.2, and Proposition 4.5, pp. 1797-1814.

[^blackbox]: John Baez and Brendan Fong, "[A Compositional Framework for Passive Linear Networks](https://tac.mta.ca/tac/volumes/33/38/33-38.pdf)," *Theory and Applications of Categories* 33, 2018, pp. 1163-1164, and Definition 7.3.1 and Theorem 7.3.2, p. 1213. Their black-box functor applies to passive linear networks and the relation semantics specified in the paper.

[^context-equivalence]: Matthew Hennessy and Robin Milner, "[Algebraic Laws for Nondeterminism and Concurrency](https://www.scss.tcd.ie/matthew.hennessy/pubs/old/HMjacm85.pdf)," *Journal of the ACM* 32(1), 1985, pp. 137-139 and 143-144. The original paper treats finite concurrent processes; this essay uses it to motivate a substitution target over engineering context families.

[^contracts]: Albert Benveniste et al., *[Contracts for System Design](https://inria.hal.science/hal-00757488)*, INRIA Research Report RR-8147, 2012, pp. 25-27 and 30, Definitions 1 and 3, Properties 1 and 3, and Eqs. (10)-(14). The $(A,G)$ form in the main text is a special case over a fixed universe of trace properties.

[^well-posedness]: Alexandre Megretski and Anders Rantzer, "[System Analysis via Integral Quadratic Constraints](https://doi.org/10.1109/9.587335)," *IEEE Transactions on Automatic Control* 42(6), 1997, Section II, p. 821. Causal invertibility and boundedness carry the distinct obligations of well-posedness and stability.

[^precongruence]: Paul C. Attie and Nancy A. Lynch, "[Dynamic Input/Output Automata: A Formal and Compositional Model for Dynamic Systems](https://doi.org/10.1016/j.ic.2016.03.008)," *Information and Computation* 249, 2016, Theorems 17-18; Walter Vogler and Gerald Lüttgen, "[A Linear-Time Branching-Time Perspective on Interface Automata](https://doi.org/10.1007/s00236-020-00369-4)," *Acta Informatica* 57, 2020, Theorems 45, 54, and 57. These sources calibrate the claim that precongruence must be proved for the composition operators in use.

[^ensemble-spec]: Edoardo Mascalchi et al., *[Final Version Functional Specification for White-label Truck](https://publications.tno.nl/publication/34640520/7W6Wtu/mascalchi-2022-final.pdf)*, ENSEMBLE Deliverable D2.5, 2022. The boundary between the implemented, tested, and evaluated seven-brand PSF and the theoretical PAF specification appears in the Executive Summary, pp. 8-9, and Section 3, pp. 53-55; common functions and OEM-specific implementations in Section 2.1.2, pp. 16-20; capability propagation and message semantics in Sections 2.3.2-2.3.4, pp. 22-28; longitudinal-control requirements in Section 2.5.4, pp. 46-50; multi-timestamp and packet-loss feedback in Sections 3.2.5-3.2.6, pp. 54-55; and braking factors in Tables 11 and 13, pp. 79-87.

[^wang]: Meng Wang et al., "[String Stability of Heterogeneous Platoons with Non-connected Automated Vehicles](https://doi.org/10.1109/ITSC.2017.8317792)," *2017 IEEE 20th International Conference on Intelligent Transportation Systems*, Sections II and III.F, Eqs. (24)-(30); Section IV.A-C, Eqs. (31)-(40), and Figure 4(b,e). The paper provides sufficient conditions and simulation for linearized, unconnected ACC, not road validation of CACC.

[^ploeg]: Jeroen Ploeg et al., "[Controller Synthesis for String Stability of Vehicle Platoons](https://doi.org/10.1109/TITS.2013.2291493)," *IEEE Transactions on Intelligent Transportation Systems* 15(2), 2014, Sections II-V, Definition 1, Eqs. (18) and (20), and Conditions (19) and (21). The criteria assume Assumption 1, $\|P_1\|_{\mathcal H_\infty}<\infty$, existence of the required transfer-matrix inverses, and validity for every $i\ge2$; the analysis uses homogeneous continuous-time LTI models and fixed communication delay.

[^ibrahim]: Amr M. E. Ibrahim et al., "[Multi-layer Multi-rate Model Predictive Control for Vehicle Platooning under IEEE 802.11p](https://doi.org/10.1016/j.trc.2020.102905)," *Transportation Research Part C* 124, 2021, article 102905, Sections 10.1-10.5, pp. 28-31. Four Cohda MK5 units simulated vehicle states in HIL, supporting embedded feasibility rather than physical road-vehicle evidence.

[^fmi]: Modelica Association, *[Functional Mock-up Interface Specification 3.0.2](https://fmi-standard.org/docs/3.0.2/)*, Sections 2.2.4, 2.2.7.4, 2.2.9, 2.2.11, 2.4.2, 4.1, and 4.2.1. The body uses only the failed-step retry, FMU-state save/restore, and corresponding capability mechanisms specified in these sections.

[^calibration]: Chuan Guo et al., "[On Calibration of Modern Neural Networks](https://proceedings.mlr.press/v70/guo17a.html)," *ICML 2017*, Section 2, Eq. (1); Di Feng et al., "[Can We Trust You? On Calibration of a Probabilistic Object Detector for Autonomous Driving](https://arxiv.org/abs/1909.12358)," arXiv:1909.12358, 2019, Sections III-IV, Eqs. (2)-(3), Section VI-A, and Figures 2-3; Yaniv Ovadia et al., "[Can You Trust Your Model's Uncertainty? Evaluating Predictive Uncertainty Under Dataset Shift](https://proceedings.neurips.cc/paper/2019/hash/8558cb408c1d76621371888657d2eb1d-Abstract.html)," *NeurIPS 2019*, Section 4.2 and Figures 2-3. These sources support classification calibration, classification/regression calibration for probabilistic object detection, and calibration degradation under distribution shift, respectively. They do not directly establish collision risk.

[^tool-semantics]: Model Context Protocol, *[Tools, specification revision 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)* and the same revision's *[Schema Reference: Tool and ToolAnnotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool)*; IETF, *[RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110#section-9.2.2)*, Section 9.2.2. MCP annotations are hints rather than trusted guarantees; the duplicate-ticket scenario is constructed for this essay.
