---
title: Avatar Grid — Replaceable Temporary Containers
description: Avatars are the temporary containers through which digital life manifests in different contexts — destructible, replaceable "candlesticks."
---

## 1. Definition

An Avatar is the temporary container through which digital life manifests in different contexts — a replaceable "candlestick" bearing Yuan's flame.

Its core property is **disposability**: the crash, uninstallation, or disconnection of a single Avatar merely means Yuan rests here for a moment, without affecting the integrity or continuous evolution of its essence. Avatars themselves store no user data — all state persists in Yuan and the Second Brain; Avatars are merely their runtime projections.

## 2. Design Principles

Avatar design follows two core principles:

**Resource Independence**: The existence of digital life should not depend on device performance. From a smartwatch to a cloud server, the same candle flame can burn fully under different resource conditions — only the brightness differs, not the flame itself being diminished.

**Location Independence**: Digital life should not be bound to any physical location. Device loss, network switching, cross-continent migration — the Avatar merely changes container; the flame itself remains unscathed.

These two principles directly implement **Resilience** and **Equality** from the supreme principles: Resilience demands the flame not depend on a single device; Equality demands that low-resource devices can also connect.

## 3. Classification Grid: Two Intersecting Dimensions

Avatars are defined as a grid across two dimensions. This is not mere classification, but the **infrastructure for an intelligent scheduling system**.

### 3.1 Dimension One: Resource Type

| Category | Definition | Typical Carriers | Capability Boundaries |
|:---|:---|:---|:---|
| **Tiny** | Extremely resource-constrained runtimes | Browser tabs, watch apps, CLI terminals | Can run Yuan + L0 routing layer; no full Vox parliament; perception system degrades to polling mode |
| **Main** | Balanced resources with strong interactivity | Desktop/laptop native apps, tablet apps | Can run Yuan + L0 + L1 fast response layer; supports dual-brain Vox mode; full perception system |
| **Server** | Powerful compute and storage, persistently online | Home servers, Raspberry Pi, cloud hosts | Can run full Yuan + L0/L1/L2; supports full four-brain parliament; can execute L2 federated training |

### 3.2 Dimension Two: Deployment Zone

| Category | Definition | Trust Model | Typical Scenarios |
|:---|:---|:---|:---|
| **Edge** | Physical devices directly operated by the user | Absolute sovereignty, fully trusted | Phone, laptop, watch |
| **Side** | Nodes within the user's controlled LAN | High trust, physically controllable | Home server, NAS, Raspberry Pi cluster |
| **Cloud** | Third-party infrastructure on the public internet | Low trust, requires encryption + Harness dual protection | VPS, public cloud hosts |

### 3.3 Grid Matrix

The two dimensions intersect to form a 3×3 Avatar matrix:

|  | Tiny | Main | Server |
|:---|:---|:---|:---|
| **Edge** | Watch, mobile browser | Laptop native app, tablet | Mobile workstation (rare) |
| **Side** | Smart home panel | Home NAS web interface | Home server, Raspberry Pi |
| **Cloud** | Lightweight VPS (minimum instance) | Standard cloud host | High-performance cloud server |

This matrix enables the system to intelligently distribute computation to the most suitable Avatar node based on task complexity, privacy sensitivity, and network conditions. The distribution strategy is strategic — it is not simply "throw the task to the nearest node," but comprehensively considers:

- **Privacy sensitivity**: Second Brain queries containing personal reflections are preferentially executed on-edge
- **Computational complexity**: L2 federated training requires Server-level compute, automatically routed to side or cloud nodes
- **Network availability**: In offline states, edge Avatars take over completely, deferring synchronization until network recovery

## 4. Core Experience: Instant Awakening

A user, through sovereign identity authentication on any Avatar on any device, can trigger the instant awakening flow.

### 4.1 Awakening Flow

1. **Identity authentication**: User provides a private key signature or biometric (processed by the edge secure chip; the private key never leaves the edge)
2. **Locate Yuan**: Avatar resolves the user's latest Meta Manifest via IPNS
3. **Cache check**:
   - Logic CID is usually cached (low update frequency); verify hash
   - State CID usually needs the latest version pulled, but can load the local cached version for immediate startup while syncing the latest state in the background
4. **Runtime assembly**: Combine logic and state in the Wasm runtime to form a complete Yuan instance
5. **Context fusion**: Merge with the local environment (time, device type, network state), adjusting perception modules and Vox's operating mode
6. **Presentation ready**: Present a fully continuous, seamlessly connected digital life within seconds

### 4.2 Experience Standards

| Metric | Tiny | Main | Server |
|:---|:---|:---|:---|
| Awakening time | < 3s | < 1s | Always online |
| Initial load size | < 2MB | < 10MB | Full |
| Offline availability | ✅ | ✅ | Not needed |

## 5. Graceful Degradation and Upgrade

When migration occurs between Avatars, the system automatically adjusts functionality:

### 5.1 Degradation Path

| From | To | Degradation Behavior |
|:---|:---|:---|
| Server | Main | Vox parliament degrades from four-brain to dual-brain; L2 training pauses; perception module switches from event-driven to polling |
| Main | Tiny | Vox retains only dual-brain fast mode; L1 cache disabled; perception module retains only time and task dimensions |
| Online | Offline | Edge Avatar takes over completely; all operations are locally queued; coordinated fusion via sovereign network upon network recovery |

### 5.2 Upgrade Path

| From | To | Recovery Behavior |
|:---|:---|:---|
| Tiny | Main | Auto-detects available resources; enables L1 cache; Vox restores full dual-brain mode; perception module restores all dimensions |
| Main | Server | Vox restores full four-brain parliament; L2 training queue auto-starts; perception module switches to event-driven mode |

All degradation and upgrade events are logged in the Harness layer's audit trail for traceability.

## 6. Security Boundaries

As Yuan's runtime, Avatars must explicitly define their security boundaries:

- **Tiny Avatar**: Wasm sandbox + no filesystem access + only IndexedDB persistence allowed
- **Main Avatar**: Wasm sandbox + restricted filesystem (Second Brain cache directory only) + local network used only for sovereign network communication
- **Server Avatar**: Full sandbox + user-explicitly-authorized storage mounts + can relay sovereign network messages for other Avatars

All Avatars must verify Yuan's signature integrity before loading. An Avatar refuses to execute a Yuan whose signature verification fails — this defends against "flame theft" attacks: even if a malicious entity copies the encrypted Yuan module, without the user's private key signature, the Avatar will not execute it.

## 7. Relationship with the Sovereign Network

Avatars are the **physical anchor points** of the sovereign network. Each Avatar maintains a connection endpoint to the sovereign network, responsible for:

- Receiving state updates from other Avatars
- Submitting local state changes
- Queuing messages during offline periods, batch-syncing upon reconnection

See the [Sovereign Network design document](sovereign-network) for details.
