
FROM node:18-alpine as builder

# set working directory
WORKDIR /app
# copy source manifestos
COPY pnpm-lock.yaml .
COPY package.json .

# install dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

#Copy source files
COPY . .


# start app
RUN pnpm run build

FROM node:18-alpine as runner
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/ ./.next

EXPOSE 3000

RUN npm install -g pnpm
CMD pnpm run start
