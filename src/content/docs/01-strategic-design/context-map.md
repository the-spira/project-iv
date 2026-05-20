---
title: Context Map — Contracts and Communications Between Domains
description: Relationship mapping between Project IV's bounded contexts, defining integration patterns and communication contracts between core, supporting, and generic domains.
---

## 1. Positioning

Context map is the conclusion of DDD strategic design. It does not describe the internal design of each domain (those are in their respective documents), but defines the **relationship patterns, integration methods, and communication contracts** between domains.

This ensures that when different domains evolve independently, their boundaries are not accidentally broken.

## 2. Bounded Context Overview

Project IV identifies the following bounded contexts:

| Context | Type | Core Responsibility |
|:---|:---|:---|
| **Yuan Context** | Core Domain | Digital soul lifecycle management: creation, loading, evolution, hibernation, awakening |
| **Second Brain Context** | Core Domain | Memory storage, indexing, retrieval, structuring (PARA), versioning |
| **Avatar Context** | Core Domain | Form registration, discovery, awakening, degradation/upgrade, resource adaptation |
| **Sovereign Network Context** | Core Domain | Existential communication between Yuan and Avatars, coordinated fusion, existence chain |
| **Vox Context** | Supporting Domain | Consensus body reasoning, three-stage evolution, multi-perspective parliament, intent routing |
| **Harness Context** | Supporting Domain | Boundary definition, hard constraints and soft guidance, generate-evaluate dual loop, entropy management |
| **Perception Context** | Supporting Domain | Environmental data collection, desensitization, fusion, context state output |
| **Dao-Kit Context** | Generic Domain | Dao-Kit lifecycle, permission model, manifest specification, marketplace |
| **Diplomacy Context** | Generic Domain | External service connection, three-layer filtering, data cleansing and inflow |

## 3. Context Map

Relationships between contexts are defined below.

### 3.1 Core Domain Internal Relationships

| Upstream | Downstream | Relationship Pattern | Description |
|:---|:---|:---|:---|
| Yuan | Second Brain | **Upstream-Downstream** | Yuan defines data models and access logic; Second Brain follows Yuan's data model for storage and retrieval. Yuan is upstream; Second Brain does not depend on Yuan's specific implementation — only on data model interfaces defined by Yuan |
| Yuan | Avatar | **Upstream-Downstream** | Yuan is loaded and hosted by Avatar. Yuan defines standardized Wasm interfaces; Avatar provides runtime environments compliant with those interfaces. One avatar can host one Yuan instance (single-tenant) |
| Avatar | Sovereign Network | **Upstream-Downstream** | Avatar serves as the physical anchor of the Sovereign Network, sending and receiving state updates through it. Avatars do not communicate directly with other avatars — all communication goes through the Sovereign Network protocol |

### 3.2 Between Core Domain and Supporting Domain

| Upstream | Downstream | Relationship Pattern | Description |
|:---|:---|:---|:---|
| Yuan | Vox | **Shared Kernel** | Yuan and Vox share the "meta manifest" structure (logical CID + state CID combination) and Principle Vault data model. Vox's reasoning capabilities depend on Yuan's identity authentication and key management, but Vox's parliament algorithms and evolution stages evolve independently |
| Vox | Second Brain | **Upstream-Downstream** | Vox reads Second Brain for context reasoning, writes consensus maps and conversation memories. Second Brain performs hard constraint checks on Vox's writes |
| Vox | Perception | **Upstream-Downstream** | Perception system provides fused context states to Vox; Vox decides whether and how to intervene based on perception results. Perception system doesn't care how Vox uses its output |
| Vox | Harness | **Conformist** | Vox must comply with all hard constraints and scoring standards defined by Harness. Vox cannot modify Harness rules, but can indirectly influence Harness scoring benchmarks through feedback loops (user corrections to Evaluator Mind) |
| Harness | Yuan | **Conformist** | Harness hard constraints are embedded in Yuan's Wasm module at compile time. Harness defines constraint content, Yuan executes — this is static binding at deployment time, not dynamic dependency at runtime. This means Harness is not a "service caller" of Yuan, but part of Yuan's code |
| Harness | Second Brain | **Upstream-Downstream** | Harness's entropy management agent scans Second Brain, generating health reports. Second Brain stores Harness audit logs |
| Harness | Avatar | **Upstream-Downstream** | Harness boundary checks take effect when Yuan loads into Avatar. All avatars execute the same hard constraints (since they load the same Yuan), preventing some avatars from being more "lenient" |

### 3.3 Between Core Domain and Generic Domain

| Upstream | Downstream | Relationship Pattern | Description |
|:---|:---|:---|:---|
| Yuan | Dao-Kit | **Open Host Service** | Yuan provides a set of stable, versioned interfaces for Dao-Kits through standard Wasm ABI and dao.js SDK. Dao-Kits request access to these interfaces through declarative permission models. Yuan interface changes are managed through version numbers, ensuring backward compatibility |
| Dao-Kit | Second Brain | **Upstream-Downstream** | Data written to Second Brain by Dao-Kits must pass Harness boundary checks. Dao-Kits cannot directly access Second Brain's raw storage — only perform declarative read/write through Yuan-provided standard interfaces |
| Avatar | Dao-Kit | **Upstream-Downstream** | Dao-Kit UIs render within avatars. Dao-Kits obtain runtime resources (screen size, input method) through avatars, but do not directly control avatars — avatars only load Dao-Kit Wasm modules and execute them in sandboxes |

### 3.4 Between Generic Domain and Supporting Domain

| Upstream | Downstream | Relationship Pattern | Description |
|:---|:---|:---|:---|
| Dao-Kit | Harness | **Conformist** | All Dao-Kits must pass Harness security checks during installation, update, and runtime. Dao-Kits cannot bypass Harness boundary definition modules. Middleware Dao-Kits are exceptions to this relationship — they serve as composable extensions to the Harness pipeline, but are themselves constrained by Harness |
| Diplomacy | Harness | **Conformist** | In the diplomacy protocol's three-layer filtering, the universal API adapter's cleansing rules are defined by Harness. External data must pass Evaluator Mind alignment checks before inflow. Diplomatic Dao-Kits, as a subclass of Dao-Kits, inherit the conformist relationship |

### 3.5 Generic Domain Internal Relationships

| Upstream | Downstream | Relationship Pattern | Description |
|:---|:---|:---|:---|
| Dao-Kit | Diplomacy | **Shared Kernel** | Diplomatic Dao-Kits are a subclass of Dao-Kits, sharing manifest specifications, permission models, and distribution mechanisms. Diplomatic Dao-Kits extend the Dao-Kit manifest, adding external service declarations and cleansing rule configurations |

## 4. Integration Pattern Summary

Project IV contexts use the following integration patterns:

| Pattern | Usage Scenario | Meaning |
|:---|:---|:---|
| **Upstream-Downstream** | Most cross-domain relationships | Upstream defines interfaces, downstream adapts. Upstream can evolve independently, downstream follows upstream's change rhythm. Upstream doesn't need to know downstream's specific implementation |
| **Shared Kernel** | Yuan-Vox, Dao-Kit-Diplomacy | Two contexts share part of core models (e.g., meta manifest structure, principle vault, Dao-Kit manifest specification). Shared kernel changes require cross-context coordination. This is the tightest integration pattern, used only when two contexts have strong symbiotic relationships |
| **Conformist** | Vox-Harness, Dao-Kit-Harness, Diplomacy-Harness | Downstream completely obeys upstream's rules, no room for negotiation. Harness hard constraints are the same set of rules for all conformists, cannot be weakened by downstream local optimizations |
| **Open Host Service** | Yuan-Dao-Kit | Upstream exposes a set of stable, versioned interfaces; downstream accesses capabilities through these interfaces. Interface changes managed through version numbers, downstream can choose to adapt to new versions or stay on old versions |

## 5. Communication Contracts

Specific communication methods and data format conventions between contexts.

| Communication Parties | Communication Method | Data Format | Sync/Async | Description |
|:---|:---|:---|:---|:---|
| Yuan → Avatar | Wasm function call | Binary (Wasm ABI) | Synchronous | Called in local memory after avatar loads Yuan, no network overhead |
| Avatar → Avatar | Sovereign Network message | Encrypted Protobuf binary | Asynchronous | Via IPFS PubSub or relay nodes. Message types: state CID update, coordinated fusion request, wake notification |
| Yuan → Second Brain | Vault Service gRPC | Protobuf | Synchronous | Local call (within same avatar) or LAN call (edge node) |
| Vox → Second Brain | Vault Service gRPC | Protobuf | Synchronous | Read/write consensus maps and conversation memories |
| Perception → Vox | Memory channel | Structured JSON | Async event | Perception module pushes context state change events, Vox subscribes |
| Vox → Harness | Internal API call | Structured JSON | Synchronous | In generate-evaluate dual loop, Vox output calls Evaluator Mind before presentation to user |
| Dao-Kit → Yuan | dao.js SDK | JSON over Wasm ABI | Synchronous | Declarative interface: `read('projects')`, `write('daily-log', entry)` |
| Diplomatic Dao-Kit → Universal API Adapter | Internal pipeline | Structured JSON | Synchronous | First layer to second layer data transfer, adapter not exposed as network service |
| Universal API Adapter → Vox | Internal API call | Structured JSON | Synchronous | Cleansed data requests Vox approval before flowing into Second Brain |
| Entropy Management Agent → Second Brain | Vault Service gRPC | Protobuf | Asynchronous | Weekly/monthly scheduled scans, no impact on normal read/write |

## 6. Boundary Violation Handling

When a context's behavior exceeds its declared contract, handle according to the following strategy:

| Violation Type | Detection Method | Handling |
|:---|:---|:---|
| Dao-Kit out-of-bounds read/write | Harness runtime boundary check | Block call, record audit log, notify user. First warning, freeze Dao-Kit permissions automatically on repeat |
| Vox output violates hard constraint | Generate-evaluate dual loop score < 7 | Do not output, enter reflection revision process. Maximum 2 rounds, otherwise request user intervention |
| Diplomatic data inflow without cleansing | Universal API adapter check | Block inflow, mark source service as "pending review," notify user |
| Avatar loads unsigned Yuan | Avatar signature verification | Refuse execution. Record loading attempt as security event |
| Sovereign Network message flooding | Harness frequency detection | Limit message rate from source avatar, alert user |

## 7. Context Map Evolution

Context map is not a one-time design, but a living document continuously updated as the system evolves. Update this document when:

- New bounded context added (e.g., long-term planned "multi-agent communication context")
- Integration pattern between two contexts changes (e.g., upgrade from upstream-downstream to shared kernel)
- Communication contract interface version has incompatible changes
- New Harness hard constraint introduced affecting conformist relationships across multiple contexts

Each change must be recorded with decision rationale through ADR.