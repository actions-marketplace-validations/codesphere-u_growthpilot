# Changelog

All notable changes to **GrowthPilot** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-14

### Added
- **6-Pillar Marketing, SEO, GEO/AEO & CRO Auditor (`MKT001`–`MKT018`)**: Deterministic code and live-URL inspection across Technical SEO, Generative Engine Optimization (`llms.txt`, `llms-full.txt`, AI search crawler permissions), Schema.org JSON-LD, OpenGraph/X cards, Conversion Rate Optimization (CTA clarity, proof density, AI-slop detector), and Launch readiness.
- **Zero-to-One Auto-Fixer (`--fix`)**: Non-destructively scaffolds missing `llms.txt`, `llms-full.txt`, `robots.txt` (allowing `OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`), `sitemap.xml`, `manifest.webmanifest`, `SEO_SCHEMA.jsonld`, `HEAD_TAGS.html`, `LAUNCH_PLAYBOOK.md`, and `PROGRAMMATIC_SEO.md`.
- **Built-in Model Context Protocol (`MCP`) Server (`--mcp`)**: Zero-dependency JSON-RPC 2.0 `stdio` server (supporting both newline-delimited and `Content-Length` framed streams) exposing 6 tools (`audit_project`, `analyze_copy_cro`, `generate_geo_seo_pack`, `generate_launch_kit`, `generate_programmatic_seo`, `apply_marketing_fixes`).
- **Interactive HTML Growth Command Center & SARIF 2.1.0**: Generates single-file `growthpilot-report.html` with one-click copy buttons and `growthpilot.sarif` for GitHub Code Scanning.
