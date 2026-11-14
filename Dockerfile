FROM python:3.12-slim

LABEL org.opencontainers.image.source="https://github.com/codesphere-u/growthpilot"
LABEL org.opencontainers.image.description="Autonomous Zero-to-One Marketing, SEO, GEO/AEO, CRO & Launch Engine with MCP Server"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app
COPY pyproject.toml README.md LICENSE ./
COPY skills ./skills

RUN pip install --no-cache-dir . && useradd -m -u 10001 runner
USER runner
WORKDIR /data

ENTRYPOINT ["growthpilot"]
CMD ["--help"]
