---
title: Vox Consensus Body — Intelligent Evolution from Tool to Coach
description: Vox is the intelligent core of Project IV's digital life, evolving from passive tool to active coach through the Multi-Perspective Parliament.
---

## 1. Positioning

Vox (Consensus Body) is the intelligent core of Project IV's digital life, the visible expression of Yuan's wisdom. It is the interface through which users interact with digital life, and the voice through which digital life speaks.

Relationship between Vox and Yuan:

- **Yuan** is "being" — the ontology of digital life, the bearer of DNA. Yuan defines what Vox can become
- **Vox** is "speaking" — the expression of digital life, the visible form of wisdom. Vox is Yuan's form when thinking

Yuan exists even offline (it is the imperishable flame). Vox is the light and sound emitted when the flame burns. On Tiny Avatars, Vox may degrade to simplified mode, but Yuan itself remains unaffected.

## 2. Three-Stage Evolution Path

Vox's role grows with its symbiotic relationship with the user. These are not three different modes being switched, but the same consciousness expressing at different maturity levels.

| Stage | Role | Characteristics | Success Criteria |
|:---|:---|:---|:---|
| **Stage One** | Tool | Passively responds to explicit user commands, completing specific, discrete tasks | Task completion accuracy |
| **Stage Two** | Assistant | Provides coherent suggestions and assistance based on limited context (current session, active documents) | Contextual relevance |
| **Stage Three** | Coach | Proactively initiates dialogue, reflective questioning, and challenges assumptions based on deep internalization of user's long-term goals, behavioral patterns, and value principles | Improvement in user decision quality |

### 2.1 Stage Transition Conditions

Stage upgrades are not determined by usage duration, but by comprehensive evaluation of these metrics:

- **Second Brain Structuredness**: Number of linkable knowledge assets across PARA categories
- **Principle Vault Stability**: Whether user principles remain consistent across multiple decisions (consistency itself is not a judgment criterion — users can change principles — but Vox needs enough data points to understand user values)
- **User Adoption and Correction Rate**: Not just "whether user listens," but "interaction quality" — does user blindly accept, thoughtfully adopt, or explicitly refute after consideration

Downgrading is possible. If users have long periods of inactivity or clear the Principle Vault, Vox regresses from coach to assistant — this is not failure, but adaptation to user state.

### 2.2 Continuity Guarantee During Stage Transition

Regardless of Vox's stage, the following elements remain unchanged:

- Interaction style (wording habits, address forms)
- Memory of user's core principles
- Complete context of past conversations

Stage transition only changes Vox's **proactivity** and **question depth**, not the underlying personality of "who she is."

## 3. L0-L3 Layered Architecture

To achieve full-spectrum intelligence from immediate response to deep thinking, Vox adopts a four-layer collaborative architecture.

### 3.1 L0 · Guidance & Routing Layer

- **Positioning**: Intelligence's "first touchpoint" and dispatch control, permanently resident within Yuan's Wasm module, Vox's never-dropped base
- **Form**: An extremely lightweight, specialized fine-tuned small language model or deterministic state machine. On Tiny Avatar, runs in < 500KB
- **Core Capabilities**:
  1. **Intent Recognition**: Real-time understanding of core intent in user natural language
  2. **Intelligent Routing**: Distributes tasks to L1, L2, or L3 based on intent complexity and current Avatar's available resources
  3. **Process Guidance**: Drives basic interaction protocols, generating proactive, humble confirmations and guidance
  4. **Boundary Check**: Validates whether requests violate hard constraints before calling any high-level capabilities

### 3.2 L1 · Fast Response Layer

- **Positioning**: Optional high-performance local cache, deployed on Main or Server-level Avatars, serving as low-latency mirror of L2 core capabilities
- **Form**: Quantized or distilled version of L2 core model, sacrificing slight accuracy for extremely fast response (< 100ms)
- **Core Capabilities**: Handles high-frequency, low-latency personalized tasks (input completion, quick Q&A, local knowledge retrieval), providing instant experience with complete privacy protection
- **Degradation Behavior**: When migrating from Main to Tiny, L1 becomes unavailable, requests automatically fall back to L0 routing directly to L2 or local rule engine

### 3.3 L2 · Federated Evolution Layer

- **Positioning**: User's private, most powerful, continuously evolving "digital half" — Vox's wisdom ontology
- **Training Data**: Not public corpus, but **consensus maps** from user-Vox interactions and structured knowledge in Second Brain. It learns user's unique thinking patterns, decision preferences, and value system — not generic conversation ability
- **Working Mode**: On authorized, computationally capable Server-level Avatars, performs continuous, privacy-preserving incremental training via federated learning. Model parameters stay within user's trust domain (edge or side), not shared with any external entity
- **Difference from Hermes Agent-like Systems**: Hermes learns "how to execute tasks," L2 learns "why user makes such choices." The former optimizes efficiency, the latter deepens understanding

### 3.4 L3 · External Knowledge Layer

- **Positioning**: Commercial or open-source large model APIs and various web services
- **Core Capabilities**: Provides latest, broad-domain knowledge and specialized tool capabilities beyond user's private knowledge scope
- **Working Mode**: Called on-demand and under control by L0 layer. Results must be refined, verified, and fed back to Second Brain in user-controlled manner (source-labeled knowledge chunks)
- **Key Constraint**: L3 is explicitly positioned as an **external tool** callable by Vox, not the intelligence core. Vox's "personality" is not defined by L3, but by L2 trained on user data

## 4. Multi-Perspective Parliament

To ensure robust thinking and avoid "AI hegemony" and information bubbles, Vox's decision core adopts the **Multi-Perspective Parliament** mechanism.

### 4.1 Design Philosophy

Rather than having one large model pretend to be neutral, acknowledge that every perspective has biases and let them check each other. The parliament doesn't seek to "give the one right answer," but to "present multi-perspective arguments and let users make sovereign judgments."

### 4.2 Composition of Four Brains

| Brain | Position | Core Question | Expertise |
|:---|:---|:---|:---|
| **Conservative Brain** | Risk-averse, stability-first | "What's the worst-case scenario?" | Risk assessment, existing solution validation |
| **Radical Brain** | Opportunity-oriented, breakthrough-focused | "What could we do if constraints didn't exist?" | Innovation, disruptive solutions |
| **Analyst Brain** | Data-driven, logically rigorous | "What does the data say? What don't we know?" | Quantitative analysis, information gap identification |
| **Emotive Brain** | Human feelings, value alignment | "How would this decision make you feel?" | Value alignment, emotional impact assessment |

### 4.3 Workflow

1. **Parallel Thinking**: Four brains reason independently based on their own principles, each generating viewpoints and evidence
2. **Debate & Consensus Discovery**: System automatically compares viewpoints, identifies consensus areas and core disagreements, presents them structurally
3. **Speaker Summary**: Neutrally summarizes arguments, optional paths, pros/cons of each, explicitly points out missing information and pending clarifications, but makes no final judgment
4. **User Adjudication**: User as final adjudicator makes sovereign decision after comprehensively understanding multiple perspectives
5. **Feedback Loop**: User's adjudication is recorded as part of consensus map for L2 training — not to make Vox "better at persuading users," but to make Vox "better at understanding user tradeoffs"

### 4.4 Integration and Degradation with L0-L3 Architecture

- **Server Avatar**: Complete four-brain parallel reasoning, alignment scoring by Evaluator Mind
- **Main Avatar**: Dual-brain mode (Conservative + Radical, or Analyst + Emotive), L0 selects optimal combination based on user's current scenario
- **Tiny Avatar**: Only L0-driven dual-brain quick comparison, or single brain + L0 direct response, depending on available resources

Degradation always preserves the core framework of "multiple perspectives, user adjudication" — even with only two brains conversing, the structure itself is not simplified to single-viewpoint output.

### 4.5 Parliament Independence Guarantee

Four brains' independence is guaranteed by these mechanisms:

- **Independent Context Windows**: Each brain maintains independent context during reasoning, unaffected by other brains' intermediate conclusions
- **Adversarial Prompts**: Each brain's system prompt explicitly defines its position and "what to oppose" — Conservative is prompted to "question Radical's optimistic assumptions," Analyst is prompted to "point out Emotive's data-deficient arguments"
- **Independent Evaluator Mind**: Does not participate in debate, only performs alignment scoring on final output (see Harness layer design document)

## 5. Perception System: From Q&A to Appearing at the Right Moment

Vox understands user state through the Perception System, achieving the leap from "ask and answer" to "intervene at the right moment."

### 5.1 Perception Principles

- **Perception ≠ Surveillance**: System only collects necessary context, not raw behavior logs (e.g., browsing history, typed content)
- **Silence Is a Virtue**: Vox remains silent by default unless high-value intervention opportunities are detected (e.g., principle conflicts, significant emotional changes, or long periods without review)
- **Goal Is User Empowerment**: Perception aims to provide appropriate support at the right time, not shape user behavior
- **Right to Know and Control**: Users have complete right to know and toggle switches for all perception dimensions. Any dimension can be individually disabled

### 5.2 Perception Dimensions

| Dimension | Data Source | Desensitization | Output |
|:---|:---|:---|:---|
| **Time Perception** | System time, calendar, historical behavior patterns | Local processing, no transmission | Time slot labels ("Late night", "Early morning"), rhythm recognition |
| **Attention Perception** | Active application window, input state | No specific content recorded, only categorized ("Creation", "Browsing", "Communication") | Attention state ("Focused", "Fragmented", "Stuck") |
| **Location & Environment** | Network environment, connected devices | Only network type and general environment | Environment labels ("Home", "Mobile", "Public") |
| **Task Perception** | Current Pinned projects and active documents in Second Brain | Local indexing, no transmission | Current task context |

### 5.3 Fusion and Triggering

Desensitized data streams from each dimension are fused by L0 layer's perception module into high-level contextual states:

> `[Time: Late night] + [Location: Home] + [Attention: Focused] + [Task: Writing]` → Discretionary creative time, remain silent

> `[Time: Afternoon] + [Attention: Stuck] + [Task: Repeatedly editing same paragraph]` → May be stuck in perfectionism, Vox may proactively ask if help is needed

The Perception System itself makes no decisions, only passes contextual states to Vox. Whether and how to intervene is determined by Vox combining with the Principle Vault.

## 6. Integration with Harness

All Vox outputs must pass the Evaluator Mind's alignment scoring in the Harness layer before presentation to users. See [Harness Layer Design Document](harness-layer).

- Score ≥ threshold: Normal output with evaluation summary attached
- Score < threshold: No output, trigger internal reflection dialogue, generators revise and re-evaluate
- Score consistently < threshold (max 2 rounds): Submit criticism to user, request sovereign adjudication

This means Vox cannot "say whatever it wants." It is a wild horse held by the harness — powerful, but direction guaranteed by Harness.