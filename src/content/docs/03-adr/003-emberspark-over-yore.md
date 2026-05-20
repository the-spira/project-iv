---
title: ADR 003 · Spark Prioritized Over General Diary Tools
description: Why Project IV's MVP chose principle-guided daily reflection as its entry point, rather than building a more general note-taking or diary tool.
---

## Decision Status

Accepted. Determined during MVP planning phase in 2025.

## Background

During the definition phase of Project IV's Minimum Viable Product (MVP), there was a choice: build a more comprehensive general diary/knowledge management tool (similar to existing products like Yore), or create a minimalist application focused on a single core experience.

Constraints:

1. **Developer is an individual** (Doin), with extremely limited development resources. MVP must be completed independently in weeks to months, not years
2. **ADHD-friendliness is a system-level requirement**: MVP itself needs to validate whether the "cognitive equality" design principle is feasible — the product's first user is an ADHD-diagnosed individual (the developer themselves)
3. **Need to validate core hypothesis**: Project IV's entire architecture rests on one assumption — principle-guided reflection is more valuable than passive recording. If this assumption fails, the foundation for all subsequent designs (Principle Vault, Vox Coach Stage, Harness Alignment Scoring) collapses
4. **Act I narrative commitment**: MVP is the "stunning prologue" — it needs to impress early users through experience alone, without protocols or decentralized narratives

## Decision

**MVP is positioned as a "principle-driven daily reflection companion" — Spark, not a general diary tool.**

Core functional boundaries:

- **Included**: Daily check-in with mood/energy recording (minimal, 2 steps), Principle Vault (≤10 personal principles), conversational journaling (natural language recording with principle-based guiding questions), Pin board (visualize top 3 most important tasks), data export (encrypted JSON)
- **Explicitly excluded**: Rich text editor, multimedia attachments, social sharing, template marketplace, multi-level folders, calendar view, handwritten notes

## Considered Alternatives

### Option A: General Diary Tool (Better Yore)

- **Description**: Build a more comprehensive diary application covering more use cases
- **Pros**: Large market capacity, higher user base potential; comprehensive features facilitate future expansion
- **Cons**: Impossible for independent developer to complete in reasonable time; direct competition with existing products (Day One, Notion, Obsidian), insufficient differentiation; cannot focus on validating Project IV's core hypothesis (principle guidance); too many features dilute the Principle Vault's central position — it becomes just one of many features, not the system's constitution

### Option B: Minimal Encrypted Notebook

- **Description**: A lightweight notebook with only end-to-end encryption, no AI guidance
- **Pros**: Minimal development effort; clear privacy and sovereignty selling points
- **Cons**: Cannot validate Vox and Principle Vault value; "encrypted notebook" is a crowded market with mature products like Signal, Standard Notes; disconnected from Project IV's "intelligent companion" vision — abandoning intelligent narrative in Act I creates narrative discontinuity

### Option C: Principle-Driven Daily Reflection Companion (Accepted)

- **Pros** see below

## Rationale for Choosing Option C

1. **Focused Value Validation**: Spark validates only one core hypothesis — "Is principle-guided reflection more valuable than passive recording?" User completes 7 consecutive days with at least 3 meaningful reflection conversations to provide initial validation. 7 days is short enough for experimentation, 3 reflection conversations is clear enough as a behavioral metric
2. **ADHD-Friendly First**: Short interaction path (daily check-in ≤ 2 steps), low cognitive load (Pin limit of 3), immediate positive feedback (visual confirmation of completion checkmark). MVP itself validates ADHD design principles — can the developer maintain 30 days of usage?
3. **Clear Differentiation**: Doesn't directly compete with other diary/note tools. Spark's differentiation isn't "better editor" but "deeper self-awareness." This is a perceptible, not just technical, difference
4. **Architectural Seed**: Beneath the surface, Spark embeds Project IV's DNA — simplified PARA (expressed through Pins and daily logs), Principle Vault (core feature, not auxiliary module), MiniMetaInterface (abstract interface for future integration with complete Yuan). MVP is not disposable, but the first building block
5. **Narrative Anchor**: A principle-driven reflection companion better carries The Spira's mysterious aura than a general tool. Early users come not for "another note app," but because "this flame helps me understand myself better"

## Consequences

### Positive

- Clear development scope, deliverable by independent developer. Core features consist of 5 modules, each decomposable into ≤2 hour development tasks (ADHD-friendly granularity)
- Unique market positioning, no direct competition with mature products. On platforms like Xiaohongshu, "principle-guided AI reflection companion" is more shareable than "encrypted notebook" or "better diary"
- If core hypothesis is validated, subsequent development has solid empirical foundation. If not validated, early pivot cost is far lower than discovering wrong direction after building a complete product
- Backward compatible: Spark's data model includes `0.1-daoos-compatible` version identifier, enabling one-click migration to complete Second Brain in the future

### Negative

- Smaller market capacity — principle-driven reflection is not mass demand
- Users may anchor Project IV as "that reflection tool," requiring re-education for subsequent narrative evolution
- AI-guided reflection quality highly dependent on L0 rule engine (MVP phase) or L3 external models (later optional integration). If guidance feels stiff or repetitive, users will quickly churn

### Mitigations

- **Market Capacity**: Act I goal is not user quantity, but value validation + seed users. 100 deeply engaged users are more valuable than 10,000 casual downloads
- **Cognitive Anchoring**: Plant hints in Act I product name and narrative that "this is just the prologue." Specific approach: Spark's about page briefly describes Project IV's vision (one sentence), but doesn't expand
- **AI Guidance Quality**: MVP initially uses rule engine + predefined question library (triggered by principle keywords), ensuring guided statements are carefully crafted by humans, not dependent on uncontrollable large model output. Conservative guidance frequency — default only intervenes when user actively triggers reflection conversation, no automatic pushes. L3 external models can be integrated later as optional enhancement, but not as baseline dependency
- **Pivot Condition**: If Spark MAU < 500 after 3 months and no natural language evidence like "principle guidance gave me new insights" appears in user feedback, re-evaluate direction

## References

- [Spark Product Definition](../01-strategic-design/narrative-strategy) — Detailed Act I description
- [ADHD-Friendly Design Principles](../04-embodied/adhd-first-design) (pending)
