# Getting Started with GrowthPilot (Founders, Marketers & Developers)

Whether you have **never opened a terminal before** or you ship code every day, you can run GrowthPilot in under 60 seconds.

---

## Step 1: Prerequisites (One-Time, 15 Seconds)

Make sure you have **either**:
- **`uv`** (fastest — automatically downloads & runs Python tools cleanly): [Install uv](https://docs.astral.sh/uv/getting-started/installation/)
- **OR Python 3.10+** (already installed on most Macs and Linux machines) + `pip` / `git`
- **OR Docker** (zero Python install needed)

Verify what you have:

```bash
python3 --version
```

---

## Step 2: Pick Your Scenario

### Scenario A — "I only have a live website URL (no code repo)"

Run GrowthPilot directly against your live domain to crawl your pages, detect hidden SEO/AI-search bugs, and generate all 12 marketing assets into `./growthpilot-out/`:

```bash
uvx --from git+https://github.com/codesphere-u/growthpilot@v1 growthpilot https://yourwebsite.com --fix --open
```

If you are auditing a **staging or preview domain** (for example Vercel preview URLs) before pointing your production domain:

```bash
uvx --from git+https://github.com/codesphere-u/growthpilot@v1 growthpilot https://staging.vercel.app --site-url https://yourwebsite.com --fix --open
```

Your browser opens **`growthpilot-report.html`** automatically with:
- Interactive tabs (**Overview & Pillars**, **Audit Rules**, **GEO / `llms.txt` & Schema**, **Launch Playbook**, **Programmatic SEO & CRO**)
- One-click **Copy** buttons for every generated file
- **Save PDF** button for sharing with your team or clients
- A multi-page crawl scorecard showing per-route titles, descriptions, canonicals, `<h1>` counts, and DOM visibility defects

---

### Scenario B — "I want to auto-fix my code repository in place"

Navigate into your project folder (Next.js, Astro, React/Vite, SvelteKit, Python, or static site) and run:

```bash
cd /path/to/your/project
uvx --from git+https://github.com/codesphere-u/growthpilot@v1 growthpilot . --fix --site-url https://yourwebsite.com --open
```

GrowthPilot automatically places web files in `public/` (or root for non-JS projects) and marketing docs in `marketing/`:
1. Never overwrites existing files
2. Respects dynamic Next.js `app/robots.ts` and `app/sitemap.ts` routes
3. Prints a **Priority Action Plan** showing exact points gained (`+11 pts`, `+10 pts`, etc.) for anything requiring manual code edits (such as `<link rel="canonical">` or embedding `<script type="application/ld+json">` inside `app/layout.tsx`)

---

### Scenario C — "I want to rewrite weak landing page headlines"

Test any hero headline, ad copy, or Product Hunt tagline:

```bash
uvx --from git+https://github.com/codesphere-u/growthpilot@v1 growthpilot --analyze-copy "Our revolutionary next-gen platform seamlessly transforms workflows"
```

You get instant scores across **Clarity**, **CTA Strength**, **Proof Density**, and **Anti-Slop**, plus 3 tailored rewrites (`PAS`, `JTBD`, and `Direct Metric Hero`).

---

### Scenario D — "I want to inspect the output without scanning my own site yet"

Run the instant offline demo project (`PulseForge`):

```bash
uvx --from git+https://github.com/codesphere-u/growthpilot@v1 growthpilot --demo --open
```

---

## Step 3: Where to Deploy Each Generated File

| Generated File | Next.js (`App Router`) | Shopify / Webflow / WordPress / Static HTML | Why It Matters |
| :--- | :--- | :--- | :--- |
| `llms.txt` | Keep in `public/llms.txt` (served at `/llms.txt`) | Upload to site root (`yoursite.com/llms.txt`) or serve via redirect/route | Gives ChatGPT, Claude & Perplexity an authoritative index of your site |
| `llms-full.txt` | Keep in `public/llms-full.txt` | Upload to site root (`yoursite.com/llms-full.txt`) | Supplies full features, FAQs & entity facts for deep AI answers |
| `robots.txt` | Keep in `public/robots.txt` or `app/robots.ts` | Replace or append AI crawler `Allow: /` rules in root `robots.txt` | Unblocks `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `GPTBot` |
| `sitemap.xml` | Keep in `public/sitemap.xml` or `app/sitemap.ts` | Ensure XML sitemap lists every public URL | Accelerates search indexing of subpages |
| `SEO_SCHEMA.jsonld` | Paste into `<script type="application/ld+json">` in `src/app/layout.tsx` | Paste inside `<head>` custom code in site settings | Unlocks Google Rich Results & unambiguous entity citations in LLMs |
| `HEAD_TAGS.html` | Map values into Next.js `metadata` export (`alternates.canonical`, `openGraph`, `twitter`) | Paste missing `<meta>` / `<link>` tags into `<head>` | Fixes broken Slack/Discord/X previews and duplicate indexing |
| `AUDIT_REPORT.md` | Share in PR / Linear / Notion | Send to your web agency or founder | Track exact per-page bugs sorted by SEO impact |
| `LAUNCH_PLAYBOOK.md` | Customize team links & execute | Copy posts to Product Hunt, X, LinkedIn, WhatsApp, TikTok | Turn zero-to-one launch into a repeatable multi-channel campaign |
| `PROGRAMMATIC_SEO.md` | Build `/services`, `/compare`, or `/guides` routes | Create landing pages matching high-intent search queries | Captures bottom-of-funnel organic traffic that converts |

---

## Common FAQ & Troubleshooting

- **Why did GrowthPilot refuse to scan my home directory?**
  Running `growthpilot ~` or `growthpilot /` is blocked by default to avoid walking personal files. Pass a specific project subfolder (e.g. `growthpilot ./my-app`), a URL (`growthpilot https://...`), `--demo`, or explicitly pass `--allow-home`.
- **Will `--fix` overwrite my existing `robots.txt` or `sitemap.ts`?**
  No. `--fix` strictly creates missing files (`_write_if_missing`) and skips static `robots.txt`/`sitemap.xml` if `app/robots.ts` or `app/sitemap.ts` exists.
- **How do I update to the newest version (`v1.4.1`)?**
  If using `uv tool`: run `uv tool install --force git+https://github.com/codesphere-u/growthpilot@v1`.
  If using `uvx`: add `--refresh` or run `uvx --from git+https://github.com/codesphere-u/growthpilot@v1.4.1 growthpilot --version`.
