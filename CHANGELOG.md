# Changelog

All notable changes to **GrowthPilot** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-11-14

### Added
- **Executive Markdown Audit Report (`AUDIT_REPORT.md`):** Impact-sorted findings (`points_lost` descending), detected Schema.org `@type` inventory, concrete before/after hero rewrite preview, and actionable fix checklist generated on every audit run.
- **`ecommerce` Archetype Support:** Dedicated D2C storefront CRO rewrites, `Product` schema emphasis, and merchant launch playbooks alongside `devtools`, `b2b_saas`, and `marketplace_app`.
- **Enhanced Framework & Schema Detection:** Detects Shopify, Webflow, WordPress, Framer, SvelteKit, Astro, and Next.js signals, extracts live JSON-LD `@type` entities, and falls back to internal `<a href="/...">` crawling when `sitemap.xml` is missing.
- **`--site-url` Override on Live URL Audits & GitHub Action Inputs:** Added `site-url`, `fix`, and `critical_high_count` output to `action.yml`.
- **Flagship Documentation & Hero Visual:** Custom SVG banner (`docs/assets/growthpilot-banner.svg`), Mermaid workflow diagram, value comparison matrix, `funagigs.com` live proof case study, persona quickstarts, `docs/GETTING_STARTED.md`, `docs/MCP_AND_AGENTS.md`, `docs/ARCHITECTURE.md`, `CONTRIBUTING.md`, `SECURITY.md`, and root `llms.txt` / `llms-full.txt`.

### Fixed
- **Zero False-Positive AI Slop on Technical Docs:** `_extract_slop_words()` strips fenced code blocks and inline backticks so documentation listing banned words in code examples is not penalized.
- **Canonical URL Extraction from `pyproject.toml` / `package.json`:** `scan_directory()` reads `[project.urls]` (`Homepage` / `Repository`) and `package.json` `repository` before falling back to heuristic domains.
- **Signal Extraction Hygiene:** Excluded `tests`, `__tests__`, `site`, and `.docusaurus` directories from repo marketing signal scans and sorted findings by highest score recovery first.

## [1.2.0] - 2026-11-14

### Added
- **Live Next.js Client Bundle FAQ & SSR Content Visibility Inspector**: When auditing a live URL (`growthpilot https://...`), automatically inspects same-origin `/_next/static/chunks/app/page-*.js` bundles to extract unmounted client-state FAQ questions & answers (`{q, a}`) for `SEO_SCHEMA.jsonld` and `llms-full.txt`, while flagging an explicit **SSR Content Visibility Defect** when FAQ answers are hidden from non-JS search and AI crawlers.
- **Multi-Page Sitemap Crawl Scorecard (`page_audits`)**: Crawls up to 8 routes discovered in `sitemap.xml` on live URLs, recording per-page `<title>`, meta description length, canonical presence, `<h1>` count, missing image `alt` attributes, empty headings, and duplicate brand-suffix defects in both the terminal report and the interactive HTML Command Center.
- **Archetype-Aware Marketplace & Mobile App Engine (`marketplace_app`)**: Automatically distinguishes Two-Sided Marketplaces / Mobile Apps from Developer CLIs / SaaS tools, generating bespoke Escrow + Instant Hire + Mobile Money CRO hero rewrites, a Two-Sided Supply/Demand Liquidity & Google Play ASO Launch Playbook, and a Service Category × Local Intent Programmatic SEO & Trust Comparison Matrix with zero developer-CLI template bleed.

## [1.1.0] - 2026-11-14

### Added
- **Deep Multi-Page Live Sitemap & Subpage Crawler**: Automatically parses `/sitemap.xml` routes on live URLs and audits internal subpages for duplicate brand-suffix `<title>` bugs (e.g., `Features — Brand · Brand`), duplicate meta keywords, and missing self-referencing canonical tags.
- **Rich Entity, Feature, FAQ & App Store Extraction**: Extracts real `<h3>` + `<p>` features, FAQ Q&As, Google Play / Web App URLs, and legal entity names from both live HTML and Next.js/TypeScript codebases to populate `Organization`, `MobileApplication`, `WebSite` (`SearchAction`), and `FAQPage` Schema.org JSON-LD (`SEO_SCHEMA.jsonld`) plus `llms-full.txt`.
- **Marketplace & Local Service Programmatic SEO Matrix**: Generates high-intent service × location programmatic SEO blueprints alongside competitor comparison matrices.
- **`--open` CLI Flag & Full Output Pack**: Added `--open` to launch `growthpilot-report.html` automatically and write the full generated SEO/GEO/Schema pack into `--output-dir` for both local directories and live URLs.

## [1.0.0] - 2026-11-14

### Added
- **6-Pillar Marketing, SEO, GEO/AEO & CRO Auditor (`MKT001`–`MKT018`)**: Deterministic code and live-URL inspection across Technical SEO, Generative Engine Optimization (`llms.txt`, `llms-full.txt`, AI search crawler permissions), Schema.org JSON-LD, OpenGraph/X cards, Conversion Rate Optimization (CTA clarity, proof density, AI-slop detector), and Launch readiness.
- **Zero-to-One Auto-Fixer (`--fix`)**: Non-destructively scaffolds missing `llms.txt`, `llms-full.txt`, `robots.txt` (allowing `OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`), `sitemap.xml`, `manifest.webmanifest`, `SEO_SCHEMA.jsonld`, `HEAD_TAGS.html`, `LAUNCH_PLAYBOOK.md`, and `PROGRAMMATIC_SEO.md`.
- **Built-in Model Context Protocol (`MCP`) Server (`--mcp`)**: Zero-dependency JSON-RPC 2.0 `stdio` server (supporting both newline-delimited and `Content-Length` framed streams) exposing 6 tools (`audit_project`, `analyze_copy_cro`, `generate_geo_seo_pack`, `generate_launch_kit`, `generate_programmatic_seo`, `apply_marketing_fixes`).
- **Interactive HTML Growth Command Center & SARIF 2.1.0**: Generates single-file `growthpilot-report.html` with one-click copy buttons and `growthpilot.sarif` for GitHub Code Scanning.
