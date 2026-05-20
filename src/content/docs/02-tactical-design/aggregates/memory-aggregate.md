---
title: Memory Aggregate —— Versioning and Deduplication of Knowledge Blocks
description: Design of the memory aggregate in the Second Brain, including knowledge block structure, versioning strategy, encrypted storage format, and deduplication mechanism.
---

## 1. Aggregate Overview

The Memory aggregate is the core aggregate of the Second Brain, representing all structured memories accumulated by the user in their digital life. It is not just a collection of text, but a set of knowledge assets with versions, traceability, and encrypted storage.

### Aggregate Root

**MemoryVault**

### Internal Entities

- **KnowledgeBlock**: An independent unit of knowledge
- **BlockVersion**: A link in the version chain of a knowledge block
- **KnowledgeIndex**: Full-text index across PARA categories
- **AuditTrail**: Log recording all changes within this aggregate

### Value Objects

- **BlockID**: Unique identifier for knowledge block
- **ContentHash**: Hash of encrypted content for deduplication and integrity verification
- **PARACategory**: Project/Area/Resource/Archive category tag
- **PrincipleEntry**: Single principle in the principle vault

### Domain Events

- `KnowledgeBlockCreated`: Recording a piece of knowledge for the first time
- `KnowledgeBlockUpdated`: Knowledge block gets new version
- `KnowledgeBlockArchived`: Knowledge block moved to archive
- `PrincipleAdded` / `PrincipleModified` / `PrincipleRemoved`: Principle vault changes
- `DuplicateDetected`: Deduplication agent finds duplicate knowledge blocks
- `EntropyScanCompleted`: Entropy management agent completes a scan

## 2. Knowledge Block Structure

Each knowledge block is a versioned entity consisting of the following fields:

```
{
  "block_id": "kb_3f7a9b",
  "current_version": 3,
  "para_category": "resources",
  "tags": ["machine-learning", "transformers"],
  "source": {
    "origin": "diplomacy://twitter/bookmark",
    "url_hash": "sha256:...",
    "acquired_at": "2025-05-20T14:30:00Z"
  },
  "versions": [
    {
      "version": 1,
      "content_cid": "bafy...v1",
      "content_hash": "sha256:abc...",
      "encryption_key_id": "key_7",
      "created_at": "2025-05-20T14:30:00Z",
      "created_by": "vox_session_1123"
    },
    {
      "version": 2,
      "content_cid": "bafy...v2",
      "content_hash": "sha256:def...",
      "encryption_key_id": "key_7",
      "created_at": "2025-05-21T09:15:00Z",
      "created_by": "vox_session_1156"
    }
  ],
  "pruned_versions": []
}
```

**Field Constraints**:

- `block_id` is globally unique, generated using random ID + creation timestamp hash
- `versions` array contains at least 1 version; latest version index is `current_version - 1`
- `content_cid` of all versions points to encrypted content on IPFS, encryption key ID references key managed by Yuan
- When version count exceeds retention limit (default 50 versions), old versions moved to `pruned_versions`, only metadata retained (version number + hash + timestamp), content CID can be garbage collected
- `source.origin` uses `diplomacy://` prefix for external sources, `internal://` for direct user input

## 3. Versioning Strategy

The Memory aggregate uses **append-only versioning**. Once created, knowledge blocks cannot be modified in-place — each modification creates a new version, with old versions retained.

### Version Creation Rules

| Change Type | Create New Version? | Description |
|:---|:---|:---|
| User edits knowledge block content | Yes | Create new version, old version fully retained |
| Vox distills knowledge from conversation | Yes | Source marked as `vox_session_xxx` |
| Only update tags or categories | Yes | Content unchanged, metadata changes also create new version (lightweight version, only records field differences) |
| User explicitly merges two knowledge blocks | Yes (3 new versions) | Each source knowledge block appends a "merged to kb_xxx" version, target block appends merged content version |
| Automatic deduplication marking | No | Only updates `DuplicateDetected` event, does not modify knowledge block itself |

### Version Retention Strategy

- **Active knowledge blocks** (Projects/Areas/Resources): Keep last 50 versions in full
- **Archived knowledge blocks**: Keep last 5 versions
- **Explicitly deleted knowledge blocks**: Keep last 1 version + deletion marker for 30 days, then permanently cleared (hard deletion requires user confirmation)

This strategy balances the philosophical commitment of "complete record" with storage costs. The 50-version threshold is based on practical estimation: assuming users update the same knowledge block once per day, 50 versions cover nearly two months of editing history, sufficient to trace any meaningful changes.

## 4. Deduplication Mechanism

Deduplication is performed by the entropy management agent during weekly incremental scans.

### Deduplication Criteria

Two knowledge blocks are considered "highly similar" when all of the following are true:

1. `content_hash` similarity > 90% (fast pre-screening via Locality-Sensitive Hashing)
2. `para_category` is the same
3. Tag intersection ≥ 50%

### Deduplication Process

1. Entropy management agent generates candidate duplicate pair list with similarity scores
2. Candidate list written to health report, marked as "Info" level
3. User reviews candidate pairs, can choose: merge, keep both (explicitly mark as non-duplicate), ignore this time (appears again in next scan), never show this pair again
4. When user selects merge, execute knowledge block merge process: each source block appends "merged" version, target block creates new merged content version

Note: Deduplication agent does not auto-merge — the hard constraint "never directly delete any data in Second Brain" applies here. Even if user selects merge, source knowledge blocks retain their complete version history, only marking merge destination on the latest version.

## 5. Encrypted Storage Format

All knowledge block content is end-to-end encrypted before writing to IPFS. Encryption performed on avatar edge, private keys managed by Yuan.

```
Encrypted knowledge block content (stored on IPFS):

{
  "encrypted": true,
  "scheme": "aes-256-gcm",
  "key_id": "key_7",
  "nonce": "base64:...",
  "ciphertext": "base64:...",
  "auth_tag": "base64:..."
}
```

**Key Management**:

- Each user's Second Brain uses a set of independent AES-256 keys, keys themselves encrypted by Yuan's IdentityKey
- Key rotation: Users can actively trigger key rotation (re-encrypt all content), or automatic rotation on first authorization from new device
- Keys never leave edge. Even when Server avatar performs storage operations, encryption completes on edge before upload — Server avatar only sees ciphertext

## 6. Invariants

| Invariant | Description |
|:---|:---|
| **Version Immutability** | Created versions cannot be modified. Any content change must create new version |
| **Deletion Requires Confirmation** | Any deletion operation on knowledge blocks or versions must be explicitly confirmed by user (hard constraint) |
| **Encryption Integrity** | Any knowledge block content written to IPFS must be encrypted. Plaintext never leaves edge |
| **Index Consistency** | KnowledgeIndex must be updated synchronously after each knowledge block creation, update, or archive. Index can be restored by traversing metadata of all knowledge blocks during rebuild |
| **Deduplication Not Automatic** | Deduplication merge must be confirmed by user, cannot be executed automatically |

## 7. Mapping to Second Brain Strategic Design

This aggregate design implements the PARA structure, principle vault, and efficiency flywheel defined in the [Second Brain Strategic Design Document](../../01-strategic-design/core-domain/second-brain/para-model). Specific mappings:

- **PARA Classification**: Implemented via `para_category` field, supporting four categories: Projects/Areas/Resources/Archive
- **Principle Vault**: Stored as independent `PrincipleEntry` entities, separate from knowledge blocks to ensure principles cannot be accidentally archived or merged during deduplication
- **Efficiency Flywheel**: `source` field in `KnowledgeBlockCreated` event distinguishes direct user input from Vox automatic extraction, supporting flywheel's "execute →沉淀 → feedback" tracking
- **Entropy Management Agent**: `EntropyScanCompleted` event triggers health report generation, with deduplication as a sub-task of scanning
