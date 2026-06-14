# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## 项目特有规则

### 包管理器
- 本项目使用 **`bun`** 作为包管理器（不是 npm/pnpm/yarn）。所有命令用 `bun` 运行：`bun dev`、`bun run build`、`bun run preview`。

### 语言规则
- AI 对话、计划文档、内联编辑注释**必须使用简体中文**。
- 技术术语（props、state、frontmatter、sidebar、aggregate 等）保留英文原文，不翻译。
- Git 提交信息遵循 **Conventional Commits**，使用**英文**书写：`feat(scope): subject`。

### Starlight 配置关键约束
- **`defaultLocale: 'root'`** —— 英文内容直接放在 [`src/content/docs/`](src/content/docs/) 下，**不在 `en/` 子目录**。
- **Sidebar 在 [`astro.config.mjs`](astro.config.mjs) 中手动维护** —— 添加新 `.md` 文件不会自动出现在导航中，必须同步更新 sidebar 配置。
- **Frontmatter 只需 `title` 和 `description`**，无自定义字段。

### 仓库根目录工作流文件
以下三个文件位于仓库根目录，属于 AI 协作元数据层，**不属于 Starlight 站点内容**：
- [`walkthrough.md`](walkthrough.md) —— 变更记录与进度追踪
- [`conversation-log.md`](conversation-log.md) —— 对话日志
- [`open-questions.md`](open-questions.md) —— 待解决问题

### 规则文件说明
- [`.cursorrules`](.cursorrules) 和 `.windsurfrules` 已被 **git-ignored** —— 核心规则必须通过 [`AGENTS.md`](AGENTS.md) / [`GEMINI.md`](GEMINI.md) 传达。
- [`GEMINI.md`](GEMINI.md) 是**主要技术参考文件**；[`CLAUDE.md`](CLAUDE.md) 仅做重定向指向它。

### i18n
- 7 种 locale 配置，但仅 **`zh-hans`（简体中文）有完整翻译覆盖**。
- `ja`/`ru`/`es`/`fr`/`ar` 只有 `index.md` + ADR 006 的翻译。

### 质量门禁
- 无 test/lint 基础设施。质量检查就是 **`bun run build`** 是否成功。

### 领域术语速查
| 术语 | 含义 |
|:---|:---|
| **Yuan（元）** | 数字灵魂 —— 加密 Wasm 模块，封装用户"数字 DNA" |
| **Spira** | 守护组织 —— 从拉丁语 *spirare*（呼吸）衍生 |
| **Avatar Grid（容器/烛台）** | Yuan 的运行时容器，按资源类型和部署位置组织成网格 |
| **Vox（共识体）** | Yuan 的智慧表达，数字生命的声音 |
| **Silent Forging（寂静锻造）** | 当前阶段 —— MVP 结晶前，在公众视野外构建和验证 |

## 角色分工

详细的角色定义与协作协议见 [`GEMINI.md`](GEMINI.md)。
