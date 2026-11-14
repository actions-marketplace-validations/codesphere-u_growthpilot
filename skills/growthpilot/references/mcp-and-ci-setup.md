# MCP Server & CI/CD Setup Guide

## 1. Connect GrowthPilot MCP Server to Your Agent

GrowthPilot includes a zero-dependency **Model Context Protocol (MCP)** server over `stdio` (`growthpilot --mcp`).

### Claude Desktop / Cursor / Windsurf / Antigravity (`mcp_config.json`)

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

### Exposed MCP Tools
1. `audit_project` — Run all 18 SEO, GEO (`llms.txt`), OpenGraph, Schema.org, CRO, and Launch checks on a folder or URL.
2. `analyze_copy_cro` — Score headlines or landing copy for conversion clarity, CTA strength, and AI-slop words.
3. `generate_geo_seo_pack` — Generate `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml`, and Schema.org JSON-LD.
4. `generate_launch_kit` — Generate customized Product Hunt, Show HN, Reddit, X thread, LinkedIn, and Email sequences.
5. `generate_programmatic_seo` — Generate keyword clusters, comparison matrices, and landing page templates.
6. `apply_marketing_fixes` — Write missing SEO/GEO/Launch files directly into a project directory.

---

## 2. GitHub Actions CI & Code Scanning (SARIF 2.1.0)

```yaml
- name: Audit SEO, GEO & Marketing Readiness
  uses: codesphere-u/growthpilot@v1
  with:
    target: "."
    min-score: "80"
    fail-on: "high"
    sarif-file: "growthpilot.sarif"
```
