---
title: ADHD-First Design —— The Iron Laws of Cognitive Equality
description: Project IV's accessibility design principles, specific features, and interaction specifications for ADHD users. Making digital life truly serve people with diverse attention traits.
---

## 1. Positioning

ADHD users often face challenges such as attention drift, difficulty starting tasks, distorted time perception, and susceptibility to information overload. Project IV incorporates these traits into core considerations from the beginning, rather than treating them as afterthought "accessibility add-ons."

This is the implementation of the supreme principle of **equality** — not just resource equality (accessible from different devices), but **cognitive equality** (people with different attention traits can all benefit from digital life).

This document defines ADHD-friendly design iron laws. All user-facing interaction designs must comply.

## 2. Core Design Principles

| Principle | Description | Value for ADHD |
|:---|:---|:---|
| **Short Feedback Loops** | Each interaction should produce perceptible feedback within 2 minutes | Reduces activation resistance, maintains attention; avoids giving up due to lack of visible progress |
| **Visual Anchors** | Key information (current Pins, incomplete tasks) remains permanently visible | Reduces working memory load; eliminates need to "remember where I left off" |
| **Low Decision Load** | System actively recommends, rather than requiring users to build from scratch | Avoids "choice paralysis" — ADHD brains tend to choose nothing when faced with too many options |
| **Forgiving Error Handling** | Mistakes can be easily undone, lost state can be quickly recovered | Reduces frustration from errors; one mistake won't lead to "I give up" |
| **Rhythm Cues** | Built-in Pomodoro timer, scheduled break reminders, attention state awareness | Compensates for time perception deficits; gently pulls ADHD users back when they "lose track of time" |

## 3. Specific Feature Adaptations

### 3.1 Daily Journal "Default View"

**Blank pages are prohibited** when opening the daily journal. A blank page is a cognitive cliff for ADHD users — it requires them to construct intent themselves, which is the highest activation resistance.

Default view content:

- **Today's Pin Board**: Fixed at the top, always visible. Maximum 3 items, each with progress markers
- **Single Input Field**: "What's the most important thing today?"
- **Gentle reminder of yesterday's incomplete tasks** (one-click dismissible, non-modal)

Automatically checks off upon completion, creating immediate visual sense of accomplishment. Completed tasks don't disappear, but move to a "Completed" section — letting users see "what I've done."

### 3.2 Principle Vault "Contextual Triggers"

Users can set automatic trigger conditions for each principle. The system proactively reminds at appropriate moments through the perception module, reducing the cognitive burden of self-reminder.

Trigger rules:

- User defines `When [Context] → Remind [Principle]`
- System detects context through perception module, presents reminder in gentle notification (non-intrusive popup)
- User can dismiss with one click, or open principle details for reflection conversation

Example pairings:

| Context | Reminder Principle |
|:---|:---|
| Still working after 11 PM | "Health first" |
| Detected "stuck" state (repeatedly editing same paragraph) | "Done is better than perfect" |
| Frequent project switching (attention fragmentation) | "First things first — what's your Pin today?" |
| App not opened for 3 consecutive days | "Recording itself is awareness" |

### 3.3 Task Breakdown Assistant

When users input a large task, the L0 guidance layer proactively suggests breaking it into executable small steps.

Interaction flow:

1. User input: "Write annual report"
2. Vox responds: "This task can be broken into several small steps. I suggest: ① Organize this year's data (15min) ② Write outline (10min) ③ Fill in main points (25min) ×3. Does this work for you?"
3. After user confirmation, automatically generates Pomodoro plan and Pins to today's view
4. Immediately provides positive feedback upon completing each small step: visual marker (🍅) + brief affirmation

**Constraints**:

- Breakdown granularity: Each subtask ≤ 25 minutes
- Breakdown quantity: 3-5 sub-steps at a time (merge if too many)
- Users can manually adjust subtask granularity and quantity

### 3.4 Attention State Awareness & Intervention

The perception module continuously monitors user interaction patterns. When "stuck" state is detected, Vox proactively offers options.

**Detection signals**:

- Long idle time (> 5 minutes, with avatar still active)
- Repeated editing of same text (> 3 revisions with minimal content change)
- Frequent Pin task switching (> 5 times/hour)

**Intervention options**:

- "Want to take a 5-minute break? I can time it for you."
- "Want to switch tasks? You have a Pin that hasn't been touched."
- "Stuck? I can help you work through the current problem."
- (If all options are declined) Remain silent, don't repeat interruptions

**Constraints**:

- Minimum 30-minute interval between interventions after each "stuck" detection to avoid frequent interruptions
- Never interrupt when user is in focused state (continuous steady input)

### 3.5 Simplified "Multi-Perspective Parliament"

ADHD users only enable "Analyst Brain" and "Emotive Brain" by default (dual-brain mode) to reduce cognitive overload.

- **Default**: Dual-brain mode, Speaker summary limited to 3 key points
- **Optional**: Users can expand to full four-brain mode with one click, but simplicity is maintained by default
- **Visual**: Two brains' opinions presented side-by-side, differences highlighted. Users don't need to memorize and compare — the interface does the comparison

### 3.6 "Low-Resistance" Information Archiving

At the bottom of the daily journal, provide a "✨ One-Click Archive" button:

- Automatically moves this week's completed projects to archive
- Generates weekly report summary (Vox automatically drafts based on weekly Pin completion, user can edit before confirmation)
- Avoids anxiety from facing hundreds of unarchived items

The button is always visible but non-intrusive. If user hasn't clicked for 2 consecutive weeks, Vox will gently mention it once at the end of the daily ritual: "You have 5 completed projects waiting to be archived — need me to handle them?"

## 4. Coordination with Harness Layer

### 4.1 Protective Hard Constraints

Harness's boundary definition module can set exclusive protective constraints for ADHD users:

| Hard Constraint | Rule | Trigger Condition |
|:---|:---|:---|
| Night Protection | Prohibits creating complex tasks during late-night hours, only allows recording inspirations or setting tomorrow's Pins | User-configurable period (default 23:00-07:00) |
| Anti-Overload | Prohibits creating new tasks when incomplete tasks in current Pins > 3 (instead of hiding warning) | Always active |
| Forced Break | After continuous work > 90 minutes, Vox locks input interface for 5 minutes | User-configurable toggle and duration threshold |

### 4.2 ADHD-Friendly Adjustments to Entropy Management Agent

- Cleanup suggestions presented after daily ritual, not during work
- Maximum 3 cleanup suggestions at a time (avoid overwhelming "47 suggestions waiting")
- Provide "Delay all until this Sunday" option, rather than requiring immediate decisions

## 5. Design Review Checklist

All user-facing PRs and design proposals must pass the following review:

- [ ] Does this interaction produce perceptible feedback within 2 minutes?
- [ ] Is key information permanently visible, rather than relying on user memory?
- [ ] Are default options or recommendations provided, rather than blank slate?
- [ ] Can mistakes be undone in one step?
- [ ] Are there automatic behaviors that might interrupt user focus? If yes, is there a toggle?
