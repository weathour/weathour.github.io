---
title: 'My Long-Horizon Codex × Obsidian Handoff Workflow'
postSlug: codex-obsidian-handoff-workflow
published: 2026-04-08
description: A long-horizon workflow built on project hub notes, four project handoff files, daily logs, and session archives maintained with Codex.
tags: [Codex, Obsidian, workflow, project management, AI collaboration]
category: Workflow
draft: false
lang: en
---

I now keep my long-horizon workflow in a very simple structure: **a project hub note + four project handoff files + a daily log + a session archive**.

The goal is not to make project management more sophisticated. It is to make one thing reliably true:

> when I start the next work session, I should only need to give Codex one short instruction, and Codex should be able to reconnect the context by itself.

This works especially well for long-running work such as papers, reviews, research direction exploration, engineering projects, and experiment retrospectives.

## The core idea

The workflow is built on three principles.

### 1. Long-lived memory, daily execution, and cross-session handoff must be separated

The real problem in many systems is not a lack of documentation. It is that different layers of information get mixed together.

- long-lived information belongs in project memory
- execution that only matters today belongs in the daily log
- continuation hints for the next conversation belong in the session archive

If these layers are not separated, the workflow becomes heavier over time and less effective at restoring context.

### 2. Every project needs one real linkable anchor

In Obsidian, the real backlink object is a **note file**, not a folder.

So every project needs one canonical entry point:

- `project-name.md`

That is the object I actually link to:

- `[[project-name]]`

For example:

- `[[YK-RL]]`
- `[[车辆队列中文综述]]`
- `[[重庆重点研发]]`

The folder is only a container. It is not the backlink target. Once that rule is fixed, links between daily logs, session notes, and related project notes become much more stable.

### 3. Codex should reconstruct context instead of making me repeat it

I do not want to manually rewrite project background every time I start a new conversation.

The better model is:

- I give a short instruction
- Codex reads the project's long-lived memory
- Codex reads the latest relevant session archive
- Codex reads today's daily log
- Codex starts executing

That is the user experience this workflow is designed for.

## The structure

### 1. The project hub note

Each project has one canonical entry note:

- `project-name.md`

It serves four purposes:

- it is the single backlink anchor for the project
- it links to the four handoff files
- it exposes one-line status
- it shows recent daily logs and recent sessions

I treat the hub note as a real navigation layer, not as a giant archive page.

### 2. The four project handoff files

Each project keeps four long-lived files:

- `project-name - Prompt.md`
- `project-name - Plan.md`
- `project-name - Implement.md`
- `project-name - Documentation.md`

Each one has a clear role.

#### `Prompt.md`

This stores stable information:

- project goal
- key constraints
- non-goals
- done definition

#### `Plan.md`

This stores stage-level execution structure:

- current phase
- milestones
- current 1–3 next actions
- validation rules
- stop rules

#### `Implement.md`

This stores the operating contract for Codex:

- what to read first
- what to update at the end
- what kind of information belongs in which file
- what should not be mixed together

#### `Documentation.md`

This is the main working-memory page for the project.

It keeps:

- current status
- known facts
- key judgments
- current risks
- recent progress
- the exact next step

If I want Codex to recover a project quickly, this is the file I want it to read first.

### 3. The daily log

The daily log only tracks today's execution. It is no longer the place for long-term project definition.

It usually contains:

- my top three priorities today
- which projects I pushed today
- what I actually did today
- key judgments, blockers, and reflections from today
- what I should do tomorrow
- what Codex should continue next time

In other words, it is the execution view for today, not the long-term memory layer.

### 4. The session archive

I also keep a lightweight cross-session handoff layer:

- `YYYY-MM-DD-会话NN.md`

Its only job is to help the next conversation continue smoothly.

Each session note records:

- what this conversation completed
- which files were modified
- what key judgments were made
- what remains unresolved
- where the next session should resume

It is not the main project notebook. It is the bridge to the next conversation.

## Naming and linking rules

To keep the whole system stable, I fixed the rules like this:

- the project entry is always `project-name.md`
- project links are always written as `[[project-name]]`
- the four handoff files are always `project-name - Prompt/Plan/Implement/Documentation.md`
- project folders are containers only, not backlink targets
- project hub notes should directly expose recent logs and sessions through Dataview whenever practical

These rules look simple, but they determine whether the Obsidian graph, backlinks, and Codex handoff behavior remain stable over time.

## How I actually use it

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

That means I do not have to manually reconstruct project background every time.

### When ending work

I only need to say something like:

- `Let's stop here, leave a handoff`
- `Write a session summary`
- `Record today's state`

Then Codex handles the rest:

1. update the project's `Documentation.md`
2. update `Plan.md` if needed
3. update today's daily log
4. write a new session archive

If I only want a lightweight handoff, I can say:

- `$agent-session-archiver`

If I want Codex to finish the whole closing routine — project docs, daily log, and session archive together — I say:

- `$project-log-manager`

## Why this works well for long-horizon work

Most of my work is not a short isolated task. It spans many days and many conversations.

This workflow fits that reality because:

- every project now has a stable backlink anchor
- long-lived memory is separated from daily execution
- cross-session continuation has its own dedicated layer
- Codex can actively reconstruct context instead of waiting for me to explain it again

At its core, this is not about documenting more. It is about improving the **speed and reliability of context recovery**.

## Closing

If I had to summarize the workflow in one sentence, it would be this:

> I turned project management into a project-memory structure that Codex can actively read, link, and continue.

For me, the real value is not that the system looks cleaner. The real value is that the next time I start work, I can say one short sentence and the project can pick up from there.
