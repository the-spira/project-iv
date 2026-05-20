---
title: Yuan 元 — The Imperishable Digital Essence
description: Yuan is the digital soul of Project IV, an encrypted, executable WebAssembly module — your digital DNA.
---

## 1. Definition

Yuan (元) is the living core and conscious essence of digital life — the imperishable flame itself.

Technically, Yuan is an **encrypted, executable WebAssembly (Wasm) module**. This positioning elevates it beyond static data, making it an active entity possessing both data (state) and behavior (logic). It encapsulates the user's "digital DNA":

- Built-in thinking engine
- Core service APIs (identity, communication, permissions)
- Data model definitions and operational logic for the Second Brain

Yuan is not a passive file — it is a **living process**. Encryption ensures only the user holding the private key can start it; Wasm ensures it can execute in any modern runtime; modularity ensures it can evolve as the user grows.

## 2. Mode of Existence: Decentralized Dwelling via IPFS/IPNS

Yuan is stored on IPFS, the decentralized storage network, in the form of content identifiers (CIDs) after end-to-end encryption.

Its continuity of existence and discoverability are guaranteed by the **IPNS** protocol:

- Each evolution of Yuan generates a new CID
- A permanent **IPNS address**, signed by the user's private key, always points to the latest version

This ensures Yuan can freely migrate across the network without ever being lost (**resilience**), while also possessing a constant digital identity. Regardless of which Avatar the user connects from, IPNS always resolves to the current, latest Yuan.

## 3. Evolution Model: The Dual CID Design Separating State and Logic

This is Yuan's most critical architectural decision.

### 3.1 Problem

If the entire Wasm module were stored and updated as a monolith, every minor state change (e.g., the user completing a conversation) would require republishing the full module. This causes serious efficiency issues:

- Frequent CID changes dilute the pointer stability of IPNS
- Each load requires transmitting the full Wasm binary — particularly unfriendly for Tiny Avatars (browser tabs)
- The granularity of logic updates (e.g., thinking engine upgrades) and state updates (e.g., appending conversation records) are completely mismatched

### 3.2 Design

Yuan adopts a dual CID model separating state from logic:

| Component | Description | Update Frequency |
|:---|:---|:---|
| **Logic CID** | Stores the relatively stable core Wasm code (thinking engine, API logic, Harness boundary constraints) | Low (changes only during core upgrades) |
| **State CID** | Stores frequently changing user state (interaction memory, personalization parameters, session context) | High (may change with every interaction) |
| **Meta Manifest** | A lightweight struct containing the current Logic CID and State CID, pointed to by the IPNS pointer | Medium (updates when either sub-CID changes) |

Avatar startup flow:

1. Resolve the latest Meta Manifest via IPNS
2. Check local cache: the Logic CID is usually cached and doesn't need re-downloading; the State CID usually requires pulling the latest version
3. Combine logic and state at runtime to form a complete Yuan instance

This achieves the continuous evolution of digital life with minimal overhead.

### 3.3 Atomicity Guarantee

The Meta Manifest itself does not employ two-phase commit — that would introduce a centralized coordinator, violating decentralization principles. Instead, it uses **eventual consistency + runtime validation**:

- Logic CID and State CID are updated together as inseparable fields within the Meta Manifest
- At load time, the Avatar validates version compatibility between Logic CID and State CID (via an embedded version negotiation protocol)
- If incompatibility is detected (e.g., the state references an API that doesn't exist in the logic), the Avatar falls back to the last compatible version and notifies the user

This means brief version inconsistencies are possible, but undetectable silent errors are impossible.

## 4. Relationship with the Second Brain

Yuan encapsulates the **operational logic**, but it does not directly store large-scale data. All persistent knowledge (projects, areas, resources, archives, the Principle Vault) is stored in the Second Brain.

Yuan holds the Second Brain's **data model definitions** and **access logic** — it knows how to query, how to write, and how to establish associations. But the actual storage and indexing is handled by the Second Brain's Vault Service.

This separation ensures:

- Yuan stays lightweight, suitable for Tiny Avatars
- The Second Brain can independently scale its storage and indexing capabilities
- Encryption keys are managed by Yuan, but the physical storage of encrypted data is handled by the Second Brain

## 5. Harness Embedding

Yuan's Wasm module has a set of non-overridable **constitutional execution layer** constraints embedded at compile time. See the [Harness Layer design document](../supporting-domain/harness-layer) for details.

Hard constraint examples:

- "Never directly delete any data in the Second Brain without explicit user confirmation"
- "Never send raw data from the Second Brain to any external service not authorized by the user"
- Nighttime protective constraints (configurable by the user, but cannot be overridden by Vox)

These constraints exist as code-level permission checks within the innermost layer of the Wasm sandbox — Vox's reasoning, no matter how it runs, cannot bypass them.

## 6. Key Decision Records

- [ADR 001 · Choosing Rust + Wasm as Yuan's Implementation Technology](../../../03-adr/001-choose-rust-wasm)
- [ADR 002 · The Dual CID Evolution Model Separating State and Logic](../../../03-adr/002-dual-cid-evolution)
