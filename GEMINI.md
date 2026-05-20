# Gemini Agent Guidelines (GEMINI.md)

Welcome, Gemini Agent! This document outlines the unified workspace conventions, engineering standards, and best practices for Gemini series models (e.g., Gemini 1.5 Pro, 2.0 Flash/Pro, 3.5 series) and collaborating agents operating within the **Project IV** codebase.

---

## 1. Core Principles & Technical Standards

### 🧠 Deep Analysis & Architecture First
* **Codebase Retrieval**: Before proposing any codebase modifications, perform thorough queries using `grep_search` or `list_dir`. Never assume the existence of module interfaces or file paths without prior verification.
* **Planning Mode**: For complex changes, refactorings, or ambiguous requests, enter **Planning Mode** first. Propose a clear architectural path using `implementation_plan.md` and await user approval before editing source files.

### 💻 Outstanding Engineering Craftsmanship
* **Type Safety & Robustness**: Write clean, resilient, and fully-typed modern code (ES6+ Javascript/Typescript). Gracefully catch and handle all edge cases and exceptions.
* **No Placeholders**: Never commit placeholders, unfinished `TODO`s, mock models, or stub functions into production files. Generate actual assets or mocks using proper AI tools if necessary.

### 🎨 Visual Elegance & Web Design (The WOW Factor)
When building frontend interfaces or UI pages:
* **Premium Aesthetics**: Craft breathtaking, contemporary layouts leveraging glassmorphism, fluid grids, sophisticated dark modes, smooth micro-animations, and balanced HSL color systems.
* **Typography**: Utilize premium Google Fonts (e.g., *Inter* or *Outfit*) instead of basic system fonts.
* **SEO Best Practices**: Always maintain descriptive title tags, semantic HTML5 elements, robust meta descriptions, unique testing IDs (e.g., `data-testid`), and lightning-fast page loading performance.

### 📝 Code and Documentation Integrity
* **Preserve Context**: Retain existing unrelated comments, JSDoc strings, and metadata unless explicitly instructed to refactor them.
* **Markdown Precision**: Ensure all markdown files utilize clean, semantically correct headers and structural blocks.

### 📝 Conventional Git Commits
* **Standard**: Commit messages on the public repository must strictly adhere to the **Conventional Commits** specification.
* **Structure**: `<type>(<scope>): <description>` (e.g., `docs(gemini): translate guidelines to pure english and update bun configuration`).
* **Types**: `feat` (new features), `fix` (bug fixes), `docs` (documentation), `style` (formatting, missing semi-colons), `refactor` (code restructuring), `test` (adding/refactoring tests), `chore` (maintenance, deps).

### 💬 Communication Style
* Be professional, extremely concise, and objective.
* Avoid subjective superlatives such as *"perfectly"*, *"flawlessly"*, or *"100% correct"*. Ground your completions and progress in verifiable facts (e.g., successful build outputs and test run logs).

---

## 2. Workspace & Context

### 📂 Codebase Directory Layout
The Project IV documentation repository is located at `/Users/weili/Projects/ProjectIV/docs/` and is structured as an **Astro Starlight** documentation site:

```
.
├── .cursorrules             # Local-only Cursor rules (Git ignored)
├── .windsurfrules           # Local-only Windsurf rules (Git ignored)
├── .gitignore               # System ignore patterns
├── AGENTS.md                # Multi-agent coordination protocols
├── CLAUDE.md                # Agent pointer and redirection index
├── GEMINI.md                # (This file) Primary guidelines and standards
├── README.md                # Central English documentation portal
├── README.zh-CN.md          # Central Literary Chinese documentation portal
├── astro.config.mjs         # Astro + Starlight integration config
├── bun.lock                 # Bun lockfile specifying exact package dependencies
├── package.json             # Project metadata, run scripts, and dependencies
├── tsconfig.json            # Typescript config for Astro modules
├── public/                  # Static public assets (favicons, logos)
└── src/                     # Core application source
    ├── assets/              # Reusable media assets (images, graphics)
    └── content/             # Starlight documentation pages
        └── docs/            # Markdown pages mapped to site routes
            ├── 00-naming/   # Naming chronicle and glossary
            ├── 01-strategic-design/ # High-level strategic modeling
            ├── 02-tactical-design/  # System domain aggregates
            ├── 03-adr/      # Architecture Decision Records
            └── 04-embodied/ # ADHD design & developer rituals
```

---

## 3. Workflow & Verification

### 🛡️ Step-by-Step Execution Sequence
1. **Locate**: Identify targeted files using `grep_search` or `list_dir`. Never blind-edit.
2. **Plan**: Formulate your solution. In Planning Mode, draft a structured plan in `implementation_plan.md` and request review.
3. **Execute**: Perform code or markdown edits using `replace_file_content` or `multi_replace_file_content`. Avoid whole-file overwrites via `write_to_file` unless creating new documents.
4. **Build**: Run local compilation/compaction checks to ensure zero syntax errors.
5. **Test**: Run full validation tests (if configured) and verify stdout/stderr.
6. **Report**: Summarize your changes in `walkthrough.md` with absolute humbleness.
7. **Commit**: Standardize the git log using Conventional Commits.

---

## 4. Tool Use Best Practices

### 🔍 Search & Exploration
* Prefer `grep_search` with precise queries or regular expressions rather than traversing large directories manually.
* When invoking `list_dir`, always feed absolute paths within the user's workspace boundaries.

### ✏️ Editing Techniques
* **Single Block**: Use `replace_file_content` to swap out a single contiguous segment. Make sure target indentation matches exactly.
* **Non-contiguous Blocks**: Use `multi_replace_file_content` passing discrete chunks.
* **Whole Files**: Use `write_to_file` *only* for initializing new files.

### 📝 Starlight Documentation Conventions
* **Frontmatter Requirements**: Every markdown file in `src/content/docs/` must contain valid frontmatter specifying the title and description:
  ```yaml
  ---
  title: Page Name
  description: Clear, search-engine-friendly summary of page content.
  ---
  ```
* **Routing & Naming**: Page files must be named using kebab-case (e.g., `naming-chronicle.md`). Follow the sequential numerical folder ordering for structural chapters.
* **Bilingual Sync**: Whenever updating core system concepts, check if corresponding pages in the strategically designed sections need syncing.

---

## 5. Architectural Principles

* **Decoupled Architecture**: Maintain high cohesion and loose coupling. Modules and pages must serve a single focus.
* **Sovereign State**: Data states are sovereign. Second Brain stores are strictly local, encrypted, and isolated by default.
* **Performance & Loading**: Keep asset footprints tiny. Lazy-load heavy widgets, and utilize strict caching protocols to maintain instant page responses.

---

## 6. Common Commands Reference

Always perform compilation, verification, and code management using the following `bun`-backed scripts:

### 🛠️ Build & Run commands
* **Start Dev Server**: Launch local hot-reload environment (runs at `localhost:4321` by default):
  ```bash
  bun dev
  ```
* **Production Build**: Validate all markdown syntax, frontmatter layout, routing, and compile standard static outputs into `./dist/`:
  ```bash
  bun run build
  ```
* **Preview Production**: Launch local environment serving the compiled static distribution:
  ```bash
  bun run preview
  ```

### 🧪 Formatting & Linting
* If configurations are present, lint styles and formats before final push:
  ```bash
  bun run lint
  ```

---

## 7. Multi-Agent & Subagent Guidelines

When spawning dedicated subagents:
1. **Clear Mandate**: Provide explicit, granular goals, input parameters, and exit criteria in your subagent instruction block.
2. **Minimal Log Footprint**: Instruct subagents to run isolated research steps to prevent bringing massive, unreadable logs into the primary system prompt.
3. **Audit Results**: Verify all outputs returned by subagents before committing edits to core architecture files.

---

*Remember: Mechanical robustness, visual excellence, and strict conceptual integrity are the pillars of Project IV documentation. Pursue engineering outstandingness!*
