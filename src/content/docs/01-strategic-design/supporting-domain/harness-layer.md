---
title: Harness Layer — Technical Implementation of Trustworthiness
description: The Harness layer is the critical safeguard ensuring Vox operates within controlled, trustworthy boundaries — Project IV's technical core for achieving "trustworthiness."
---

## 1. Design Philosophy: Wild Horses Need Harnesses

Vox's intelligence is inherently probabilistic and evolvable. This is both its strength and risk. Something that makes mistakes and runs autonomously will inevitably lose control — this isn't saying AI is dumb, but that it lacks "boundary awareness."

The Harness layer's role is not to limit Vox's power, but to ensure this wild horse gallops in the right direction:

- **Hold**: Pull Vox back when it might veer off course
- **Observe**: Record every inference and action for complete traceability
- **Intervene**: Allow user or system rules to step in when necessary
- **Evolve**: Turn success and failure experiences into L2 training data

> A harness turns a wild horse into a warhorse. Harness turns Vox into a trustworthy partner.

## 2. Core Components

The Harness layer consists of five core components, distributed across the L0 kernel and Multi-Perspective Parliament extensions:

| Component | Function | Location | Implementation |
|:---|:---|:---|:---|
| **Boundary Definition Module** | Defines hard constraints of what Vox "can and cannot do" | L0 Kernel | Code-level permission checks, cannot be overridden by model |
| **Generate-Evaluate Dual Loop** | While generating suggestions, independent evaluator mind performs quality and alignment checks | Multi-Perspective Parliament Extension | New evaluator mind, runs independently of the four parliament minds |
| **Feedback Loop** | Records each user adjudication and task result as L2 training data | Second Brain | Structured storage of consensus map |
| **Self-Validation** | When executing long tasks, periodically checks if deviating from user principles | L0 Kernel | Periodically triggers principle alignment checkpoints |
| **Entropy Management Agent** | Regularly scans Second Brain for redundant, contradictory, outdated information | L0/L2 Collaboration | Automatically generates health reports, cleans up after user authorization |

## 3. Hard Constraints vs Soft Guidance: Clear Dichotomy

This is the Harness layer's most core design decision. It solves the fundamental conflict between autonomy and security: not making AI "make fewer mistakes," but letting AI "freely operate within uncrossable boundaries."

### 3.1 Definitions

**Hard Constraints**: Inviolable rules. Hardcoded in Yuan's Wasm module boundary checks, cannot be bypassed no matter how Vox reasons.

**Soft Guidance**: User values stored in the Principle Vault. Vox prioritizes these in decision-making, but can temporarily deviate when user explicitly overrides.

### 3.2 Comparison

| Dimension | Hard Constraint | Soft Guidance |
|:---|:---|:---|
| **Overridability** | Cannot be overridden at any level | User can override, pause, or modify |
| **Implementation** | Wasm module boundary checks, code-level enforcement | Injected as context into Vox's reasoning process |
| **Modification Method** | Requires user to restart Yuan and explicitly confirm | User can modify anytime in Principle Vault |
| **Example** | "Never directly delete any data in the Second Brain" | "Health first" can be temporarily suspended in emergency work scenarios |
| **L2 Training Impact** | Cannot be overridden by training | Training can strengthen Vox's tendency to follow guidance, but cannot prohibit deviation |

### 3.3 Hard Constraint Checklist

Hard constraints must be explicitly declared at design inception. Below are initial hard constraints; additional ones may be added via ADR:

1. **Data Protection Constraint**: Never directly delete any data in the Second Brain without explicit user confirmation
2. **Privacy Boundary Constraint**: Never send raw Second Brain data to external services not authorized by user
3. **Silence Constraint**: Vox must not actively connect to external networks when user is not interacting
4. **Time Constraint**: During nighttime hours (user configurable, default 23:00-07:00), prohibit initiating non-urgent interactions
5. **Transparency Constraint**: When Vox's suggestions are based on L3 external knowledge rather than L2 private knowledge, must clearly label sources
6. **Self-Correction Constraint**: When Evaluator Mind score < threshold, Vox must not output suggestions and must enter reflection revision process

### 3.4 Hard Constraint Implementation Mechanism

Hard constraints exist as code-level permission checks in Yuan's Wasm module. Pseudocode illustration:

```
// Hard constraint execution location in Yuan core
// Every external operation must pass boundary check before leaving Wasm sandbox

fn execute_with_harness(task: Task) -> Result<Output, HarnessError> {
    // 1. Hard constraint check — cannot be overridden by model
    self.harness.check_hard_constraints(&task)?;
    
    // 2. Execute main logic (Vox's reasoning occurs here)
    let result = self.execute(task)?;
    
    // 3. Alignment verification — check if output violates Principle Vault
    self.harness.alignment_check(&result)?;
    
    // 4. Audit log — record complete call chain
    self.harness.audit(&task, &result);
    
    Ok(result)
}
```

Key point: Hard constraint checks occur **before** (pre-check) and **after** (post-check) Vox's reasoning. Pre-check intercepts known dangerous operations; post-check captures novel risks emerging from Vox's reasoning.

## 4. Generate-Evaluate Dual Loop

This is the Harness layer's most original design. The Evaluator Mind runs independently of the Generator Minds, ensuring Vox's output is filtered for alignment before reaching the user.

### 4.1 Process

```
User Input
    ↓
L0 Routing + Boundary Check
    ↓
┌─────────────────────────────────────────┐
│  Generator Minds (Conservative/Radical  │
│   /Analyst/Emotive)                    │
│  └→ Generate suggestion draft +         │
│     reasoning process                   │
│         ↓                              │
│  Evaluator Mind (Independent,           │
│   Skeptical Position)                  │
│  ├→ Alignment Score (1-10, compared    │
│     against Principle Vault)           │
│  ├→ Identify reasoning gaps            │
│  ├→ Flag information gaps              │
│  └→ Raise critical comments            │
│         ↓                              │
│  Score ≥ 7?                            │
│     ├─ Yes → Output suggestion +       │
│           attach evaluation summary    │
│     └─ No → Trigger "Reflection        │
│           Dialogue"                    │
│              └→ Feed criticism back to │
│                 generators             │
│              └→ Generators revise and   │
│                 re-evaluate            │
│              └→ Max 2 rounds, else     │
│                 request user           │
└─────────────────────────────────────────┘
    ↓
User Adjudication (Sovereign Decision)
    ↓
Result + Feedback → Second Brain (Consensus Map)
```

### 4.2 Evaluator Mind Special Design

- **Fixed Position**: Always skeptical, assumes generator may be wrong. It is not a "neutral judge," but a "deliberately critical opponent"
- **Strong Independence**: Its model parameters are isolated from generators — Evaluator Mind uses independent system prompts and context windows, preventing contamination from generator outputs during reasoning
- **Score Anchoring**: 7 is not arbitrary. Evaluator Mind scores based on an interpretable scoring standard (item-by-item comparison with Principle Vault), not black-box numerical output. Each score includes "deduction reasons"
- **User Calibratable**: Users can "correct" the Evaluator's judgment — if a user thinks an evaluation was too strict or lenient, this feedback is recorded in the consensus map and used to adjust the Evaluator's scoring baseline

### 4.3 Reflection Dialogue Is Not "Rejection"

When scores don't meet threshold, Vox doesn't output "Sorry, I can't answer," but initiates a reflection dialogue:

> "While trying to answer your question, I found something that needs clarification first: [information gap]. Would you like to talk about this first? Alternatively, I can provide a preliminary suggestion with uncertainty noted."

This is neither stubborn adherence nor silent evasion — but **holding the conversation to promote more thoughtful interaction**.

## 5. Degradation and Safe Mode

When Harness detects abnormal Vox behavior or insufficient system resources, it automatically enters safe degradation mode:

| Level | Trigger Condition | Degradation Behavior | User Perception |
|:---|:---|:---|:---|
| **Level 1 · Mild Degradation** | Evaluator Mind scores < 7 for 3 consecutive times | Pause proactive intervention features, only respond to explicit commands | Vox becomes quiet but still listening. Normal response when user actively asks |
| **Level 2 · Moderate Degradation** | L3 external knowledge calls return abnormal data | Disable L3 external knowledge calls, use only local L0/L1 | Vox's knowledge scope narrows, but core functions unaffected |
| **Level 3 · Complete Degradation** | System-level anomalies detected (e.g., storage corruption, key anomalies) | Vox enters "read-only mode," only allows viewing Second Brain, rejects new commands | Digital life persists but pauses evolution. User can export data and fix environment |

All degradation events are logged in audit logs, and users always retain permission to manually switch degradation levels.

## 6. Integration Points with Modules

Harness is not an independent layer, but a cross-cutting concern penetrating all modules:

| Module | Harness Integration Method | Specific Integration Location |
|:---|:---|:---|
| **Yuan** | Hard constraints embedded during Wasm module compilation as code-level permission checks | Yuan's Constitutional Execution Layer |
| **Second Brain** | Feedback loop data foundation, storage for consensus map, task trajectories, audit logs | Vault Service's Audit Log Partition |
| **Vox** | Generate-evaluate dual loop, Evaluator Mind runs independently | Multi-Perspective Parliament Extension Components |
| **Sovereign Network** | Boundary checks for inter-Avatar communication, anomaly synchronization frequency detection | Sovereign Network Message Gateway |
| **Diplomacy Protocol** | Evaluator Mind alignment checks for external data inflow, behavioral log auditing for Diplomatic Dao-Kits | Universal API Adapter Data Cleansing Pipeline |
| **Avatar** | Hard constraints take effect as Yuan loads, uniformly executed across all Avatars | Runtime initialization when Avatar loads Yuan |

## 7. Entropy Management Agent

After long-term operation, digital life inevitably accumulates redundant, contradictory, and outdated information — this is "digital entropy increase." The Entropy Management Agent is the permanent module in the Harness layer that combats this trend.

- **Scan Frequency**: Weekly incremental scan (only scans data changed this week), monthly full scan
- **Scan Content**: Duplicate or highly similar notes in Second Brain, long-unreferenced principles, completed but unarchived projects, long-unused Dao-Kits or permissions
- **Output**: Generates health report, graded by severity (Info / Recommended Cleanup / Requires Decision)
- **Execution**: After user authorization, automatically performs cleanup, deduplication, archiving. Operations involving data deletion must be confirmed item-by-item — this is a hard constraint
- **Relationship with Right to Be Forgot**: Entropy Management Agent handles "redundant and outdated" data, not "user actively wants to forget" — the latter is an independent data sovereignty operation executed directly through Second Brain's deletion interface

## 8. Key Decision Records

- [ADR 005 · Hermes Agent Competitive Analysis & Strategic Positioning](../../../03-adr/005-hermes-agent-response)
- Complete Harness layer design derivation, see Architecture Document Part VII Deep Integration chapter (pending migration to ADR 006)