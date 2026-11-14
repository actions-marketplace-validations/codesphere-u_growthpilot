# Security Policy

## Reporting a Vulnerability

If you discover a security issue in **GrowthPilot** (for example command injection, path traversal during `--fix`, unsafe HTML/JS escaping in `growthpilot-report.html`, or SSRF/infinite-read bugs in live URL scanning), please report it privately before disclosing publicly:

- **GitHub Security Advisories**: Open a private advisory at `https://github.com/codesphere-u/growthpilot/security/advisories/new`.
- Do not open public issues with exploit payloads against live targets.

## Built-in Safety Guarantees

- **Zero External Dependencies**: Runs purely on the Python 3.10+ standard library.
- **No Remote Telemetry**: GrowthPilot never uploads your code, copy, or audit reports anywhere.
- **Bounded Reads & Timeouts**: All HTTP fetches enforce `timeout=10` and a 2 MB maximum response size.
- **Strict XSS Escaping**: All inspected HTML/JS strings embedded into `growthpilot-report.html` are escaped via `html.escape` and JSON `<`/`>`/`&` unicode escapes (`\u003c`).
- **Directory Scope Protection**: Refuses to scan filesystem root (`/`) or user home (`~`) without `--allow-home`.
