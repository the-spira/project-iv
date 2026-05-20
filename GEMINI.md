# Gemini Agent 指南 (GEMINI.md)

欢迎，Gemini Agent！本文件阐述了针对 Gemini 架构模型（例如 Gemini 1.5 Pro, 2.0 Flash/Pro, 3.5 系列等）及其他协同 Agent 在 **Project IV** codebase 中工作时的统一 workspace 规范、运行标准与最佳实践。

---

## 1. 核心原则与技术标准

### 🧠 深入分析与架构优先
* 在提议任何变更之前，务必使用 `grep_search` 或 `list_dir` 进行彻底的 codebase 检索。
* 理解依赖关系与设计模式。在未验证之前，绝不主观推测文件或 module 的存在。
* 面对所有复杂的 task、架构层面的变更或模糊不清的 request，必须首先进入 **Planning Mode**。

### 💻 卓越的编程工艺
* **严格的 Typing 与正确性**：编写极其强壮、具备自解释性且现代化的 code。始终妥善且优雅地处理边缘情况（edge cases）与 errors。
* **惯用模式（Idiomatic Patterns）**：遵循现代 ES6+ Javascript/Typescript 以及整洁 of CSS 实践。
* **零 Placeholder 占位符**：绝不在 production 文件中使用占位符文本、stub 函数或 mock 设计。如果缺少 asset，使用图像生成 tool 或其他合适资源。

### 🎨 视觉与 Web App 设计 (关键)
在开发 frontend 界面时：
* **高端美学（Premium Aesthetics）**：打造精美、现代的 UI，融入 glassmorphism、responsive grids、高质感的 dark modes、平滑的 micro-animations 以及基于 HSL 的和谐色调。
* **Typography**：使用高品质的字体（如 Google Fonts 的 Inter 或 Outfit），避免使用浏览器的默认 system 字体。
* **SEO 最佳实践**：维护描述性的 titles、语义化的 HTML5 tags、详尽的 meta descriptions、唯一的 test IDs 以及极致优化的 performance。

### 📝 维护 Code 与文档的完整性
* 除非收到明确的修改或重构指令，否则必须完整保留所有注释、JSDoc/docstrings 以及 metadata。
* 绝不在 production 代码中遗留临时注释、placeholders 或未完成 of `TODO`。
* 确保所有 markdown 文件遵循清晰、具备语义化的 formatting。
* **Git Commit 规范**：严格执行下方专列的“Git Commit 简体中文优先规范”。

### 📝 Git Commit 简体中文优先规范
* **最高优先级**：在编写 Git commit messages 时，务必按照**简体中文优先（专业术语不翻译）**的原则进行撰写。
* **消息结构**：`<type>: <简体中文描述>`（例如：`docs: 合并 CLAUDE.md 至 GEMINI.md 并保留索引`）。
* **保留英文术语**：对于 `feat`, `fix`, `refactor`, `docs`, `style`, `test` 等 commit 类型，以及 `state`, `context`, `props`, `API` 等开发术语及专有名词不应强行翻译，以保持专业度与语义精准。

### 💬 沟通风格
* 保持专业、清晰且极度简练的回复。
* 避免使用夸张的形容词（例如 "perfectly", "flawlessly", "100% correct"）。保持谦逊与精准。
* 依靠客观证据（如 test 输出、file 运行结果）而非空洞的完工断言。

---

## 2. Workspace 与上下文

### 📂 目录结构
主 workspace 以及文档文件夹位于：
* `/Users/weili/Projects/ProjectIV/docs/`

在此文件夹中，你将看到：
* `ProjectIV.code-workspace`: 定义项目 folders 的 VS Code workspace 配置。
* `GEMINI.md`: （本文件）Gemini 模型的专属指南与通用技术标准。
* `CLAUDE.md`: Claude 模型的专属指南（已合并至本文件，保留索引）。
* `AGENTS.md`: 多 Agent 协同协议及通用系统详情。

---

## 3. 工作流与验证 (Verification)

### 🛡️ 循序渐进的验证流程
1. **Locate (定位)**：使用 `grep_search` 精确找出需要编辑的目标文件。
2. **Execute (执行)**：使用 `replace_file_content` 或 `multi_replace_file_content` 进行精准的修改。
3. **Build (构建)**：运行编译与格式化命令，验证 syntax 的正确性。
4. **Test (测试)**：运行测试套件（如 `npm run test` 或 Vitest 命令）并捕获 stdout/stderr。
5. **Report (报告)**：在你的 walkthrough 文档中客观记录所有的结构性变更。
6. **Commit (提交)**：在提交代码变更时，编写的 Git commit messages 必须严格符合**简体中文优先（术语不翻译）**的规范（例：`docs: 更新 GEMINI.md 规范`）。

---

## 4. Tool 使用最佳实践

### 🔍 搜索与探索
* 使用带有精准 query 或 regular expressions 的 `grep_search`，而不是凭空猜测 file paths。
* 使用 `list_dir` 列出目录时，须指定 workspace 内的 absolute paths。

### ✏️ 文件编辑
* **单块连续修改**：使用 `replace_file_content` 替换单个文本块。务必保证 target content 完全匹配（包括前导/尾随空格）。
* **多处非连续修改**：使用 `multi_replace_file_content` 并指定不同的 `ReplacementChunks`。
* **绝不完全覆盖**：除非新建文件或进行经过明确审批的全盘重写，否则切勿直接使用 `write_to_file` 覆盖现有文件。

### ⏱️ Schedules 与 Tasks
* 灵活运用 `schedule` tool 来管理 background timers (`DurationSeconds`) 或周期性 tasks (`CronExpression`)。
* 绝不在 background 运行带有 `sleep` 的 shell loops，请使用平台自带的 scheduler。
* 通过 `manage_task` 监控长期运行的 process，避免使用 tight loop 进行轮询。

---

## 5. 架构原则

* **解耦架构 (Decoupled Architecture)**：保持 components 高度聚焦、单一职责且可复用。
* **状态管理 (State Management)**：在适当场景使用轻量级的 reactive state 或 context API；除非有明确的刚性要求，否则避免构建臃肿的 monolithic stores。
* **性能优化 (Performance)**：优化 bundle 尺寸，对 heavy resources 进行懒加载（lazy-load），并实施严格的 caching/loading 策略。

---

## 6. 常用命令参考

请使用以下标准流程来 build、test 以及维护 application。

### 🛠️ Build 与 Run 命令
* **Local 开发服务器**：提议使用 `run_command` 在 background task 中运行 `npm run dev` 或等效的 dev 服务器。
* **Production Build**：提议运行 `npm run build` 来 compile bundle，并以此检查是否存在 syntax/compilation 问题。

### 🧪 Linting 与 Formatting
* **Format**：运行 `npm run format` (Prettier) 或针对特定的目标文件进行格式调整。
* **Lint**：运行 `npm run lint` (ESLint) 并立即修复所有警告或报错。
* **Type-Check**：如果配置了 Typescript，运行 `tsc --noEmit` 以确保 type safety。

---

## 7. 多 Agent 与 Subagent 指南

在启动专职 subagents（例如 `research` 或 `self`）时：
1. **提供清晰的上下文**：传递一份详尽、结构清晰且具备可执行性的 prompt。
2. **最小化 Context 开销**：在专职 subagents 中运行 background investigations，以保持主 conversation context 的整洁。
3. **使用 Agent 间消息传递**：使用 `send_message` 在 Agent 之间进行通讯。系统会在 subagent 回复时自动唤醒你。

---

*谨记：视觉上的优雅（Visual elegance）、机械上的鲁棒性（Mechanical robustness）以及清晰的文档沉淀是让 Project IV 保持卓越的基石。让我们追求卓越！*
