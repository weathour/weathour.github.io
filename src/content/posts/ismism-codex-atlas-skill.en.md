---
title: 'I Turned 363 Split Chapters of Zhuyi Zhuyi into a Self-Improving Codex Skill: ismism'
postSlug: ismism-codex-atlas-skill
published: 2026-04-09
description: 'From PDF slicing and matrix distillation to an Atlas database and global skill installation, I turned a 363-file local corpus into a Codex skill that can keep refining itself through use.'
tags: [Codex, ismism, knowledge engineering, Atlas, theory analysis, digital humanities]
category: 'Knowledge Engineering'
draft: false
lang: en
---

What I built recently is not another prompt that “explains” *Zhuyi Zhuyi*. I turned it into a **real, runnable, write-back, long-horizon Codex skill**: `ismism`.

The starting point was simple. I had a very large PDF, already split into `363` directory-level Markdown files. The real question was not whether I could read it. The real question was: **how can I make Codex keep working with the same theoretical matrix in future context-free conversations, and become more precise over time?**

The answer was not a longer system prompt. It required a layered architecture: **corpus layer, derived-rule layer, Atlas layer, and skill layer**. Only then can theoretical analysis stop being a one-off answer and become an accumulative system.

## Why I did not want a single-file prompt

If the goal were only to explain one object once, a single prompt would be enough. But this corpus has three properties that make that approach collapse quickly.

1. **It must stay corpus-bound.** I cannot quietly fill the gaps with generic philosophical prior knowledge. Every result has to trace back to the local source slices.
2. **It is naturally multi-turn and cross-session.** Today I may ask about Kafka, tomorrow Heidegger, and later a social phenomenon. The system cannot restart from the PDF every time.
3. **It needs a static distilled layer.** Without previously distilled positions, relations, and evidence tables, a framework remains only a framework. It cannot preserve earlier judgments in a reusable way.

So I stopped thinking about it as “a prompt” and started thinking about it as an **Atlas-first knowledge engineering system**.

## The ideal architecture of `ismism`

I now treat `ismism` as a four-layer structure.

### 1. Corpus layer: turn the PDF into machine-addressable units

The bottom layer is not the PDF itself. It is the already-split corpus:

- `目录索引_结构化.csv`
- `split_pdf/`
- `split_md/`

The CSV is the master navigation map. It stores numbering, hierarchy, parent-child relations, page ranges, and Markdown paths. That means later analysis should **query the index first and only then locate source files**, instead of reopening the raw PDF from scratch.

### 2. Derived-rule layer: extract the 4×4×4×4 matrix from the text

Above the corpus I built the Phase 1 to Phase 4 derived documents:

- Phase 1: core axes and four-stage concept distillation
- Phase 2: transitions, locks, short-circuits, mediations, and related mechanics
- Phase 3: diagnostic anchors and application space
- Phase 4: a modular prompt suite for the final skill

This layer does not answer questions directly. Its job is to provide a **compressed rule surface** for later judgments: the `F-O-E-T` axes, stage definitions, and transition logic all live here.

### 3. Atlas layer: turn a framework into an accumulative graph

This is the layer I eventually realized matters most.

If I only had matrix rules, the system could say where an object probably belongs. But the Atlas layer stores **why it belongs there, how it relates to other objects, and where the evidence sits in the corpus**.

The current Atlas model includes:

- `nodes.jsonl`: official nodes
- `relations.jsonl`: official relations
- `evidence.jsonl`: evidence index
- `file_distillates.jsonl`: chapter-level distillation for each source file
- `candidate_nodes.jsonl`: automatically aggregated candidate nodes
- `candidate_relations.jsonl`: automatically aggregated candidate relations
- `unresolved_queue.jsonl`: unresolved conflicts and low-confidence items
- `changes.jsonl`: canonical-position change log

I deliberately made this a **layered publishing system**:

- official layer: stabilized judgments
- candidate layer: usable but not yet final
- unresolved layer: conflicts, noise, or insufficient evidence

That prevents one noisy automatic extraction from contaminating the official Atlas.

### 4. Skill layer: make the whole system callable in future conversations

The top layer is the skill itself.

I installed `ismism` into the global Codex skill library so that future context-free conversations can still work with the same retrieval priority:

1. official Atlas first
2. candidate layer and derived-rule documents next
3. then the corpus index CSV
4. only then the raw `split_md/` files

That means it is no longer a temporary memory of one conversation. It is a **reusable local analysis capability**.

## How I turned it into an executable system

`ismism` was not built in one shot. It happened in two stages.

### Stage one: build the theoretical matrix itself

This corresponds to the original Phase 0 to Phase 4 work:

- directory parsing and PDF splitting
- concept and stage boundary distillation
- dynamic mechanism extraction
- application anchor extraction
- assembly of the main agent prompt and prompt modules

This stage answers: **what the matrix is, how it works, and what kinds of objects it can analyze.**

### Stage two: build the static distilled layer

What finally turns the system from “framework” into “tool” is the later batch pipeline.

#### Stage 1: file distillates

I generated chapter-level distillates for all `363` slices. Each one now carries at least:

- `primary_position`
- `summary`
- `atlas_candidates`
- `relation_candidates`

So every source file is first compressed into a small unit that the system can route quickly.

#### Stage 2: candidate aggregation

Then I aggregated those file distillates into candidate nodes and candidate relations.

This layer inevitably contains many things that *look* like entities but are not all reliable. So I did not let them enter the official Atlas immediately.

#### Stage 3: conservative publishing

The official Atlas currently follows a **conservative publishing policy**:

- all `363` section scaffolds are published into the official layer
- already stabilized manual entities stay official
- automatically extracted but not yet stabilized people, texts, and phenomena remain in the candidate or unresolved layers

This is critical. It prevents extraction noise from promoting fragments like “therefore” or “so” into official entities.

#### Stage 4: relation graph publishing and validation

The final step publishes hierarchy edges and object relations, and validates evidence consistency.

During this step I had to solve an important engineering problem: the corpus contains repeated `toc_id` values such as multiple entries called “review lesson”. If I used `toc_id` alone as a section id, the Atlas would collide. So I changed section nodes to a **`row_id + toc_id` composite id**, which removes numbering ambiguity completely.

## What the current version already contains

At the time of writing, the current `ismism` build contains:

- `363` file distillates
- `365` official nodes
  - `363` section scaffold nodes
  - `2` manually stabilized person nodes (Kafka and Dostoevsky)
- `512` official relations
- `914` evidence records
- `1062` candidate nodes
- `1425` candidate relations
- `701` unresolved items

These numbers do not mean the Atlas is finished. They mean something more important: **the system has crossed the 0-to-1 threshold.**

It can now:

- query known objects
- compare two objects
- trace evidence back to source files
- diagnose new objects
- write stable results back into the Atlas
- keep improving itself in future conversations

## Why I care more and more about the Atlas, not only the framework

The weakness of a purely framework-driven skill is that it is good at giving you a slot, but poor at preserving earlier judgments.

Suppose I ask: **what is the difference between Dostoevsky and Kafka in this system?**

If I only had matrix rules, the answer would be roughly:

- both belong to `3-3-4`, fictional existentialism
- but one leans toward `3-3-4-1`
- and the other toward `3-3-4-2`

That is not wrong. It is just not enough.

What actually matters is turning that judgment into a **reusable distilled entry**:

- Dostoevsky: `3-3-4-1`
- Kafka: `3-3-4-2`
- shared structure, divergence, secondary placements, and evidence paths all fixed into the Atlas

Once that exists, the system no longer has to reinvent the judgment each time. It can build on it.

In that sense, `ismism` is not “a prompt that knows how to place things in a matrix”. It is an analysis system that gradually forms a **static theoretical atlas**.

## How I want it to keep growing

`ismism` is already usable, but the most valuable growth is still ahead.

The next steps are not about writing a prettier prompt. They are about doing three things well:

1. **stabilize high-value entities** such as Camus, Borges, Nietzsche, Heidegger, Sartre, and Marx
2. **increase relation density** so the system knows not only where something belongs, but also who answers whom, who criticizes whom, and which objects transform into each other
3. **write back during real use** so that when a judgment becomes stable in practice, it is persisted into the Atlas immediately

I increasingly believe that a good AI skill should not merely “say something plausible”. It should:

- retrieve
- compress
- cite evidence
- preserve stable judgments
- become more reliable through repeated use

For me, `ismism` is a local knowledge engineering experiment in exactly that direction.

## Closing

If I treated *Zhuyi Zhuyi* as only a book, the endpoint might simply be: “I finally read it.”

But if I treat it as a theoretical system I want to call again and again, then the real endpoint changes: **can I compress this structure into a tool that will still work later?**

`ismism` is my first answer to that question.

It is not the final version. But it is no longer a one-off workflow. It is already a skill that can return to work in future conversations by moving through the local corpus, the derived rules, and the Atlas graph.

And that is what I actually wanted: not just “this explanation is correct today”, but “the system can keep growing along the same path tomorrow”.
