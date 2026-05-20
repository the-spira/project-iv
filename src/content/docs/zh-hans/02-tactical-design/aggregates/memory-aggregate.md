---
title: 记忆聚合 —— 知识块的版本化与去重
description: 第二大脑中记忆聚合的设计，包括知识块结构、版本化策略、加密存储格式与去重机制。
---

## 1. 聚合概览

记忆聚合是第二大脑的核心聚合，代表用户在数字生命中积累的所有结构化记忆。它不只是文本的堆砌，而是有版本、可追溯、加密存储的知识资产集合。

### 聚合根

**MemoryVault**（记忆库）

### 内部实体

- **KnowledgeBlock**（知识块）：一个独立的知识单元
- **BlockVersion**（块版本）：知识块的版本链中的一环
- **KnowledgeIndex**（知识索引）：跨 PARA 分类的全文索引
- **AuditTrail**（审计追踪）：记录本聚合内所有变更的日志

### 值对象

- **BlockID**：知识块的唯一标识符
- **ContentHash**：加密后内容的哈希，用于去重和完整性验证
- **PARACategory**：项目/领域/资源/归档 分类标记
- **PrincipleEntry**：原则中心格中的单条原则

### 领域事件

- `KnowledgeBlockCreated`：首次记录某条知识
- `KnowledgeBlockUpdated`：知识块新增版本
- `KnowledgeBlockArchived`：知识块移至归档
- `PrincipleAdded` / `PrincipleModified` / `PrincipleRemoved`：原则中心格变更
- `DuplicateDetected`：去重代理发现重复知识块
- `EntropyScanCompleted`：熵管理代理完成一次扫描

## 2. 知识块结构

每个知识块是一个版本化的实体，由以下字段组成：

<div class="code-block">

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

</div>

**字段约束**：

- `block_id` 全局唯一，生成时使用随机 ID + 创建时间戳哈希
- `versions` 数组至少包含 1 个版本；最新版本索引为 `current_version - 1`
- 所有版本的 `content_cid` 指向 IPFS 上的加密内容，加密密钥 ID 引用 Yuan 管理的密钥
- 当版本数超过保留上限（默认 50 个版本），旧版本移入 `pruned_versions`，仅保留元数据（版本号 + 哈希 + 时间），内容 CID 可被垃圾回收
- `source.origin` 使用 `diplomacy://` 前缀标注外部来源，`internal://` 标注用户直接输入

## 3. 版本化策略

记忆聚合采用**追加式版本控制**（Append-only versioning）。知识块一经创建，不可原地修改——每次修改创建新版本，旧版本保留。

### 版本创建规则

| 变更类型 | 是否创建新版本 | 说明 |
|:---|:---|:---|
| 用户编辑知识块内容 | 是 | 创建新版本，旧版本完整保留 |
| Vox 基于对话提炼知识 | 是 | 来源标注为 `vox_session_xxx` |
| 仅更新标签或分类 | 是 | 内容不变，元数据变更也创建新版本（轻量版本，仅记录字段差异） |
| 用户显式合并两个知识块 | 是（3 个新版本） | 两个源知识块各追加一个“已合并至 kb_xxx”版本，目标块追加合并后内容版本 |
| 自动去重标记 | 否 | 仅更新 `DuplicateDetected` 事件，不修改知识块本身 |

### 版本保留策略

- **活跃知识块**（项目/领域/资源）：最近 50 个版本全保留
- **归档知识块**：保留最近 5 个版本
- **被用户显式删除的知识块**：保留最后 1 个版本 + 删除标记 30 天，之后彻底清除（硬删除需用户二次确认）

此策略平衡了“完整记录”的哲学承诺与存储成本。50 个版本的阈值基于实际估算：以用户每天更新一次同一知识块计，50 个版本覆盖近两个月的编辑历史，足以追溯任何有意义的变更。

## 4. 去重机制

去重由熵管理代理在每周增量扫描中执行。

### 去重判断标准

两个知识块被判定为“高度相似”需同时满足：

1. `content_hash` 的相似度 > 90%（通过局部敏感哈希 LSH 快速预筛）
2. `para_category` 相同
3. 标签交集 ≥ 50%

### 去重流程

1. 熵管理代理生成候选重复对列表，附相似度评分
2. 候选列表写入健康报告，标记为“信息”级别
3. 用户查看候选对，可选择：合并、保留两者（显式标记为非重复）、忽略本次（下次扫描再次出现）、不再提示此对
4. 用户选择合并时，执行知识块合并流程：源块各追加“已合并”版本，目标块创建合并后新版本

注意：去重代理不自动合并——硬约束“绝不直接删除第二大脑中的任何数据”在此适用。即使用户选择了合并，源知识块仍然保留其完整版本历史，仅在最新版本上标记合并去向。

## 5. 加密存储格式

所有知识块的内容在写入 IPFS 前进行端到端加密。加密在化身端侧执行，私钥由 Yuan 管理。

<div class="code-block">

```
加密后的知识块内容（存储在 IPFS 上）:

{
  "encrypted": true,
  "scheme": "aes-256-gcm",
  "key_id": "key_7",
  "nonce": "base64:...",
  "ciphertext": "base64:...",
  "auth_tag": "base64:..."
}
```

</div>

**密钥管理**：

- 每个用户的第二大脑使用一组独立的 AES-256 密钥，密钥本身由 Yuan 的 IdentityKey 加密
- 密钥轮换：用户可主动触发密钥轮换（重新加密所有内容），或在新设备首次授权时自动轮换
- 密钥不离开端侧。即使 Server 化身执行存储操作，加密在端侧完成后再上传——Server 化身仅看到密文

## 6. 不变量

| 不变量 | 说明 |
|:---|:---|
| **版本不可变** | 已创建的版本不可修改。任何内容变更必须创建新版本 |
| **删除需确认** | 任何知识块或版本的删除操作必须经过用户显式确认（硬约束） |
| **加密完整性** | 任何写入 IPFS 的知识块内容必须经过加密。明文内容不离开端侧 |
| **索引一致性** | KnowledgeIndex 必须在每次知识块创建、更新或归档后同步更新。索引重建时可通过遍历所有知识块的元数据恢复 |
| **去重不自动执行** | 去重合并必须由用户确认，不可自动执行 |

## 7. 与第二大脑战略设计的映射

本聚合设计实现了[第二大脑战略设计文档](../../01-strategic-design/core-domain/second-brain/para-model)中定义的 PARA 结构、原则中心格和效率飞轮。具体映射：

- **PARA 分类**：通过 `para_category` 字段实现，支持项目/领域/资源/归档四分类
- **原则中心格**：作为独立的 `PrincipleEntry` 实体存储，不在知识块中，确保原则不会被误归档或去重合并
- **效率飞轮**：`KnowledgeBlockCreated` 事件的 `source` 字段区分用户直接输入和 Vox 自动萃取，支持飞轮的“执行→沉淀→反哺”追踪
- **熵管理代理**：`EntropyScanCompleted` 事件触发健康报告生成，去重是扫描的子任务
