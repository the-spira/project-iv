# Open Questions · 待决问题清单

> 把对话中冒出来的、还没想清楚的、需要在未来某次对话里继续深挖的问题显式列出。
> 状态约定：`未启动`（还没开始想）/ `讨论中`（已有部分想法但未定论）/ `已收敛`（有明确方向，待写进 ADR 或设计文档）/ `暂搁`（优先级低，先放着）。
>
> 这不是 todo 列表——todo 是"我要做的事"，这里是"还没想清楚的问题"。

---

## Q01 · Spark 的具体形态是什么？

- **来源**：ADR 003 + narrative-strategy.md 的 Act I 都提到 Spark 是"principle-driven daily reflection companion"。但读完全部 docs 后，Spark **还没有可验证的形状**——是 CLI？浏览器扩展？Raycast 替代品？Obsidian 插件？iOS app？
- **影响范围**：Act I 的成功标准（用户连续 7 天使用 + 3 次有意义的反思对话）依赖 Spark 的具体形态选对了。
- **我的初步倾向**（非定论）：Raycast / Alfred / Obsidian 这条赛道——用户对"主权"敏感，工程量小（一个 Electron / Tauri 壳子 + 几个核心 command），能直接验证"用户愿不愿意为'主权数字助手'付钱"这个核心假设。
- **状态**：未启动。Doin 没表态。
- **重要性**：⭐⭐⭐⭐⭐（这是整个项目的"第一道裂缝"——如果第一道裂缝不对，后面所有抽象都是空中楼阁）

---

## Q02 · AGENTS.md 的烛火仪式和实际工作流脱节，怎么办？

- **来源**：AGENTS.md 规定了非常隆重的三步仪式（Access Check → Planning Mode → Departure Check），但 Doin 本人在对话中表现出对"仪式感太重"的警觉（"算了不聊 skill 和 Agent 了"）。
- **观察**：仪式越隆重，越难被执行。复杂任务时跳过、简单任务时是累赘。
- **冲突**：(a) 烛火仪式作为"宣言型项目的本体论一致性"是有价值的；(b) 但执行成本太高。
- **可能解法**：
  - 方案 A：保留 AGENTS.md 作为宣言，但在实操中降级——Mavis 每次只读 walkthrough + open-questions（不读全 GEMINI），写一份轻量 departure 笔记。
  - 方案 B：分层——复杂任务走完整仪式，简单任务只走轻量版。
  - 方案 C：保持现状，接受仪式被频繁跳过。
- **状态**：讨论中。
- **重要性**：⭐⭐⭐（不解决会慢性消耗执行意志）

---

## Q03 · Nim 中文社区和这次有什么可借鉴的？

- **来源**：Doin 自述曾创办 Nim 中文社区。那个社区现在的状态没有讲。
- **背景**：宣言型项目最大的威胁不是"代码写不完"，是"一个人在写"。如果 Nim 中文社区后来没维持住，对 Project IV 是个参照。
- **可以问的事**：
  - 社区最活跃的时候是什么样子？
  - 后来是怎么没维持住的？是因为 Doin 精力转移，还是需求本身不成立？
  - 如果重来一次，会怎么做？
- **状态**：未启动。
- **重要性**：⭐⭐⭐⭐（burnout 风险是宣言型项目的最大风险）

---

## Q04 · "寂静锻造"还要多久？怎么判断"该出山了"？

- **来源**：narrative-strategy.md 提到 Act I 的成功标准（7 天连续使用 + 3 次有意义反思对话），但没有时间表。
- **关键判断**：宣言型项目可以"在沉默中锻造"，但**沉默是有期限的**——超过某个临界点，"用户教育成本"会指数增长。
- **可量化的退出条件**：
  - Doin 自己连续 30 天使用 Spark，每天都做了 ritual（这是开发自检）
  - Spark 有 ≥ 10 个非亲非故的真实用户完成 7 天连续使用
  - 有 ≥ 3 份"非功能性"反馈（用户主动说"这个原理引导让我有了新洞察"）
- **状态**：未启动。
- **重要性**：⭐⭐⭐⭐

---

## Q05 · L0 层应该用什么实现？

- **来源**：vox-consensus.md 提到 L0 是"极轻量的、专门的 fine-tuned 小语言模型或确定性状态机"。ADR 001 提到 Tiny Avatar 上 L0 要 < 500KB、唤醒 < 3s。
- **关键决策**：L0 是 Spark MVP 就要面对的第一个工程选型。
- **候选**：
  - 方案 A：确定性状态机（无 ML）—— 简单、可预测，但只能处理结构化指令
  - 方案 B：量化到极小（< 100MB）的小型 SLM（Qwen 0.5B / Phi-3 mini / Gemma 2B）—— 灵活但启动慢
  - 方案 C：纯 Rust 实现的 NLU 框架（rule-based + 简单的 ML 分类器）—— 折中
- **状态**：未启动。
- **重要性**：⭐⭐⭐（决定 Spark 能不能在 Tiny Avatar 上跑起来）

---

## Q06 · Harness 的 hard constraint 用 Rust 类型系统怎么表达？

- **来源**：ADR 001 提到 "Rust's type system can express hard constraints as compile-time checks rather than runtime assertions — this reduces the runtime attack surface"。这是个漂亮的想法，但具体怎么实现没说。
- **关键问题**：type-state pattern + 不可变 borrow checker 能表达多少？哪些必须留作 runtime check？
- **候选范例**：
  - "Never directly delete any data in the Second Brain without explicit user confirmation" —— 这能用 type-state 表达吗？需要什么 phantom type？
  - "Never send raw Second Brain data to external services not authorized by user" —— 标签 trait + sealed trait pattern？
- **状态**：未启动。
- **重要性**：⭐⭐（属于工程实现层，等 codebase 真正开始写 Yuan 时再展开）

---

## Q07 · Diemcy Layer 的"用户授权"是声明式还是交互式？

- **来源**：diplomacy.md 描述了三层过滤（Diplomatic DaoKit → Universal API Adapter → Vox）。但"Vox 评估外部请求的必要性"具体怎么实现没细说。
- **核心问题**：声明式权限（DaoKit manifest 里写明白 "要调用 X 服务、读 Y 范围"，用户一次性授权）vs 运行时询问（每次外部调用都问用户一次），这两者的边界在哪里？
- **ADR 006 暗示**：倾向声明式 + 默认 L0 路由。但"声明式"的颗粒度是个开放问题。
- **状态**：未启动。
- **重要性**：⭐⭐⭐

---

## Q08 · BYOK token 成本可持续性的"长期机制"什么时候启动？

- **来源**：ADR 006 画了三级经济模型（Throttling / Hedging / Investment），其中 Hedging 的 Vox Broker、Second Brain Micro-Franchise 都是 P2 长期优先级。
- **现实风险**：L0 成本路由能让"日常 AI 对话不烧钱"，但用户一旦做深度创作/复杂推理，token 还是会烧。这个 gap 必须有解。
- **关键问题**：什么时候开始考虑商业合作（外部 AI 训练平台、行业研究社区）？MVP 阶段就开始谈，还是 Act II 用户稳定后再谈？
- **状态**：未启动。
- **重要性**：⭐⭐⭐⭐（决定 Spark 用户的留存）

---

## Q09 · 多 Avatar 离线冲突解决的真实场景频率

- **来源**：sovereign-network.md 设计了三级冲突处理（auto / annotated / user adjudication）。但**这个机制在真实使用中多久触发一次？**
- **如果太频繁**：用户会被 conflict resolution 弹窗淹没，体验崩溃
- **如果从不触发**：可能根本不需要做这么复杂的机制
- **关键问题**：要不要在 Spark MVP 阶段就埋点"触发频率"的数据采集？还是 Act II 多 Avatar 上线后才关心？
- **状态**：未启动。
- **重要性**：⭐⭐（属于后期优化）

---

## Q10 · 现有的 7 种语言 i18n 是不是过度工程？

- **来源**：astro.config.mjs 配置了 root + zh-hans + ja + ru + es + fr + ar 七种语言。但看 src/content/docs/，除了 zh-hans 全量翻译，其他 5 种语言（ja/ru/es/fr/ar）只翻译了 ADR 目录。
- **观察**：5 种语言的 ADR 翻译大概是 6 份 ADR × 5 = 30 份翻译。看起来是"早期铺摊子"——但 Doin 现在会这些语言吗？还是靠 AI 翻译？
- **关键问题**：
  - 如果是 AI 翻译的，质量如何？是不是反而给潜在的国际读者留下了"半成品"的印象？
  - 是不是先专注 root + zh-hans 两种（双 CID 模型原意），等 Act II 真正面向海外用户时再扩？
- **状态**：未启动。
- **重要性**：⭐⭐（不影响核心，但影响海外第一印象）

---

<!-- 新增问题直接列在下面，按 Q 编号继续 -->

## Q11 · Nix flake 起步时应该包含哪些 modules？

- **来源**：ADR 007 决定用 Nix flake 过渡，但具体 flake 的第一个版本应该长什么样没定。
- **关键决策**：第一版 flake 是"最小可用"（只含 Yuan runtime 依赖 + Spark 工具链）还是"野心开局"（含全部 5 条不可变原则的 OS 层实现）？
- **冲突**：前者是 1 周可交付的，后者是 1-2 月的工程。
- **状态**：未启动。
- **重要性**：⭐⭐⭐（决定 ADR 007 的第一份交付物是啥）

---

## Q12 · WANIX 哪些设计可以抄？

- **来源**：上次聊 WANIX 时我列了 5 条可借鉴的（浏览器内 Wasm shell、可插拔 FS、GitHub 当 FS、静态部署、实时编辑重编译 shell）。具体抄哪些？
- **特别值得评估的**：
  - **可插拔 FS API**——能不能直接作为 Project IV 的 Storage Port 实现参考？
  - **GitHub 当 FS**——能不能作为 Spark MVP 早期的"穷人版" Second Brain 后端（用户能 git clone 走）？
- **状态**：未启动。
- **重要性**：⭐⭐（可加速 Spark MVP 落地）

---

## Q13 · Spark MVP 早期数据后端选什么？

- **来源**：Q12 的延伸。Q01 在追"Spark 的具体形态"，但还没追"Spark 的数据存在哪"。
- **候选**：
  - **GitHub 仓库 + AES 加密**（WANIX 风格，临时方案）
  - **本地 SQLite + sqlcipher**（最朴素，标准方案）
  - **IPFS + IPNS**（Yuan 原生方案，但 MVP 阶段就上是不是过早？）
  - **混合**：本地 SQLite 是主存，定期 export 到 IPFS（最务实）
- **状态**：未启动。
- **重要性**：⭐⭐⭐⭐（决定 Spark 用户第一次启动的体验）

---

## Q14 · Yuan 的 4 个"退出条件"大概多久能到？

- **来源**：yuan-os-philosophy.md 第 3 节列了 4 个触发条件（v0.x 稳定、5+ 非创始用户、1 年合规验证、3+ 维护者）。
- **预测**：
  - v0.x 稳定：1-2 年（取决于 Spark 落地节奏）
  - 5+ 非创始用户：6-12 月（取决于 Xiaohongshu 推广）
  - 1 年合规验证：1 年（被动发生）
  - 3+ 维护者：不可预测（开源项目最难的瓶颈）
- **真正会卡哪一项**：**"3+ 维护者"几乎一定是最后一项**——其他三个 Doin 一个人 + 运气都可能完成，但 3 个长期维护者需要的不只是代码，是社区。
- **状态**：未启动。
- **重要性**：⭐⭐（属于"什么时候再回来讨论发行版"的输入）