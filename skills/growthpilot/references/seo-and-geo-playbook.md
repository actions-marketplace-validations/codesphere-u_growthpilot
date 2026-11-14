# Technical SEO, GEO/AEO & `llms.txt` Playbook

## 1. The 6-Pillar GrowthReadiness Rubric (`MKT001`–`MKT018`)

| Rule ID | Pillar | Severity | Signal Checked | Auto-Fix / Remedy |
| :--- | :--- | :--- | :--- | :--- |
| `MKT001` | Technical SEO | High | Missing `<title>` or framework `metadata.title` | Add 35–60 char primary keyword + brand title |
| `MKT002` | Technical SEO | High | Missing or out-of-range meta description (<50 or >165 chars) | Add 110–155 char outcome-focused meta description |
| `MKT003` | Technical SEO | Medium | Missing canonical URL (`rel="canonical"` / `alternates.canonical`) | Declare self-referencing canonical URL |
| `MKT004` | Technical SEO | Medium | Missing `sitemap.xml` or dynamic sitemap route | Generate `public/sitemap.xml` or `app/sitemap.ts` |
| `MKT005` | Technical SEO | Low | Missing `<h1>` or `<img>` tags without `alt` text | Ensure exactly one clear `<h1>` and descriptive `alt` text |
| `MKT006` | GEO / AEO | High | Missing `/llms.txt` machine-readable index for AI answer engines | Generate `llms.txt` with summary, core docs, and canonical links |
| `MKT007` | GEO / AEO | Medium | Missing `/llms-full.txt` comprehensive AI retrieval corpus | Generate `llms-full.txt` with architecture, CLI/API, and FAQs |
| `MKT008` | GEO / AEO | Medium | Missing `robots.txt` or missing AI search crawler rules | Allow `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `GPTBot` + `Sitemap:` |
| `MKT009` | GEO / AEO | Low | Low factual citability (no numbers, benchmarks, or FAQ blocks) | Add concrete metrics, comparison tables, and direct Q&A blocks |
| `MKT010` | Structured Data | High | Missing Schema.org JSON-LD (`application/ld+json`) | Embed `SoftwareApplication`, `WebSite`, or `FAQPage` JSON-LD |
| `MKT011` | Structured Data | Low | Missing web app manifest (`manifest.webmanifest`) | Add `manifest.webmanifest` with name, icons, and theme colors |
| `MKT012` | Social Graph | High | Missing OpenGraph tags (`og:title`, `og:description`, `og:image`) | Add complete OpenGraph tags and 1200x630 social preview card |
| `MKT013` | Social Graph | Medium | Missing X/Twitter card tags (`twitter:card`, `twitter:image`) | Set `twitter:card` to `summary_large_image` |
| `MKT014` | CRO & Copy | High | Missing primary Call-to-Action (CTA) or quickstart trigger | Add high-contrast primary CTA or 1-line install command above fold |
| `MKT015` | CRO & Copy | Medium | AI-slop buzzwords (`revolutionary`, `unleash`, `seamlessly`, `delve`) | Replace vague hype with specific mechanisms and quantified outcomes |
| `MKT016` | CRO & Copy | Medium | Missing trust & proof signals (benchmarks, tests, security, badges) | Surface measurable benchmarks, test status, or customer proof |
| `MKT017` | Launch & Growth | Medium | Missing competitive positioning (`vs` alternatives) or launch kit | Generate `LAUNCH_PLAYBOOK.md` and `PROGRAMMATIC_SEO.md` |
| `MKT018` | Launch & Growth | Low | Missing privacy-friendly analytics or conversion event hooks | Wire Plausible, PostHog, Vercel Analytics, or UTM attribution |

---

## 2. Generative Engine Optimization (GEO / AEO) Standard

Modern discovery happens inside **ChatGPT Search (`OAI-SearchBot`)**, **Perplexity (`PerplexityBot`)**, **Claude (`ClaudeBot`)**, and **Google AI Overviews**. To rank and get cited:

1. **Publish `/llms.txt` and `/llms-full.txt`** at the site root (`public/llms.txt` in Next.js/Vite/Astro) following the standard markdown index structure:
   - `# Product Name`
   - `> One-sentence factual summary stating exact category, audience, and core differentiator.`
   - Bulleted sections (`## Core Capabilities`, `## Quickstart`, `## Documentation & URLs`, `## Comparison & Benchmarks`).
2. **Explicitly permit AI Search Crawlers in `robots.txt`**:
   - Blocking `OAI-SearchBot` or `PerplexityBot` removes your product from AI search citations.
3. **Write "Quotable Fact Blocks"**:
   - LLMs cite pages that answer questions in the first sentence (`"X is an open-source Y that reduces Z by 40%..."`) followed by a Markdown/HTML comparison table.
