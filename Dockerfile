FROM node:18-alpine as pnpm
RUN npm install -g pnpm

FROM pnpm as deps
WORKDIR /app
COPY pnpm-lock.yaml .
COPY package.json .
RUN pnpm install --frozen-lockfile

FROM pnpm as builder
WORKDIR /app
COPY --from=deps /app/pnpm-lock.yaml .
COPY --from=deps /app/package.json .
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm run build

FROM pnpm as runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/ ./.next
COPY --from=builder /app/prisma/ ./prisma
EXPOSE 3000
CMD pnpm run start
