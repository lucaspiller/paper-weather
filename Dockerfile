FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

FROM node:20-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY --from=builder /app/build/ /app

CMD ["node", "src/server.js"]
