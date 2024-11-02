FROM oven/bun:1 as base

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

# Create a release stage
FROM base AS release

# COPY everything from the base stage
COPY --from=base /usr/src/app /usr/src/app

USER bun

EXPOSE 8080

# Start the application
CMD ["bun", "index.ts"]
