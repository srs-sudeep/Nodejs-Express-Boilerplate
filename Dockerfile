FROM node:alpine

RUN mkdir -p /usr/src/server && chown -R node:node /usr/src/server

WORKDIR /usr/src/server

COPY package.json bun.lockb ./

USER node

RUN bun install

COPY --chown=node:node . .

EXPOSE 5000
