FROM node:20-alpine3.18 AS base
RUN npm i -g pnpm

ENV DIR /project
WORKDIR $DIR

FROM base AS dev

ENV NODE_ENV=development

COPY package*.json $DIR
COPY pnpm-*.yaml $DIR

RUN pnpm install

COPY tsconfig*.json $DIR/
COPY src $DIR/src

EXPOSE $PORT
CMD ["pnpm", "run", "start:dev"]

FROM base AS build

RUN apk update && apk add --no-cache dumb-init

COPY package*.json $DIR
COPY pnpm-*.yaml $DIR
RUN pnpm install

COPY tsconfig*.json $DIR/
COPY src $DIR/src

RUN pnpm run build

FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

USER $USER
EXPOSE $PORT
CMD ["dumb-init", "node", "dist/main.js"]
