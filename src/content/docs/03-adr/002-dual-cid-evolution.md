---
title: ADR 002 · Dual CID Evolution Model with State-Logic Separation
description: Why Yuan's state and logic must be stored and evolved separately, rather than managed as a single Wasm module.
---

## Decision Status

Accepted. Determined concurrently with ADR 001, this is a core architectural decision for Yuan.

## Background

Yuan is a WebAssembly module containing two fundamentally different parts:

- **Logic**: Thinking engine, API interface definitions, Harness hard constraint code. Relatively stable, updated infrequently (weeks to months)
- **State**: User interaction memories, personalization parameters, session context. Highly dynamic, may change with every user interaction

Both are stored on IPFS, a content-addressable network where each unique content corresponds to a unique CID (Content Identifier). When content changes, the CID changes.

This creates problems: If logic and state are packaged as a single Wasm module, every minor state change (e.g., user completes a conversation) generates a new CID. This means:

1. **IPNS Jitter**: IPNS requires frequent updates to point to the latest CID, but IPNS update latency is on the order of minutes. Frequent updates cause avatars to potentially load outdated intermediate states
2. **Transmission Waste**: Avatars must download the complete Wasm module (logic + state) on every wake, even if the logic portion hasn't changed. For Tiny Avatar (browser tab, target first-load size < 2MB), this bandwidth overhead is unacceptable
3. **Coupling Risk**: Logic updates (e.g., thinking engine upgrades) and state updates (e.g., conversation log appends) have completely different change granularities. Binding them together means changes to either force the other into a new version, increasing unnecessary version proliferation

## Decision

**Split Yuan into Logical CID and State CID, addressed and updated independently, linked via a lightweight "Meta Manifest" structure. IPNS points to the meta manifest, not directly to either CID.**

## Considered Alternatives

### Option A: Monolithic CID (Logic + State Packaged Together)

- **Pros**: Simple implementation, no composition complexity from separation; one CID equals a complete Yuan, ready to execute after loading
- **Cons**: All the problems described above — IPNS jitter, transmission waste, coupling risk. On Tiny Avatar, downloading the complete Wasm module on every wake (even when logic hasn't changed) fails to meet the < 3 second wake time requirement

### Option B: Incremental Patching

- **Description**: Maintain monolithic CID, but cache old versions on the avatar side and only download incremental patches on wake
- **Pros**: Smaller update size as perceived by users
- **Cons**: Incremental patches require server-side difference calculation and distribution, introducing centralized dependency (who generates patches?); when the patch chain is too long (e.g., waking after a week offline), many patches need to be retroactively applied, making startup time uncontrollable; the patching mechanism itself increases attack surface (malicious patches could tamper with logic)

### Option C: Logical CID + State CID, No Atomicity Guarantee

- **Description**: Store logic and state as separate CIDs, but meta manifest updates are not atomic — logical CID and state CID may be updated separately
- **Pros**: Almost all advantages of Option D, simpler implementation
- **Cons**: Race condition window exists: avatars may load new logic CID + old state CID (or vice versa), causing version mismatch. If new logic depends on fields not present in old state, runtime crashes may occur

### Option D: Logical CID + State CID + Meta Manifest + Version Negotiation (Accepted)

- Adds version compatibility protocol to Option C

## Rationale for Choosing Option D

1. **Maximized Efficiency**: Avatars check local cache on wake. Logical CID hit rate is high (low update frequency, changes only every few weeks), requiring only hash verification; State CID typically needs updating, but state data is much smaller than the complete Wasm module. Tiny Avatar first-load size reduces from full Wasm (potentially 5MB+) to meta manifest + state delta (typically < 500KB)
2. **Enhanced Resilience**: Logical CID and State CID can be redundantly stored independently on IPFS. Even if some replicas of one CID are lost, it doesn't affect availability of the other
3. **Flexible Rollbacks**: Users can roll back state without rolling back logic ("go back to last week's me, but keep the upgraded thinking engine"), or roll back logic without rolling back state ("this upgrade isn't working for me, revert to previous version but keep conversation history"). This is completely impossible with monolithic CID
4. **Distributed Friendly**: No centralized patching service required. The meta manifest is just a JSON structure of tens of bytes; IPNS pointing to it suffices. All CID addressing and transmission handled by IPFS network
5. **Atomicity Guarantee**: The meta manifest itself is pointed to by IPNS as a whole. New values for logical CID and state CID are written to the same meta manifest before updating the IPNS pointer atomically. Race window is reduced to IPNS propagation delay (minutes), not unlimited. Additionally, version negotiation protocol handles residual race risks (see "Version Compatibility" below)

## Consequences

### Positive

- Tiny Avatar first-load size significantly reduced on wake (only state delta downloaded when logic cache hits)
- Logic upgrades and state evolution completely decoupled, each iterates independently
- Users can independently roll back state or logic, gaining fine-grained sovereignty
- No centralized patching service needed, fully based on IPFS distributed infrastructure

### Negative

- Meta manifest introduces additional indirection layer: avatar startup flow becomes `IPNS resolution → meta manifest → load logic and state separately → compose`, one more step than monolithic CID
- Version compatibility requires built-in version negotiation protocol in logic, increasing Yuan core complexity
- If user modifies both logic (rare but possible — L2 training on Server avatar causes thinking engine parameter updates) and state offline, multiple CIDs generated during offline period require more complex merging when reconnecting

### Mitigations

**Version Compatibility Protocol**:

- Logical CID carries a semantic version number (`major.minor`)
- State CID carries the logical version number when it was created
- Avatar validates on load: if state requires higher logical version > current logical version, avatar automatically attempts to roll back to previous compatible logical CID (from local cache or IPFS)
- If state requires lower logical version < current logical version, logic handles backward compatibility itself (logic code contains migration functions for older state versions)
- If version gap exceeds 1 major version, notify user for intervention — this indicates potentially significant changes requiring user understanding

**Offline Multi-Avatar Scenario**: ADR pending (MVP phase only handles single-user single-avatar online scenario; complex merging for multi-avatar offline resolved via separate ADR before Act II).

## References

- [Yuan Architecture Document](../01-strategic-design/core-domain/yuan-core) — Section 3 describes the dual CID evolution model in detail
- [IPFS Content Addressing Principles](https://docs.ipfs.tech/concepts/content-addressing/)
- [IPNS Specification](https://specs.ipfs.tech/ipns/ipns-record/)
