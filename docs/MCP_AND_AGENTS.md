# MCP Server, AI Agent Skills & CI/CD Setup Guide

Connect **GrowthPilot** directly into your AI coding assistant or continuous integration pipeline so audits, copy rewrites, and GEO/SEO fixes run automatically.

---

## 1. Model Context Protocol (MCP) Server Setup

GrowthPilot embeds a zero-dependency **JSON-RPC 2.0 MCP server** over `stdio` (`growthpilot --mcp`). Both newline-delimited JSON and HTTP `Content-Length` framed streams are supported.

### Claude Desktop / Antigravity / Windsurf / Cursor (`mcp_config.json`)

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

If you installed `growthpilot` globally (`uv tool install git+https://github.com/codesphere-u/growthpilot@v1`), you can use the binary directly for instant cold starts:

```json
{
  "mcpServers": {
    "growthpilot": {
      "command": "growthpilot",
      "args": ["--mcp"]
    }
  }
}
```

### Exposed MCP Tools

| Tool Name | Required Args | Optional Args | What It Returns |
| :--- | :--- | :--- | :--- |
| `audit_project` | — | `target` (path or URL, default `"."`), `site_url` | Full JSON scorecard across 6 pillars, prioritized findings (`MKT001`–`MKT018`), DOM diagnostics, `page_audits`, and CRO analysis |
| `analyze_copy_cro` | `text` | `product_name` | Clarity / CTA / Proof / Anti-Slop scores + `pas_framework`, `jtbd_framework`, and `direct_metric_hero` rewrites |
| `generate_geo_seo_pack` | — | `target`, `site_url` | Complete contents of `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml`, `SEO_SCHEMA.jsonld`, `manifest.webmanifest`, `HEAD_TAGS.html` |
| `generate_launch_kit` | — | `target`, `site_url` | Archetype-aware multi-channel Launch Playbook (`marketplace_app`, `ecommerce`, `b2b_saas`, or `devtools`) |
| `generate_programmatic_seo` | — | `target`, `site_url` | Service category / keyword cluster matrix + comparison blueprint + GEO checklist |
| `apply_marketing_fixes` | `target` | `site_url` | Non-destructively writes missing files into `target` and returns `written_files`, `updated_score`, and `grade` |

---

## 2. Install as an Agent Skill (`skills.sh` & Claude Code Plugin)

### Universal Agent Skills CLI (Claude Code, Cursor, Antigravity, Codex, OpenCode)

```bash
npx skills add codesphere-u/growthpilot
```

### Claude Code Plugin Marketplace

```text
/plugin marketplace add codesphere-u/growthpilot
/plugin install growthpilot@growthpilot-marketplace
```

---

## 3. GitHub Actions CI/CD & Code Scanning (`SARIF 2.1.0`)

Add `.github/workflows/growthpilot.yml` to fail builds when someone deletes SEO metadata, breaks `llms.txt`, or introduces AI slop:

```yaml
name: GrowthPilot Marketing & SEO Gate

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read
  security-events: write

jobs:
  growth-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run GrowthPilot Audit
        id: gp
        uses: codesphere-u/growthpilot@v1
        with:
          target: "."
          site-url: "https://yourproduct.com"
          min-score: "80"
          fail-on: "high"
          sarif-file: "growthpilot.sarif"

      - name: Upload SARIF to GitHub Code Scanning
        if: always()
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: growthpilot.sarif

      - name: Upload HTML Command Center Artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: growthpilot-report
          path: growthpilot-out/
```

### Live Production Post-Deploy Check in CI

You can also point the Action at your live staging or production URL after deploy:

```yaml
- name: Post-Deploy Live URL Verification
  uses: codesphere-u/growthpilot@v1
  with:
    target: "https://yourwebsite.com"
    min-score: "85"
    fail-on: "high"
```

---

## 4. Docker Usage (Zero Python Environment Setup)

```bash
docker build -t growthpilot .
docker run --rm -v "$(pwd):/data" growthpilot . --fix --site-url https://yourwebsite.com
```
