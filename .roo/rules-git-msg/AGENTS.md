# AGENTS.md — Git Commit Message Rules

此文件为 git-msg 模式提供项目特定的 commit message 规范与工作流指引。

---

## Commit Message 格式规范

### 结构

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type（必选，8 种之一）

| Type | 含义 | 适用场景 |
|:---|:---|:---|
| **feat** | 新功能 | 新增页面、组件、API 端点、功能特性 |
| **fix** | Bug 修复 | 修复错误行为、断链、格式问题 |
| **docs** | 文档变更 | README、ADR、注释、i18n 翻译 |
| **style** | 格式调整 | 空格、缩进、分号——不影响代码逻辑 |
| **refactor** | 重构 | 代码重构，不改变外部行为 |
| **test** | 测试 | 添加/修改测试 |
| **chore** | 杂务 | 构建脚本、依赖更新、配置调整 |
| **build** | 构建系统 | 影响构建系统或外部依赖的变更 |

### Scope（必选，DDD 专用体系）

**架构层 scope：**
- `domain` — 领域层（实体、值对象、聚合根、领域服务）
- `app` — 应用层（用例、命令/查询处理器）
- `interfaces` — 接口层（REST/gRPC 控制器、DTO、中间件）
- `infra` — 基础设施层（数据库、消息队列、外部服务适配器）
- `ent` — 共享内核/通用实体

**限界上下文（Bounded Context）scope：**
- `case-collab` — 案例协作上下文
- `org` — 组织管理上下文
- `product` — 产品上下文
- `availability` — 可用性上下文
- `governance` — 治理上下文
- `visibility` — 可见性上下文

**通用 scope：**
- `api` — API 定义与文档
- `config` — 配置文件（eslint、prettier、tsconfig 等）
- `scripts` — 脚本与工具
- `deps` — 依赖管理
- `docs` — 文档（README、ADR、Starlight 内容）
- `adr` — 架构决策记录

### Subject（必选）

- **必须使用英文**
- 使用现在时态（"add" 而非 "added"）
- 不超过 50 个字符
- 不以句号结尾
- 清晰描述变更做什么，而非为什么（为什么放在 body 中）

### Body（可选，复杂变更建议填写）

- 英文 Markdown
- 每行 ≤72 字符
- 解释：
  - 变更的动机（为什么做）
  - 与之前行为的对比（有什么不同）
  - 实现决策的简要说明

### Footer（可选）

- `Closes #<issue>` — 关闭 issue
- `Refs #<issue>` — 关联 issue
- `BREAKING CHANGE: <description>` — 不兼容变更

---

## 工作流

### 1. 分析暂存区变更

当用户请求生成 commit message 时：

1. 执行 `git diff --staged` 获取暂存区变更
2. 执行 `git diff --staged --stat` 获取变更概览
3. 分析变更涉及的文件路径，推断受影响的架构层/限界上下文
4. 阅读变更内容，理解变更的本质和影响范围

### 2. 设计 Commit Message

按以下顺序确定各字段：

1. **scope**：根据变更文件路径推断
   - `src/content/docs/` 下 → `docs`
   - `src/content/docs/03-adr/` 下 → `docs` 或 `adr`（如果是 ADR 本身）
   - `astro.config.mjs`、`tsconfig.json` 等 → `config`
   - `package.json` 依赖变更 → `deps`
   - 脚本目录 → `scripts`

2. **type**：根据变更性质确定
   - 新增内容 → `feat` 或 `docs`
   - 修复错误 → `fix`
   - 格式/样式 → `style`
   - 重构 → `refactor`

3. **subject**：用英文简洁描述变更，≤50 字符

4. **body**（如果需要）：解释动机和上下文

5. **footer**（如果需要）：关联 issue 或标注 BREAKING CHANGE

### 3. 呈现并等待批准

- 以清晰的格式呈现完整的 commit message
- 明确询问用户是否批准
- 提供修改选项（如调整 type、scope 或 subject）
- **绝对不要**在用户明确批准之前执行 `git add` 或 `git commit`

### 4. 执行提交（仅当批准后）

- 如果用户尚未暂存文件，先执行 `git add`（但需再次确认）
- 执行 `git commit -m "<message>"`
- 确认提交成功并显示 commit hash

---

## 绝对红线

1. **未经用户明确批准，绝不执行 git commit 或 git push**
2. **绝不提交密钥、Token 或敏感信息**——如果 diff 中包含疑似密钥的内容，必须警告用户
3. **绝不使用中文 subject**——subject 必须英文
4. **不要在此模式下编辑源代码文件**——源代码修改交给 Code 模式

---

## 示例

### 示例 1：新增文档页面

```
docs(domain): add Yuan core concept documentation

Add tactical design documentation for the Yuan aggregate root,
including:
- Aggregate root definition and invariants
- Entity relationship diagram
- Repository interface design
```

### 示例 2：修复翻译

```
fix(docs): correct "Aggregate" translation in zh-hans glossary

Align "Aggregate" translation with DDD community convention.
```

### 示例 3：配置变更

```
chore(config): add new sidebar entries to astro.config

Refs #42
```

### 示例 4：依赖更新

```
chore(deps): upgrade @astrojs/starlight to 0.28.0
```

---

## 与其他模式的协作

- **Code 模式**：负责源代码修改；git-msg 仅在用户要求时分析暂存区并生成/执行 commit
- **Architect 模式**：定义架构规范；git-msg 遵循 DDD scope 体系
- **Documentation Writer 模式**：负责文档内容创作；git-msg 负责文档变更的提交信息
