from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_DIR = REPO_ROOT / "skills" / "growthpilot" / "scripts"
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

import growthpilot  # noqa: E402


def test_demo_mode_generates_command_center_and_sarif(tmp_path: Path) -> None:
    out_dir = tmp_path / "demo-out"
    sarif_file = tmp_path / "growthpilot.sarif"
    rc = growthpilot.main(["--demo", "--output-dir", str(out_dir), "--sarif", str(sarif_file)])
    assert rc == 0

    assert (out_dir / "growthpilot-report.html").is_file()
    assert (out_dir / "LAUNCH_PLAYBOOK.md").is_file()
    assert (out_dir / "PROGRAMMATIC_SEO.md").is_file()
    assert (out_dir / "llms.txt").is_file()
    assert (out_dir / "growth-summary.json").is_file()
    assert sarif_file.is_file()

    summary = json.loads((out_dir / "growth-summary.json").read_text(encoding="utf-8"))
    assert 0 < summary["score"] < 100
    assert len(summary["pillars"]) == 6
    assert any(f["rule_id"] == "MKT006" for f in summary["findings"])

    sarif = json.loads(sarif_file.read_text(encoding="utf-8"))
    assert sarif["version"] == "2.1.0"
    assert len(sarif["runs"][0]["tool"]["driver"]["rules"]) == 18


def test_zero_to_one_autofix_raises_score_dramatically(tmp_path: Path) -> None:
    proj = tmp_path / "acme-saas"
    proj.mkdir()
    (proj / "package.json").write_text(
        json.dumps(
            {
                "name": "acme-cloud",
                "description": "Automated Postgres branching and instant preview databases for engineering teams.",
                "dependencies": {"next": "15.0.0"},
            }
        ),
        encoding="utf-8",
    )
    (proj / "README.md").write_text(
        "# Acme Cloud — Instant Postgres Branching\n\n"
        "- **Sub-second clones**: Copy 1TB databases in 400ms with zero storage overhead.\n"
        "- **CI/CD Native**: Automatic database branch per GitHub Pull Request.\n\n"
        "Install CLI: `npx acme-cloud init`\n",
        encoding="utf-8",
    )

    before_prof = growthpilot.scan_directory(proj, site_url_override="https://acmecloud.dev")
    before_audit = growthpilot.evaluate_profile(before_prof)

    out_dir = tmp_path / "fixed-out"
    rc = growthpilot.main(
        [str(proj), "--fix", "--site-url", "https://acmecloud.dev", "--output-dir", str(out_dir)]
    )
    assert rc == 0

    assert (proj / "public" / "llms.txt").is_file()
    assert (proj / "public" / "llms-full.txt").is_file()
    assert (proj / "public" / "robots.txt").is_file()
    assert (proj / "public" / "sitemap.xml").is_file()
    assert (proj / "public" / "manifest.webmanifest").is_file()
    assert (proj / "marketing" / "SEO_SCHEMA.jsonld").is_file()
    assert (proj / "marketing" / "LAUNCH_PLAYBOOK.md").is_file()
    assert (proj / "marketing" / "PROGRAMMATIC_SEO.md").is_file()

    after_summary = json.loads((out_dir / "growth-summary.json").read_text(encoding="utf-8"))
    assert after_summary["score"] >= before_audit["score"] + 30


def test_copy_cro_analyzer_flags_ai_slop_and_rewrites() -> None:
    slop_copy = "Our revolutionary next-generation platform seamlessly unleashes cutting-edge synergy."
    res = growthpilot.analyze_copy_cro(slop_copy, "OrbitDB")
    assert res["anti_slop_score"] < 40
    assert "revolutionary" in res["slop_words"]
    assert "seamlessly" in res["slop_words"]
    assert "OrbitDB" in res["rewrites"]["pas_framework"]

    strong_copy = (
        "Cut Postgres query latency by 65% in 2 minutes. "
        "Trusted by 1,200 engineering teams. Install now: `pip install orbitdb`."
    )
    strong_res = growthpilot.analyze_copy_cro(strong_copy, "OrbitDB")
    assert strong_res["overall_cro_score"] > res["overall_cro_score"]
    assert strong_res["has_cta"] is True


def test_mcp_jsonrpc_server_tools_and_protocol(tmp_path: Path) -> None:
    init_resp = growthpilot.handle_mcp_request({"jsonrpc": "2.0", "id": 1, "method": "initialize"})
    assert init_resp is not None
    assert init_resp["result"]["serverInfo"]["name"] == "growthpilot-mcp"

    list_resp = growthpilot.handle_mcp_request({"jsonrpc": "2.0", "id": 2, "method": "tools/list"})
    assert list_resp is not None
    tool_names = {t["name"] for t in list_resp["result"]["tools"]}
    assert {
        "audit_project",
        "analyze_copy_cro",
        "generate_geo_seo_pack",
        "generate_launch_kit",
        "generate_programmatic_seo",
        "apply_marketing_fixes",
    } == tool_names

    call_cro = growthpilot.handle_mcp_request(
        {
            "jsonrpc": "2.0",
            "id": 3,
            "method": "tools/call",
            "params": {
                "name": "analyze_copy_cro",
                "arguments": {"text": "Revolutionary AI magic", "product_name": "TestApp"},
            },
        }
    )
    assert call_cro is not None
    assert call_cro["result"]["isError"] is False
    parsed_cro = json.loads(call_cro["result"]["content"][0]["text"])
    assert "revolutionary" in parsed_cro["slop_words"]

    proj = tmp_path / "mcp-proj"
    proj.mkdir()
    (proj / "README.md").write_text("# Beam — Fast File Sync\n\nRun `pip install beam-sync` to start in 10s.\n")
    call_fix = growthpilot.handle_mcp_request(
        {
            "jsonrpc": "2.0",
            "id": 4,
            "method": "tools/call",
            "params": {
                "name": "apply_marketing_fixes",
                "arguments": {"target": str(proj), "site_url": "https://beamsync.io"},
            },
        }
    )
    assert call_fix is not None
    fix_data = json.loads(call_fix["result"]["content"][0]["text"])
    assert len(fix_data["written_files"]) >= 7
    assert (proj / "llms.txt").is_file()


def test_broad_root_guard_thresholds_and_zsh_safe_docs(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    monkeypatch.setattr(Path, "home", lambda: tmp_path)
    assert growthpilot.main([str(tmp_path)]) == 2
    assert "refusing to scan broad directory" in capsys.readouterr().err
    assert growthpilot.main(["/"]) == 2

    out_dir = tmp_path / "fail-out"
    assert growthpilot.main(["--demo", "--min-score", "99", "--output-dir", str(out_dir)]) == 1
    assert growthpilot.main(["--demo", "--fail-on", "high", "--output-dir", str(out_dir)]) == 1

    for doc_path in (REPO_ROOT / "README.md", REPO_ROOT / "skills" / "growthpilot" / "SKILL.md"):
        content = doc_path.read_text(encoding="utf-8")
        for match in re.finditer(r"```bash\n(.*?)```", content, flags=re.DOTALL):
            for raw_line in match.group(1).splitlines():
                stripped = raw_line.strip()
                assert not stripped.startswith("#"), f"zsh-unsafe comment in {doc_path.name}: {stripped}"


def test_marketplace_archetype_and_page_audit_diagnostics() -> None:
    prof = growthpilot.ProjectProfile(
        name="Funa Gigs",
        tagline="Funa Gigs — Hire help. Find work. Get paid.",
        description="Uganda's marketplace for quick gigs, local jobs, and trusted taskers. Protected by Funa Vault and paid out via Mobile Money.",
        category="Web Application / SaaS",
        framework="Next.js (Live Deployment)",
        site_url="https://funagigs.com",
        target_label="https://funagigs.com/",
        routes=["/", "/services", "/features", "/post-a-job"],
        features=[
            "Verified Taskers: ID and phone checks on every worker.",
            "Funa Vault: Funds stay protected in escrow until both sides confirm completion.",
        ],
        keywords=["funa gigs", "gigs in uganda", "instant hire", "mobile money"],
        competitors=[],
        install_cmd="open https://funagigs.com",
        play_store_url="https://play.google.com/store/apps/details?id=com.funagigs.app",
        web_app_url="https://app.funagigs.com",
        legal_entity="FunaGig Limited",
        service_categories=[
            "Care & wellness: Support, cleaning, and personal services.",
            "Construction: Skilled labor and site-ready help.",
        ],
        faqs=[
            {
                "q": "Is Funa Gigs free to use?",
                "a": "Yes — creating a profile, browsing gigs, and Instant Hire search are free.",
            }
        ],
    )
    growthpilot._infer_market_positioning(prof)
    assert prof.archetype == "marketplace_app"

    launch_md = growthpilot.generate_launch_kit(prof)
    assert "Two-Sided Marketplace & Mobile App Launch Playbook" in launch_md
    assert "YAML" not in launch_md
    assert "CI/CD" not in launch_md
    assert "Supply & Demand Liquidity Seeding Playbook" in launch_md

    pseo_md = growthpilot.generate_programmatic_seo(prof)
    assert "Care & wellness" in pseo_md
    assert "Payment & Escrow Safety" in pseo_md
    assert "Proprietary cloud" not in pseo_md

    page_html = (
        "<html><head><title>Features — Funa Gigs · Funa Gigs</title></head>"
        "<body><h1>Features</h1><h2></h2><img src='/a.png'></body></html>"
    )
    pa = growthpilot._audit_single_html_page(page_html, "/features", "funa gigs")
    assert pa["has_canonical"] is False
    assert pa["imgs_missing_alt"] == 1
    assert any("Duplicate brand suffix" in i for i in pa["issues"])
    assert any("empty heading" in i for i in pa["issues"])

