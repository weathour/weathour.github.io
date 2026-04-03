---
title: 'SafeRL-YK: From Offline Safe Anchors to Online Gamma Scheduling'
postSlug: saferl-yk-progress
published: 2026-04-03
description: A progress note on the core idea, research goals, current implementation, and early results of the SafeRL-YK project.
tags: [autonomous driving, reinforcement learning, safe control, Youla-Kucera, SAC]
category: Research
draft: false
lang: en
---

This post is a progress update on `SafeRL-YK`. The project does **not** try to let reinforcement learning output raw control commands end to end. Instead, it puts RL on top of a control backbone that already respects physical and safety constraints, and only asks it to learn **when the situation looks more like Cruising and when it looks more like Stop-and-Go**.

## Core Idea

The project targets **longitudinal car-following** in autonomous driving. Its main idea can be summarized in one sentence:

> Build two safe anchor controllers offline, then let RL learn only a scheduling parameter `γ` online.

The two anchors correspond to two representative traffic modes:

- `Cruising`: relatively smooth following with low-frequency disturbances;
- `Stop-and-Go`: congested following with stronger stop-start perturbations.

RL does not directly output throttle or acceleration. It outputs a scheduling variable that interpolates between two offline-solved YK safe controllers. The motivation is straightforward:

- **push as much safety as possible into the offline stage**;
- **reduce RL to scheduling instead of controller invention**;
- **use the structure hidden in real traffic data explicitly**.

## Project Goals

At the moment, the project has three layers of goals.

### 1. Extract usable driving modes from real data

The raw data comes from `highD` and `inD`. The offline pipeline performs:

- longitudinal trajectory extraction;
- long-horizon trajectory stitching;
- frequency-domain GMM clustering;
- slicing clustered results back into time-domain windows.

The goal is not just cleaning data. It is to expose recurring car-following modes in real traffic and turn them into structured inputs for anchor solving and RL training.

### 2. Solve two interpretable and safe controller anchors

Offline, the project solves one YK anchor for `Cruising` and one for `Stop-and-Go` under the same objective family and the same hard constraints. It checks not only frequency-domain stability but also emergency-braking safety in the time domain, so the solution is not merely “stable on paper.”

This stage is about obtaining two reliable endpoints before discussing online interpolation.

### 3. Let RL learn scheduling, not low-level physics

Online RL learns a scheduling parameter `γ` that smoothly moves between the two safe anchors. The current main branch has already shifted from predicting absolute `γ` to predicting incremental `Δγ`, because that makes the behavior smoother and closer to gradual correction rather than abrupt switching.

## What Has Been Built So Far

At this point, the project is no longer just a concept. A fairly complete loop is already in place:

- the offline data pipeline runs from raw trajectories to `clustered windows`;
- weight sweeping and PSO anchor solving already produce `best_weights.json` and `yk_anchors.pkl`;
- reference spectra can be generated offline for a traditional SAY-CM spectral scheduler baseline;
- reward baseline caches are precomputed, avoiding repeated expensive simulation at environment reset;
- the current training mainline has moved to `delta_env + delta_train`, with full-platoon observations, `Δγ` actions, 5 Hz control, and TTC penalties;
- two `delta_sweep` experiment directories already exist, so the incremental-action branch has been trained in practice rather than only designed on paper.

In short, the project has already materialized as scripts, cached artifacts, evaluation code, and experiment outputs.

## Current Results as of Early April 2026

As of **April 2, 2026**, the repository contains a batch evaluation summary over `500` trajectories.

First, the simplest static-anchor comparison:

- static `γ=0` reaches `abs_mean = -6058.14`;
- static `γ=1` reaches `abs_mean = -7228.10`;
- over `500` trajectories, `γ=0` wins `497`, while `γ=1` wins only `3`.

That tells us something important: **under the current data distribution, the single static `γ=0` anchor is still very strong.**

Now look at the current delta branch:

- `delta_gamma_0` achieves `rel_mean = -110.85`;
- among the trained configurations, the closest one is `C03_ds02_wdg5_phase1__relative_norm` with `rel_mean = -128.08`;
- other settings are worse, for example `C01_ds02_wdg0_phase1__relative_norm = -140.77` and `C02_ds02_wdg1_phase2__relative_norm = -308.40`.

So the takeaway from the current summary is clear:

- **the engineering pipeline is working end to end;**
- **the incremental-action RL branch is trainable and benchmarkable;**
- **but it still does not consistently beat the strongest static anchor baseline.**

I actually see this as a healthy stage. It means the main question is no longer “can the training script run?” but rather the more meaningful research question: **what observation design, reward design, and curriculum are needed for scheduling to truly outperform a fixed anchor on real traffic modes?**

## What Matters Next

The next useful step is not making the system more complicated for its own sake. It is understanding **why RL has not yet beaten the static anchor reliably**. The questions I care about most now are:

- whether `relative_norm` already removes enough mode-dependent baseline bias;
- whether the two-stage curriculum really transfers policies from extreme modes to mixed traffic;
- which factor contributes most to gains: `Δγ`, TTC penalties, or full-platoon observations;
- where SafeRL-YK actually improves once traditional spectral scheduling and DMPC are evaluated inside the same framework.

## Closing Note

If I had to summarize the current state of `SafeRL-YK` in one sentence, it would be this:

> The project has moved past the “idea-only” stage and entered the stage where the offline safety backbone is mostly in place and the online scheduler is being tested against strict baselines.

The next step is to keep pushing both sides at once: make the offline anchors more reliable, and make RL learn a genuinely useful scheduling behavior instead of merely reproducing a strong static default.
