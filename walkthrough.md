# Walkthrough · AI 交接笔记

> 遵循 AGENTS.md "Developer Candle Ritual" 的 Departure Check 部分。当 AI 会话结束、session 轮换、或任务收尾时，由当前 AI 更新本文件，确保下一个 AI（或 Doin 自己）能无缝接力。
>
> 本文件与 `conversation-log.md`（对话纪要，关注"聊了什么"）和 `open-questions.md`（开放问题清单，关注"还没想清楚什么"）分离。本文件关注"AI 工作流本身的交接"。

---

## 2026-06-13 · Mavis · 第一次交接

### 本次会话做了什么

- 完整阅读了 `docs/src/content/docs/` 下全部 27 个英文 markdown 文件（含 6 份 ADR），建立了对 Project IV 的全景认知：
  - 三位一体架构（Yuan / Brain / Avatar）
  - L0-L3 分层智能
  - Harness 多视角议会 + 生成-评估双循环
  - 感知系统、四种网络协议、外交协议、DaoKit 生态
  - 合规与生存双轨制
  - ADHD-First 设计原则
  - 开发者烛火仪式
- 创建了三个工作流文件：
  - `docs/conversation-log.md` — 对话纪要
  - `docs/open-questions.md` — 待决问题清单（含 10 个初始问题）
  - `docs/walkthrough.md`（本文件）— AI 交接笔记

### 仓库状态变更

```
新增：
  docs/conversation-log.md
  docs/open-questions.md
  docs/walkthrough.md

未修改：
  docs/src/content/docs/** （所有 Starlight 文档、ADRs、源码均未动）
  docs/AGENTS.md
  docs/CLAUDE.md
  docs/GEMINI.md
  docs/.cursorrules
  docs/astro.config.mjs
  docs/package.json
```

### 当前 git 状态

工作区干净，无未提交改动。

### 给下一个 AI 的提醒

1. **不要重复读全部 docs/**——本次会话已经把全部 27 篇读完了，关键决策都已落入 open-questions.md 和 conversation-log.md。下次进来先读这三个文件，再决定要不要回查具体设计文档。
2. **Doin 对"仪式感太重的协作协议"会警觉**。AGENTS.md 里的烛火仪式是宣言，**不要把它当执行流程**。
3. **Doin 自述身份**：EFF 订阅者、热爱开源、ADHD 诊断、Nim 中文社区创办者、88 骇客网出身。背景画像已写入 `/Users/weili/.mavis/memory/user.md`。
4. **核心待决问题**：Q01（Spark 的具体形态）和 Q03（Nim 中文社区经验教训）是最重要的两个。下次对话可以优先推进。
5. **不要劝 Doin 去写更多 ADRs 或更多设计文档**。Doin 自己说过不要再聊工程，要聊背后的内容。继续往文档站里堆东西是反方向。
6. **Doin 的节奏**：凌晨仍在工作（本次对话跨越 0:30-1:30+）；能接受直白反馈但不喜欢被流程束缚。

### 自动化测试 / 验证

无。本次会话未触碰任何代码或文档站构建产物。

### 已知遗留事项

- **三个新文件未提交**——Doin 没要求 commit。本次会话结束后要不要 commit 由 Doin 决定。
- **三个新文件未进入 sidebar**——它们不属于 Starlight 文档站的内容（不是 `src/content/docs/` 下），所以 sidebar 不需要更新。
- **memory/user.md 已写入 Doin 的画像**——Mavis 下次会话会自动读到。

---

<!-- 模板供未来 AI 接力 -->

## YYYY-MM-DD · [Agent Name] · 第 N 次交接

### 本次会话做了什么
- ...

### 仓库状态变更
```
新增：
  ...
修改：
  ...
删除：
  ...
```

### 当前 git 状态
...

### 给下一个 AI 的提醒
- ...

### 自动化测试 / 验证
- ...

### 已知遗留事项
- ...

---

## 2026-06-16 · Zoo · 第二次交接

### 本次会话做了什么

- 同步了 OKF（Open Knowledge Format）规范相关的 Schema 增强到简体中文翻译：
  - **Meta Manifest**（`zh-hans/yuan-aggregate.md`）：`schema_version` 升级至 `"1.0.0"`，新增 `title/description/license/language` 字段，`checksum` 改为结构化对象
  - **Dao-Kit Manifest**（`zh-hans/dao-kit/index.md`）：新增 `license/language` 字段，权限 scope 改为 URI 化命名空间（`spira:permission:*` / `spira:capability:*`）
- 更新了工作流文件（本文件 + `conversation-log.md`）

### 仓库状态变更
```
修改：
  docs/src/content/docs/zh-hans/02-tactical-design/aggregates/yuan-aggregate.md
  docs/src/content/docs/zh-hans/01-strategic-design/generic-domain/dao-kit/index.md
  docs/walkthrough.md
  docs/conversation-log.md
```

### 当前 git 状态
工作区有未提交改动（上述 4 个文件）。

### 给下一个 AI 的提醒
- 本次改动涉及英文源文件（`yuan-aggregate.md` 和 `dao-kit/index.md`）与中文翻译的一致性同步。如果未来再次修改英文源，记得同步更新 zh-hans 翻译。
- OKF（Open Knowledge Format）相关的 Schema 增强是结构性的——`license`、`language`、URI 化权限 scope 将成为后续所有 Manifest 的标配。

### 自动化测试 / 验证
无。未改动构建配置或代码。

### 已知遗留事项
- 本次未提交改动。是否需要 commit 由 Doin 决定。