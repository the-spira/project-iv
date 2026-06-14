# AGENTS.md — Architect Rules

This file provides non-obvious, project-specific architectural constraints for agents.

## i18n 架构
- **`defaultLocale: 'root'`** 模式 —— 英文是 root locale，不是 `en`。英文内容直接放在 [`src/content/docs/`](../../src/content/docs/) 下。
- 仅 **`zh-hans`（简体中文）** 有完整翻译覆盖。
- `ja`/`ru`/`es`/`fr`/`ar` 只有 `index.md` + ADR 006。向这些 locale 添加内容需**谨慎评估**翻译维护成本。

## Sidebar 架构约束
- Sidebar 在 [`astro.config.mjs`](../../astro.config.mjs) 中**手动维护** —— 这是架构约束，不是自动生成的。任何新增页面必须同步更新 sidebar。

## 组件与集成
- **无自定义集成或组件** —— 纯 Starlight 默认配置。不要引入自定义 Astro 组件或第三方 Starlight 插件。

## 内容组织
- 内容按 **DDD（领域驱动设计）** 层次组织：
  1. `00-naming` —— 命名与术语
  2. `01-strategic-design` —— 战略设计（核心域/支撑域/通用域）
  3. `02-tactical-design` —— 战术设计（聚合/端口适配器/领域事件）
  4. `03-adr` —— 架构决策记录
  5. `04-embodied` —— 具象化实践

## 层次分离
- 仓库根目录的三个工作流文件（`walkthrough.md`、`conversation-log.md`、`open-questions.md`）是 **AI 协作层**，与 Starlight 内容层分离。不要将它们纳入站点内容。

## 规则文件
- `.cursorrules` / `.windsurfrules` 已被 git-ignored —— 架构规则必须存在于 [`AGENTS.md`](../../AGENTS.md) / [`GEMINI.md`](../../GEMINI.md) 中。

## 部署
- 目标：**GitHub Pages**，通过 GitHub Actions 在 push 到 `main` 时触发。
