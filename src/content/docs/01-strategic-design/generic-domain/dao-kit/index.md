---
title: DaoKit Ecosystem —— Extensible Skill Ecosystem
description: DaoKits are functional modules running on top of Project IV, the only way for digital life to learn new skills and extend capabilities.
---

## 1. Definition

Dao-Kit is an application or functional module running on top of Project IV, the only way for digital life to learn new skills and extend capabilities.

The essential difference from traditional apps lies in the permission model:

- **Traditional App**: Install = Authorize — To use features, users must agree to bundled permission requests. Permissions are the price of entry.
- **DaoKit**: Discover = Authorize — Before installation, users see a permission request page instead of an install button. Permissions are trust actively granted by users and can be revoked item by item.

A DaoKit can be:

- A complete application (e.g., diary DaoKit, knowledge base DaoKit)
- A lightweight middleware (e.g., privacy filter, content safety validator)
- A diplomatic embassy (bridge connecting external services)

DaoKits themselves do not store user data. All data is written to the Second Brain, with keys held by the user. DaoKits only receive temporary, minimally necessary read/write permissions when activated.

## 2. Ecosystem Strategy: Lowering Barriers and Igniting Network Effects

The core of DaoKit ecosystem development is creating a positive reinforcement loop:

> Useful DaoKits attract users → User base attracts developers → Developers create more useful DaoKits

The cold start of this flywheel depends on two pillars.

### 2.1 Extreme Developer-Friendliness

Lowering creation barriers is the top priority. A developer should be able to start writing their first DaoKit in minutes, not spend days reading documentation first.

Specific measures:

- **SDK-First Design**: Provide `create-dao-kit` scaffolding to generate project templates with one click, including development server, test sandbox, and packaging tools
- **Declarative Development**: Core logic communicates with Yuan through standard interfaces; developers don't need to understand internal details of IPFS, IPNS, or Wasm
- **Local Preview**: Developers preview and debug DaoKits in their own avatars, no need to upload to any centralized platform
- **Documentation as Tutorial**: The first page of official documentation is "Build Your First DaoKit," a complete, followable guide from zero to deployment

### 2.2 Strong User Sovereignty Protection

Ecosystem prosperity cannot come at the expense of core philosophy. With each new DaoKit added, the user's digital life should not become more vulnerable.

- **Permission Minimization**: DaoKits can only access the data scope they declare and users approve, no crossing boundaries
- **Revocability**: Users can revoke any permission from any DaoKit at any time, revocation takes effect immediately
- **No Backdoors**: All DaoKit code is auditable, all data flows are traceable
- **Sandbox Isolation**: DaoKits run in independent Wasm sandboxes; even malicious DaoKits cannot access memory spaces of other DaoKits

## 3. Developer Experience: Rust for Core, TypeScript for UI

To balance performance, security, and development efficiency, two officially supported golden development paths are established.

### 3.1 Core DaoKits (Rust)

For low-level DaoKits that need deep interaction with Yuan core, handle sensitive data, or require extreme performance.

- **Typical Scenarios**: Encryption tools, local AI inference engines, Second Brain indexers
- **Technical Advantages**: Rust's safety features (ownership system, no GC) naturally complement Wasm sandbox; mature toolchain for compiling to Wasm; consistent with Yuan's implementation language, enabling reuse of core type definitions
- **Developer Profile**: Systems programmers or developers willing to invest learning costs for performance and security

### 3.2 Interface DaoKits (TypeScript / dao.js SDK)

The absolute mainstream path for building user interfaces.

- **Typical Scenarios**: Diary interfaces, Pin boards, principle vault editors, visualization DaoKits
- **Technical Advantages**: Web standard based, any frontend developer can quickly get started with existing skills; `dao.js` SDK encapsulates low-level capabilities like Yuan communication, permission requests, and Second Brain read/write — developers only need to focus on UI and interaction logic
- **Developer Profile**: Frontend developers, full-stack developers, independent developers

### 3.3 Protocol-Level Openness

The system maintains protocol-level openness through standard Wasm ABI. Any language that compiles to Wasm (Go, Zig, Swift, etc.) can serve as a community-supported development path. The official stance sets no language restrictions, only requiring DaoKits to pass Harness layer security checks and security scans.

## 4. Security and Distribution: DaoKit Manifest Specification and Decentralized Marketplace

### 4.1 DaoKit Manifest Specification

Each DaoKit must contain a structured manifest file. It is not a wall of text like a "privacy policy" that no one reads, but a machine-parseable, user-understandable permission declaration:

- **Metadata**: Name, version, description, license, language, author DID
- **Component CID**: IPFS address of DaoKit code
- **Permission Declaration**: Clear, itemized list of data scopes (URI 化命名空间，如 `spira:permission:*`) 和 capabilities（如 `spira:capability:*`），增强机器可解析性和互操作性
- **Harness Compatibility**: Declare whether the DaoKit includes middleware mode and has passed Harness security scanning
- **Dependency Declaration**: If the DaoKit depends on other DaoKits, list them in the manifest

以下是一个遵循 OKF（Open Knowledge Format）规范补充后的完整 Manifest 示例：

```json
{
  "name": "Diary DaoKit",
  "version": "1.0.0",
  "description": "A personal diary application",
  "license": "MIT",
  "language": "zh-CN",
  "author_did": "did:spira:author123...",
  "component_cid": "bafybeig...",
  "permissions": [
    { "scope": "spira:permission:read-projects", "category": "Projects" },
    { "scope": "spira:permission:write-daily-logs", "resource": "daily_logs" },
    { "capability": "spira:capability:external-knowledge:l3" },
    { "capability": "spira:capability:sovereign-network:comm" }
  ],
  "harness_compatible": true,
  "middleware_mode": false,
  "dependencies": [
    "did:spira:dao-kit:privacy-filter:1.0.0"
  ]
}
```

新增字段说明：

- **`license`**：声明 DaoKit 的许可证（如 MIT、Apache-2.0、GPL-3.0 等），便于合规扫描和自动检测
- **`language`**：UI/文档的语言标签（如 `zh-CN`、`en`、`ja`），支持多语言 DaoKit 的发现与过滤
- **权限 scope URI 化**：`scope` 和 `capability` 从自定义字符串改为 URI 化命名空间 —— `spira:permission:*` 标识数据访问范围，`spira:capability:*` 标识能力调用。这一变更使权限声明具备全局唯一性，增强机器可解析性和跨生态互操作性

### 4.2 Discover = Authorize

When users discover DaoKits in the "DaoKit Marketplace," they see not a direct install button, but the permission request page from its manifest.

User approval completes a decentralized, informed authorization installation. This is a ritualistic interaction — not mindless clicks through "Next → Next → Finish," but a moment where users pause, see which parts of their digital life this DaoKit wants to touch, and actively say "yes."

### 4.3 Decentralized Trust Model

No reliance on centralized platform review. Trust is established through:

- **Developer DID Signature**: Identity is traceable. Malicious developers cannot evade reputation damage by changing aliases
- **Reproducible Builds**: DaoKit code is open source; CI system independently verifies that compiled artifacts on IPFS match source code
- **Automated Security Scanning**: Harness compatibility checks and static analysis automatically triggered when submitting to marketplace, results displayed on manifest page
- **Community Curated Lists**: Community members maintain their own trusted DaoKit collections. Users can choose to subscribe to a curator's list instead of browsing blindly

### 4.4 The Marketplace is Also a DaoKit

The DaoKit Marketplace does not exist as a centralized service. The marketplace itself is a DaoKit — a special, community-maintained directory DaoKit. Anyone can run their own marketplace instance and curate their own list of DaoKits. Users can subscribe to multiple marketplaces or bypass the marketplace entirely and load DaoKits directly via CID.

## 5. Middleware Pattern: Composable Harness Extensions

Drawing inspiration from Harness Engineering's composable middleware concept, DaoKits don't have to be standalone applications — they can also be composable "capability plugins."

### 5.1 What is Middleware DaoKit

Middleware DaoKits don't provide user interfaces; instead, they insert a processing step into Vox's inference pipeline. They receive input, perform checks or transformations, then pass to the next middleware or final output.

### 5.2 Example

```typescript
// Privacy filter middleware: automatically removes PII before Vox calls external APIs
// This is a DaoKit, but it has no UI, only an apply function

privacyFilter: Middleware = {
    name: 'Privacy Filter',
    stage: 'pre-external-call', // Execute before calling external services
    apply: async (context, next) => {
        // Automatically detect and remove PII (Personally Identifiable Information)
        context.request = redactPII(context.request);
        return next(context);
    }
};
```

### 5.3 User-Composed Middleware Chains

Users can freely compose middleware to form personalized Harness chains:

> Privacy Filter → Content Safety Validation → Cost Control Agent → Vox Call

Middleware composability lowers development barriers — developers can focus on building a check middleware without developing a complete DaoKit. This greatly expands the potential ecosystem contributor base.

## 6. Integration with Harness

All DaoKits must pass Harness layer security checks during installation and runtime:

- **Installation**: Manifest file parsed by Harness, permission declarations compared against user authorization. Any permission requests exceeding authorization are rejected
- **Runtime**: DaoKits run in independent Wasm sandboxes, Harness boundary definition module monitors their system calls. Boundary violations are intercepted and logged in audit logs
- **Update**: If manifest changes after DaoKit update and new permissions are declared, user re-authorization required
- **Uninstallation**: All cache and temporary data cleared, but data written to Second Brain (already owned by user) is preserved

## 7. Long-Term: DaoKit Protocol

When the DaoKit ecosystem matures to a certain stage, interoperability between DaoKits will become a natural requirement. The DaoKit Protocol is a long-term plan in this direction:

- Two DaoKits can communicate through the sovereign network, exchanging user-authorized data
- Output from one DaoKit can serve as input to another — with explicit user-established pipelines
- Dependencies between DaoKits managed through dependency declarations in manifest files

This is not a priority in the current phase, but space has been reserved in the architectural design.