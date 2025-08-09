FROM node:22.18.0-alpine3.21 AS base
WORKDIR /app


FROM base AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY ./server/database/schema.prisma ./server/database/schema.prisma
RUN pnpm prisma generate

COPY . .
RUN pnpm run build


FROM base AS runner

COPY --from=builder /app/node_modules/prisma/package.json ./prisma-package.json
RUN --mount=type=cache,target=/root/.npm npm install -g --save-exact prisma@$(node -p "require('./prisma-package.json').version")

COPY --from=builder /app/.output .
COPY --from=builder /app/server/database/schema.prisma  ./prisma/schema.prisma
COPY --from=builder /app/server/database/migrations  ./prisma/migrations
COPY --from=builder /app/server/database/generated/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node ./server/libquery_engine-linux-musl-openssl-3.0.x.so.node

EXPOSE 3000
CMD ["sh", "-lc", "prisma migrate deploy && exec node /app/server/index.mjs"]
