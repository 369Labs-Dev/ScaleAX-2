# Build context: repository root (docker build -f apps/website/Dockerfile .)
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat \
 && corepack enable && corepack prepare pnpm@9.1.0 --activate
WORKDIR /repo

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN pnpm install --frozen-lockfile --filter "@scaleax/website..."
RUN pnpm exec turbo run build --filter "@scaleax/website..."

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# In a pnpm monorepo, Next traces from the workspace root, so the standalone
# bundle mirrors the repo layout: server.js lives at apps/website/server.js.
COPY --from=builder --chown=nextjs:nodejs /repo/apps/website/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/website/.next/static ./apps/website/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/website/public ./apps/website/public

USER nextjs

EXPOSE 3200
ENV PORT=3200
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/website/server.js"]
