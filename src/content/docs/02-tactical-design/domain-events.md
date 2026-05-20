---
title: 领域事件目录
description: Project IV 中所有领域事件的完整目录，按限界上下文分组，包含事件定义、触发条件与携带数据。
---

## 1. 定位

领域事件是 Project IV 中各限界上下文之间异步通信的核心契约。每个事件代表数字生命在其存在过程中发生的一个有意义的瞬间。

本文档是事件定义的权威来源。事件是存在链和审计日志的原始数据来源。

## 2. 核心域事件

### 2.1 Yuan 上下文

| 事件 | 触发条件 | 携带数据 |
|:---|:---|:---|
| `YuanCreated` | 用户首次创建数字灵魂 | `identity_key_hash`, `initial_logic_cid`, `initial_state_cid`, `created_at` |
| `YuanLoaded` | 化身成功加载 Yuan 实例 | `avatar_id`, `logic_version`, `state_version`, `loaded_at` |
| `LogicUpgraded` | 逻辑 CID 变更为新版本 | `previous_logic_cid`, `new_logic_cid`, `new_version`, `upgrade_reason`（手动升级 / 自动安全补丁）, `upgraded_at` |
| `StateUpdated` | 交互导致状态 CID 变更 | `previous_state_cid`, `new_state_cid`, `cause`（对话 / 任务执行 / 原则变更）, `avatar_id` |
| `ManifestRotated` | 元清单中的 CID 引用被更新 | `new_manifest_cid`, `changed_field`（logic / state / both） |
| `ConstraintViolationDetected` | Yuan 操作触发硬约束 | `constraint_id`, `blocked_operation`, `context`（触发时的调用链摘要） |

### 2.2 第二大脑上下文

| 事件 | 触发条件 | 携带数据 |
|:---|:---|:---|
| `KnowledgeBlockCreated` | 首次记录某条知识 | `block_id`, `para_category`, `tags`, `source_origin`, `initial_content_hash` |
| `KnowledgeBlockUpdated` | 知识块新增版本 | `block_id`, `old_version`, `new_version`, `change_summary`（可选，由 Vox 自动生成摘要） |
| `KnowledgeBlockArchived` | 知识块从活跃分类移至归档 | `block_id`, `from_category`, `archived_at` |
| `PrincipleAdded` | 用户向原则中心格添加新原则 | `principle_id`, `content_hash`, `added_at` |
| `PrincipleModified` | 用户修改已有原则 | `principle_id`, `old_content_hash`, `new_content_hash`, `modified_at` |
| `PrincipleRemoved` | 用户从原则中心格移除原则 | `principle_id`, `removed_at`, `removal_reason`（可选） |
| `DuplicateDetected` | 熵管理代理发现重复知识块 | `block_id_a`, `block_id_b`, `similarity_score`, `detected_at` |
| `EntropyScanCompleted` | 熵管理代理完成一次周期扫描 | `scan_type`（增量 / 全量）, `issues_found`, `issues_by_severity`, `completed_at` |

### 2.3 化身上下文

| 事件 | 触发条件 | 携带数据 |
|:---|:---|:---|
| `AvatarRegistered` | 新化身首次注册 | `avatar_id`, `device_fingerprint_hash`, `resource_tier`, `deployment_zone`, `registered_at` |
| `AvatarWoken` | 化身成功唤醒并加载 Yuan | `avatar_id`, `wake_duration_ms`, `logic_cache_hit`, `state_cache_hit` |
| `AvatarSleeping` | 化身主动休眠 | `avatar_id`, `sleep_reason`（用户主动 / 超时 / 资源不足）, `session_duration` |
| `AvatarDegraded` | 化身因资源变化降级 | `avatar_id`, `from_tier`, `to_tier`, `trigger_reason` |
| `AvatarUpgraded` | 化身因资源恢复升级 | `avatar_id`, `from_tier`, `to_tier`, `trigger_reason` |
| `AvatarRevoked` | 用户主动撤销化身权限 | `avatar_id`, `revoked_at` |
| `WakeAttemptFailed` | 唤醒失败 | `avatar_id`, `failure_reason`（签名无效 / 网络不可达 / 资源不足 / 版本不兼容）, `attempted_at` |

### 2.4 主权网络上下文

| 事件 | 触发条件 | 携带数据 |
|:---|:---|:---|
| `MessagePublished` | 化身向主权网络发布消息 | `message_id`, `message_type`（状态更新 / 融合请求 / 唤醒通知）, `sender_avatar_id`, `payload_cid` |
| `MessageReceived` | 化身从主权网络接收消息 | `message_id`, `message_type`, `receiver_avatar_id`, `latency_ms` |
| `ConflictDetected` | 协调式融合发现 L3 语义冲突 | `conflict_id`, `block_id`, `conflicting_versions`（含来源化身和时间）, `detected_at` |
| `ConflictResolved` | 用户裁决解决冲突 | `conflict_id`, `resolution`（保留 A / 保留 B / 合并 / 分别保留）, `resolved_at` |
| `ExistenceChainExtended` | 存在链新增一个状态节点 | `previous_state_cid`, `new_state_cid`, `linked_at` |

## 3. 支撑域事件

### 3.1 Vox 上下文

| 事件 | 触发条件 | 携带数据 |
|:---|:---|:---|
| `StageAdvanced` | Vox 从一个阶段进入下一阶段 | `from_stage`, `to_stage`, `advance_reason`（指标达标 / 用户手动提升）, `advanced_at` |
| `StageRegressed` | Vox 因指标回落而降级 | `from_stage`, `to_stage`, `regression_reason` |
| `ParliamentConvened` | 多元思维议会开始对某议题的辩论 | `session_id`, `topic_hash`, `active_brains`（四脑 / 双脑）, `convened_at` |
| `BrainOpinionGenerated` | 单个脑生成观点 | `session_id`, `brain_type`, `opinion_cid`, `key_arguments_summary` |
| `ParliamentSummaryDelivered` | 议长完成中立总结 | `session_id`, `summary_cid`, `consensus_areas`, `core_divergences`, `missing_information` |
| `UserVerdictGiven` | 用户对议会选项做出裁决 | `session_id`, `chosen_path`, `verdict_rationale`（可选，用户注解）, `verdict_at` |
| `IntentRouted` | L0 将用户意图路由到目标层 | `intent_id`, `routed_to`（L1 / L2 / L3）, `routing_reason`, `routed_at` |

### 3.2 Harness 上下文

| 事件 | 触发条件 | 携带数据 |
|:---|:---|:---|
| `AlignmentCheckPerformed` | 评估者脑完成一次对齐评分 | `session_id`, `score`（1-10）, `critique_summary`, `information_gaps`, `checked_at` |
| `ReflectionLoopTriggered` | 评分 < 7 触发反思修订 | `session_id`, `round`（1/2）, `critique_feedback`, `triggered_at` |
| `ReflectionLoopExhausted` | 2 轮反思后仍未达阈值 | `session_id`, `final_score`, `unresolved_issues`, `escalated_to_user` |
| `HardConstraintTriggered` | 硬约束拦截了一次操作 | `constraint_id`, `operation_blocked`, `context` |
| `HarnessDegraded` | Harness 层进入降级模式 | `level`（1/2/3）, `trigger_reason`, `degraded_at` |
| `HarnessRestored` | Harness 层从降级恢复 | `from_level`, `restored_at` |

### 3.3 感知上下文

| 事件 | 触发条件 | 携带数据 |
|:---|:---|:---|
| `ContextStateFused` | 感知融合模块输出新的上下文状态 | `fused_state`（时间 / 注意力 / 环境 / 任务标签）, `confidence`, `fused_at` |
| `ContextShiftDetected` | 上下文状态发生显著变化 | `from_state`, `to_state`, `shift_trigger` |
| `UserCorrectedContext` | 用户手动纠正了系统的状态判断 | `original_state`, `corrected_state`, `corrected_at` |
| `VoxInterventionOffered` | Vox 基于感知决定主动介入 | `intervention_type`, `context_state`, `offered_at` |

## 4. 通用域事件

### 4.1 道器上下文

| 事件 | 触发条件 | 携带数据 |
|:---|:---|:---|
| `DaoKitInstalled` | 用户批准安装一个道器 | `kit_id`, `manifest_cid`, `granted_permissions`, `installed_at` |
| `DaoKitInvoked` | 道器被调用执行操作 | `kit_id`, `method`, `invocation_id`, `invoked_at` |
| `DaoKitPermissionRevoked` | 用户撤销道器的某项权限 | `kit_id`, `permission_revoked`, `revoked_at` |
| `DaoKitUpdated` | 道器清单版本更新 | `kit_id`, `old_manifest_cid`, `new_manifest_cid`, `new_permissions`（如有新增权限，需用户重新授权） |
| `DaoKitUninstalled` | 用户卸载道器 | `kit_id`, `uninstalled_at` |
| `DaoKitCurated` | 社区成员将道器加入策展列表 | `kit_id`, `curator_did`, `list_id`, `curated_at` |

### 4.2 外交通信上下文

| 事件 | 触发条件 | 携带数据 |
|:---|:---|:---|
| `DiplomaticRequestSent` | 外交道器向外部服务发起请求 | `kit_id`, `service_name`, `request_type`, `data_size_bytes`, `sent_at` |
| `DiplomaticDataReceived` | 外部数据流入通用 API 适配器 | `kit_id`, `service_name`, `raw_size_bytes`, `filtered_size_bytes`, `received_at` |
| `DiplomaticDataCleaned` | 通用 API 适配器完成净化 | `filter_actions`（移除的追踪器、摘要处理）, `cleaned_at` |
| `DiplomaticDataApproved` | Vox 批准净化后数据流入第二大脑 | `knowledge_block_ids`（生成的知识块 ID 列表）, `approved_at` |
| `DiplomaticDataRejected` | Vox 拒绝某批流入数据 | `rejection_reason`, `rejected_at` |
| `DiplomaticAuditLogged` | 外交行为记入审计日志 | `event_type`, `service_name`, `timestamp` |

## 5. 事件使用约定

### 5.1 事件命名

所有事件使用 `PastTenseVerb` + `Noun` 格式，以过去式动词开头（如 `YuanCreated`、`KnowledgeBlockUpdated`）。事件名自解释——仅从名称即可理解发生了什么。

### 5.2 事件携带数据的最小性

每个事件携带足以重建上下文的最少数据。事件不是日志——事件携带的是“发生了什么”的关键信息，而“为什么发生”的详细上下文由审计日志补充。具体规则：

- **必须包含**：事件主体的唯一标识、事件发生的时间戳、触发事件的因果关系（如 `cause`、`trigger_reason` 字段）
- **不包含**：完整的内容负载（通过 CID 引用）、个人身份信息、可直接识别的用户数据

### 5.3 事件的不可变性

事件一经生成，不可修改。事件的 ID 由其内容哈希派生。如果同一个业务事实需要修正（如用户纠正了感知系统的误判），生成新事件（`UserCorrectedContext`），而非修改旧事件。

### 5.4 事件的订阅

各限界上下文通过主权网络的事件总线订阅其关注的事件类型：

| 订阅者 | 订阅的事件 |
|:---|:---|
| Harness 层 | 所有 `*Constraint*`、`Alignment*`、`Reflection*` 事件 |
| 审计日志 | 所有事件（全量记录） |
| 感知系统 | `ContextShiftDetected`、`UserCorrectedContext` |
| 熵管理代理 | `KnowledgeBlock*`、`Principle*` |
| Vox | `ContextStateFused`、`ConflictDetected`、`UserVerdictGiven` |
| 道器管理器 | `DaoKit*` |

### 5.5 事件与存在链的关系

核心域中 Yuan 和主权网络的 `*Created`、`*Updated`、`*Extended` 事件，是存在链的数据来源。存在链本身不是事件，而是这些事件的**物化视图**——一条由 `state_cid` 变更事件串联起来的单向链表。
