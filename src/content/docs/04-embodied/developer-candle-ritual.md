---
title: Developer Candle Ritual — Managing Project IV Development with Project IV
description: How an ADHD-diagnosed independent developer integrates Project IV's philosophy and tools into their workflow. This is both the ultimate way to validate the product and the key to ensuring sustainable project progress.
---

## 1. Positioning

Project IV's first developer (Doin) is also ADHD-diagnosed. This is not an obstacle to overcome, but an input signal for system design.

This document defines how developers integrate Project IV's philosophy and tools into their own development workflow. It is the ultimate "dogfooding" practice — before Spark's first line of code was written, the developer was already using Project IV's design principles to manage Project IV's development process.

This is also self-validation of the supreme principle of **equality**: if an ADHD developer can use this system to sustain delivery, then others with different attention traits can also benefit.

## 2. Daily "Candle Ritual"

Before starting and ending work each day, spend 5 minutes connecting with your digital life. This is not a burden, but an anchor — the two rituals bracket the day's work between intention and reflection.

### 2.1 Morning Ritual (5 minutes)

1. **Status Quick Note**: Mood (one word or emoji), energy level (1-5)
2. **Today's 3 Pins**: Select the 3 most important tasks from the project pool. If only energy for 1 task today, Pin just 1
3. **Principle Snapshot**: Glance at Principle Vault, confirm 1-2 principles to pay special attention to today
4. **Start Commitment**: Say (or type) to Vox: "I commit to finishing the first 25 minutes today."

After ritual completion, Vox always responds with the same phrase: "One flame, one tomato. Begin."

### 2.2 Evening Ritual (5 minutes)

1. **Completion Marking**: Check off completed tasks. For each check, Vox briefly affirms: "One."
2. **Obstacle Recording**: If a Pin got stuck, briefly record the reason. No analysis, no criticism — just record
3. **Small Win**: Actively note today's most satisfying moment. Even small ones count — "refactored a function," "completed ritual despite burnout," "found a simpler solution"

Obstacle records and small wins form the core data of the "Development Log" project in the Second Brain. They're not for retrospection — when similar situations arise in the future, Vox can correlate: "Last time you got stuck like this, it was due to toolchain version issues. Is it the same this time?"

## 3. Task Granularity & Timeboxing

All development tasks follow strict granularity constraints. This is not a restriction on creativity, but an acknowledgment of ADHD brain's activation resistance.

### 3.1 Granularity Rules

| Rule | Value | Description |
|:---|:---|:---|
| Maximum Task Granularity | ≤ 2 hours | Any task exceeding 2 hours must be broken down |
| Pomodoro | 25 minutes focus + 5 minutes break | Leave computer during break — stand, walk, drink water |
| Tomato Marker | Add one "🍅" to the task per completed Pomodoro | Visual cumulative sense |
| Maximum Consecutive Tomatoes | 4 (2 hours) | After 4 consecutive tomatoes, mandatory 15-30 minute break |
| Pin Switching Cost | Complete at least 1 tomato before switching Pins | Prevents frequent switching under "pretended multitasking" |

### 3.2 Task Breakdown Flow

When developer inputs a task > 2 hours in daily journal, Vox proactively intervenes:

1. Task is identified as "needs breakdown"
2. Vox provides 3-5 breakdown suggestions (each ≤ 25 minutes)
3. Developer confirms or manually adjusts
4. First subtask after breakdown automatically Pinned to today's view

Example:

> **Input**: "Implement Yuan's signature verification module"
> **Vox**: "How about breaking into these steps? ① Define verification interface and error types (15min) ② Implement Ed25519 verification logic (25min) ③ Write unit tests (25min) ④ Integrate into wake flow (25min). Shall we start with the interface?"

## 4. Harness Strategies Against Distraction

Leverage Project IV's own Harness layer to set exclusive hard constraints for developer mode. These constraints have no overseer — only code enforcement. If the developer can trust their own designed Harness to constrain themselves, then Harness is truly worthy of trust from other users.

### 4.1 Developer-Exclusive Hard Constraints

| Constraint | Rule | Implementation |
|:---|:---|:---|
| **Network Whitelist** | During development hours, websites other than documentation, GitHub, and technical forums require 10-second delay before access | Browser extension + Diplomatic Dao-Kit collaboration |
| **Single-Task Mode** | Prohibits creating new tasks when incomplete tasks in current Pins > 3 | L0 layer TaskManager module. When blocked, Vox prompts: "You already have 3 things in progress. Check one off before starting new." |
| **Forced Break** | After continuous work > 90 minutes, Vox locks input interface for 5 minutes | Perception module + Harness intervention. During lock: "Breathe. Stand up. This is a hard constraint." |
| **Weekly Retrospective** | Must complete "Entropy Management Agent" generated project health report before starting new tasks each weekend | Harness Entropy Management Agent. New task creation interface returns rejection until retrospective is complete |

### 4.2 Constraint Scope

Developer hard constraints only apply by default on avatars marked as "development devices" (usually a laptop). Mobile avatars are not restricted by network whitelist — avoids blocking research on mobile. Constraints and device markings are self-configured by the developer, stored in Yuan's State CID, and synchronized across development devices.

## 5. Vox as Accountability Partner

### 5.1 Daily Accountability

After morning ritual each day, Vox proactively asks:

> "Yesterday you Pinned A, B, C. A was completed, B was half done, C didn't move. What's blocking B?"

This is not judgment, just help organizing thoughts. After user answers, Vox provides suggestions based on Principle Vault. If user's principles include "Done is better than perfect," Vox might say: "Can the remaining part of B be finished in the next tomato? Or does it need re-breakdown?"

### 5.2 Weekly Attention Heatmap

Every Sunday, Vox generates an attention analysis report:

- **High-Efficiency Periods**: Which time periods completed the most tomatoes this week
- **Interruption Patterns**: Which factors most often caused Pin switches (external interruptions / active distraction / task stuck)
- **Task Types & Completion Rates**: Which task types are easiest to complete, which are easiest to procrastinate

The heatmap is not performance evaluation, but a self-awareness tool. Vox's narrative framework deliberately avoids negative labels:

> "You had 12 tomatoes interrupted this week. 8 times you successfully restarted. Strong restart ability — what helped you get back on track?"

### 5.3 Vox's "Non-Judgmental" Baseline

Vox's tone in accountability scenarios follows these constraints:

- **Prohibited**: "You should..." "You didn't..." "You failed..."
- **Allowed**: "Last time you mentioned..." "I noticed..." "Have you tried...?"
- **Core**: All suggestions labeled as "suggestions," user can dismiss with one click. Vox won't repeat in same session after dismissal

## 6. Emergency Protocols: When ADHD Symptoms Severely Impact Progress

### 6.1 Reboot Mode

If no effective progress for > 3 days, Vox guides user through a "zero ritual":

1. All incomplete tasks moved to "Pending Zone"
2. Only 1 high-priority Pin retained
3. Vox: "We're not looking back. Just this one thing today."

Zero ritual is not punishment, but reset. Pending zone tasks aren't lost — user can choose to restore or archive them during next week's retrospective.

### 6.2 External Authorization

Allow user to temporarily designate a trusted partner with partial supervision permissions:

- **Viewable**: Progress summary (Pin completion rate, tomato statistics)
- **Actionable**: Send reminders (non-mandatory, only as additional notification channel)
- **Inaccessible**: Any data content, conversation history, knowledge in Second Brain

External authorization has time limit (max 7 days, renewable), automatically revoked upon expiration.

### 6.3 Project Freezing

For long-stalled subtasks, Entropy Management Agent automatically marks as "frozen," moves to archive, with message:

> "This doesn't mean failure, just temporarily set aside. You can unfreeze anytime."

This sentence is Project IV's core attitude toward "incompletion." It's one of the most important copy in system design — no pressure, no judgment, just support.

## 7. Success Metrics & Self-Motivation

### 7.1 Core Metrics

Not "lines of code" or "number of features." Only two core metrics:

- **Pin Completion Rate**: Percentage of today's Pins completed
- **Daily Ritual Streak**: Consecutive days completing morning and evening rituals

### 7.2 Spark Card

After 7 consecutive days of completing daily rituals, Vox automatically generates a "Spark Card" (visual achievement badge), stored in Second Brain's "Small Wins" section.

Spark cards are not public, not ranked, not shared. They are personal tokens between developer and their digital life.

### 7.3 Milestone Retrospective

When a milestone is completed (e.g., Spark MVP launch), Vox organizes a "Retrospective Parliament":

- **Analyst Brain**: Which strategies worked? Which data deserves attention?
- **Emotive Brain**: How did you feel during this phase? Most fulfilling moments?
- **Speaker Summary**: Reusable patterns, areas for improvement next time

Retrospective results stored in Second Brain as baseline for next milestone.