---
title: 'From Longitudinal Control to Networked CPS: Research Types, Methods, and Discourses in Vehicle Platooning'
postSlug: vehicle-platoon-types-methods-discourses
published: 2026-04-09
description: 'A refined analysis of 2025–2026 vehicle platooning literature, arguing that the field is expanding from a longitudinal control problem into a networked CPS problem organized by communication, computation, control, and deployment constraints.'
tags: [vehicle platooning, literature review, control theory, V2X, CPS]
category: Research
draft: false
lang: en
---

This post grows out of my ongoing Chinese review project on vehicle platooning. It is not the review itself. Instead, it asks a more basic question first: **what do we miss if we still describe vehicle platooning as nothing more than a longitudinal car-following control problem?**

My answer is: we miss quite a lot. Representative papers from 2025–2026 already show that, while safety, string stability, and cooperative control remain central, the field is now clearly expanding toward V2X, cloud control, cooperative perception, digital-twin testbeds, and a broader cyber-physical systems (CPS) framing [1](#ref-1)[2](#ref-2)[12](#ref-12)[13](#ref-13).

So the most important change is not simply that “there are more controllers now.” The deeper change is that **the object of research, its ontology, its methods, and even its problem-setting are shifting together**. All citation numbers in the text are clickable and jump to the reference index at the end.

## Why vehicle platooning needs to be reframed now

When recent papers are read side by side, one pattern becomes difficult to ignore: vehicle platooning is no longer treated only as a problem of maintaining stable gaps in a line of vehicles. It increasingly appears as a systems problem shaped by communication, computation, sensing, infrastructure, and deployment conditions.

Recent surveys no longer discuss control in isolation. They explicitly place modeling, communication, control, and future directions in one frame [1](#ref-1). V2X safety research goes further and rewrites “safety” itself as a problem of collective intelligence across vehicles and infrastructure rather than ego-centric perception alone [2](#ref-2). Work on heterogeneous vehicle groups in ramp cloud-control systems, and on human-in-the-loop mixed digital twin platforms, shows the same outward movement: platooning is being absorbed into a broader systems vocabulary [12](#ref-12)[13](#ref-13).

That is why a narrow review outline now feels insufficient. My current shorthand for the field is this:

> Vehicle platooning research is moving from a longitudinal control problem toward a networked CPS problem organized by communication, computation, and control in coordination.

## What kinds of research now make up the field

Looking across the core and secondary papers from 2025–2026, at least five research types become visible. They are not isolated islands. Together they form the current intellectual map of the field.

| Research type | Main concern | Representative papers |
| --- | --- | --- |
| Survey and problem-framing | Define the object, scope, and future directions of platooning research | [1](#ref-1), [2](#ref-2), [16](#ref-16) |
| Stability and controller design | Guarantee safety and string stability under delays, switching, and uncertainty | [3](#ref-3), [4](#ref-4), [10](#ref-10), [11](#ref-11) |
| Robust predictive and data-driven control | Handle nonlinearity, mismatch, disturbances, attacks, and heterogeneity | [5](#ref-5), [6](#ref-6), [12](#ref-12) |
| Learning-enhanced and knowledge-informed methods | Bring DRL, self-learning, and knowledge distillation under engineering constraints | [7](#ref-7), [8](#ref-8), [9](#ref-9), [15](#ref-15) |
| System coordination and experimental platforms | Integrate vehicle, road, cloud, sensing, and testing infrastructures | [2](#ref-2), [13](#ref-13), [14](#ref-14) |

### 1) Survey and problem-framing

These papers matter because they decide what counts as the proper object of vehicle platooning research in the first place. The survey by Li et al. is important not just because it summarizes papers, but because it forces modeling, communication, control, and future prospects into one shared narrative [1](#ref-1). The Chinese monograph on communication-delay-aware truck platoon control performs a similar framing function from a more control-centered angle, organizing delay, topology, stability, and compensation into a systematic knowledge base [16](#ref-16).

In other words, these works do not merely describe the field. They teach readers how to see it.

### 2) Stability and controller design

This remains the hardest and most classical line of work in platooning. Its core question is simple and demanding: how can safety and string stability be preserved under communication delay, uncertainty, switching, and changing formations [3](#ref-3)[4](#ref-4)[10](#ref-10)[11](#ref-11)?

`ruan2025stability` uses Lyapunov–Krasovskii tools and H∞ control to derive stability conditions under rate-free time-varying delay and uncertainty [3](#ref-3). `tian2026mpcbased` studies controller switching when communication delay exceeds a theoretical boundary, which is already a sign that the field is asking not only how to optimize control, but how to degrade gracefully at the system boundary [4](#ref-4).

### 3) Robust predictive and data-driven control

If the previous line is centered on provability, this line is centered on the fact that the real world does not respect ideal models. Mixed traffic, nonlinear dynamics, disturbances, attacks, and mismatch all push platooning toward data-driven and robust predictive designs [5](#ref-5)[6](#ref-6)[12](#ref-12).

`li2025robust` combines T-S fuzzy modeling with robust MPC to deal with uncertain dynamics in mixed platoons [5](#ref-5). `li2026robust` goes further by combining Koopman lifting and reachability analysis to build a robust nonlinear data-driven predictive control framework under noise, disturbances, and attacks [6](#ref-6). `shi2026robust` places the problem inside ramp cloud control with heterogeneous vehicle groups, showing that “platoon control” is already stretching into a more general problem of coordinated trajectory tracking for heterogeneous groups [12](#ref-12).

### 4) Learning-enhanced and knowledge-informed methods

The most interesting recent change is not simply that “deep learning has arrived.” The more important shift is that learning is now being asked to justify itself under stability, safety, and deployment constraints. Learning is not replacing control. It is negotiating for a constrained position within it.

`pan2026reinforcement` uses decentralized reinforcement learning for eco-safe control in mixed platoons [7](#ref-7). `wang2025knowledgeguided` introduces knowledge-guided self-learning under communication delays, with traffic stability, comfort, and energy cost still acting as hard engineering anchors [8](#ref-8). `wang2025knowledgeinformed` uses LLM-extracted traffic knowledge and distillation to build lightweight, stability-aware car-following models [9](#ref-9). Meanwhile, `liu2025robust` studies intention prediction under vehicle–infrastructure cooperative perception errors, showing that learning has also spread into perception and behavior modeling [15](#ref-15).

### 5) System coordination and experimental platforms

This is the clearest sign that the field boundary is expanding. These works no longer stop at “the algorithm works in simulation.” They rewrite the experimental object itself: what kind of platform is needed, how cloud control is organized, how vehicles and infrastructure become one system, and how risk is conceptualized [2](#ref-2)[13](#ref-13)[14](#ref-14).

`zhang2025cooperative` organizes cooperative safety through an SPD framework, explicitly tying sensing, predictive reasoning, and coordinated decision-making together [2](#ref-2). `dong2026multisource` combines mixed digital twins and human drivers in the loop, folding physical vehicles, virtual vehicles, and human operators into one experimental circuit [13](#ref-13). `gao2026concept` shifts attention from control performance alone toward a broader language of system risk through driving risk entropy [14](#ref-14).

## The method spectrum of the field

Methodologically, vehicle platooning is not well described by a simple story of “traditional control versus AI.” What we actually see is a layered and entangled spectrum.

### Control theory still sets the norm

Whether a paper uses MPC, H∞ control, switching control, ADRC, Youla parameterization, or a data-driven predictive variant, it usually returns to the same unavoidable criteria: safety, string stability, robustness, and deployability [3](#ref-3)[4](#ref-4)[9](#ref-9)[11](#ref-11). Control theory still provides the normative center of the field.

### Pure model-based work is being rewritten by hybrid methods

At the same time, purely idealized model-based approaches are being reworked into hybrid ones. Models, data, knowledge, and experimental environments are no longer kept separate. They increasingly appear as combinations of control backbones, data augmentation, learning-based compensation, and system-level validation [6](#ref-6)[8](#ref-8)[12](#ref-12)[13](#ref-13).

### Learning is entering under constraint

This point matters. The more valuable learning papers are not those that merely claim “end-to-end works better,” but those that answer a harder question: how far can learning be disciplined by safety, stability, and deployment demands? That is what makes `wang2025knowledgeinformed` especially important: it inserts knowledge distillation and stability goals directly into the training process [9](#ref-9).

### Validation has become a method problem

Validation used to look like an auxiliary stage. Newer papers show that it is now part of the method itself. Bench tests, scaled experiments, real-world datasets, human-in-the-loop settings, and mixed digital twin platforms are no longer just “more evidence.” They are redefining what counts as adequate evidence for deployment claims [12](#ref-12)[13](#ref-13)[15](#ref-15)[16](#ref-16).

## Reading the field through Lacan’s four discourses

If we only sort the literature by technical method, the field looks like a growing list of tools. But as an academic structure, vehicle platooning is better understood as something organized by four discourse positions.

| Discourse | What it organizes | What it hides | What it produces |
| --- | --- | --- | --- |
| Master | Decides which problems matter most | High-level naming does not equal solvability | Legitimacy and direction |
| University | Classifies, models, and standardizes the object | The normative command behind the knowledge system | Papers, surveys, metrics, controller taxonomies |
| Hysteric | Forces existing answers to face real cracks | There is no final once-and-for-all answer | More questions and more knowledge production |
| Analyst | Reorganizes the field from its symptoms | A review is not a neutral mirror | New anchors and new problem statements |

### Master discourse: the high-level signifiers

The dominant signifiers in vehicle platooning are easy to recognize: **safety, string stability, cooperation, efficiency, zero-accident mobility, deployability**. These are not merely goals. They also decide which questions are seen as inherently legitimate and urgent [2](#ref-2)[3](#ref-3)[4](#ref-4)[7](#ref-7).

Once these signifiers occupy the center, later knowledge work naturally aligns itself around them. That is why papers with very different methods often begin with remarkably similar problem statements.

### University discourse: the dominant mode of operation

In practice, the dominant mode of operation in vehicle platooning is University discourse. The field works by classifying objects, standardizing problems, arranging methods into comparable matrices, and producing reviewable and teachable knowledge devices [1](#ref-1)[5](#ref-5)[6](#ref-6)[16](#ref-16).

This is why so many papers share the same internal grammar: vehicle model, topology, delay setting, controller design, stability proof, simulation comparison. It is efficient and necessary, but it also tends to objectify the field’s living problems into scenarios and metrics.

### Hysteric discourse: how the field keeps expanding

What keeps the field from settling down is not knowledge’s smooth accumulation, but the persistence of unresolved remainders: what about communication delay, mixed traffic, heterogeneity, perception error, mismatch between cloud planning and actual trajectories, or real deployment [6](#ref-6)[7](#ref-7)[12](#ref-12)[13](#ref-13)[15](#ref-15)?

These repeated “what about…” questions are precisely what keep forcing the field to produce more methods and more theory. Secondary literature is therefore not merely peripheral. It is often the product of the core being pressed by what it cannot easily absorb.

### Analyst discourse: where a strong review should stand

If a review only performs a better classification, it is still useful, but it remains inside University discourse. A stronger move is to ask why the field repeatedly circles back to safety, stability, and cooperation; why learning is repeatedly pulled back under engineering constraints; why testbeds suddenly matter so much; and why V2X, cloud control, and cooperative perception keep entering the same line of argument [2](#ref-2)[14](#ref-14).

That is why I think the most valuable review position today is not simply to summarize what is known, but to show **what drives the field, what it keeps hiding, and what it therefore keeps producing**.

## What this means for review writing

If the diagnosis above is roughly right, then a contemporary review on vehicle platooning should not just become a long catalog of controllers. It should also explain:

- why safety and string stability remain the long-term organizing center;
- how communication delay, information topology, and heterogeneity turn a control problem into a networked control problem;
- why data-driven, distilled, and reinforcement-based methods do not replace control theory but get pulled into its constraint structure;
- why V2X, cloud control, cooperative perception, and experimental platforms push platooning toward a fuller CPS framing.

If I had to compress all of this into one sentence that could anchor a full review, it would be this:

> Vehicle platooning research is moving from a longitudinal control problem toward a networked CPS problem organized by communication, computation, and control in coordination.

The value of this sentence is not that it replaces every existing taxonomy. Its value is that it places scattered materials back into one structure: why control theory remains central, why data-driven methods rise, why learning must be constrained, and why system validation has become a core issue.

## Closing thought

I no longer see vehicle platooning as a narrowly technical niche. It certainly began with car-following, stability, and control. But today it is becoming a very revealing intersection where control theory, traffic engineering, vehicular networking, edge/cloud coordination, cooperative perception, risk modeling, experimental platforms, and CPS language meet.

So the most interesting question is not just “what methods exist,” but **how these methods are organized around a few dominant goals, and how they keep splitting, repairing, and recombining under the pressure of real deployment gaps**. For me, that is where the review becomes truly worth writing.

## Reference Index

<ol>
  <li id="ref-1"><strong>Li, H.</strong>, Meng, W., Han, Z., Zhang, Z., &amp; Yang, Y. (2025). <em>Vehicle platoon in road traffic: A survey of modeling, communication, controlling and perspectives</em>. <em>Physica A</em>. <a href="https://doi.org/10.1016/j.physa.2025.130757">DOI</a>. <code>li2025vehiclea</code></li>
  <li id="ref-2"><strong>Zhang, J.</strong>, Xu, Q., Li, Z., Xu, C., &amp; Li, K. (2025). <em>Cooperative safety intelligence in V2X-enabled transportation: A survey</em>. <a href="https://doi.org/10.48550/arXiv.2512.00490">arXiv</a>. <code>zhang2025cooperative</code></li>
  <li id="ref-3"><strong>Ruan, T.</strong>, Chen, Y., Li, X., Wang, J., Liu, Y., &amp; Wang, H. (2025). <em>Stability analysis and controller design of the cooperative adaptive cruise control platoon considering a rate-free time-varying communication delay and uncertainties</em>. <em>Transportation Research Part C</em>. <a href="https://doi.org/10.1016/j.trc.2024.104913">DOI</a>. <code>ruan2025stability</code></li>
  <li id="ref-4"><strong>Tian, B.</strong>, Guo, Q., Xu, Z., Wang, M., &amp; Qu, X. (2026). <em>MPC-based controller switching strategy for string stability and safety of vehicle platoons considering communication delays boundary</em>. <em>IEEE Transactions on Vehicular Technology</em>. <a href="https://doi.org/10.1109/TVT.2026.3662390">DOI</a>. <code>tian2026mpcbased</code></li>
  <li id="ref-5"><strong>Li, Y.</strong>, Liu, C., &amp; Zheng, F. (2025). <em>Robust fuzzy model predictive control for connected and automated vehicles in mixed platoons using a bidirectional vehicle dynamics strategy</em>. <em>Expert Systems with Applications</em>. <a href="https://doi.org/10.1016/j.eswa.2024.126057">DOI</a>. <code>li2025robust</code></li>
  <li id="ref-6"><strong>Li, S.</strong>, Wang, J., Yang, K., Xu, Q., Wang, J., &amp; Li, K. (2026). <em>Robust nonlinear data-driven predictive control for mixed vehicle platoons via koopman operator and reachability analysis</em>. <em>Transportation Research Part C</em>. <a href="https://doi.org/10.1016/j.trc.2025.105410">DOI</a>. <code>li2026robust</code></li>
  <li id="ref-7"><strong>Pan, X.</strong>, Yuan, X., Ling, Z., Li, Z., Liu, K., &amp; Wang, Y. (2026). <em>A reinforcement learning-based decentralized control strategy for eco-safe mixed platooning with CAVs and HDVs</em>. <em>IEEE Transactions on Intelligent Transportation Systems</em>. <a href="https://doi.org/10.1109/TITS.2025.3631474">DOI</a>. <code>pan2026reinforcement</code></li>
  <li id="ref-8"><strong>Wang, J.</strong>, Wang, H., Song, J., Chen, X., Guo, J., Li, K., Li, X., &amp; Huang, B. (2025). <em>Knowledge-guided self-learning control strategy for mixed vehicle platoons with delays</em>. <em>Nature Communications</em>. <a href="https://doi.org/10.1038/s41467-025-62597-x">DOI</a>. <code>wang2025knowledgeguided</code></li>
  <li id="ref-9"><strong>Wang, C.</strong>, Jia, D., Wang, W., Ngoduy, D., Peng, B., &amp; Wang, J. (2025). <em>A knowledge-informed deep learning paradigm for generalizable and stability-optimized car-following models</em>. <em>Communications in Transportation Research</em>. <a href="https://doi.org/10.1016/j.commtr.2025.100211">DOI</a>. <code>wang2025knowledgeinformed</code></li>
  <li id="ref-10"><strong>Liu, G.</strong>, Zheng, N., &amp; Wang, H. (2025). <em>Cooperative control method for connected and automated vehicle platoon based on arbitrary time headway switched system</em>. <a href="https://doi.org/10.2139/ssrn.5132633">SSRN</a>. <code>liu2025cooperative</code></li>
  <li id="ref-11"><strong>Ruan, T.</strong>, Chen, Y., Han, G., Wang, J., Li, X., Jiang, R., Wang, W., &amp; Wang, H. (2025). <em>Cooperative adaptive cruise platoon controller design considering switching control and stability</em>. <em>Transportation Research Part C</em>. <a href="https://doi.org/10.1016/j.trc.2025.105024">DOI</a>. <code>ruan2025cooperative</code></li>
  <li id="ref-12"><strong>Shi, J.</strong>, Guan, S., Zhong, W., Chen, C., Li, K., &amp; Luo, Y. (2026). <em>Robust predictive control of heterogeneous vehicle groups in the ramp cloud-control system using historical trajectory features</em>. <em>IEEE Transactions on Vehicular Technology</em>. <a href="https://doi.org/10.1109/TVT.2026.3668288">DOI</a>. <code>shi2026robust</code></li>
  <li id="ref-13"><strong>Dong, J.</strong>, Wang, J., Yang, C., Cai, M., Chen, C., Xu, Q., Wang, J., &amp; Li, K. (2026). <em>Multi-source human-in-the-loop digital twin testbed for connected and autonomous vehicles in mixed traffic flow</em>. <a href="https://doi.org/10.48550/arXiv.2603.17751">arXiv</a>. <code>dong2026multisource</code></li>
  <li id="ref-14"><strong>Gao, H.</strong>, Yang, H., Zhu, J., Su, H., Tang, C., Wang, X., Shi, J., Shen, C., &amp; Liu, Z. (2026). <em>Concept, principle, and modeling of driving risk entropy based on human-vehicle-road coupling model for autonomous vehicle</em>. <em>Neurocomputing</em>. <a href="https://doi.org/10.1016/j.neucom.2025.132395">DOI</a>. <code>gao2026concept</code></li>
  <li id="ref-15"><strong>Liu, K.</strong>, Yuan, X., Li, Z., Pan, X., &amp; Wang, Y. (2025). <em>Robust driving intention prediction based on multi-stage learning under vehicle–infrastructure cooperative perception</em>. <em>IEEE Transactions on Intelligent Transportation Systems</em>. <a href="https://doi.org/10.1109/TITS.2025.3552417">DOI</a>. <code>liu2025robust</code></li>
  <li id="ref-16"><strong>Xu, Z.</strong>, Tian, B., &amp; Zhang, Y. (2025). <em>Optimization of Longitudinal Control for Truck Platoons Considering Communication Delays</em>. China Science and Technology Publishing &amp; Media. <a href="https://book.cppinfo.cn/Encyclopedias/home/index?id=4875430">Link</a>. <code>xuzhigang2025kaolutongxinyanshidehuocheduiliezongxiangkongzhiyouhua</code></li>
</ol>
