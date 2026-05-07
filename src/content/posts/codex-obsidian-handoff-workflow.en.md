---
title: 'Long-Horizon AI Handoff Workflow: Migrated from Obsidian to Hermes/Codex/OMX'
postSlug: codex-obsidian-handoff-workflow
published: 2026-04-08
description: An updated workflow using personal-llm-wiki project cards, repository status artifacts, and OMX session handoff for reliable long-horizon context recovery.
tags: [Hermes, Codex, OMX, workflow, project management, AI collaboration]
category: Workflow
draft: false
lang: en
---

Short version first: this article was originally written around Obsidian handoff folders, but the current default stack is different.

The goal is still the same:

> with one short command, continue exactly where the previous session left off.

What changed is **where truth is stored** and **who is responsible for which layer**.

Current division of labor:

- **Hermes**: orchestrates tasks, boundaries, and cross-session memory organization.
- **Codex**: local implementation, build, and verification.
- **OMX**: execution management (persistence, workers, Ralph/planning flow).
- **personal-llm-wiki**: long-cycle project management source of truth.
- **Project repos**: source-of-truth for execution state (`PROJECT_STATUS.md`, `HANDOFF.md`, etc.).

This update is about replacing the handoff model, not discarding previous learnings.

## Core principles (updated)

### 1. Separate management, execution, and handoff layers

Past failures usually came from mixing different time scales.

- **Management layer (long-cycle)** lives at `personal-llm-wiki/wiki/projects/<project>.md`.
  - current stage, risks, and next moves
  - it is a stable anchor, not the full execution transcript
- **Execution layer (short-cycle truth)** lives in the project repository.
  - `PROJECT_STATUS.md`, `HANDOFF.md`, `NEXT-SESSION-START.md`
  - plus factual notes under `analysis/`, `docs/`, plans, and outputs
- **Handoff layer** records transition points.
  - repo handoff docs + OMX session logs

### 2. Keep one canonical project entry, now in personal wiki

Each project still has one stable entry:

- `personal-llm-wiki/wiki/projects/<slug>.md`

This entry contains:

- canonical repo path (for example `/home/weathour/文档/CPS-Papers/papers/vehicle-platoon-review`)
- stage, constraints, and next-step definition
- risk summary and status checkpoints

If a project already has a strong repo status system, we do not force the old `Prompt/Plan/Implement/Documentation` file set.

### 3. “Daily log” becomes “executable snapshot” for today’s todo

Long-running handoff now relies on:

- `personal-llm-wiki/wiki/_meta/maintenance/daily-todo-registry.md`
- periodic `personal-daily-todo` cron push

Its role is to decide today’s priorities, not to host authoritative execution truth.

## New operating structure

### 1) Management page (personal wiki)

- Location: `personal-llm-wiki/wiki/projects/<slug>.md`
- Why it exists:
  - quickly recover scope for Hermes and humans
  - drive daily todo generation
  - prevent cross-session path confusion

### 2) Execution truth layer (repo)

Inside the project repo, read in this order:

1. `PROJECT_STATUS.md`
2. `HANDOFF.md`
3. `NEXT-SESSION-START.md` (if present)
4. `docs/CURRENT_PLAN.md` (if present)

### 3) Session handoff layer (traceable)

When ending a session, keep entries minimal and precise:

- what was decided and changed
- changed files / validation results
- 1–3 highest-priority next steps
- unresolved risks and verification assumptions

Also keep OMX session records (for example `.omx/wiki/session-log-*.md`) for global traceability.

## Start / stop protocol

### Start (context recovery)

You can now say:

- `Continue vehicle-platoon-review`
- `Continue security-state-aware-mixed-platoon`
- `Handle yxj-wiki maintenance`

Then follow:

1. read `personal-llm-wiki/wiki/projects/<slug>.md`
2. read repo `PROJECT_STATUS.md` and `HANDOFF.md`
3. read `NEXT-SESSION-START.md` when available
4. check recent related `.omx/wiki/session-log-*.md`

### End (handoff)

You can now say:

- `Let’s stop here and add handoff`
- `Record the state and risks before you stop`

Then update:

1. `HANDOFF.md` (done items + next actions)
2. `PROJECT_STATUS.md` (status evolution)
3. project page in `personal-llm-wiki` (key direction/risk update)
4. local session log for cross-session retrieval

## Why this update

This change is mainly for stability:

- less confusion between planning records and execution facts
- fewer stale notes treated as current state
- fewer handoff mismatches between layers

In short, the new flow is now:

**(wiki entry) -> (repo truth) -> (handoff log)**

If needed, I can provide a compact set of copy-paste templates for `PROJECT_STATUS.md`, `NEXT-SESSION-START.md`, and `HANDOFF.md` for your active projects.
