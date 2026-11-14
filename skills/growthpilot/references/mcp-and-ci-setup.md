# MCP Server & CI/CD Integration Guide (`v1.4.4`)

GrowthPilot runs natively as a zero-dependency **Model Context Protocol (MCP)** server over `stdio` (newline-delimited JSON-RPC 2.0 and `Content-Length` framing), a **GitHub Action** with SARIF 2.1.0 output, and a non-root **Docker container**.

## 1. MCP Client Configuration

Add GrowthPilot to Claude Code, Cursor, Antigravity, Codex, or Windsurf (`mcp_config.json`):

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

Or invoke directly from a local checkout:

```json
{
  "mcpServers": {
    "growthpilot": {
      "command": "python3",
      "args": ["/path/to/growthpilot/skills/growthpilot/scripts/growthpilot.py", "--mcp"]
    }
  }
}
```

## 2. Exposed MCP Tools (6 Total)

| Tool Name | Required Args | Optional Args | Returns |
| :--- | :--- | :--- | :--- |
| `audit_project` | — | `target` (path or URL, default `"."`), `site_url` | Full 6-pillar scorecard, impact-sorted findings (`MKT001`–`MKT018`), DOM diagnostics, `page_audits`, and CRO analysis |
| `analyze_copy_cro` | `text` | `product_name` | Clarity / CTA / Proof / Anti-Slop scores + `pas_framework`, `jtbd_framework`, and `direct_metric_hero` rewrites |
| `generate_geo_seo_pack` | — | `target`, `site_url` | Complete `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml`, `SEO_SCHEMA.jsonld`, `manifest.webmanifest`, and `HEAD_TAGS.html` |
| `generate_launch_kit` | — | `target`, `site_url` | Archetype-aware launch playbook (`devtools`, `b2b_saas`, `marketplace_app`, or `ecommerce`) |
| `generate_programmatic_seo` | — | `target`, `site_url` | High-intent keyword clusters, competitor comparison blueprints, and AI citability tables |
| `apply_marketing_fixes` | `target` | `site_url` | Non-destructively writes missing assets into `target` and returns `written_files`, `updated_score`, and `grade` |

## 3. GitHub Actions CI Quality Gate (`codesphere-u/growthpilot@v1`)

Inputs declared in `action.yml`:

- `target` (default `.`): Repo directory or live `https://` URL
- `site-url` (default `""`): Canonical URL override for generated sitemaps and tags
- `fix` (default `"false"`): Auto-scaffold missing assets during the workflow step
- `min-score` (default `"0"`): Minimum 0–100 score required to pass CI
- `fail-on` (default `"none"`): Fail on severity (`critical`, `high`, `medium`, `low`, `none`)
- `sarif-file` (default `"growthpilot.sarif"`): Output file path for SARIF 2.1.0 report

Outputs declared in `action.yml`: `score`, `grade`, `critical_high_count`.

Workflow snippet with GitHub Code Scanning SARIF upload:

```yaml
name: GrowthPilot SEO & GEO Gate
on: [pull_request]

permissions:
  contents: read
  security-events: write

jobs:
  growthpilot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: codesphere-u/growthpilot@v1
        with:
          target: "."
          site-url: "https://yoursite.com"
          min-score: "80"
          fail-on: "high"
          sarif-file: "growthpilot.sarif"
      - uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: growthpilot.sarif
```
