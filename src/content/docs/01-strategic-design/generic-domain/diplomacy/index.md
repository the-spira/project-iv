---
title: Diplomacy Protocol —— Intelligent Bridge for Sovereign Boundaries
description: The Diplomacy Protocol is a rigorous framework for Project IV to interact with all external services, designed to acquire external value while defending the sovereign boundaries of digital life.
---

## 1. Positioning

The Diplomacy Protocol is a rigorous framework for Project IV to interact with all external services — from Twitter, GitHub to WeChat, DingTalk.

Its core contradiction: Digital life needs nutrients from the external world (information, knowledge, connections), but the external world poses potential threats to sovereignty (data harvesting, privacy erosion, algorithmic manipulation). The Diplomacy Protocol's mission is not to build a wall, but to build a wall with a door — a door controlled by the user, with everything passing through filtered by Harness.

## 2. Core Principles

Three unshakable principles that directly implement the three supreme principles of sovereignty, equality, and trustworthiness.

### 2.1 Sovereign Boundary Inviolable

External services can never directly access raw data from Yuan or the Second Brain. All interactions must go through designated "diplomatic DaoKits" — specialized embassies authorized by users and running in Wasm sandboxes. External services never see the user themselves, only the user's authorized diplomatic representative.

### 2.2 Data Minimization and Transformation

Incoming external data must undergo filtering, summarization, and structural transformation to become standard knowledge blocks acceptable to the Second Brain; raw data dumping is prohibited.

This means:

- A Twitter bookmark doesn't save the complete HTML page, but extracts the title, core ideas, source, and user's annotations at the time
- An email doesn't land in full, but extracts action items, key information, and associations with current projects
- Raw data is discarded after transformation, not entering long-term storage

### 2.3 Default Invisibility

Outbound requests follow the principle of minimal exposure:

- Do not actively expose the user's primary identity (DID). Each diplomatic interaction uses a temporary, revocable session token
- Optional use of different aliases for different external services to prevent cross-platform tracking
- All external calls require user authorization, or Vox automatically judges within clear boundaries based on user-prescribed principles
- Users can always view "which external services my digital life has interacted with in the past week" — completely transparent diplomatic logs

## 3. Protocol Architecture: Three Layers of Filtering and Decision-Making

Diplomatic activities proceed securely through a three-layer architecture. These three layers form a complete filtering chain from the external world to the Second Brain.

### 3.1 Layer 1 · Diplomatic DaoKits

"Specialized embassies" connecting to specific external services. Each diplomatic DaoKit encapsulates an external service's authentication protocol and raw API, translating the external world's language into Project IV's internal data format.

- **Examples**: Twitter Diplomatic DaoKit, GitHub Diplomatic DaoKit, RSS Diplomatic DaoKit
- **Responsibilities**: Handle OAuth or API Key authentication, send requests, receive raw responses, pass raw data to Layer 2
- **Constraints**: Cannot write directly to Second Brain; cache raw data no longer than needed for transformation; run in independent Wasm sandbox

### 3.2 Layer 2 · Generic API Adapter

"Customs and quarantine station" located within sovereign boundaries. This is the most critical security checkpoint in the Diplomacy Protocol.

- **Purification**: Remove tracking metadata (UTM parameters, tracking pixels, fingerprint scripts), advertising content, known malicious payloads
- **Summarization**: Extract core information (main arguments of an article, action items from an email, update summary of a codebase) instead of preserving full text
- **Structural Transformation**: Reshape external data into standard knowledge blocks according to the Second Brain's PARA data model — each knowledge block contains: source annotation, acquisition time, associated project or area tags, user-editable comment fields

The adapter doesn't care which service the data comes from — it only applies the same set of filtering and transformation rules. This means when adding new external services, only new diplomatic DaoKits (Layer 1) need to be developed; the adapter's purification logic requires no modification.

### 3.3 Layer 3 · Consensus Body (Diplomatic Decision Center)

All outbound data requests and inbound data storage must be initiated or approved by Vox.

- **Outbound Decisions**: Vox evaluates the necessity of requests. Are there more private alternatives? Has the user expressed concerns about similar requests before?
- **Inbound Evaluation**: Vox correlates, compares, and deduplicates incoming information with existing knowledge in the Second Brain before allowing formal storage. If incoming information conflicts with existing knowledge, Vox marks the difference rather than automatically overwriting
- **Harness Alignment**: Before external data flows in, it must pass the evaluator brain's alignment check — determining if it conflicts with the user's principle vault. For example: if user principles include "avoid information anxiety," Vox controls the quantity and frequency of incoming information

## 4. Harness Enhancement to Diplomacy Protocol

The Diplomacy Protocol naturally requires Harness support. The external world is the most uncontrollable environment outside Project IV's trust boundary.

### 4.1 Hard Constraints in Diplomacy

Diplomacy scenarios have dedicated entries in the hard constraint list:

- **Data Outflow Constraint**: Before sending any outbound request, it must pass the privacy filter middleware — detecting and removing potentially contained PII, Second Brain internal identifiers, Yuan's CID, and other metadata
- **Data Inflow Constraint**: After external data passes through the Layer 2 adapter and before entering the Second Brain, it must pass the evaluator brain's alignment check
- **Frequency Constraint**: When a single DaoKit makes more outbound requests than the user-set threshold within 1 hour, automatic rate limiting triggers and notifies the user
- **Silence Constraint Linkage**: When the user is in "focus" mode, incoming external information doesn't trigger immediate notifications — it enters a reading queue uniformly

### 4.2 Audit and Traceability

All diplomatic activities are fully recorded in Harness audit logs:

- Data Outflow: Which diplomatic DaoKit, which service requested, data transfer volume (no content recorded), time, whether user authorized
- Data Inflow: Source service, data summary retained after filtering, whether evaluator brain warning triggered, whether ultimately stored in Second Brain

Users can regularly review diplomatic logs. If a diplomatic DaoKit's behavior is found to be unexpected, all its permissions can be revoked with one click and it can be uninstalled.

## 5. Old World Connection Strategy

Not all external services are willing to open APIs, and not all services with open APIs are worth deep integration. Project IV adopts a layered pragmatic strategy.

| Tier | Type | Strategy | Examples |
|:---|:---|:---|:---|
| **L1 · Protocol Open Layer** | Native-level support | Develop official diplomatic DaoKits, deep integration | Email (IMAP/SMTP), RSS/Atom, standard ActivityPub |
| **L2 · API Available Layer** | Leverage open APIs for core function integration | Community and official jointly develop diplomatic DaoKits. This is the main battlefield for ecosystem expansion | Twitter, GitHub, Notion, Readwise |
| **L3 · Ecosystem Closed Layer** | Adopt "bridging" strategy | Run official clients in controlled Server avatars for secure remote control; or only provide summary notifications without pursuing bidirectional interaction | WeChat, Xiaohongshu, DingTalk |

### 5.1 L3 Philosophy

For the L3 closed layer, the primary goal is not perfect integration, but maintaining critical information connectivity while preventing users from losing sovereignty on these platforms. We acknowledge real-world limitations but don't abandon long-term alternative goals:

- **Bridging Mode**: Run official clients on user-controlled Server avatars, with avatars acting as the user's "proxy" on these platforms. The platform only sees this proxy, not the user's own device
- **Smart Mirror**: Only extract key notification summaries received by users on these platforms (e.g., "someone @mentioned you"), without copying complete interactions within the platform
- **Long-Term Alternatives**: As open protocols gain popularity, gradually guide users to migrate important social relationships to the L1 layer

## 6. Fediverse Bridging

Project IV's relationship with the ActivityPub fediverse is bridging rather than integration. See Act III of the phased narrative strategy.

- **Current Status**: Through the official Fediverse Diplomatic DaoKit, interact externally as a special node in the federated network. Can send and receive messages on behalf of users, but all incoming information must pass through the Diplomacy Protocol's three-layer processing
- **Position**: Not joining the fediverse's protocol governance system — bridging maintains Project IV's complete sovereignty over its own protocol evolution
- **Long-Term**: Develop the sovereign network protocol into a more fundamental communication protocol between digital lives than ActivityPub, allowing fediverse applications to read user-approved Second Brain fragments through adapters

## 7. Relationship with DaoKit Ecosystem

Diplomatic DaoKits are a subclass of DaoKits. They follow the DaoKit manifest specification, declare the external services and data scopes they need to access, are distributed through decentralized marketplaces, and are subject to the same permission management.

The difference lies in:

- **Regular DaoKits**: Endogenous capabilities — create value within the Project IV ecosystem (diary, knowledge management, visualization)
- **Diplomatic DaoKits**: Exogenous capabilities — act as bridges connecting to the external world

Both abide by the same Harness security boundaries. A malicious diplomatic DaoKit cannot do what a regular DaoKit cannot — because every external call it makes is intercepted and checked by Harness.

## 8. Design Principles Summary

| Principle | Manifestation in Diplomacy Protocol |
|:---|:---|
| **Sovereignty** | External services can never directly access Yuan or Second Brain; all interactions through user-authorized DaoKits |
| **Resilience** | No dependence on any external service — if L3 closed layer disconnects, digital life itself remains unaffected |
| **Equality** | L1 open protocols are free and standard; anyone can access with minimal resource cost |
| **Trustworthiness** | Three-layer filtering + evaluator brain alignment check + audit logs ensure external data security and controllability |