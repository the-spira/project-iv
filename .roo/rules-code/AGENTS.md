# AGENTS.md — Code Rules

## 包管理器
- 所有命令使用 **`bun`**（不是 npm/pnpm/yarn）：`bun dev`、`bun run build`。

## Markdown 文件规范
- Frontmatter 仅使用 `title` 和 `description`，无自定义字段。
- 目录使用数字前缀排序：`00-naming`、`01-strategic-design`、`02-tactical-design`、`03-adr`、`04-embodied`。

## Sidebar 同步
- 新增页面**必须**同步更新 [`astro.config.mjs`](../../astro.config.mjs) 中的 sidebar 配置。Sidebar 是手动维护的，不会自动发现新文件。

## 内容路径规则
- 英文内容直接放在 [`src/content/docs/`](../../src/content/docs/) 下（`defaultLocale: 'root'`，不在 `en/` 子目录）。
- 翻译文件在对应 locale 子目录下**镜像英文目录结构**（如 [`src/content/docs/zh-hans/`](../../src/content/docs/zh-hans/)）。

## 组件与配置
- 无自定义 Astro 组件 —— 坚持使用 Starlight 默认配置。
- [`src/content.config.ts`](../../src/content.config.ts) 使用默认 `docsSchema()`，不定义自定义 collection。
