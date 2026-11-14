(() => {
  "use strict";

  const PERSONAS = {
    cli: {
      caption: "uv tool install git+https://github.com/codesphere-u/growthpilot",
      command: "uv tool install git+https://github.com/codesphere-u/growthpilot && growthpilot .",
    },
    agent: {
      caption: "npx skills add codesphere-u/growthpilot",
      command: "npx skills add codesphere-u/growthpilot",
    },
    mcp: {
      caption: "growthpilot --mcp",
      command: "growthpilot --mcp --path /path/to/repo",
    },
    ci: {
      caption: "uses: codesphere-u/growthpilot@v1",
      command: "uses: codesphere-u/growthpilot@v1\nwith:\n  target: .\n  min-score: 85\n  sarif-file: growthpilot.sarif",
    },
  };

  const CRO_PRESETS = {
    weak: {
      product: "GrowthPilot",
      archetype: "devtools",
      text: "The next-generation AI-powered platform that seamlessly revolutionizes and supercharges how modern teams unlock synergy and elevate workflows. Learn more.",
    },
    funagigs: {
      product: "FunaGigs",
      archetype: "marketplace",
      text: "Connect vetted freelancers with local and remote buyers in 60 seconds. Compare transparent pricing across 140+ gig categories with milestone escrow. Post a gig free.",
    },
    devtools: {
      product: "GrowthPilot",
      archetype: "devtools",
      text: "Audit any codebase or live URL across 18 SEO, GEO (llms.txt) & CRO rules in under 1 second. Generates 12 deploy-ready files with zero dependencies. Run growthpilot .",
    },
    saas: {
      product: "LedgerPulse",
      archetype: "saas",
      text: "Close month-end SaaS books 4x faster with deterministic invoice reconciliation across Stripe and QuickBooks. Start 14-day sandbox.",
    },
  };

  const SLOP_LIST = [
    "next-generation",
    "seamlessly",
    "seamless",
    "revolutionizes",
    "revolutionize",
    "supercharges",
    "supercharge",
    "unlock",
    "synergy",
    "elevate",
    "empower",
    "leverage",
    "cutting-edge",
    "game-changer",
    "transform",
    "delve",
    "holistic",
    "robust",
    "effortless",
    "streamline",
    "skyrocket",
    "unleash",
  ];

  const CTA_VERBS = [
    "start",
    "run",
    "install",
    "post",
    "try",
    "book",
    "audit",
    "compare",
    "download",
    "ship",
    "create",
    "build",
    "deploy",
    "open",
    "check",
  ];

  const OUTPUT_SAMPLES = {
    llms: {
      title: "llms.txt — AI Answer-Engine Index",
      badge: "GEO / AEO",
      code: `# GrowthPilot\n> Zero-dependency engine auditing codebases & live URLs across 18 SEO, GEO (llms.txt), Schema.org & CRO rules.\n\n## Core Capabilities\n- [CLI & Scanner](https://codesphere-u.github.io/growthpilot/#studio): Deterministic 100-point rubric + 12 deployable assets.\n- [18 Rules Spec](https://codesphere-u.github.io/growthpilot/#rules): Technical SEO, GEO/AEO, Schema, Social, CRO & Launch.\n- [MCP Server](https://github.com/codesphere-u/growthpilot): Run locally via growthpilot --mcp with stdio transport.`,
    },
    schema: {
      title: "SEO_SCHEMA.jsonld — Schema.org @graph",
      badge: "Structured Data",
      code: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "GrowthPilot",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "macOS, Linux, Windows",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Does GrowthPilot require API keys?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Pure Python 3.10+ stdlib with zero telemetry.",
                  },
                },
              ],
            },
          ],
        },
        null,
        2
      ),
    },
    head: {
      title: "HEAD_TAGS.html — Drop-in Social & Meta snippet",
      badge: "Social & Meta",
      code: `<title>GrowthPilot — Autonomous SEO, GEO/AEO & CRO Engine</title>\n<meta name="description" content="Audit any codebase or live URL across 18 SEO, GEO & CRO rules in under 1 second." />\n<link rel="canonical" href="https://codesphere-u.github.io/growthpilot/" />\n<meta property="og:type" content="website" />\n<meta property="og:title" content="GrowthPilot — Autonomous SEO, GEO/AEO & CRO Engine" />\n<meta name="twitter:card" content="summary_large_image" />`,
    },
    robots: {
      title: "robots.txt — Search & AI Bot Directives",
      badge: "Technical SEO",
      code: `User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nSitemap: https://codesphere-u.github.io/growthpilot/sitemap.xml`,
    },
    sitemap: {
      title: "sitemap.xml — Canonical URL Inventory",
      badge: "Technical SEO",
      code: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://codesphere-u.github.io/growthpilot/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>`,
    },
    audit: {
      title: "GROWTH_AUDIT.md — Prioritized Fix Report",
      badge: "Audit Report",
      code: `# GrowthPilot Audit — 100/100 (Grade A+)\n- Technical SEO: 20/20\n- GEO & AI Search: 20/20\n- Structured Data: 15/15\n- Social & Viral Graph: 15/15\n- CRO & Copy Clarity: 15/15\n- Launch & Growth: 15/15\n\nAll 18 deterministic checks passed with zero findings.`,
    },
    summary: {
      title: "growth-summary.json — CI-Readable Telemetry",
      badge: "JSON Output",
      code: JSON.stringify(
        {
          tool: "growthpilot",
          score: 100,
          grade: "A+",
          findings_count: 0,
          pillars: {
            technical_seo: 20,
            geo_ai_search: 20,
            structured_data: 15,
            social_viral_graph: 15,
            cro_copy_clarity: 15,
            launch_growth: 15,
          },
        },
        null,
        2
      ),
    },
    manifest: {
      title: "manifest.webmanifest — PWA Metadata",
      badge: "App Manifest",
      code: JSON.stringify(
        {
          name: "GrowthPilot — Autonomous SEO, GEO/AEO & CRO Engine",
          short_name: "GrowthPilot",
          start_url: "./",
          display: "standalone",
          background_color: "#fffce5",
          theme_color: "#faa2ca",
        },
        null,
        2
      ),
    },
    playbook: {
      title: "LAUNCH_PLAYBOOK.md — Channel Distribution Plan",
      badge: "Launch & Growth",
      code: `# 7-Day Launch Playbook\n1. Day 1: Deploy llms.txt, robots.txt, sitemap.xml & JSON-LD @graph.\n2. Day 2: Validate OpenGraph card via Slack & X previewers.\n3. Day 3: Wire Plausible/Umami funnel events + SARIF CI gate.\n4. Day 4: Publish comparison landing pages from PROGRAMMATIC_SEO.md.`,
    },
    pseo: {
      title: "PROGRAMMATIC_SEO.md — High-Intent Page Matrix",
      badge: "Programmatic SEO",
      code: `# Programmatic SEO Opportunities\n- /compare/{competitor}-alternative — buyer switch intent\n- /tools/{framework}-llms-txt-generator — developer utility intent\n- /guides/{vertical}-seo-checklist — practitioner reference`,
    },
    llmsfull: {
      title: "llms-full.txt — Complete Machine-Readable Brief",
      badge: "GEO / AEO",
      code: `# GrowthPilot Complete Context\nCLI Flags: --live URL, --site-url, --min-score, --sarif-file, --mcp, --json\nDependencies: None (Python 3.10+ stdlib only)\nLicense: MIT\nOutputs: 12 deployable assets under growthpilot-out/ or website root.`,
    },
    sarif: {
      title: "growthpilot.sarif — GitHub Code Scanning 2.1.0",
      badge: "CI Security Gate",
      code: JSON.stringify(
        {
          version: "2.1.0",
          $schema: "https://json.schemastore.org/sarif-2.1.0.json",
          runs: [
            {
              tool: { driver: { name: "GrowthPilot", rules: [] } },
              results: [],
            },
          ],
        },
        null,
        2
      ),
    },
  };

  const PROOF_STAGES = {
    before: {
      badge: "Grade F • 9 issues found",
      title: "Missing GEO index, empty JSON-LD graph, and missing social cards",
      items: [
        "No /llms.txt or /llms-full.txt for AI answer engines to parse service offerings.",
        "Missing Organization, WebSite, and FAQPage Schema.org structured data.",
        "Empty OpenGraph/Twitter card metadata reduced link previews to bare URLs.",
        "Generic headline & CTA lacked buyer proof or time-to-value specificity.",
      ],
    },
    after: {
      badge: "100/100 • Grade A+ (Verified)",
      title: "All 18 rules green across live HTML & deployed asset endpoints",
      items: [
        "Added /llms.txt, /llms-full.txt, and permissive AI bot directives in robots.txt.",
        "Embedded validated Schema.org @graph (Organization, WebSite, Service, FAQPage).",
        "Added crisp og:image (1200x630), canonical tag, and Twitter summary_large_image.",
        "Rewrote hero copy around quantified time-to-hire and transparent escrow proof.",
      ],
    },
  };

  const RUBRIC_RULES = [
    { id: "MKT001", pillar: "Technical SEO", check: "Page <title> present & optimal length (35–60 chars)", severity: "High" },
    { id: "MKT002", pillar: "Technical SEO", check: "Meta description present & descriptive (50–165 chars)", severity: "High" },
    { id: "MKT003", pillar: "Technical SEO", check: "Canonical URL link element set to HTTPS root", severity: "Medium" },
    { id: "MKT004", pillar: "Technical SEO", check: "sitemap.xml present with valid canonical URL entries", severity: "High" },
    { id: "MKT005", pillar: "Technical SEO", check: "Single H1 hierarchy & zero missing image alt attributes", severity: "Medium" },
    { id: "MKT006", pillar: "GEO & AI Search", check: "llms.txt concise index adhering to llmstxt.org spec", severity: "High" },
    { id: "MKT007", pillar: "GEO & AI Search", check: "llms-full.txt complete machine-readable technical context", severity: "Medium" },
    { id: "MKT008", pillar: "GEO & AI Search", check: "robots.txt allows GPTBot, ClaudeBot & PerplexityBot", severity: "High" },
    { id: "MKT009", pillar: "GEO & AI Search", check: "Factual citability density & SSR FAQ visibility (no JS-hidden answers)", severity: "High" },
    { id: "MKT010", pillar: "Structured Data", check: "Schema.org JSON-LD @graph matching detected product archetype", severity: "High" },
    { id: "MKT011", pillar: "Structured Data", check: "Web app manifest (manifest.webmanifest) & icon metadata", severity: "Low" },
    { id: "MKT012", pillar: "Social & Viral Graph", check: "OpenGraph tags (og:title, og:description, og:image)", severity: "High" },
    { id: "MKT013", pillar: "Social & Viral Graph", check: "X / Twitter summary_large_image card metadata", severity: "Medium" },
    { id: "MKT014", pillar: "CRO & Copy Clarity", check: "Action-oriented primary CTA copy above the fold", severity: "High" },
    { id: "MKT015", pillar: "CRO & Copy Clarity", check: "Zero AI-slop filler or vague buzzword inflation in copy", severity: "Medium" },
    { id: "MKT016", pillar: "CRO & Copy Clarity", check: "Concrete quantified proof numbers & validation signals", severity: "Medium" },
    { id: "MKT017", pillar: "Launch & Growth", check: "Archetype launch playbook & programmatic SEO matrix ready", severity: "Medium" },
    { id: "MKT018", pillar: "Launch & Growth", check: "Privacy-friendly analytics or attribution hook (Plausible/Umami/PostHog)", severity: "Low" },
  ];

  let activePersona = "cli";
  let activeGenFile = "llms";
  let toastTimer = null;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function showToast(msg) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("visible", "show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible", "show"), 2200);
  }

  async function copyText(text, label) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showToast(label ? `Copied ${label}` : "Copied to clipboard");
    } catch {
      showToast("Copy ready — select and press Cmd/Ctrl+C");
    }
  }

  function setPopoverOpen(isOpen) {
    const pop = $("#cta-popover");
    const caret = $("#cta-caret-btn");
    if (!pop || !caret) return;
    if (isOpen) {
      pop.removeAttribute("hidden");
      pop.classList.add("open");
      caret.setAttribute("aria-expanded", "true");
    } else {
      pop.setAttribute("hidden", "");
      pop.classList.remove("open");
      caret.setAttribute("aria-expanded", "false");
    }
  }

  function initCTA() {
    const mainBtn = $("#cta-main-btn");
    const caretBtn = $("#cta-caret-btn");
    const popCopyBtn = $("#pop-copy-btn");
    const heroCmd = $("#hero-cmd");
    const popCmdCode = $("#pop-cmd-code");

    function updatePersona(key) {
      const data = PERSONAS[key] || PERSONAS.cli;
      activePersona = key;
      if (heroCmd) heroCmd.textContent = data.caption;
      if (popCmdCode) popCmdCode.textContent = data.command;
      $$(".pop-tab").forEach((btn) => {
        const match = btn.dataset.persona === key;
        btn.classList.toggle("active", match);
        btn.setAttribute("aria-selected", String(match));
      });
    }

    if (mainBtn) {
      mainBtn.addEventListener("click", () => {
        copyText(PERSONAS[activePersona].command, "install command");
      });
    }

    if (popCopyBtn) {
      popCopyBtn.addEventListener("click", () => {
        copyText(PERSONAS[activePersona].command, "command");
      });
    }

    if (caretBtn) {
      caretBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const pop = $("#cta-popover");
        const isOpen = pop ? !pop.hasAttribute("hidden") : false;
        setPopoverOpen(!isOpen);
      });
    }

    $$(".pop-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        updatePersona(btn.dataset.persona);
      });
    });

    document.addEventListener("click", (e) => {
      const area = $(".cta-area");
      if (area && !area.contains(e.target)) {
        setPopoverOpen(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setPopoverOpen(false);
    });

    updatePersona("cli");
  }

  function initStudioTabs() {
    const tabs = $$(".frame-tab");
    const panels = {
      cro: $("#panel-cro"),
      gen: $("#panel-gen"),
      outputs: $("#panel-outputs"),
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.studio;
        tabs.forEach((t) => {
          const isMatch = t === tab;
          t.classList.toggle("active", isMatch);
          t.setAttribute("aria-selected", String(isMatch));
        });
        Object.entries(panels).forEach(([k, el]) => {
          if (el) el.classList.toggle("active", k === target);
        });
      });
    });
  }

  function analyzeCRO() {
    const productEl = $("#cro-product");
    const archEl = $("#cro-archetype");
    const inputEl = $("#cro-input");
    if (!inputEl) return;

    const product = (productEl && productEl.value.trim()) || "YourProduct";
    const arch = (archEl && archEl.value) || "devtools";
    const raw = inputEl.value.trim();
    const lower = raw.toLowerCase();
    const words = raw.split(/\s+/).filter(Boolean);

    const foundSlop = SLOP_LIST.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(lower));
    const hasCta = CTA_VERBS.some((v) => new RegExp(`\\b${v}\\b`, "i").test(lower));
    const hasNumber = /\d+/.test(raw);
    const sweetLength = words.length >= 10 && words.length <= 38;

    const clarity = Math.max(4, Math.min(35, (sweetLength ? 30 : 20) - foundSlop.length * 4));
    const ctaScore = hasCta ? 25 : lower.includes("learn more") ? 4 : 10;
    const proofScore = hasNumber ? 20 : 0;
    const slopBonus = foundSlop.length === 0 ? 20 : Math.max(0, 20 - foundSlop.length * 4);
    const overall = Math.max(5, Math.min(100, clarity + ctaScore + proofScore + slopBonus));

    $("#stat-overall").textContent = `${overall}/100`;
    $("#stat-clarity").textContent = `${clarity}/35`;
    $("#stat-cta").textContent = `${ctaScore}/25`;
    $("#stat-proof").textContent = `${proofScore}/20`;
    $("#stat-slop").textContent = String(foundSlop.length);

    const diag = $("#cro-diagnostics");
    if (diag) {
      if (overall >= 85 && foundSlop.length === 0) {
        diag.textContent = "Strong clarity, active CTA, quantified proof, and zero AI buzzword bloat.";
      } else {
        const notes = [];
        if (foundSlop.length > 0) notes.push(`Remove buzzwords (${foundSlop.join(", ")})`);
        if (!hasCta) notes.push('Replace weak links like "Learn more" with an active verb');
        if (!hasNumber) notes.push("Add one real number (time saved, rule count, or customer figure)");
        diag.textContent = notes.join(". ") + ".";
      }
    }

    const archOutcome = {
      devtools: "catch regressions & ship clean configs in under 1 second",
      saas: "cut repetitive manual work by 4x without changing tools",
      marketplace: "match verified buyers & providers in 60 seconds with transparent escrow",
      editorial: "publish fast, plain-English docs that search and AI read cleanly",
    }[arch] || "deliver measurable results cleanly";

    $("#rw-pas").textContent =
      `Stop losing traffic to silent technical bugs. ${product} scans your stack and lets you ${archOutcome}. Run ${product} free today.`;
    $("#rw-jtbd").textContent =
      `When you need to ${archOutcome}, ${product} outputs verified files in one step — zero vendor lock-in. Start in 10 seconds.`;
    $("#rw-metric").textContent =
      `${product}: audit 18 rules, fix metadata gaps, and ship 12 production assets locally with 0 external dependencies. Install CLI.`;
  }

  function initCRO() {
    const inputEl = $("#cro-input");
    const prodEl = $("#cro-product");
    const archEl = $("#cro-archetype");

    $$("[data-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const preset = CRO_PRESETS[btn.dataset.preset];
        if (!preset) return;
        $$("[data-preset]").forEach((b) => b.classList.toggle("active", b === btn));
        if (prodEl) prodEl.value = preset.product;
        if (archEl) archEl.value = preset.archetype;
        if (inputEl) inputEl.value = preset.text;
        analyzeCRO();
      });
    });

    [inputEl, prodEl, archEl].forEach((el) => {
      if (el) el.addEventListener("input", analyzeCRO);
    });

    analyzeCRO();
  }

  function renderGenerator() {
    const name = ($("#gen-name") && $("#gen-name").value.trim()) || "AcmeDocs";
    let url = ($("#gen-url") && $("#gen-url").value.trim()) || "https://acmedocs.dev";
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
    url = url.replace(/\/+$/, "");
    const desc =
      ($("#gen-desc") && $("#gen-desc").value.trim()) ||
      "Fast zero-config product documentation from source files.";
    const arch = ($("#gen-arch") && $("#gen-arch").value) || "SoftwareApplication";

    let content = "";
    if (activeGenFile === "llms") {
      content = `# ${name}\n> ${desc}\n\n## Canonical Links\n- [Homepage](${url}/)\n- [Sitemap](${url}/sitemap.xml)\n- [Machine Context](${url}/llms-full.txt)\n`;
    } else if (activeGenFile === "schema") {
      const schemaObj = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": arch,
            name,
            url: `${url}/`,
            description: desc,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
        ],
      };
      content = JSON.stringify(schemaObj, null, 2);
    } else if (activeGenFile === "robots") {
      content = `User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`;
    } else {
      content = `<title>${name} — ${desc.slice(0, 48)}</title>\n<meta name="description" content="${desc}" />\n<link rel="canonical" href="${url}/" />\n<meta property="og:type" content="website" />\n<meta property="og:title" content="${name}" />\n<meta property="og:description" content="${desc}" />\n<meta name="twitter:card" content="summary_large_image" />`;
    }

    const preview = $("#gen-preview");
    if (preview) preview.textContent = content;
    return content;
  }

  function initGenerator() {
    const filenameMap = {
      llms: "llms.txt",
      schema: "SEO_SCHEMA.jsonld",
      robots: "robots.txt",
      head: "HEAD_TAGS.html",
    };

    $$("[data-genfile]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeGenFile = btn.dataset.genfile;
        $$("[data-genfile]").forEach((b) => b.classList.toggle("active", b === btn));
        renderGenerator();
      });
    });

    ["#gen-name", "#gen-url", "#gen-desc", "#gen-arch"].forEach((sel) => {
      const el = $(sel);
      if (el) el.addEventListener("input", renderGenerator);
    });

    const copyBtn = $("#copy-gen-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        copyText(renderGenerator(), filenameMap[activeGenFile]);
      });
    }

    const dlBtn = $("#download-gen-btn");
    if (dlBtn) {
      dlBtn.addEventListener("click", () => {
        const blob = new Blob([renderGenerator()], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filenameMap[activeGenFile] || "growthpilot-asset.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        showToast(`Downloaded ${link.download}`);
      });
    }

    renderGenerator();
  }

  function initOutputs() {
    const titleEl = $("#out-title");
    const badgeEl = $("#out-badge");
    const codeEl = $("#out-code");

    function showOutput(key) {
      const item = OUTPUT_SAMPLES[key] || OUTPUT_SAMPLES.llms;
      if (titleEl) titleEl.textContent = item.title;
      if (badgeEl) badgeEl.textContent = item.badge;
      if (codeEl) codeEl.textContent = item.code;
      $$("[data-outfile]").forEach((b) => b.classList.toggle("active", b.dataset.outfile === key));
    }

    $$("[data-outfile]").forEach((btn) => {
      btn.addEventListener("click", () => showOutput(btn.dataset.outfile));
    });

    showOutput("llms");
  }

  function initProof() {
    const badgeEl = $("#cs-badge");
    const titleEl = $("#cs-title");
    const listEl = $("#cs-list");

    function setStage(stage) {
      const data = PROOF_STAGES[stage] || PROOF_STAGES.before;
      if (badgeEl) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      if (listEl) {
        const nodes = data.items.map((text) => {
          const li = document.createElement("li");
          li.textContent = text;
          return li;
        });
        listEl.replaceChildren(...nodes);
      }
      $$("[data-stage]").forEach((b) => b.classList.toggle("active", b.dataset.stage === stage));
    }

    $$("[data-stage]").forEach((btn) => {
      btn.addEventListener("click", () => setStage(btn.dataset.stage));
    });
  }

  function initRubric() {
    const searchEl = $("#rubric-search");
    const pillarEl = $("#rubric-pillar");
    const tbody = $("#rubric-tbody");

    function renderRules() {
      if (!tbody) return;
      const q = (searchEl ? searchEl.value : "").trim().toLowerCase();
      const pillar = pillarEl ? pillarEl.value : "all";

      const matches = RUBRIC_RULES.filter((r) => {
        if (pillar !== "all" && r.pillar !== pillar) return false;
        if (!q) return true;
        return (
          r.id.toLowerCase().includes(q) ||
          r.pillar.toLowerCase().includes(q) ||
          r.check.toLowerCase().includes(q) ||
          r.severity.toLowerCase().includes(q)
        );
      });

      if (matches.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "No matching rules found — clear filter to view all 18 rules.";
        tr.appendChild(td);
        tbody.replaceChildren(tr);
        return;
      }

      const rows = matches.map((r) => {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        const code = document.createElement("code");
        code.textContent = r.id;
        tdId.appendChild(code);

        const tdPillar = document.createElement("td");
        tdPillar.textContent = r.pillar;

        const tdCheck = document.createElement("td");
        tdCheck.textContent = r.check;

        const tdSev = document.createElement("td");
        const span = document.createElement("span");
        span.className = "pill";
        span.textContent = r.severity;
        tdSev.appendChild(span);

        tr.append(tdId, tdPillar, tdCheck, tdSev);
        return tr;
      });

      tbody.replaceChildren(...rows);
    }

    if (searchEl) searchEl.addEventListener("input", renderRules);
    if (pillarEl) pillarEl.addEventListener("change", renderRules);
    renderRules();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCTA();
    initStudioTabs();
    initCRO();
    initGenerator();
    initOutputs();
    initProof();
    initRubric();
  });
})();
