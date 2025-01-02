FROM node:20-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/socket/package.json pnpm-lock.yaml ./socket/
COPY packages/*/package.json pnpm-lock.yaml ./packages/

RUN pnpm --filter @super-tic-tac-toe/socket install

COPY packages ./packages
COPY apps/socket ./socket

RUN pnpm --filter @super-tic-tac-toe/socket build

FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/socket/dist .

EXPOSE 8443

ENTRYPOINT ["node", "index.js"]