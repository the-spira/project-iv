---
title: 端口与适配器 —— 六边形架构中的边界定义
description: Project IV 的端口与适配器设计，定义数字生命系统与外部世界交互的所有边界接口。
---

## 1. 六边形架构概述

Project IV 采用六边形架构（端口与适配器模式）。核心域（Yuan、第二大脑、化身）完全与外部世界解耦，通过端口定义契约，通过适配器与具体技术交互。

这种架构选择的直接收益：

- **化身多样性**：同一套核心逻辑通过不同适配器运行在浏览器、桌面、CLI 中
- **存储可替换**：第二大脑的存储后端可在 IndexedDB 和 IPFS 之间按化身资源类型切换，核心逻辑不变
- **可测试性**：测试适配器可模拟网络、存储和用户输入，不依赖真实基础设施
- **主权保障**：核心域不直接访问网络或文件系统——所有 I/O 经过端口，受 Harness 边界检查

### 1.1 端口 vs 适配器

- **端口**：核心域定义的接口契约。端口回答“系统需要什么能力”，不关心谁来实现。端口是抽象的、与具体技术无关的
- **适配器**：端口的具体实现。适配器回答“这个能力在特定环境中如何实现”。适配器是具象的、依赖特定技术的

同一个端口可以有多个适配器。例如，`MemoryStoragePort` 在 Tiny 化身中使用 IndexedDB 适配器，在 Server 化身中使用 IPFS 适配器，核心域代码完全不变。

## 2. 端口清单

### 2.1 用户交互端口

| 端口 | 定义于 | 职责 | 主要方法 |
|:---|:---|:---|:---|
| **UserInputPort** | Yuan 核心 | 接收并规范化用户输入 | `receive(text, mode)` → `UserIntent` |
| **UserOutputPort** | Vox | 向用户呈现响应 | `present(response, format)` |
| **NotificationPort** | Vox + 感知系统 | 在恰当时机推送通知 | `notify(level, message, action?)` |

### 2.2 存储端口

| 端口 | 定义于 | 职责 | 主要方法 |
|:---|:---|:---|:---|
| **MemoryStoragePort** | 第二大脑 | 知识块的持久化与检索 | `store(block)`, `query(filter)`, `archive(id)` |
| **StateStoragePort** | Yuan | Yuan 状态的持久化 | `save_state(cid)`, `load_state(cid)` |
| **AuditStoragePort** | Harness | 审计日志的写入与查询 | `append(event)`, `query(timerange)` |

### 2.3 网络端口

| 端口 | 定义于 | 职责 | 主要方法 |
|:---|:---|:---|:---|
| **SovereignNetworkPort** | 主权网络 | 化身间状态同步与消息传递 | `publish(update)`, `subscribe(topic)`, `resolve_ipns(did)` |
| **ExternalAPIPort** | 外交协议 | 调用外部服务 API | `call(service, request)` → `RawResponse` |
| **IPFSStoragePort** | IPFS 存储 | 内容寻址的分布式存储 | `put(data)` → `CID`, `get(cid)` → `data` |

### 2.4 密钥与身份端口

| 端口 | 定义于 | 职责 | 主要方法 |
|:---|:---|:---|:---|
| **IdentityPort** | Yuan | 身份密钥管理与签名 | `sign(payload)`, `verify(signature, payload)`, `derive_did()` |
| **EncryptionPort** | Yuan | 加密与解密操作 | `encrypt(plaintext, key_id)`, `decrypt(ciphertext, key_id)` |

### 2.5 Harness 端口

| 端口 | 定义于 | 职责 | 主要方法 |
|:---|:---|:---|:---|
| **ConstraintCheckPort** | Harness | 硬约束的运行时校验 | `check(task)` → `Allow \| Deny(reason)` |
| **AlignmentPort** | Harness | 评估者脑的对齐评分 | `evaluate(output, principles)` → `Score(1-10) + Critique` |

### 2.6 感知端口

| 端口 | 定义于 | 职责 | 主要方法 |
|:---|:---|:---|:---|
| **SensorPort** | 感知系统 | 从设备采集脱敏的环境数据 | `poll(dimensions[])` → `ContextState` |
| **ContextFusionPort** | 感知系统 | 融合多维传感器数据 | `fuse(states[])` → `FusedContext` |

### 2.7 道器端口

| 端口 | 定义于 | 职责 | 主要方法 |
|:---|:---|:---|:---|
| **DaoKitPort** | 道器生态 | 道器的安装、生命周期与权限管理 | `install(manifest)`, `invoke(kit, method, args)`, `revoke(kit)` |

## 3. 适配器清单

### 3.1 用户交互适配器

| 适配器 | 实现端口 | 适用化身 | 说明 |
|:---|:---|:---|:---|
| **WebUIAdapter** | UserInputPort, UserOutputPort, NotificationPort | 浏览器（Tiny/Main） | 基于 Web Components，渲染在浏览器标签页或扩展弹窗中。支持文本输入、语音转文字（浏览器 Speech API） |
| **CLIAdapter** | UserInputPort, UserOutputPort | 终端（Tiny） | 纯文本交互，支持管道和脚本调用。适用于 Server 化身的远程管理 |
| **MobileAdapter** | UserInputPort, UserOutputPort, NotificationPort | 移动端（Tiny/Main） | 基于 React Native 或原生组件，支持触控手势和移动端通知 |

### 3.2 存储适配器

| 适配器 | 实现端口 | 适用化身 | 说明 |
|:---|:---|:---|:---|
| **IndexedDBAdapter** | MemoryStoragePort, StateStoragePort, AuditStoragePort | 浏览器（Tiny/Main） | 基于浏览器 IndexedDB。支持结构化索引查询，存储上限因浏览器而异（通常 >100MB）。Tiny 化身的默认存储后端 |
| **IPFSAdapter** | MemoryStoragePort, StateStoragePort, IPFSStoragePort | Main/Server | 基于 js-ipfs 或 IPFS 桌面客户端。Main 化身可选，Server 化身默认 |
| **HybridStorageAdapter** | MemoryStoragePort, StateStoragePort | Main | IndexedDB 热缓存 + IPFS 冷存储。最近 30 天数据在本地，旧数据在 IPFS 上按需加载 |

### 3.3 网络适配器

| 适配器 | 实现端口 | 适用化身 | 说明 |
|:---|:---|:---|:---|
| **Libp2pAdapter** | SovereignNetworkPort | Main/Server | 基于 libp2p 的点对点通信，支持 GossipSub 发布订阅和 DHT 发现 |
| **IPFSGatewayAdapter** | IPFSStoragePort, SovereignNetworkPort | Tiny | 通过公共 IPFS 网关（如 ipfs.io、dweb.link）获取内容。仅用于 Tiny 化身无法直接运行 libp2p 时的降级方案 |
| **RelayAdapter** | SovereignNetworkPort | Tiny | 通过用户的 Server/边化身中继主权网络消息。Tiny 化身不直接参与 P2P 网络，消息通过可信中继转发 |
| **HTTPDiplomacyAdapter** | ExternalAPIPort | 所有化身 | 通过标准 HTTPS + OAuth/API Key 调用外部服务。作为外交协议第一层（外交道器）的基础 |

### 3.4 密钥与身份适配器

| 适配器 | 实现端口 | 适用化身 | 说明 |
|:---|:---|:---|:---|
| **WebCryptoAdapter** | EncryptionPort, IdentityPort（签名部分） | 浏览器 | 基于浏览器 Web Crypto API。密钥存储在 IndexedDB，签名操作在浏览器安全上下文中执行 |
| **NativeCryptoAdapter** | EncryptionPort, IdentityPort | 桌面/移动端 | 基于操作系统原生密钥链（macOS Keychain、Windows DPAPI、Linux kernel keyring） |
| **SoftwareCryptoAdapter** | EncryptionPort, IdentityPort | CLI/Server | 纯软件实现（RustCrypto），用于无原生密钥链的环境。密钥文件由用户手动备份 |

### 3.5 Harness 适配器

| 适配器 | 实现端口 | 适用化身 | 说明 |
|:---|:---|:---|:---|
| **WasmConstraintAdapter** | ConstraintCheckPort | 所有化身 | 编译时嵌入 Yuan 的硬约束检查。在 Wasm 沙箱内执行，不依赖外部服务 |
| **EvaluatorBrainAdapter** | AlignmentPort | Main/Server | 评估者脑的模型实例。Main 化身运行蒸馏版（简化评分），Server 化身运行完整版 |

### 3.6 感知适配器

| 适配器 | 实现端口 | 适用化身 | 说明 |
|:---|:---|:---|:---|
| **BrowserSensorAdapter** | SensorPort | 浏览器 | 采集页面可见性、窗口焦点、网络类型、屏幕尺寸。不采集浏览历史或页面内容 |
| **DesktopSensorAdapter** | SensorPort | 桌面 | 采集活跃应用分类、输入频率、电源状态。数据在本地脱敏后上报 |

## 4. 适配器选择逻辑

化身唤醒时根据 ResourceTier 和 DeploymentZone 自动选择适配器组合：

| 化身类型 | 存储 | 网络 | 加密 | 感知 |
|:---|:---|:---|:---|:---|
| Tiny × 端 | IndexedDBAdapter | RelayAdapter + IPFSGatewayAdapter | WebCryptoAdapter | BrowserSensorAdapter（降级模式） |
| Main × 端 | HybridStorageAdapter | Libp2pAdapter | WebCryptoAdapter / NativeCryptoAdapter | BrowserSensorAdapter / DesktopSensorAdapter（完整） |
| Main × 边 | IPFSAdapter + IndexedDBAdapter 缓存 | Libp2pAdapter | NativeCryptoAdapter | DesktopSensorAdapter |
| Server × 边 | IPFSAdapter | Libp2pAdapter | NativeCryptoAdapter | 无（Server 无直接用户交互，无需感知） |
| Server × 云 | IPFSAdapter | Libp2pAdapter | SoftwareCryptoAdapter | 无 |

## 5. 端口与上下文的映射

本文档定义的端口实现了战略设计中各限界上下文的集成契约。各端口与上下文的对应关系已在[上下文映射](../../01-strategic-design/context-map)第 5 节“通信契约”表格中定义。

## 6. 实现优先级

| 阶段 | 适配器 | 理由 |
|:---|:---|:---|
| **Spark MVP** | WebUIAdapter, IndexedDBAdapter, WebCryptoAdapter, BrowserSensorAdapter（简化版） | Spark 是浏览器小程序，仅需 Tiny × 端 的完整链路 |
| **第一幕后期** | HybridStorageAdapter, RelayAdapter, IPFSGatewayAdapter | 支持跨设备数据导出和恢复，验证“存在的连续性”的最小可行路径 |
| **第二幕** | Libp2pAdapter, NativeCryptoAdapter, DesktopSensorAdapter, MobileAdapter | 推出桌面/移动原生化身，多设备无缝同步 |
| **第三幕** | IPFSAdapter (Server), EvaluatorBrainAdapter (完整版) | 上线 Server 化身，完整四脑议会，L2 联邦训练 |
| **第四幕** | 全部适配器 | 开源生态，社区贡献额外适配器 |
