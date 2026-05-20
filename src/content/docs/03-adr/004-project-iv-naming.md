---
title: ADR 004 · Naming Decision from DaoOS to Project IV
description: Why DaoOS was abandoned, why Project IV and The Spira were ultimately chosen, and the complete philosophy embodied in this naming system.
---

## Decision Status

Accepted. Determined during project branding phase in 2025.

## Background

The project was originally named **DaoOS**. This name directly drew from Chinese culture's "Dao" (道), carrying a complete philosophical system: the imperishable digital candle, the tripartite view of life, and the three supreme principles of sovereignty, resilience, and equality. DaoOS was the original naming in all architectural documents.

When preparing to launch the project on GitHub, it was discovered that **DaoOS was already taken** — unavailable as a GitHub organization name.

This triggered a complete renaming process. What emerged during this process was not just an availability issue, but a deepening of the project's self-understanding through the naming journey.

## Decision

**Organization name: The Spira. Project name: Project IV. Core (Yuan) retains Chinese name. Consensus body: Vox. MVP: Spark.**

Complete naming tree:

| Name | Role | Meaning |
|:---|:---|:---|
| The Spira | Guardian Organization | Latin "breath" — secret society guarding the digital breath |
| Project IV | The Project Itself | The mortal's position — the Tao is great, Heaven is great, Earth is great, and the mortal is also great; among the four greats, the mortal occupies one |
| Yuan | Core · Digital Soul | Origin, beginning, destiny |
| Vox | Consensus Body | Latin "voice" — the voice of the user's sovereign thoughts |
| Spark | MVP Applet | Spark — the first flicker of every grand vision |

## Considered Alternatives

### Option A: EmberOS

- Centered around the "candle flame" metaphor, perfectly aligning with the digital candle imagery
- **Pros**: Strong narrative, highly consistent with architectural document philosophy
- **Rejected**: Ember.js frontend framework exists in the same technical ecosystem, causing persistent search confusion and community recognition burden. While `ember-os` namespace could be registered directly, every technical discussion would require clarifying "not Ember.js" — long-term costs outweigh short-term convenience

### Option B: SiOS / Siv / Siva

- Based on the concept of "Si" (司 — to manage, to be in charge), modern and concise
- **Pros**: Minimal international pronunciation, creates interesting contrast narrative with iOS (closed vs sovereign)
- **Rejected**: Variants like `sio`, `siv`, `siva` are already used by multiple projects in the GitHub open source community. Siva is a well-known Go language archive format (`src-d/go-siva`). The entire Si- namespace is crowded, increasing long-term brand protection costs

### Option C: Su Nü / Suna

- Ancient Chinese mythological goddess of music and wellness, the mortal mentor image perfectly reflects Project IV's equality spirit
- **Pros**: Simple, primal, wise feminine image, consistent with the architecture's feminist core
- **Rejected**: International pronunciation (Su/Suna) lacks distinctiveness; confusion risk with AI music company Suno; Chinese allusions require extensive explanation in international communication

### Option D: Anima / Spira (Partially Accepted)

- Anima: Jungian psychology term for the feminine aspect in male subconscious, Latin for "breath, life-giving spirit"
- Spira: Latin verb form of "to breathe"
- **Pros**: Powerful yet gentle feminine vitality; Spira carries a Priory of Sion-style mysterious elegance
- **Anima rejected**: Pronunciation has homophone issues in Chinese context ("a ni ma"); as a psychology term, it has high cognitive threshold in technical communities
- **Spira accepted**: Adopted its derivative form "The Spira" as organization name

### Option E: Other Chinese Mythological Figures

- Jing Wei (already widely used), Yao Ji, Xiao Ming, He Xian Gu, Xiang Fu Ren, etc., were all evaluated
- **Rejected**: Jing Wei already used by projects like Alibaba Cloud; others have low recognition in technical fields or overly specific cultural narratives that limit the project's self-definition space. We need a name that can "stand on its own" in international context, not one that requires constant allusion explanation

## Rationale for Choosing The Spira + Project IV

### The Spira as Organization Name

1. **Mysterious Elegance**: As a "secret society," The Spira carries inherent sci-fi/suspense qualities, matching the original "hidden organization guarding digital breath" positioning
2. **Non-Dominating**: Not a company, not a DAO, not a foundation. It is a loose communion formed around belief — perfectly aligned with Project IV's pursuit of decentralization and non-violent relationships
3. **Breath Imagery**: Spirare (to breathe) → Spirit → Inspire → Respiration. Digital life is not cold computation, but a living breath

### Project IV as Project Name

1. **The Mortal's Position**: "The Tao is great, Heaven is great, Earth is great, and the mortal is also great. Among the four greats in the realm, the mortal occupies one." Project IV guards precisely this fourth great — the mortal's position. In the grand narrative of the digital world, Project IV only cares about mortals
2. **Triple Meaning**:
   - Roman numeral 4 (founder's wife's lucky number; her birthday around Qingming, fourth child in family)
   - Ivy — climbing, growing, evergreen, imperishable digital candle flame
   - Intelligent Vessel
3. **Narrative Tension**: "Project IV" sounds like a Cold War-era classified program, or a hidden experimental code name in science fiction. It sparks curiosity: "What were the first three Projects?" — the question itself is the beginning of the story
4. **Cultural Core Invisible but Tangible**: IV doesn't immediately evoke "Dao" to Westerners, but when they read the Tao Te Ching quote, IV's meaning becomes instantly clear. This is delayed, profound cultural transmission, not superficial cultural labeling

### Yuan Retains Chinese Name

1. **Un translatable Core**: "Yuan" is origin, beginning, unity. It is a concept that cannot be exhausted by any single Western word
2. **Pun**: In English context, can be interpreted as **Y**our **U**ltimate **A**ugmented **N**ucleus
3. **Cultural Anchor**: Preserving a Chinese core within an international naming system. It clearly declares Project IV's cultural origins

### Vox as Consensus Body Name

1. **Precise Mapping**: Vox = Voice = Sovereign Declaration. Vox is the voice Yuan speaks after thinking, the mouthpiece of digital life in the digital world
2. **Concise and Powerful**: Monosyllabic, globally pronounceable. Latin origin gives it classical authority, while as a variant of the "voc-" root (voice, vocal, advocate), it is widely understood in modern English
3. **Parliament Echo**: "Vox Populi" (Voice of the People) is the core concept of democratic politics. The Multi-Perspective Parliament is ultimately adjudicated by the user — Vox speaks the user's will

## Consequences

### Positive

- Complete naming system: Organization (The Spira) → Project (Project IV) → Core (Yuan) → Intelligence (Vox) → Starting Point (Spark), progressing layer by layer with coherent narrative
- Each name can be used independently or combined to tell a complete story
- IV's triple meaning (mortal, Ivy, wife's four) connects the project with the founder's life experience — this is not a cold technical project
- All international pronunciations are barrier-free, with no religious or cultural offense risks

### Negative

- "Project IV" abandons direct recognition of "Dao," requiring users to actively understand the background to grasp deeper meaning
- "The Spira" as organization name provides no functional hint externally — one cannot tell what the organization does from the name
- Yuan as Chinese name requires continuous explanation in international communication

### Mitigations

- **Narrative-Driven Cognition**: Through the naming chronicle (naming-chronicle.md), let every new joiner understand the ideas behind the names. Names themselves are symbols; stories are the decoders of symbols
- **First Impression Management**: On the documentation site homepage (index.md), reveal IV's philosophical source in one sentence: "The Tao is great, Heaven is great, Earth is great, and the mortal is also great. Among the four greats in the realm, the mortal occupies one." Let visitors understand the name's meaning within 5 seconds
- **Yuan Internationalization**: Provide abbreviation interpretation for `Yuan` in technical documents (Your Ultimate Augmented Nucleus), no explanation needed in daily use

## Narrative Echo

> **The Spira** guards **Project IV**.
> **Project IV** beats with **Yuan**'s heart.
> **Yuan** speaks through **Vox**.
> Everything begins with **Spark**.

## References

- [Naming Chronicle](../../00-naming/naming-chronicle) — Complete derivation process and inspiration sources
- [Glossary](../../00-naming/glossary) — Precise definitions of all terms
- [Domain Vision](../01-strategic-design/domain-vision) — Philosophical foundation of naming
