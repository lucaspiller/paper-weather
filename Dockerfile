FROM node:20-alpine AS base

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

FROM base AS builder

COPY . .
RUN yarn build

FROM base AS runner

COPY --from=builder /app/build/ /app

CMD ["node", "src/server.js"]