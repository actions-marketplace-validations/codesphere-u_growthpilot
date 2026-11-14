---
name: growthpilot
description: Autonomous Zero-to-One Marketing, Technical SEO, GEO/AEO (llms.txt & AI Search), Conversion Rate Optimization (CRO), Structured Data (Schema.org), Programmatic SEO, and Multi-Channel Launch Engine with a built-in Model Context Protocol (MCP) server. Use whenever taking a project, codebase, SaaS, CLI, or live URL from zero marketing to full SEO, AI search visibility, high-converting copy, and launch distribution.
version: "1.4.0"
---

# GrowthPilot Skill (`v1.4.0`)

Use **GrowthPilot** whenever taking a local codebase or a live production URL from zero marketing to verified Technical SEO, GEO / AI Search discoverability (`llms.txt` & `llms-full.txt`), Schema.org JSON-LD, conversion-focused copywriting, and archetype-tailored launch execution.

## Core Capabilities (`v1.4.0`)

1. **6-Pillar, 18-Rule Deterministic Audit Engine (`MKT001`–`MKT018`)**
   - Audits **Technical SEO** (20), **GEO & AI Search** (20), **Structured Data** (15), **Social & Viral Graph** (15), **CRO & Copy Clarity** (15), and **Launch & Growth** (15) across local codebases and live `http(s)://` URLs.
   - Crawls live URLs with `sitemap.xml` discovery, `<a href="/...">` fallback routing, multi-page `page_audits`, JSON-LD `@type` inspection, and **Next.js client JS chunk scanning** to detect FAQ answers hidden from non-JS search and AI crawlers.
   - Automatically extracts canonical URLs from `pyproject.toml` (`[project.urls]`) and `package.json` (`homepage` / `repository`), supports `--site-url <URL>` overrides on both local and live targets, and classifies projects into 4 archetypes: `devtools`, `b2b_saas`, `marketplace_app`, and `ecommerce`.

2. **Full-Stack Deployable Marketing Asset Generator**
   - Writes 12 core artifacts to `--output-dir`: `AUDIT_REPORT.md`, `growthpilot-report.html`, `HEAD_TAGS.html`, `SEO_SCHEMA.jsonld`, `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `LAUNCH_PLAYBOOK.md`, `PROGRAMMATIC_SEO.md`, and `growth-summary.json` (plus optional `--sarif <file>`).
   - Use `--fix` to safely scaffold missing static files (`robots.txt`, `llms.txt`, `sitemap.xml`, `manifest.webmanifest` into `public/` or root, plus `marketing/*`) without overwriting existing user files or colliding with `app/robots.ts` / `app/sitemap.ts`.

3. **Zero-Slop CRO & Copywriting Analyzer (`--analyze-copy`)**
   - Scores Clarity, CTA Strength, Proof Density, and Anti-Slop while excluding fenced code blocks and inline backticks from AI-slop penalties.
   - Produces concrete `PAS`, `JTBD`, and `Direct Metric Hero` rewrites matched to the product archetype.

4. **Built-In Model Context Protocol Server (`--mcp`)**
   - Zero-dependency JSON-RPC 2.0 MCP server over `stdio` exposing 6 native tools: `audit_project`, `analyze_copy_cro`, `generate_geo_seo_pack`, `generate_launch_kit`, `generate_programmatic_seo`, and `apply_marketing_fixes`.

## Standard Operator Workflow

### Audit a Local Repository

```bash
python3 skills/growthpilot/scripts/growthpilot.py . --site-url https://yoursite.com --output-dir ./growthpilot-out
```

Inspect `./growthpilot-out/AUDIT_REPORT.md` and `./growthpilot-out/growthpilot-report.html`, then apply missing static files non-destructively:

```bash
python3 skills/growthpilot/scripts/growthpilot.py . --site-url https://yoursite.com --fix
```

### Audit Any Live Website URL

```bash
python3 skills/growthpilot/scripts/growthpilot.py https://yoursite.com --output-dir ./growthpilot-out
```

Pass `--site-url` alongside a staging or preview URL if generated canonicals, sitemaps, and `llms.txt` should point to production:

```bash
python3 skills/growthpilot/scripts/growthpilot.py https://staging.yoursite.com --site-url https://yoursite.com --output-dir ./growthpilot-out
```

### Score Hero Copy & Enforce CI Quality Gates

```bash
python3 skills/growthpilot/scripts/growthpilot.py --analyze-copy "Your landing page headline and value proposition text"
```

```bash
python3 skills/growthpilot/scripts/growthpilot.py . --min-score 80 --fail-on high --sarif growthpilot.sarif
```

### Run Offline SaaS Showcase Demo

```bash
python3 skills/growthpilot/scripts/growthpilot.py --demo --output-dir /tmp/growthpilot-demo
```

## Deep References

Load these bundled reference guides as needed for rule details, copy formulas, channel tactics, or agent integration:

- [SEO & GEO Playbook (`MKT001`–`MKT018`)](references/seo-and-geo-playbook.md)
- [CRO & Zero-Slop Copywriting Guide](references/cro-and-copywriting.md)
- [Zero-to-One Launch & Programmatic SEO](references/zero-to-one-launch.md)
- [MCP Server & CI/CD Integration](references/mcp-and-ci-setup.md)
