---
title: 'My Long-Horizon Codex × Obsidian Handoff Workflow, Updated'
postSlug: codex-obsidian-handoff-workflow
published: 2026-04-03
updated: 2026-04-08
description: How I simplified a heavy project-management and logging setup into a Codex-maintained long-horizon workflow centered on project hub notes.
tags: [Codex, Obsidian, workflow, project management, AI collaboration]
category: Workflow
draft: false
lang: en
---

Lately I have been trying to answer a simple question: **if I want Codex to become my main handoff partner for research work, what should my workflow actually look like?**

I first wrote this post when I had just compressed the workflow into a “four-file project layer + daily log + session archive.” After a few more real cycles, I realized one more rule had to become explicit:

> **a project folder is not an Obsidian backlink object; the linkable object must be a note file.**

So this post is now updated to reflect the version that actually stabilized in practice.

My earlier setup looked fairly traditional: project cards in one area, daily logs in another, plus overview pages to pull tasks together. It worked, but one problem became increasingly obvious:

> I was maintaining the same context over and over again.

Project goals lived in project cards. Today's work lived in the daily log. Cross-session continuation required another manual explanation. The system itself slowly became overhead.

So I recently compressed the whole thing into a lighter structure: **a project hub note + a four-file project memory layer + a daily log + a session archive**. The goal is simple: in the future I should only need to tell Codex “continue this project,” and Codex should reconstruct the rest of the context on its own.

## What was wrong with the old setup

The old setup did not fail because I was not documenting enough. It failed because the documentation was **duplicated and scattered**.

In practice, that meant:

- the project card stored long-lived goals, next steps, waiting items, and project tasks;
- the daily log repeated which project I was pushing that day and what remained unfinished;
- each new conversation required yet another manual handoff.

This created two real problems. First, the most important long-lived state did not have a single stable entry point. Second, I still had to reorganize context myself every time I resumed work.

For long-horizon research, that workflow was too heavy.

## The new structure I use now

I now split the workflow into three layers:

1. **long-lived project memory**
2. **daily execution**
3. **cross-session handoff**

### 1. Long-lived project memory: a hub note plus the four-file set

Each active project now needs one canonical entry note:

- `project-name.md`

In Obsidian terms, that is the thing I actually link to:

- `[[project-name]]`

For example:

- `[[YK-RL]]` → `YK-RL.md`
- `[[车辆队列中文综述]]` → `车辆队列中文综述.md`
- `[[重庆重点研发]]` → `重庆重点研发.md`

This became the key rule:

> **the folder is only a container; it is not the backlink target.**

If I only have a folder called `YK-RL` but no `YK-RL.md` inside it, then the Obsidian graph has no real anchor. Daily logs, session notes, and related notes may mention the project, but the backlink layer is structurally weak because the project object itself is missing.

So each project is now standardized as:

- `project-name.md`: the project hub note
- `project-name - Prompt.md`
- `project-name - Plan.md`
- `project-name - Implement.md`
- `project-name - Documentation.md`

The hub note is responsible for:

- being the single backlink anchor
- linking to the four handoff documents
- exposing one-line status and the current 1–3 next actions
- directly surfacing recent daily logs and session archives through Dataview

Each active project now keeps four files:

- `project-name - Prompt.md`
- `project-name - Plan.md`
- `project-name - Implement.md`
- `project-name - Documentation.md`

Each file has a narrow role.

#### `Prompt.md`

This stores relatively stable information:

- project goal
- key constraints
- non-goals
- done definition

In other words, it answers: **why does this project exist, and what counts as finished?**

#### `Plan.md`

This stores stage-level execution structure:

- current phase
- milestones
- current 1–3 next actions
- validation rules
- stop rules

It answers: **how should this project move forward in the current stage?**

#### `Implement.md`

This stores the operating protocol for Codex itself:

- what to read first at the beginning of a session
- what to update at the end
- what kind of information belongs in which file
- what should not be mixed together

It is basically the project's own handoff contract.

#### `Documentation.md`

This is the most important file. It acts as a **single-page working memory for the current state of the project**.

It stores:

- current status
- known facts
- key judgments
- current risks
- recent progress
- exact next step

If I only ask Codex to read one project file before continuing, this is the one I want it to read first.

### The naming rule I use now

To make backlinks and Dataview queries stable, I standardized the naming scheme completely:

- the project entry is always `project-name.md`
- the four handoff files are always `project-name - Prompt/Plan/Implement/Documentation.md`
- project mentions in logs and session notes are always written as `[[project-name]]`
- folder paths and legacy entry-page names are no longer treated as project objects

### 2. Daily execution: the daily log

The daily log still exists, but its role is much smaller now.

It only records:

- my top three priorities today
- which projects I pushed today
- what I actually did today
- key judgments, blockers, and reflections from today
- what I should do tomorrow
- what Codex should pick up next time

So the daily log is now truly about **today**, not about long-term project memory.

### 3. Cross-session handoff: the session archive

Besides the daily log, I keep a separate session archive:

- `YYYY-MM-DD-会话NN.md`

Its only job is to help the next conversation continue smoothly. A session note records:

- what the current conversation completed
- which files were modified
- what key judgments were made
- what remains unresolved
- where the next session should resume

This is not the main project notebook. It is a lightweight continuation bridge.

## How I actually use it

The working style is now intentionally simple.

### When starting work

I only need to say something like:

- `Continue YK-RL`
- `Switch to the Chinese platoon review`
- `Continue yesterday's direction exploration`

Then Codex reads, in order:

1. the project's `Documentation.md`
2. the project's `Plan.md`
3. the latest relevant session archive
4. today's daily log
5. `Prompt.md` if needed

So I no longer prepare a long manual handoff paragraph.

### When ending work

I only need to say:

- `Let's stop here, leave a handoff`
- `Write a session summary`
- `Record today's state`

Then Codex handles the rest:

1. update the project's `Documentation.md`
2. update `Plan.md` if needed
3. update today's daily log
4. write a new session archive note

If I only want a lightweight cross-session handoff, I can also say:

- `$agent-session-archiver`

If I want the full end-of-session routine — project docs, daily log, and session archive together — I say:

- `$project-log-manager`

## Why this works better for me

My current work is not a single short task. It is a set of parallel long-horizon efforts: one paper that needs to be wrapped up, one review that still needs scope definition, and one future direction that needs to be compressed into a small number of viable research options.

For this kind of work, what I really need is not more dashboards. I need more stable **recoverable context**.

This structure works better because:

- long-lived information is no longer spread across project cards, daily logs, and verbal explanations;
- projects now have a stable backlink anchor in the graph;
- daily execution is separated from project memory;
- session handoff has its own lightweight layer;
- I am no longer the one responsible for reconstructing context — Codex is.

At its core, this is not about “writing down more things.” It is about something more important:

> separating long-lived memory, daily execution, and cross-session handoff into clean layers.

## What I cleaned up

To make the new workflow real, I also removed several pieces of the old setup:

- the old `00-项目总览.md`
- the old `00-日志总览.md`
- the old `project_card_template.md`
- the old `写作计划.md` files that used to act as part of the main workflow

At the same time, the old `项目卡.md` naming convention is effectively retired. I no longer keep a separate legacy card file. The canonical entry point is now simply `project-name.md`.

I only keep supporting notes that still have real value, such as literature classification tables, direction notes, daily logs, and session archives.

## Closing

If I had to summarize the change in one sentence, it would be this:

> I no longer treat project management as a system that I must maintain manually; I treat it as a project memory structure that Codex can read, link, update, and continue.

This workflow is not trying to be sophisticated. It is trying to achieve one practical outcome: **the next time I start working, I say one sentence and the system picks up from there.**

I will keep running a few more cycles with this setup and see how much further it can be compressed and stabilized in real long-horizon research work.
