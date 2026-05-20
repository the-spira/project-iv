---
title: Ports and Adapters —— Boundary Definitions in Hexagonal Architecture
description: Port and adapter design for Project IV, defining all boundary interfaces for digital life system interaction with the external world.
---

## 1. Hexagonal Architecture Overview

Project IV adopts the hexagonal architecture (ports and adapters pattern). The core domain (Yuan, Second Brain, Avatar) is completely decoupled from the external world, defining contracts through ports and interacting with specific technologies through adapters.

Direct benefits of this architectural choice:

- **Avatar Diversity**: The same core logic runs in browsers, desktops, and CLI through different adapters
- **Storage Replaceability**: The storage backend of the Second Brain can switch between IndexedDB and IPFS based on avatar resource type, with no changes to core logic
- **Testability**: Test adapters can simulate network, storage, and user input without relying on real infrastructure
- **Sovereignty Guarantee**: The core domain does not directly access the network or file system — all I/O passes through ports and is subject to Harness boundary checks

### 1.1 Port vs Adapter

- **Port**: Interface contract defined by the core domain. Ports answer "what capabilities the system needs" without caring who implements them. Ports are abstract and technology-agnostic.
- **Adapter**: Concrete implementation of a port. Adapters answer "how this capability is implemented in a specific environment". Adapters are concrete and technology-dependent.

A single port can have multiple adapters. For example, `MemoryStoragePort` uses an IndexedDB adapter in Tiny avatars and an IPFS adapter in Server avatars, with no changes to core domain code.

## 2. Port Inventory

### 2.1 User Interaction Ports

| Port | Defined In | Responsibility | Main Methods |
|:---|:---|:---|:---|
| **UserInputPort** | Yuan Core | Receive and normalize user input | `receive(text, mode)` → `UserIntent` |
| **UserOutputPort** | Vox | Present responses to users | `present(response, format)` |
| **NotificationPort** | Vox + Perception System | Push notifications at appropriate times | `notify(level, message, action?)` |

### 2.2 Storage Ports

| Port | Defined In | Responsibility | Main Methods |
|:---|:---|:---|:---|
| **MemoryStoragePort** | Second Brain | Persistence and retrieval of knowledge blocks | `store(block)`, `query(filter)`, `archive(id)` |
| **StateStoragePort** | Yuan | Persistence of Yuan state | `save_state(cid)`, `load_state(cid)` |
| **AuditStoragePort** | Harness | Writing and querying audit logs | `append(event)`, `query(timerange)` |

### 2.3 Network Ports

| Port | Defined In | Responsibility | Main Methods |
|:---|:---|:---|:---|
| **SovereignNetworkPort** | Sovereign Network | State synchronization and messaging between avatars | `publish(update)`, `subscribe(topic)`, `resolve_ipns(did)` |
| **ExternalAPIPort** | Diplomacy Protocol | Call external service APIs | `call(service, request)` → `RawResponse` |
| **IPFSStoragePort** | IPFS Storage | Content-addressed distributed storage | `put(data)` → `CID`, `get(cid)` → `data` |

### 2.4 Key and Identity Ports

| Port | Defined In | Responsibility | Main Methods |
|:---|:---|:---|:---|
| **IdentityPort** | Yuan | Identity key management and signing | `sign(payload)`, `verify(signature, payload)`, `derive_did()` |
| **EncryptionPort** | Yuan | Encryption and decryption operations | `encrypt(plaintext, key_id)`, `decrypt(ciphertext, key_id)` |

### 2.5 Harness Ports

| Port | Defined In | Responsibility | Main Methods |
|:---|:---|:---|:---|
| **ConstraintCheckPort** | Harness | Runtime verification of hard constraints | `check(task)` → `Allow \| Deny(reason)` |
| **AlignmentPort** | Harness | Alignment scoring by evaluator brain | `evaluate(output, principles)` → `Score(1-10) + Critique` |

### 2.6 Perception Ports

| Port | Defined In | Responsibility | Main Methods |
|:---|:---|:---|:---|
| **SensorPort** | Perception System | Collect desensitized environment data from devices | `poll(dimensions[])` → `ContextState` |
| **ContextFusionPort** | Perception System | Fuse multi-dimensional sensor data | `fuse(states[])` → `FusedContext` |

### 2.7 DaoKit Ports

| Port | Defined In | Responsibility | Main Methods |
|:---|:---|:---|:---|
| **DaoKitPort** | DaoKit Ecosystem | DaoKit installation, lifecycle, and permission management | `install(manifest)`, `invoke(kit, method, args)`, `revoke(kit)` |

## 3. Adapter Inventory

### 3.1 User Interaction Adapters

| Adapter | Implements Port | Applicable Avatar | Description |
|:---|:---|:---|:---|
| **WebUIAdapter** | UserInputPort, UserOutputPort, NotificationPort | Browser (Tiny/Main) | Based on Web Components, rendered in browser tabs or extension popups. Supports text input, speech-to-text (Browser Speech API) |
| **CLIAdapter** | UserInputPort, UserOutputPort | Terminal (Tiny) | Plain text interaction, supports piping and script invocation. Suitable for remote management of Server avatars |
| **MobileAdapter** | UserInputPort, UserOutputPort, NotificationPort | Mobile (Tiny/Main) | Based on React Native or native components, supports touch gestures and mobile notifications |

### 3.2 Storage Adapters

| Adapter | Implements Port | Applicable Avatar | Description |
|:---|:---|:---|:---|
| **IndexedDBAdapter** | MemoryStoragePort, StateStoragePort, AuditStoragePort | Browser (Tiny/Main) | Based on browser IndexedDB. Supports structured index queries, storage limit varies by browser (typically >100MB). Default storage backend for Tiny avatars |
| **IPFSAdapter** | MemoryStoragePort, StateStoragePort, IPFSStoragePort | Main/Server | Based on js-ipfs or IPFS desktop client. Optional for Main avatars, default for Server avatars |
| **HybridStorageAdapter** | MemoryStoragePort, StateStoragePort | Main | IndexedDB hot cache + IPFS cold storage. Most recent 30 days data locally, older data on IPFS loaded on demand |

### 3.3 Network Adapters

| Adapter | Implements Port | Applicable Avatar | Description |
|:---|:---|:---|:---|
| **Libp2pAdapter** | SovereignNetworkPort | Main/Server | Peer-to-peer communication based on libp2p, supports GossipSub pub/sub and DHT discovery |
| **IPFSGatewayAdapter** | IPFSStoragePort, SovereignNetworkPort | Tiny | Fetch content through public IPFS gateways (e.g., ipfs.io, dweb.link). Only used as fallback when Tiny avatars cannot run libp2p directly |
| **RelayAdapter** | SovereignNetworkPort | Tiny | Relay sovereign network messages through user's Server/edge avatars. Tiny avatars do not participate directly in P2P network; messages forwarded through trusted relays |
| **HTTPDiplomacyAdapter** | ExternalAPIPort | All Avatars | Call external services via standard HTTPS + OAuth/API Key. Serves as foundation for first layer of diplomacy protocol (diplomatic DaoKits) |

### 3.4 Key and Identity Adapters

| Adapter | Implements Port | Applicable Avatar | Description |
|:---|:---|:---|:---|
| **WebCryptoAdapter** | EncryptionPort, IdentityPort (signing part) | Browser | Based on browser Web Crypto API. Keys stored in IndexedDB, signing operations performed in browser security context |
| **NativeCryptoAdapter** | EncryptionPort, IdentityPort | Desktop/Mobile | Based on OS native keychain (macOS Keychain, Windows DPAPI, Linux kernel keyring) |
| **SoftwareCryptoAdapter** | EncryptionPort, IdentityPort | CLI/Server | Pure software implementation (RustCrypto), used in environments without native keychain. Key files manually backed up by user |

### 3.5 Harness Adapters

| Adapter | Implements Port | Applicable Avatar | Description |
|:---|:---|:---|:---|
| **WasmConstraintAdapter** | ConstraintCheckPort | All Avatars | Hard constraint checks embedded in Yuan at compile time. Executed within Wasm sandbox, no external service dependency |
| **EvaluatorBrainAdapter** | AlignmentPort | Main/Server | Model instance of evaluator brain. Main avatars run distilled version (simplified scoring), Server avatars run full version |

### 3.6 Perception Adapters

| Adapter | Implements Port | Applicable Avatar | Description |
|:---|:---|:---|:---|
| **BrowserSensorAdapter** | SensorPort | Browser | Collects page visibility, window focus, network type, screen size. Does not collect browsing history or page content |
| **DesktopSensorAdapter** | SensorPort | Desktop | Collects active application category, input frequency, power status. Data desensitized locally before reporting |

## 4. Adapter Selection Logic

Avatars automatically select adapter combinations based on ResourceTier and DeploymentZone upon waking:

| Avatar Type | Storage | Network | Encryption | Perception |
|:---|:---|:---|:---|:---|
| Tiny × Edge | IndexedDBAdapter | RelayAdapter + IPFSGatewayAdapter | WebCryptoAdapter | BrowserSensorAdapter (degraded mode) |
| Main × Edge | HybridStorageAdapter | Libp2pAdapter | WebCryptoAdapter / NativeCryptoAdapter | BrowserSensorAdapter / DesktopSensorAdapter (full) |
| Main × Side | IPFSAdapter + IndexedDBAdapter cache | Libp2pAdapter | NativeCryptoAdapter | DesktopSensorAdapter |
| Server × Side | IPFSAdapter | Libp2pAdapter | NativeCryptoAdapter | None (Server has no direct user interaction, no perception needed) |
| Server × Cloud | IPFSAdapter | Libp2pAdapter | SoftwareCryptoAdapter | None |

## 5. Port to Context Mapping

The ports defined in this document implement the integration contracts for each bounded context in strategic design. The correspondence between ports and contexts is defined in the "Communication Contracts" table in Section 5 of the [Context Map](../../01-strategic-design/context-map).

## 6. Implementation Priority

| Phase | Adapters | Reason |
|:---|:---|:---|
| **Spark MVP** | WebUIAdapter, IndexedDBAdapter, WebCryptoAdapter, BrowserSensorAdapter (simplified) | Spark is a browser widget, only needs complete Tiny × Edge pipeline |
| **Late Act I** | HybridStorageAdapter, RelayAdapter, IPFSGatewayAdapter | Support cross-device data export and recovery, validate minimal viable path for "existence continuity" |
| **Act II** | Libp2pAdapter, NativeCryptoAdapter, DesktopSensorAdapter, MobileAdapter | Launch desktop/mobile native avatars, seamless multi-device sync |
| **Act III** | IPFSAdapter (Server), EvaluatorBrainAdapter (full) | Launch Server avatar, complete four-brain parliament, L2 federated training |
| **Act IV** | All adapters | Open source ecosystem, community contributes additional adapters |
