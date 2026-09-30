---
title: "Models and Engineering · I | How Mathematics Grasps a Problem: From Tasks to Feasible Structure"
postSlug: mathematical-language-and-problems
published: 2026-09-30
image: './mathematical-language-and-problems/cover-2026.webp'
description: "From three task durations to dependencies, resource constraints, feasible schedules, and policies: when longest paths determine completion time, and how a formulation generates new questions."
tags: ["mathematical modeling", "scheduling", "mathematical language"]
category: Engineering Practice
draft: false
lang: en
---

Three tasks take three hours, two hours, and one hour. Their durations add up to six hours. Ask when all the work can be finished, however, and six hours need not be the answer.

First specify the work. A and B are preparation tasks; C is the final assembly and can begin only after both are complete. Assume fixed durations, no interruption once a task starts, and no extra time for transport or missing materials. This is a small constructed example.

With two workers qualified to perform A and B separately, and C ready to execute once preparation is complete, A and B can start together. A finishes at hour three and B at hour two; C runs from hour three to hour four. If A and B require the same worker, they must run in sequence. In either order they take five hours, followed by one hour for C. The tasks and their durations have stayed the same. What changed is which work can happen together.

This small distinction changes the entry into the problem. Total duration records the amount of work. Completion time also depends on how tasks connect and which can overlap. Mathematics must retain those relations to answer the second question.

![Two constructed schedules: parallel A and B finish the project in 4 hours; sharing a worker makes it 6 hours.](./mathematical-language-and-problems/schedules.en.svg)

*Original schedule chart. A and B run in parallel above and share a worker below; C starts after both finish.*

## From Total Duration to Precedence

Draw three vertices for A, B, and C, with arrows A→C and B→C. An arrow means that its source must finish before its target can start. The dependencies in the original description now have a checkable shape: C has two prerequisites, while A and B have no precedence relation.

The arrows do not require A and B to run together. They require only that both have finished when C starts. To turn the absence of precedence into the possibility of parallel execution, workers, equipment, and materials must permit it. A shared worker imposes a relation the dependency graph does not record.

A neat graph can conceal this omission. With every vertex and arrow in place, the description may look complete. Its adequacy depends on the question. It already answers which tasks C depends on. To answer when the work finishes with one worker, it needs resource conditions too.

Consider ample resources first. A can start immediately, and C must wait for its three hours before taking its own hour. Every schedule therefore takes at least four hours. Starting A and B together achieves four. A lower bound meets a feasible schedule, establishing the minimum completion time.

These are two different reasons. The lower bound comes from a dependency every schedule must respect. Attainment comes from a particular schedule. A bound alone does not show that four hours is achievable; a schedule alone does not show that a faster one is impossible. Optimality requires both.

## Making a Schedule an Object of Comparison

Give each task a start time $s_A,s_B,s_C$, measured in hours, with durations $p_A=3,p_B=2,p_C=1$. Scheduling begins at time zero, so start times are nonnegative. The prerequisites for C become

$$
s_C\ge s_A+3,\qquad s_C\ge s_B+2.
$$

These inequalities make “finish before the next task starts” explicit. They let us check a candidate. The schedule $(s_A,s_B,s_C)=(0,0,3)$ satisfies both, whereas $(0,0,2)$ violates the first by starting C before A finishes.

We must also specify completion time. The last finishing time among the three tasks is

$$
F(s)=\max\{s_A+3,\ s_B+2,\ s_C+1\}.
$$

We seek start times satisfying the conditions and minimizing $F(s)$. Choices, required relations, and the number used to compare choices are now connected. The sum of durations remains six; it no longer stands in for the completion time of every schedule.

Now add the shared worker. The intervals in which A and B occupy this worker cannot overlap, so at least one of two orders must hold:

$$
s_A+3\le s_B\quad\text{或}\quad s_B+2\le s_A.
$$

The “or” matters. Either A or B may go first; the formulation has no reason to decide for the scheduler. Drawing only A→B would describe an already chosen order and discard another legal choice. An extra arrow would narrow the set of schedules being compared.

Nonoverlapping A and B need at least five hours, followed by one hour for C. Completion therefore takes at least six. Both $(0,3,5)$ and $(2,0,5)$ attain six, through different processes. A lunch break, earlier delivery of B, or fewer tool changes might provide a further reason to choose between them.

Mathematical language preserves those differences. It also exposes an ambiguity in “optimal”: are we comparing only final completion time, or other things as well? If $F$ is the only objective, the two schedules tie. Additional preferences must enter the comparison rule or remain explicitly for a later choice. An optimum cannot retain preferences absent from its definition.

## When a Graph Is Enough

The three-task answer is easy to calculate. With more tasks, we can ask a structural question: under which conditions does the dependency graph determine the minimum completion time?

Take a finite, nonempty collection of tasks with fixed nonnegative durations $p_i$ and a directed acyclic dependency graph. Tasks may start at zero, resources are sufficient, and each task may run as soon as its prerequisites are satisfied. Acyclic means that following dependency arrows never returns to the starting vertex. Mutual requirements to finish before the other task starts would require reconsidering these execution rules; the construction below uses no such cycle.

Tasks on a dependency path must run in sequence. Include paths consisting of a single task. Every feasible schedule takes at least the sum of durations on each path, so the longest such sum is a lower bound:

$$
L=\max_{\text{dependency paths }P}\sum_{i\in P}p_i.
$$

Next construct a schedule attaining it. An acyclic graph admits an order in which all predecessors of a task have already been processed when that task is reached. Tasks with no predecessors start at zero. Others start at the latest finishing time of their predecessors. Writing $f_i$ for task $i$'s finish time gives

$$
f_i=p_i+\max_{j\to i}f_j,
$$

For a task without predecessors, take the maximum as zero. Every step respects dependencies without adding waiting. A path ending at $i$ consists of a path to a predecessor followed by $i$; the recurrence selects the longest of these. Thus $f_i$ is the longest path duration ending at $i$, and the latest finish over all tasks is $L$. We have both a universal lower bound and a schedule attaining it.

With ample resources, dependency scheduling therefore reduces to a longest-path problem. The result is useful under these stated conditions. In the shared-worker example, the longest path still takes four hours, but the minimum completion time is six. The bound survives; its attaining construction is no longer legal because A and B would occupy the worker together.

The failure has a precise location. The dependencies and path bound remain correct. What fails is starting every task immediately after its prerequisites are satisfied. Resource contention separates “dependencies satisfied” from “ready to execute”; one relation no longer organizes all the choices.

## Changing the Formulation Generates Questions

Temporarily remove the resource constraint. Every originally legal schedule remains legal, while additional schedules become candidates. Let $\mathcal F_{\mathrm{constrained}}$ denote the constrained feasible set and $\mathcal F_{\mathrm{relaxed}}$ the relaxed one. Then

$$
\mathcal F_{\mathrm{constrained}}\subseteq\mathcal F_{\mathrm{relaxed}},
\qquad
\min_{s\in\mathcal F_{\mathrm{relaxed}}}F(s)
\le
\min_{s\in\mathcal F_{\mathrm{constrained}}}F(s).
$$

Both problems use the same objective. More candidates can lower the minimum or leave it unchanged; they cannot raise it. The relaxed optimum here is four hours, the original optimum six, a gap of two hours.

Relaxation supplies an unimplementable schedule but also a usable lower bound for the original problem. The shared worker's five hours, followed by C's hour, strengthen that bound from four to six. The known six-hour schedule then proves optimality. In a larger problem, a feasible schedule and an easy bound need not meet. Their gap identifies work still to be done.

New questions follow. Which resource constraints leave the minimum unchanged? How large can the gap become? Can another tractable constraint give a tighter bound? These questions need not wait for individual factories to ask them. Feasible-set inclusion, optimum comparison, and a change to the structure have already given them mathematical content.

This is another side of bringing a problem into mathematics. We use graphs and inequalities to express the original situation; they also reveal questions created by deleting, adding, or changing a relation. Mathematical understanding develops through this exchange. Formalization can clarify a question and expose what the question has left out.

## Uncertainty Changes More Than Numbers

So far, durations were given. In practice they may become known only during execution. Replacing them with averages still yields an optimum, but for those average values. Its ability to handle a slower realization is a further question.

Consider a finite set $\mathcal P$ of possible duration vectors and a deadline $D$. Let $\Phi(s,p)$ mean that schedule $s$ respects dependencies and resources and finishes by $D$ under durations $p$. If fixed start times must be announced in advance, the question is

$$
\exists s\;\forall p\in\mathcal P:\ \Phi(s,p).
$$

One schedule must handle every allowed realization. If all durations are revealed before scheduling, different schedules may be chosen for different realizations:

$$
\forall p\in\mathcal P\;\exists s:\ \Phi(s,p).
$$

The second condition gives the scheduler more information. The first implies it; the converse does not follow from choosing a separate schedule for each realization. Quantifier order preserves when decisions are made and what is known at that time.

Real scheduling may lie between these cases: begin with duration ranges, observe which task finishes, and then choose the next action. The decision object becomes a policy rather than fixed start times. It may use what has happened, but no unrevealed future information. Selecting an optimal schedule separately for each duration vector and calling the collection an online policy could quietly grant advance knowledge of the future.

A policy is introduced to express a conditional action, such as waiting for B to finish and then using A's progress to decide what comes next. Fixed $s$ cannot express that action. The new object also carries a restriction: what information is available when it acts. Mathematics distinguishes two apparently similar claims that work can “always be scheduled,” with different consequences for an engineering promise.

## Choosing Language Under the Question's Pressure

The example used total duration, a dependency graph, start times, nonoverlap, feasible sets, and policies. Each retains different information. Total duration measures work; a graph tracks precedence; intervals check contention; policies organize actions changed by observation. Later expressions need not eliminate earlier ones. Workload can still bound resource use, and dependencies remain the skeleton of a complicated schedule.

Moving from duration totals to graphs and feasible schedules does more than add detail to one formula. A changed question may need a different object. A total serves a workload question; paths answer minimum completion with sufficient resources; adaptive execution needs actions based on history. A useful abstraction preserves what the current judgment requires while allowing omitted conditions to be recovered.

Progress can therefore take the form of a definite correction. The four-hour bound survives, but simultaneous execution fails with a shared worker, prompting a nonoverlap condition. An average-duration schedule survives, but a promise under unknown durations remains unestablished, prompting a distinction about when information arrives. We know where the older expression became insufficient and how the new relation affects judgment.

The construction has not established the durations or task boundaries of a real project. Where do three and two hours come from? Can one worker actually perform that task alone? Does uninterrupted execution suit the intended use? Observation, measurement, and empirical checking must answer these questions. The next essay begins with a water tank and asks how a mathematical relation gains grounds for describing an actual object.

---

**Models and Engineering: the six core essays**

1. [How Mathematics Grasps a Problem](/en/posts/mathematical-language-and-problems/)
2. [How a Tank Becomes a Model](/en/posts/from-observation-to-model/)
3. [What a Model Retains](/en/posts/inside-the-model/)
4. [Which Conclusions Survive a Model Change?](/en/posts/model-transformations/)
5. [How a Model Becomes a Component](/en/posts/model-as-open-component/)
6. [From Models to Engineering Judgment](/en/posts/engineering-model-chain/)
