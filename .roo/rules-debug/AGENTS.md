# AGENTS.md — Debug Rules

## VS Code 调试
- [`.vscode/launch.json`](../../.vscode/launch.json) 包含 `node-terminal` 类型的 "Development server" 调试配置，用于调试 Astro dev 服务器。

## 质量门禁
- **无 lint/test 脚本**。`bun run build` 是唯一质量门禁，输出到 `./dist/` 目录。

## 常见构建失败
- **Frontmatter 解析错误**：检查每个 `.md` 文件的 `title` 和 `description` 字段是否存在且格式正确。
- **Sidebar 不匹配**：`astro.config.mjs` 中 sidebar 配置与实际文件路径不一致时会构建失败。

## CI/CD
- GitHub Actions 工作流：[`.github/workflows/astro.yml`](../../.github/workflows/astro.yml)。
- CI 使用 `oven-sh/setup-bun@v2` 安装 Bun（非标准 CI action）。
- 部署目标：GitHub Pages。
