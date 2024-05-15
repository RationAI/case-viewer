FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN rm -r ./EmpationAPI/tests

RUN export VERSION=$(npm run version)

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# use NEXT_PUBLIC_ prefix for variables that should be visible in browser

# use NEXT_PUBLIC_ prefix for variables that should be visible in browser

# AUTH provider
ENV NEXT_PUBLIC_AUTH_PROVIDER_NAME="keycloak"
ENV NEXT_AUTH_OIDC_WELL_KNOWN="https://auth-xopat.dyn.cloud.e-infra.cz/auth/realms/EMPAIA//.well-known/openid-configuration"
ENV NEXT_AUTH_AUTHORIZATION_ENDPOINT=""
ENV NEXT_AUTH_TOKEN_ENDPOINT="https://auth-xopat.dyn.cloud.e-infra.cz/auth/realms/EMPAIA/protocol/openid-connect/token"
ENV NEXT_AUTH_USER_ENDPOINT=""
ENV NEXT_AUTH_OIDC_SCOPE="openid offline_access"
ENV NEXT_AUTH_ISSUER="https://auth-xopat.dyn.cloud.e-infra.cz/auth/realms/EMPAIA"
ENV NEXT_AUTH_CLIENT_ID="WBC_CLIENT"
ENV NEXT_AUTH_CLIENT_SECRET="cEQBj_ZES4XQ9MPZq_pi3pbhbiFeKcIGLZOJxEoY5QLG32BY"

ENV NEXTAUTH_URL="http://localhost:3000"
ENV NEXT_AUTH_SESSION_TOKEN_SECRET="iYt6kNs4eeGJL7zWcVJ/7lvsqRe8jNiXCjtuWzCTE6U=" 

ENV NEXT_PUBLIC_ORIGIN="http://localhost:3000"

ENV NEXT_RUNTIME="nodejs"

# Used for href in slide rows to store visited state
ENV NEXT_PUBLIC_CACHE_KEY="b82d5953-2983-4ed6-80fe-2200889b90b8"

# WBS 
ENV NEXT_PUBLIC_EMPAIA_WB_URL="https://workbench-xopat.dyn.cloud.e-infra.cz/"

#UPLOADER
ENV NEXT_PUBLIC_UPLOADER_LINK="https://rationai.cloud.trusted.e-infra.cz"

# APP CONFIG
ENV NEXT_PUBLIC_APP_CONFIG='{"project":"","local_id_separator":"(\\w{0,5})\\.(\\w{0,5})\\.\\w\\..*","local_id_hint":"Separator splits id into 2 groups, named id_part_<index>, use them in specification of hierarchy, you can also use year, month, day","hierarchy_spec":["id_part_1","id_part_2"],"hierarchy_key_overrides": {"id_part_1": {"": "Public"},"id_part_2": {"": "Public"}},"slide_mask_separator":"\\w{0,5}\\.\\w{0,5}.(\\w)\\..*","search_keys":["year","month","day","description","identifier","tissues","stains","id_part_1","id_part_2"], "settings":{"allowAnnotationPresets":true}}'
# \\w{0,5}\\.\\w{0,5}\\.\\w\\.\\w*-?[0-9]{4}_([0-9]*)([0-9]{2}).*

# XOPAT
ENV NEXT_PUBLIC_XOPAT_URL="https://app-xopat.dyn.cloud.e-infra.cz/"
ENV NEXT_PUBLIC_XOPAT_OPEN_METHOD="GET"

# Unauthorized mode
ENV NEXT_PUBLIC_NO_AUTH=false
ENV NEXT_PUBLIC_NO_AUTH_USER_ID="anonymous"


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]