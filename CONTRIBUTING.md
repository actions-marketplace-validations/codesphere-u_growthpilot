# Contributing to GrowthPilot

Thank you for helping make **GrowthPilot** the most accurate, deterministic, and helpful open-source marketing, SEO, GEO/AEO, and CRO engine!

---

## Local Development Setup

```bash
git clone https://github.com/codesphere-u/growthpilot.git
cd growthpilot
uv venv --clear .venv
uv pip install --python .venv/bin/python -e ".[dev]" pip-audit
```

Run the full quality and security verification suite before opening a PR:

```bash
.venv/bin/ruff check .
.venv/bin/mypy
.venv/bin/pytest -v
.venv/bin/pip-audit --skip-editable
```

If you have Claude CLI and BillShock installed locally, also verify plugin schema and spend safety:

```bash
claude plugin validate .
billshock . --fail-on high --min-score 100
```

---

## Engineering & Documentation Standards

1. **Zero Runtime Dependencies**: All core functionality in `skills/growthpilot/scripts/growthpilot.py` must use Python 3.10+ stdlib only (`dependencies = []` in `pyproject.toml`).
2. **Strict Typing**: Must pass `mypy --strict` with zero ignores or `Any` leaks where concrete types fit cleanly.
3. **Zsh-Safe Docs**: Do not place `#` comments inside ` ```bash ` fenced code blocks in `README.md` or `SKILL.md` (users paste directly into `zsh`; enforced by `pytest`).
4. **Network Safety**: Every `urllib.request.urlopen()` call must include an explicit `timeout=` parameter and a bounded byte read limit (`resp.read(2_000_000)`).
5. **Preserve Non-Destructive `--fix`**: Never overwrite user-authored files during `--fix`.
6. **Add Tests for Every Change**: Add deterministic unit tests in `tests/test_growthpilot.py` covering new extractors, archetypes, or rules without making flaky live network calls in pytest.

---

## Ideas Welcome

- Framework-specific extractors (Remix, Nuxt, Hugo, Django, Rails, Shopify Liquid)
- Additional Schema.org entities (`Product`, `LocalBusiness`, `HowTo`, `SoftwareSourceCode`)
- Core Web Vitals & response-header diagnostics (HSTS, compression, cache headers)
- Multi-language copywriting analysis beyond English
