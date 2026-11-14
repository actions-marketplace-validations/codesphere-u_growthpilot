# GrowthPilot — Autonomous Zero-to-One Marketing, SEO, GEO/AEO, CRO & Launch Engine (CLI + MCP Server + Agent Skill)

[![CI](https://github.com/codesphere-u/growthpilot/actions/workflows/ci.yml/badge.svg)](https://github.com/codesphere-u/growthpilot/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-blue.svg)](pyproject.toml)
[![MCP Ready](https://img.shields.io/badge/MCP-JSON--RPC%202.0-8b5cf6.svg)](skills/growthpilot/references/mcp-and-ci-setup.md)

**Take any codebase, SaaS, web app, CLI, or live URL from zero marketing to full-stack Technical SEO, AI Search Citability (`llms.txt` / GEO / AEO), Schema.org Entity Graph, Conversion Rate Optimization (CRO), Programmatic SEO, and a Multi-Channel Launch Kit in one command.**

Zero external dependencies (`Python 3.10+ stdlib only`). Ships with a **built-in Model Context Protocol (`MCP`) server**, an **auto-fixer (`--fix`)**, an **interactive single-file HTML Command Center**, and a **GitHub Action (SARIF 2.1.0)**.

---

## Why GrowthPilot Exists

Most marketing agent skills are static prompt checklists with zero execution engine. **GrowthPilot** combines expert playbooks with a **deterministic code & live-URL scanner, auto-fixer, and MCP server**:

| Pillar (100 pts) | Rules (`MKT001`–`MKT018`) | What GrowthPilot Audits & Auto-Generates |
| :--- | :--- | :--- |
| **1. Technical SEO (20 pts)** | `MKT001`–`MKT005` | `<title>`, meta description length, canonical URLs, `sitemap.xml`, `<h1>` hierarchy, image `alt` coverage |
| **2. GEO & AI Search (20 pts)** | `MKT006`–`MKT009` | `/llms.txt`, `/llms-full.txt`, AI crawler rules (`OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `GPTBot`), factual citability density |
| **3. Structured Data (15 pts)** | `MKT010`–`MKT011` | Schema.org JSON-LD (`SoftwareApplication`, `WebSite`, `FAQPage`) and `manifest.webmanifest` |
| **4. Social & Viral Graph (15 pts)** | `MKT012`–`MKT013` | OpenGraph (`og:title`, `og:description`, `og:image`) and X/Twitter `summary_large_image` cards |
| **5. CRO & Copy Clarity (15 pts)** | `MKT014`–`MKT016` | Above-the-fold CTA strength, AI-slop buzzword detector (`revolutionary`, `unleash`, `seamlessly`, `delve`), proof density, PAS/JTBD rewrites |
| **6. Launch & Growth (15 pts)** | `MKT017`–`MKT018` | Tailored `Show HN`, Product Hunt, Reddit, X thread, LinkedIn, 5-part email sequence, Programmatic SEO matrix, and analytics hooks |

---

## Instant Zero-Install Demo

Run the built-in preview in 2 seconds via `uvx` or `curl`:

```bash
uvx --from git+https://github.com/codesphere-u/growthpilot@v1 growthpilot --demo
```

Or zero-install Python one-liner:

```bash
curl -fsSL https://raw.githubusercontent.com/codesphere-u/growthpilot/v1/skills/growthpilot/scripts/growthpilot.py | python3 - --demo
```

Then open `growthpilot-out/growthpilot-report.html` in your browser!

---

## Install & Run Everywhere

### 1. Install as an AI Agent Skill ([skills.sh](https://skills.sh) / Antigravity / Claude Code / Cursor / Codex)

```bash
npx skills add codesphere-u/growthpilot
```

Audit your current repository:

```bash
python3 ~/.agents/skills/growthpilot/scripts/growthpilot.py .
```

Auto-generate and write missing `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml`, Schema.org JSON-LD, `LAUNCH_PLAYBOOK.md`, and `PROGRAMMATIC_SEO.md`:

```bash
python3 ~/.agents/skills/growthpilot/scripts/growthpilot.py . --fix --site-url https://yourproduct.com
```

### 2. Install the Global CLI (`uv tool` or `pip`)

```bash
uv tool install git+https://github.com/codesphere-u/growthpilot@v1
```

```bash
pip install git+https://github.com/codesphere-u/growthpilot@v1
```

Audit any local repository, live production website, or headline copy:

```bash
growthpilot . --fix --site-url https://yourproduct.com
```

```bash
growthpilot https://example.com
```

```bash
growthpilot --analyze-copy "Revolutionary next-gen AI platform that seamlessly unleashes synergy"
```

### 3. Connect as an MCP Server (Claude Desktop, Cursor, Windsurf, Claude Code)

Add to your `claude_desktop_config.json` or `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "growthpilot": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/codesphere-u/growthpilot@v1",
        "growthpilot",
        "--mcp"
      ]
    }
  }
}
```

Exposes 6 MCP tools over `stdio`: `audit_project`, `analyze_copy_cro`, `generate_geo_seo_pack`, `generate_launch_kit`, `generate_programmatic_seo`, and `apply_marketing_fixes`.

### 4. Install as a Claude Code Plugin

```text
/plugin install growthpilot --marketplace codesphere-u/growthpilot
```

### 5. GitHub Actions CI & SARIF 2.1.0 Gate

```yaml
- name: GrowthPilot SEO, GEO & CRO Gate
  uses: codesphere-u/growthpilot@v1
  with:
    target: "."
    min-score: "80"
    fail-on: "high"
    sarif-file: "growthpilot.sarif"
```

---

## Development

```bash
uv venv --clear .venv && uv pip install --python .venv/bin/python -e ".[dev]" pip-audit
.venv/bin/ruff check .
.venv/bin/mypy
.venv/bin/pytest -v
.venv/bin/pip-audit --skip-editable
```

---

## License

MIT — see [LICENSE](LICENSE).
