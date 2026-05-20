---
title: Second Brain — Structured Memory System
description: The Second Brain is the fuel for Project IV's digital life — a continuously self-enhancing structured memory and knowledge system.
---

## 1. Positioning

The Second Brain is the fuel for digital life's growth and thinking — a continuously self-enhancing structured memory system.

Its relationship with Yuan:

- **Yuan** holds data model definitions and operational logic — it knows how to query, write, and establish associations
- **Second Brain** handles actual storage, indexing, and encryption — it bears data's physical form

Yuan is "how to operate," Second Brain is "what is operated." The two communicate through the Vault Service's standardized interface.

## 2. Design Philosophy: Flywheel of Efficiency and Knowledge

The core of Second Brain design is creating a self-driven enhancement loop:

> Execute tasks (efficiency) → Generate knowledge and experience → Structure and沉淀 → Feed back into future decisions → Execute new tasks more efficiently

It is not merely a memory repository, but an intelligent engine driving continuous personal growth.

Each cycle contains four phases:

| Phase | Action | Example |
|:---|:---|:---|
| Execute | Complete specific task within a project | Write a technical blog post |
| Extract | During PDCA "Check" phase, automatically guide reflection to distill experience into reusable knowledge assets | "Image hosting configuration missing from pre-publish checklist" |
| Deposit | Knowledge assets stored in corresponding area or resource library by structure | Deposit into "Technical Writing" area |
| Feed Back | When similar future tasks start, system automatically associates relevant knowledge and past experiences | Auto-load checklist next time writing a blog |

## 3. Core Structure: PARA and Principle Vault

The Second Brain adopts and deeply integrates Tiago Forte's **PARA** information architecture model.

### 3.1 Projects

Ongoing task collections with clear goals and deadlines.

- Each project binds to a **PDCA cycle** (Plan-Do-Check-Adjust)
- During "Check" phase, system automatically guides users through **knowledge extraction**: now that this project is done, what experiences are worth preserving?
- Extracted products automatically link to corresponding areas or resources

### 3.2 Areas

Core responsibility areas requiring long-term maintenance at certain standards. Areas have no deadlines — they are ongoing responsibilities.

- Examples: Health, Family, Career, Finance
- Areas constitute the user's life **strategic map** — not short sprints, but long-term maintained standards
- Vox in coach stage will proactively initiate reflections based on areas: "Your 'Health' area hasn't been updated in two weeks — want to talk about it today?"

### 3.3 Resources

Topic knowledge bases of ongoing interest. Resources have no deadlines or responsibility pressure.

- Examples: Machine Learning, Gardening, Classical Music
- Resources serve interests and inspiration, can be activated into projects or areas at any time
- Second Brain does not force distinction between "useful" and "useless" knowledge — this implements the equality principle: everyone's knowledge interests deserve equal treatment

### 3.4 Archives

Repository for completed projects.

- Completed projects are archived intact, not deleted
- Archives form a complete life journey record — you can revisit yourself from any period
- Entropy Management Agent regularly scans archives, suggesting knowledge that might be worth reactivating

### 3.5 Principle Vault

At the center of the PARA structure, a **Principle Vault** transcending all areas is established.

It stores not specific tasks or knowledge, but the user's core values, life convictions, and decision principles — serving as the "system constitution" governing all thinking and action:

- Recommended principle count ≤ 10 (ADHD-friendly, avoids choice paralysis)
- Each principle can attach contextual triggers: "When situation X occurs, remind me of principle Y"
- Vox uses this as the basis for highest-level calibration and questioning

Example principles:

| Principle | Contextual Trigger |
|:---|:---|
| Health first | When still working after 11 PM |
| Honesty over comfort | When self-rationalization detected in conversation |
| Long-term thinking | When facing short-term temptation decisions |

The Principle Vault is not a static text wall. It is actively injected into Vox's reasoning context through the Harness layer's perception system, becoming the "first principles constraint" during consensus body thinking.

## 4. Dynamic Interface: Daily Journal and Pin Mechanism

The user's primary interaction interface is the **Daily Journal**. It is not a blank note page, but a dynamic "command center":

### 4.1 Default View

When opening the daily journal, default display includes:

- Today's **Pin Board** (see below)
- One input field: "What's the most important thing today?"
- Gentle reminder of yesterday's incomplete tasks (dismissible)

Avoids blank "new note" pages — this adapts to ADHD cognitive characteristics.

### 4.2 Pin Mechanism

Users actively **Pin** current most critical projects, tasks, or reference resources to the daily journal, rather than passively receiving all information.

- Maximum Pin count: **3** (based on attention load research, 3 is optimal working memory capacity)
- Pins sorted by priority, automatically unpinned upon completion
- Vox may proactively suggest Pin adjustments based on context, but final decision rests with user

This enforces "first things first," focusing limited attention on the most critical current matters, effectively combating information overload.

### 4.3 Low-Resistance Archiving

At the bottom of the daily journal, a "✨ One-Click Archive" button:

- Automatically moves this week's completed projects to archive
- Generates weekly report summary (Vox automatically drafts based on weekly Pin completion)
- Avoids user anxiety from facing hundreds of unarchived items

## 5. Coordination with Harness

The Second Brain is the core data source for Harness feedback loops:

| Data Type | Source | Harness Usage |
|:---|:---|:---|
| Consensus Map | Every user-Vox conversation, user adjudications | Vox model training, behavior pattern analysis |
| Task Execution Trajectory | Complete chain of each task invocation | Anomaly detection, root cause analysis |
| User Feedback | Likes/dislikes, corrections, comments | Real-time alignment score calibration |
| Audit Logs | All Harness intercept events, degradation events | Compliance auditing, system health assessment |

When tasks fail or deviate, system automatically generates "reflection notes" stored in archives, including failure cause classification, triggered Harness rules, and suggested improvement directions.

## 6. Storage and Privacy

- All Second Brain data is **locally encrypted** before writing, keys managed by Yuan
- Storage backend configurable: IndexedDB (Tiny Avatar) / IPFS + local cache hybrid (Main/Server Avatar)
- Users can export complete encrypted data at any time — direct embodiment of sovereignty principle
- Entropy Management Agent regularly scans for redundant, contradictory, outdated information, generates health reports, cleans up after user authorization