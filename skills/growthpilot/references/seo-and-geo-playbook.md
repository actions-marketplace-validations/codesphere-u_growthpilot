# Technical SEO & GEO (AI Search) Playbook (`v1.4.4`)

GrowthPilot grades every local codebase and live site out of **100 points** across **6 weighted pillars** and **18 deterministic rules** (`MKT001`–`MKT018`). Findings in reports are sorted by impact (`(-points_lost, -severity, rule_id)`) so the highest-leverage fixes appear first.

## Complete 6-Pillar, 18-Rule Rubric

| Rule | Pillar | Severity | Pts | Pass Criteria & Automated Fixes |
| :--- | :--- | :--- | :---: | :--- |
| `MKT001` | Technical SEO (20) | High | 7 | Page `<title>` or framework `metadata.title` present (35–60 chars recommended). |
| `MKT002` | Technical SEO (20) | High | 6 | Meta description present and substantial (50–165 chars). |
| `MKT003` | Technical SEO (20) | Medium | 3 | Canonical URL (`<link rel="canonical">` or framework `alternates.canonical`) declared. |
| `MKT004` | Technical SEO (20) | Medium | 2 | `sitemap.xml` or dynamic sitemap route (`app/sitemap.ts`) present. |
| `MKT005` | Technical SEO (20) | Low | 2 | Primary `<h1>` heading present and zero `<img>` elements missing `alt` attributes. |
| `MKT006` | GEO & AI Search (20) | High | 8 | Root `/llms.txt` index present for ChatGPT Search, Claude, and Perplexity. |
| `MKT007` | GEO & AI Search (20) | Medium | 4 | Extended `/llms-full.txt` deep retrieval context file present. |
| `MKT008` | GEO & AI Search (20) | Medium | 5 | `robots.txt` present with explicit AI search crawler allow rules (`OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`). |
| `MKT009` | GEO & AI Search (20) | Low | 3 | Factual citability density (`citability_count >= 2`: tables, stats, definitions, `<details>`/FAQ blocks). Live scanner flags client-bundle FAQs missing from SSR HTML. |
| `MKT010` | Structured Data (15) | High | 11 | Valid `Schema.org` JSON-LD (`application/ld+json`) matching archetype (`SoftwareApplication`, `Organization`, `Product`, `FAQPage`, `WebSite`). |
| `MKT011` | Structured Data (15) | Low | 4 | Web App Manifest (`manifest.webmanifest` / `manifest.json`) present. |
| `MKT012` | Social & Viral Graph (15) | High | 10 | Open Graph metadata (`og:title`, `og:description`, `og:image`). |
| `MKT013` | Social & Viral Graph (15) | Medium | 5 | X / Twitter summary card metadata (`twitter:card="summary_large_image"`). |
| `MKT014` | CRO & Copy Clarity (15) | High | 7 | Clear above-the-fold CTA (`Get Started`, `Start Free`, `Book a Demo`, install command). |
| `MKT015` | CRO & Copy Clarity (15) | Medium | 4 | Zero AI-slop filler terms (`revolutionary`, `seamlessly`, `unleash`, `delve`, `tapestry`, etc.) outside code blocks. |
| `MKT016` | CRO & Copy Clarity (15) | Medium | 4 | Social proof & trust markers (`proof_count >= 2`: numbers, latency benchmarks, test counts, licenses, security assurances). |
| `MKT017` | Launch & Growth (15) | Medium | 10 | Launch playbook (`LAUNCH_PLAYBOOK.md`) & programmatic SEO positioning (`PROGRAMMATIC_SEO.md`) present. |
| `MKT018` | Launch & Growth (15) | Low | 5 | Privacy-friendly analytics or attribution hook (`Plausible`, `PostHog`, `Umami`, `Fathom`, `@vercel/analytics`, `gtag`, etc.). |

## Grade Scale

`A+` (`95–100`) • `A` (`88–94`) • `B` (`78–87`) • `C` (`65–77`) • `D` (`50–64`) • `F` (`0–49`)

## GEO / `llmstxt.org` Format Checklist

1. Start with `# Product Name`.
2. Add a concise blockquote `> Summary sentence` describing who it serves and what it produces.
3. Group canonical links under H2 sections (`## Core Documentation`, `## Product & Features`, `## Guides & Policies`) using `[Title](https://absolute-url): One-line summary`.
4. Mirror deeper documentation, FAQs, benchmarks, and integration snippets inside `llms-full.txt`.
5. Render FAQ answers in SSR/static HTML alongside `FAQPage` JSON-LD — never trap Q&A content solely inside client-side JS bundles.
