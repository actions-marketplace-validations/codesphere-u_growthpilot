(() => {
  "use strict";

  const ROOT = document.documentElement;
  const TOAST = document.getElementById("toast");
  let toastTimer = null;

  function showToast(msg) {
    if (!TOAST) return;
    TOAST.textContent = msg;
    TOAST.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => TOAST.classList.remove("visible"), 2200);
  }

  function copyText(text, label = "Copied to clipboard") {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(label)).catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand("copy");
      showToast(label);
    } finally {
      document.body.removeChild(el);
    }
  }

  // Theme Toggle
  const themeBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("gp-theme") || "dark";
  ROOT.setAttribute("data-theme", savedTheme);
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = ROOT.getAttribute("data-theme") === "light" ? "dark" : "light";
      ROOT.setAttribute("data-theme", next);
      localStorage.setItem("gp-theme", next);
    });
  }

  // Mobile Menu
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      mobileBtn.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        mobileBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Hero Persona Terminal
  const PERSONA_CMDS = {
    founder: "uvx --from git+https://github.com/codesphere-u/growthpilot@v1 growthpilot https://yoursite.com --output-dir ./growth-kit --open",
    dev: "uv tool install git+https://github.com/codesphere-u/growthpilot@v1 && growthpilot . --fix --site-url https://yoursite.com",
    agent: "npx skills add codesphere-u/growthpilot && growthpilot --mcp",
    ci: "growthpilot . --min-score 80 --fail-on high --sarif growthpilot.sarif",
  };

  const personaCmdEl = document.getElementById("persona-cmd");
  document.querySelectorAll("[data-persona]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-persona]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.getAttribute("data-persona") || "founder";
      if (personaCmdEl) personaCmdEl.textContent = PERSONA_CMDS[key] || PERSONA_CMDS.founder;
    });
  });

  const copyPersonaBtn = document.getElementById("copy-persona-btn");
  if (copyPersonaBtn && personaCmdEl) {
    copyPersonaBtn.addEventListener("click", () => copyText(personaCmdEl.textContent || "", "Command copied"));
  }

  // Case Study Toggle
  const csBadge = document.getElementById("cs-badge");
  const csTitle = document.getElementById("cs-title");
  const csList = document.getElementById("cs-list");
  const CS_STATES = {
    before: {
      badgeClass: "pill pill-warn",
      badgeText: "INITIAL LIVE SCAN",
      title: "53 / 100 — Grade D",
      items: [
        ["pill-bad", "SSR BUG", "6 FAQ answers were embedded solely in client JS chunks, invisible to non-JS search & AI crawlers."],
        ["pill-warn", "SEO", "4 duplicate title suffixes found across /features, /post-a-job, /contact, and /waitlist."],
        ["pill-warn", "A11Y", "50 images missing descriptive alt text plus duplicate 'Funa Vault' keyword entries."],
        ["pill-bad", "GEO", "Missing /llms.txt, /llms-full.txt, and structured FAQPage JSON-LD graph."],
      ],
    },
    after: {
      badgeClass: "pill pill-good",
      badgeText: "POST-FIX VERIFIED",
      title: "100 / 100 — Grade A+",
      items: [
        ["pill-good", "GEO PASS", "Deployed llms.txt, llms-full.txt, and explicit OAI-SearchBot / GPTBot / ClaudeBot allowlist."],
        ["pill-good", "SCHEMA", "Embedded @graph JSON-LD covering Organization, WebSite, and SSR-backed FAQPage."],
        ["pill-good", "SSR FIX", "Promoted FAQ answers & unique route metadata directly into server-rendered layout files."],
        ["pill-good", "PLAYBOOK", "Tailored Escrow + Instant Hire + Mobile Money CRO rewrites & two-sided liquidity launch kit."],
      ],
    },
  };

  function renderCaseStudy(stage) {
    const data = CS_STATES[stage] || CS_STATES.before;
    if (csBadge) {
      csBadge.className = data.badgeClass;
      csBadge.textContent = data.badgeText;
    }
    if (csTitle) csTitle.textContent = data.title;
    if (csList) {
      csList.textContent = "";
      data.items.forEach(([cls, tag, msg]) => {
        const li = document.createElement("li");
        const pill = document.createElement("span");
        pill.className = `pill ${cls}`;
        pill.textContent = tag;
        const txt = document.createElement("span");
        txt.textContent = msg;
        li.append(pill, txt);
        csList.appendChild(li);
      });
    }
  }

  document.querySelectorAll("[data-stage]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-stage]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCaseStudy(btn.getAttribute("data-stage") || "before");
    });
  });

  // Studio Tab Navigation
  document.querySelectorAll("[data-studio]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-studio");
      document.querySelectorAll("[data-studio]").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".studio-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const panel = document.getElementById(`panel-${target}`);
      if (panel) panel.classList.add("active");
    });
  });

  // 1. Live CRO & AI-Slop Analyzer (mirrors Python analyze_copy_cro)
  const SLOP_WORDS = [
    "revolutionary", "game-changing", "game changing", "unleash", "unlock the power",
    "seamlessly", "next-generation", "next-gen", "cutting-edge", "synergy",
    "delve", "tapestry", "elevate", "supercharge", "paradigm shift",
    "world-class", "all-in-one magic", "transformative"
  ];
  const CTA_RE = /\b(?:get started|start free|try free|book a demo|install|pip install|npx |uvx |brew install|sign up|launch|download|deploy now|join waitlist)\b/i;
  const PROOF_RE = /(?:\b\d+(?:\.\d+)?%|\b\d+x\b|\b\d+\s*(?:ms|seconds|minutes|users|teams|stars|tests|rules|checks)\b|\b(?:benchmark|case study|testimonial|trusted by|open-source|mit license|soc2|gdpr|zero-dependency)\b)/gi;

  const PRESETS = {
    strong: {
      name: "OrbitDB",
      arch: "devtools",
      text: "Cut Postgres query latency by 65% in 2 minutes. Trusted by 1,200 engineering teams under MIT License. Install now: pip install orbitdb",
    },
    weak: {
      name: "CloudNova",
      arch: "b2b_saas",
      text: "Our revolutionary next-generation platform seamlessly unleashes cutting-edge synergy to elevate and transform workflows.",
    },
    marketplace: {
      name: "Funa Gigs",
      arch: "marketplace_app",
      text: "Hire verified local taskers in minutes and fund jobs safely through escrow protection. Download the app or get started free today.",
    },
    ecommerce: {
      name: "RoastCart",
      arch: "ecommerce",
      text: "Single-origin coffee roasted daily with 24-hour dispatch, verified buyer ratings, and free shipping over $35. Try free sample pack now.",
    },
  };

  const croProduct = document.getElementById("cro-product");
  const croArch = document.getElementById("cro-archetype");
  const croInput = document.getElementById("cro-input");

  function buildRewrites(name, arch) {
    if (arch === "marketplace_app") {
      return {
        pas: `Stop risking cash on unverified word-of-mouth referrals. ${name} matches you with ID-verified local taskers in minutes and holds every payment in escrow until the job is done.`,
        jtbd: `${name}: Post a job for free, compare transparent bids or use Instant Hire, and release payment only when both sides confirm completion.`,
        metric: `Hire verified help or find paid local gigs in minutes with ${name} — 100% escrow-protected payouts and live map matching.`,
      };
    }
    if (arch === "ecommerce") {
      return {
        pas: `Tired of slow shipping and guessing quality online? ${name} delivers vetted products to your door with transparent pricing and hassle-free returns.`,
        jtbd: `${name}: Compare exact specs, check real-time stock, and check out in 30 seconds with tracked delivery and a 30-day satisfaction guarantee.`,
        metric: `Shop ${name} with confidence — 24-hour dispatch, verified buyer ratings, and 30-second one-click checkout.`,
      };
    }
    if (arch === "b2b_saas") {
      return {
        pas: `Manual bottlenecks cost teams hours every week. ${name} automates your core workflow in 60 seconds with measurable time savings — start free today.`,
        jtbd: `${name}: Give operators an auditable, high-leverage workflow built for teams that measure ROI in minutes saved, not quarters spent.`,
        metric: `Ship twice as fast with ${name} — save 8+ hours per team weekly with zero complex onboarding.`,
      };
    }
    return {
      pas: `Stop losing hours to fragmented scripts and setup drift. ${name} automates the entire pipeline in under 60 seconds with zero config — install free in one command.`,
      jtbd: `${name}: The deterministic CLI & workflow engine for teams that need verified results in minutes instead of weeks.`,
      metric: `Ship faster with ${name} — cut setup time by 90%, verify every check locally, and go live in 1 command.`,
    };
  }

  function evaluateCro() {
    if (!croInput || !croProduct || !croArch) return;
    const raw = croInput.value.trim();
    const cleaned = raw.replace(/```[\s\S]*?```/g, " ").replace(/`[^`\n]+`/g, " ");
    const low = cleaned.toLowerCase();
    const slopFound = SLOP_WORDS.filter((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(low));
    const words = cleaned.match(/[A-Za-z0-9']+/g) || [];
    const sentences = cleaned.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
    const avgLen = words.length / Math.max(1, sentences.length);
    const hasCta = CTA_RE.test(cleaned);
    const proofMatches = cleaned.match(PROOF_RE) || [];
    const hasNumbers = /\b\d+/.test(cleaned);

    let clarity = 85;
    if (avgLen > 26) clarity -= 20;
    if (words.length < 6) clarity -= 25;
    clarity -= Math.min(35, slopFound.length * 12);
    clarity = Math.max(15, Math.min(100, clarity));

    const cta = hasCta ? 92 : 35;
    const proof = Math.min(100, 40 + proofMatches.length * 20 + (hasNumbers ? 15 : 0));
    const antiSlop = Math.max(0, 100 - slopFound.length * 22);
    const overall = Math.round(clarity * 0.3 + cta * 0.25 + proof * 0.25 + antiSlop * 0.2);

    const setStat = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = `${val}/100`;
    };
    setStat("stat-overall", overall);
    setStat("stat-clarity", clarity);
    setStat("stat-cta", cta);
    setStat("stat-proof", proof);
    setStat("stat-slop", antiSlop);

    const diagEl = document.getElementById("cro-diagnostics");
    if (diagEl) {
      const notes = [];
      if (slopFound.length) notes.push(`Flagged hype terms: ${slopFound.join(", ")}`);
      if (!hasCta) notes.push("Missing explicit CTA ('Get Started', 'Try Free', or CLI install command)");
      if (!proofMatches.length) notes.push("Add quantified metrics (latency, %, customer count, SLA, or license)");
      if (avgLen > 26) notes.push(`Average sentence is ${avgLen.toFixed(1)} words (target 12-20 words)`);
      diagEl.textContent = notes.length ? `Diagnostics: ${notes.join(" • ")}` : "All CRO clarity, CTA, proof, and anti-slop checks look crisp.";
    }

    const name = croProduct.value.trim() || "Your Product";
    const rw = buildRewrites(name, croArch.value);
    const setText = (id, t) => {
      const el = document.getElementById(id);
      if (el) el.textContent = t;
    };
    setText("rw-pas", rw.pas);
    setText("rw-jtbd", rw.jtbd);
    setText("rw-metric", rw.metric);
  }

  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = PRESETS[btn.getAttribute("data-preset") || "strong"];
      if (!p || !croProduct || !croArch || !croInput) return;
      croProduct.value = p.name;
      croArch.value = p.arch;
      croInput.value = p.text;
      evaluateCro();
    });
  });

  [croProduct, croArch, croInput].forEach((el) => {
    if (el) el.addEventListener("input", evaluateCro);
  });
  evaluateCro();

  // 2. GEO & Schema Asset Builder
  const genName = document.getElementById("gen-name");
  const genUrl = document.getElementById("gen-url");
  const genDesc = document.getElementById("gen-desc");
  const genArch = document.getElementById("gen-arch");
  const genPreview = document.getElementById("gen-preview");
  let activeGenFile = "llms.txt";

  function buildGeneratedAssets() {
    const name = (genName?.value || "PulseForge").trim();
    const url = (genUrl?.value || "https://pulseforge.dev").trim().replace(/\/+$/, "");
    const desc = (genDesc?.value || "Automated workflow execution with zero external configuration.").trim();
    const arch = genArch?.value || "devtools";
    const schemaType = arch === "ecommerce" ? "Product" : arch === "marketplace_app" ? "Organization" : "SoftwareApplication";

    const schemaObj = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", name, url, description: desc },
        {
          "@type": schemaType,
          name,
          url,
          description: desc,
          ...(schemaType === "SoftwareApplication" ? { applicationCategory: "DeveloperApplication", operatingSystem: "macOS, Linux, Windows" } : {}),
        },
      ],
    };

    const jsonLd = JSON.stringify(schemaObj, null, 2);

    return {
      "llms.txt": `# ${name}\n\n> ${desc}\n\n## Core Documentation\n\n- [Homepage](${url}/): Product overview, interactive demo, and primary workflow.\n- [Full AI Context](${url}/llms-full.txt): Complete documentation, architecture notes, and FAQs.\n\n## Key Capabilities\n\n- Archetype: ${arch}\n- Canonical Domain: ${url}\n- Automated verification and deterministic outputs.\n`,
      "SEO_SCHEMA.jsonld": jsonLd,
      "HEAD_TAGS.html": `<title>${name} — Verified Production Platform</title>\n<meta name="description" content="${desc}" />\n<link rel="canonical" href="${url}/" />\n<meta property="og:type" content="website" />\n<meta property="og:title" content="${name}" />\n<meta property="og:description" content="${desc}" />\n<meta property="og:url" content="${url}/" />\n<meta property="og:image" content="${url}/og-image.png" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${name}" />\n<meta name="twitter:description" content="${desc}" />\n<script type="application/ld+json">\n${jsonLd}\n</script>`,
      "robots.txt": `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`,
      "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${url}/</loc>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${url}/llms.txt</loc>\n    <priority>0.8</priority>\n  </url>\n</urlset>\n`,
    };
  }

  function renderGenPreview() {
    if (!genPreview) return;
    const files = buildGeneratedAssets();
    genPreview.textContent = files[activeGenFile] || "";
  }

  document.querySelectorAll("[data-genfile]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-genfile]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeGenFile = btn.getAttribute("data-genfile") || "llms.txt";
      renderGenPreview();
    });
  });

  [genName, genUrl, genDesc, genArch].forEach((el) => {
    if (el) el.addEventListener("input", renderGenPreview);
  });

  document.getElementById("copy-gen-btn")?.addEventListener("click", () => {
    copyText(genPreview?.textContent || "", `${activeGenFile} copied`);
  });

  document.getElementById("download-gen-btn")?.addEventListener("click", () => {
    const content = genPreview?.textContent || "";
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = activeGenFile;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast(`Downloaded ${activeGenFile}`);
  });
  renderGenPreview();

  // 3. 18-Rule Rubric Explorer
  const RULES = [
    ["MKT001", "Technical SEO", "high", 7, "Missing page <title> or framework metadata.title — add 35-60 char keyword + brand title."],
    ["MKT002", "Technical SEO", "high", 6, "Missing or weak meta description — add 110-155 char outcome summary."],
    ["MKT003", "Technical SEO", "medium", 3, "Missing canonical link declaration — set rel=\"canonical\" or alternates.canonical."],
    ["MKT004", "Technical SEO", "medium", 2, "Missing sitemap.xml or dynamic sitemap route (app/sitemap.ts)."],
    ["MKT005", "Technical SEO", "low", 2, "Missing primary <h1> or <img> elements missing descriptive alt text."],
    ["MKT006", "GEO & AI Search", "high", 8, "Missing /llms.txt index following llmstxt.org Markdown hierarchy."],
    ["MKT007", "GEO & AI Search", "medium", 4, "Missing /llms-full.txt deep retrieval pack for AI answer engines."],
    ["MKT008", "GEO & AI Search", "medium", 5, "Missing robots.txt or AI crawler Allow rules (GPTBot, ClaudeBot, PerplexityBot)."],
    ["MKT009", "GEO & AI Search", "low", 3, "Low factual citability density or client-only FAQ answers unmounted in SSR HTML."],
    ["MKT010", "Structured Data", "high", 11, "Missing Schema.org JSON-LD graph (SoftwareApplication, Organization, Product, FAQPage)."],
    ["MKT011", "Structured Data", "low", 4, "Missing manifest.webmanifest or manifest.json metadata."],
    ["MKT012", "Social & Viral Graph", "high", 10, "Missing OpenGraph metadata (og:title, og:description, og:image)."],
    ["MKT013", "Social & Viral Graph", "medium", 5, "Missing X / Twitter summary_large_image card metadata."],
    ["MKT014", "CRO & Copy Clarity", "high", 7, "Missing clear above-the-fold Call-to-Action or quickstart command."],
    ["MKT015", "CRO & Copy Clarity", "medium", 4, "AI-slop filler terms detected in visible marketing copy (code blocks excluded)."],
    ["MKT016", "CRO & Copy Clarity", "medium", 4, "Low social proof density (missing benchmarks, numbers, test counts, or license)."],
    ["MKT017", "Launch & Growth", "medium", 10, "Missing LAUNCH_PLAYBOOK.md & PROGRAMMATIC_SEO.md growth positioning."],
    ["MKT018", "Launch & Growth", "low", 5, "No analytics or privacy-friendly attribution hook (Plausible, PostHog, Umami, Fathom)."],
  ];

  const rubricSearch = document.getElementById("rubric-search");
  const rubricPillar = document.getElementById("rubric-pillar");
  const rubricTbody = document.getElementById("rubric-tbody");

  function renderRubric() {
    if (!rubricTbody) return;
    const q = (rubricSearch?.value || "").trim().toLowerCase();
    const p = rubricPillar?.value || "ALL";
    rubricTbody.textContent = "";

    RULES.filter(([id, pillar, , , desc]) => {
      if (p !== "ALL" && pillar !== p) return false;
      if (q && !`${id} ${pillar} ${desc}`.toLowerCase().includes(q)) return false;
      return true;
    }).forEach(([id, pillar, sev, pts, desc]) => {
      const tr = document.createElement("tr");
      const tdId = document.createElement("td");
      const code = document.createElement("code");
      code.textContent = id;
      tdId.appendChild(code);

      const tdPillar = document.createElement("td");
      tdPillar.textContent = pillar;

      const tdSev = document.createElement("td");
      const badge = document.createElement("span");
      badge.className = `pill ${sev === "high" ? "pill-bad" : sev === "medium" ? "pill-warn" : "pill-info"}`;
      badge.textContent = sev.toUpperCase();
      tdSev.appendChild(badge);

      const tdPts = document.createElement("td");
      tdPts.textContent = `+${pts}`;

      const tdDesc = document.createElement("td");
      tdDesc.textContent = desc;

      tr.append(tdId, tdPillar, tdSev, tdPts, tdDesc);
      rubricTbody.appendChild(tr);
    });
  }

  [rubricSearch, rubricPillar].forEach((el) => {
    if (el) el.addEventListener("input", renderRubric);
  });
  renderRubric();

  // 12 Output Artifacts Explorer
  const OUTPUT_SAMPLES = {
    "AUDIT_REPORT.md": ["Impact-Sorted Checklist", `# GrowthPilot Audit Report — PulseForge\n- Score: 84/100 (Grade B)\n\n## Prioritized Action Plan (Sorted by Score Impact)\n| Rule | Potential Gain | Finding |\n| MKT010 | +11 pts | Missing Schema.org JSON-LD |\n| MKT012 | +10 pts | Missing OpenGraph social cards |`],
    "HEAD_TAGS.html": ["Drop-In <head> Block", `<title>PulseForge — Automated Release Telemetry</title>\n<meta name="description" content="Catch deploy regressions in 10 seconds with zero config." />\n<link rel="canonical" href="https://pulseforge.dev/" />\n<meta property="og:image" content="https://pulseforge.dev/og-image.png" />`],
    "SEO_SCHEMA.jsonld": ["Validated Schema Graph", `{\n  "@context": "https://schema.org",\n  "@graph": [\n    { "@type": "WebSite", "name": "PulseForge", "url": "https://pulseforge.dev" },\n    { "@type": "SoftwareApplication", "name": "PulseForge", "applicationCategory": "DeveloperApplication" }\n  ]\n}`],
    "llms.txt": ["AI Search Index", `# PulseForge\n\n> Automated canary gating and release telemetry in 10 seconds.\n\n## Core Documentation\n- [Quickstart](https://pulseforge.dev/docs): 1-command CLI installation.\n- [Full Context](https://pulseforge.dev/llms-full.txt): Architecture & FAQs.`],
    "llms-full.txt": ["Extended LLM Knowledge", `# PulseForge — Full AI Knowledge Pack\n\n- Zero config overhead\n- SARIF 2.1.0 native CI export\n- Supports GitHub Actions, Vercel, and Docker`],
    "robots.txt": ["Crawler Allowlist", `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: GPTBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nSitemap: https://pulseforge.dev/sitemap.xml`],
    "sitemap.xml": ["XML Route Index", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://pulseforge.dev/</loc></url>\n  <url><loc>https://pulseforge.dev/pricing</loc></url>\n</urlset>`],
    "manifest.webmanifest": ["PWA Web Manifest", `{\n  "name": "PulseForge",\n  "short_name": "PulseForge",\n  "start_url": "/",\n  "display": "standalone",\n  "theme_color": "#38bdf8"\n}`],
    "LAUNCH_PLAYBOOK.md": ["14-Day Distribution Plan", `# PulseForge Zero-to-One Launch Playbook\n- Day 1: Show HN & GitHub Release\n- Day 2: Dev.to Architecture Deep Dive\n- Day 3-7: Programmatic Comparison Pages & Outreach`],
    "PROGRAMMATIC_SEO.md": ["High-Intent Keyword Matrix", `# Programmatic SEO Blueprint\n- Keyword Cluster: [Tool] alternative with SARIF CI support\n- Hub Page: /integrations/*\n- Internal Link Pattern: Hub -> Spokes -> Docs`],
    "growthpilot-report.html": ["Offline HTML Dashboard", `<!DOCTYPE html> Self-contained interactive HTML Command Center with 6-pillar gauge, multi-page route scorecard, copyable assets, and PDF print export.`],
    "growth-summary.json": ["CI/CD JSON Scorecard", `{\n  "tool": "growthpilot",\n  "version": "1.4.0",\n  "score": 100,\n  "grade": "A+",\n  "findings": []\n}`],
  };

  const outTitle = document.getElementById("out-title");
  const outBadge = document.getElementById("out-badge");
  const outCode = document.getElementById("out-code");

  function showOutputFile(key) {
    const entry = OUTPUT_SAMPLES[key] || OUTPUT_SAMPLES["AUDIT_REPORT.md"];
    if (outTitle) outTitle.textContent = key;
    if (outBadge) outBadge.textContent = entry[0];
    if (outCode) outCode.textContent = entry[1];
  }

  document.querySelectorAll("[data-outfile]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-outfile]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      showOutputFile(btn.getAttribute("data-outfile") || "AUDIT_REPORT.md");
    });
  });
  showOutputFile("AUDIT_REPORT.md");
})();
