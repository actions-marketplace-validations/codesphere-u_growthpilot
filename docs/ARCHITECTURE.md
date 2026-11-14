# GrowthPilot Architecture & Contributor Internals

This document explains how **GrowthPilot** operates under the hood so engineers and security reviewers can verify every check, network call, file write, and protocol frame.

---

## 1. Design Principles

- **Zero External Runtime Dependencies**: Uses strictly the Python 3.10+ standard library (`urllib.request`, `re`, `json`, `html`, `argparse`, `dataclasses`, `subprocess`). Supply-chain attack surface is near zero (`pip-audit` clean).
- **Deterministic First, Template-Smart Second**: Audits do not burn LLM tokens or suffer non-deterministic hallucinations. Every rule (`MKT001`–`MKT018`) is inspectable and repeatable in CI/CD.
- **Non-Destructive `--fix`**: `apply_marketing_fixes` only writes files that do not exist yet (and skips static `robots.txt` / `sitemap.xml` when dynamic Next.js `app/robots.ts` or `app/sitemap.ts` exist).
- **Safety Guardrails**:
  - Refuses to scan `/` or `~` unless `--allow-home` is explicitly passed (`_is_unsafe_broad_root`).
  - Caps HTTP downloads at 2 MB per request with a 10-second `timeout=10` on every `urllib.request.urlopen()` call (`BillShock 100/100 SAFE`).
  - Caps internal subpage crawls per run (`<= 7` subpages beyond root) and symlink traversal is disabled (`if fpath.is_symlink(): continue`).

---

## 2. Core Pipeline Overview

```text
Target Input (Directory | Live URL | --demo | --analyze-copy | --mcp)
   │
   ├─► Live URL (`scan_live_url`):
   │      ├─ Fetches root HTML (tracks final_url & http_status)
   │      ├─ Extracts meta tags, OG/X cards, H1, image alt counts, JSON-LD @types
   │      ├─ Detects framework/CMS (Next.js, Astro, SvelteKit, Shopify, Webflow, WordPress, Framer)
   │      ├─ Fetches `/_next/static/chunks/app/page*.js` if present → extracts unmounted FAQ Q&As
   │      ├─ Fetches `/robots.txt`, `/sitemap.xml` (or falls back to internal <a href="/..."> links)
   │      └─ Crawls up to 7 subpages → builds `page_audits` scorecard & `subpage_issues`
   │
   ├─► Local Repo (`scan_directory`):
   │      ├─ Parses `package.json` & `pyproject.toml` (name, desc, Homepage/repo URL, deps)
   │      ├─ Parses `README.md` (H1, bullets, install command, CTA/proof, slop excluding codeblocks)
   │      └─ Walks source files (excluding `tests/`, `node_modules/`, `.next/`, etc.)
   │
   ▼
Positioning & Archetype Inference (`_infer_market_positioning`)
   ├─ `marketplace_app` (two-sided hiring, escrow, mobile money, taskers)
   ├─ `ecommerce` (Shopify/WooCommerce storefront, cart, checkout, shipping)
   ├─ `b2b_saas` (web app/SaaS without CLI package-manager quickstart)
   └─ `devtools` (CLIs, SDKs, APIs, MCP servers, libraries)
   │
   ▼
Scoring Engine (`evaluate_profile`)
   └─ Computes 6-pillar scores (100 pts max), sorts findings by `(-points_lost, -severity)`
   │
   ▼
Output & Protocol Layer
   ├─ `generate_geo_seo_pack` (`llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml`, JSON-LD, manifest, `HEAD_TAGS.html`)
   ├─ `generate_launch_kit` & `generate_programmatic_seo` (archetype-specific playbooks)
   ├─ `render_html_dashboard` (single-file interactive Command Center HTML)
   ├─ `render_markdown_report` (`AUDIT_REPORT.md` summary for PRs/Notion/Slack)
   ├─ `build_sarif_report` (SARIF 2.1.0 for GitHub Code Scanning)
   └─ `run_mcp_stdio_server` (JSON-RPC 2.0 over stdin/stdout with newline & Content-Length framing)
```

---

## 3. Scoring Model (`MKT001`–`MKT018`)

| Pillar | Max Points | Rules Included |
| :--- | :--- | :--- |
| Technical SEO | 20 | `MKT001` (7), `MKT002` (6), `MKT003` (3), `MKT004` (2), `MKT005` (2) |
| GEO & AI Search | 20 | `MKT006` (8), `MKT007` (4), `MKT008` (5), `MKT009` (3) |
| Structured Data | 15 | `MKT010` (11), `MKT011` (4) |
| Social & Viral Graph | 15 | `MKT012` (10), `MKT013` (5) |
| CRO & Copy Clarity | 15 | `MKT014` (7), `MKT015` (4), `MKT016` (4) |
| Launch & Growth | 15 | `MKT017` (10), `MKT018` (5) |

Letter grades map monotonically from total score:
- `95–100`: `A+`
- `88–94`: `A`
- `78–87`: `B`
- `65–77`: `C`
- `50–64`: `D`
- `0–49`: `F`

---

## 4. Extending GrowthPilot

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to add new rules, archetypes, or framework extractors while passing `ruff`, `mypy --strict`, `pytest`, `claude plugin validate .`, and `billshock`.
