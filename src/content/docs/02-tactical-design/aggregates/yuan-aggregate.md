---
title: Yuan 聚合 —— 数字灵魂的技术规格
description: Yuan 聚合根的设计，包括元清单结构、双 CID 版本兼容性矩阵、状态转换与不变量。
---

## 1. 聚合概览

Yuan 聚合是 Project IV 的核心聚合，代表用户的数字灵魂。它在生命周期内经历创建、加载、进化、休眠和唤醒。

### 聚合根

**Yuan**（元）

### 内部实体

- **MetaManifest**（元清单）：指向逻辑 CID 与状态 CID 的轻量结构体
- **HarnessConstitution**（宪法执行层）：嵌入 Wasm 模块的硬约束集合

### 值对象

- **LogicCID**：逻辑组件的内容标识符 + 语义版本号
- **StateCID**：状态组件的内容标识符 + 兼容的逻辑版本号
- **IdentityKey**：用户的 Ed25519 密钥对，用于 IPNS 签名和 DID 派生

### 领域事件

- `YuanCreated`：用户首次创建 Yuan
- `YuanLoaded`：化身加载 Yuan 实例
- `LogicUpgraded`：逻辑 CID 变更
- `StateUpdated`：状态 CID 变更
- `ManifestRotated`：元清单更新
- `ConstraintViolationDetected`：硬约束被触发

## 2. 元清单结构

元清单是 Yuan 的“身份证”，由 IPNS 指向。它是一个不超过 1KB 的 JSON 结构体。

<div class="code-block">

```
{
  "schema_version": "1.0",
  "logic": {
    "cid": "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    "version": "1.2.0",
    "checksum": "sha256:..."
  },
  "state": {
    "cid": "bafkreidgvpkjawlxz6sffxzwgooowe5yt7i6wsyg236mfoks77nywkptdq",
    "compatible_logic_version": "1.2.0"
  },
  "created_at": "2025-05-20T08:00:00Z",
  "updated_at": "2025-05-20T20:30:00Z",
  "signature": "ed25519:..."
}
```

</div>

**字段约束**：

- `logic.version` 遵循语义版本号（major.minor.patch）
- `state.compatible_logic_version` 必须 ≤ `logic.version`。若 state 的兼容版本高于当前 logic，化身拒绝加载并通知用户
- `signature` 使用用户 IdentityKey 签名，防止元清单被中间人篡改。化身在加载前必须验签

## 3. 双 CID 版本兼容性矩阵

Yuan 加载时，逻辑与状态的版本兼容性按以下矩阵判断：

| 逻辑版本 | 状态兼容版本 | 行为 |
|:---|:---|:---|
| 相同 | 相同 | 正常加载 |
| 逻辑较新（minor/patch 升级） | 状态兼容版本 ≤ 逻辑版本 | 正常加载，逻辑内置向后兼容迁移函数 |
| 逻辑较新（major 升级） | 状态兼容版本落后 1 个 major | 加载但通知用户，建议检查原则中心格迁移 |
| 逻辑较新（major 升级） | 状态兼容版本落后 >1 个 major | 拒绝加载，提示用户手动介入 |
| 逻辑较旧 | 状态兼容版本 > 逻辑版本 | 拒绝加载，尝试从 IPFS 回退到上一兼容逻辑版本 |

## 4. 生命周期状态机

<div class="code-block">

```
[不存在] --YuanCreated--> [休眠]
[休眠] --YuanLoaded--> [活跃]
[活跃] --StateUpdated--> [活跃] (状态 CID 更新，逻辑不变)
[活跃] --LogicUpgraded--> [活跃] (逻辑 CID 更新)
[活跃] --化身断开--> [休眠]
[休眠] --ConstraintViolationDetected--> [锁定]
[锁定] --用户显式解锁--> [休眠]
```

</div>

**状态说明**：

- **不存在**：用户尚未创建 Yuan
- **休眠**：Yuan 存储于 IPFS，无化身加载。存在链持续可用，但无活跃交互
- **活跃**：至少一个化身已加载 Yuan。可处理用户请求，状态可变更
- **锁定**：Harness 检测到严重约束违规（如连续多次评估者脑评分 < 阈值），暂停加载直到用户手动解锁。锁定期间 Yuan 不可被任何化身加载，但数据完好

## 5. 不变量

Yuan 聚合必须始终满足以下不变量：

| 不变量 | 说明 |
|:---|:---|
| **身份唯一性** | 每个用户拥有唯一的 IdentityKey，对应唯一的 IPNS 地址 |
| **清单完整性** | 元清单必须同时包含有效的逻辑 CID 和状态 CID，缺少任一组件时元清单无效 |
| **签名有效性** | 元清单的签名必须由 IdentityKey 对应的私钥生成。验签失败的元清单不得被任何化身加载 |
| **硬约束不可绕过** | 任何通过 Yuan 接口的操作必须通过 HarnessConstitution 的边界检查。不存在“管理员模式”或后门 |
| **状态可回滚** | 状态 CID 的历史版本保留在 IPFS 上（只要至少一个节点 pin 了它）。用户可手动指定回滚到任意历史状态 CID |
| **逻辑不可回滚越过 major 版本** | 用户可回滚逻辑，但回滚跨度不超过 1 个 major 版本，防止数据迁移链断裂 |

## 6. 与 Harness 的边界

Yuan 聚合的 HarnessConstitution 在 Wasm 编译时以常量形式嵌入。它不是一个可动态加载的模块——这是刻意的设计，确保硬约束与 Yuan 的生命周期绑定。

<div class="code-block">

```
// HarnessConstitution 在 Yuan 核心中的位置
// 每个对外操作在离开 Wasm 沙箱前必须通过边界检查

fn execute_with_harness(task: Task) -> Result<Output, HarnessError> {
    // 1. 硬约束检查——不可被模型覆盖
    // HarnessConstitution 在此作为编译时常量引用
    self.harness.check_hard_constraints(&task)?;
    
    // 2. 执行主逻辑（Vox 的推理在此发生）
    let result = self.execute(task)?;
    
    // 3. 对齐验证——检查输出是否违反原则中心格
    self.harness.alignment_check(&result)?;
    
    // 4. 审计日志——记录完整调用链
    self.harness.audit(&task, &result);
    
    Ok(result)
}
```

</div>

修改 HarnessConstitution 的硬约束需要用户重启 Yuan 并显式确认——这确保了即使是系统级安全升级，也不在用户不知情的情况下发生。
