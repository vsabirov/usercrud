FROM node:alpine

RUN mkdir -p /backend
WORKDIR /backend

RUN npm i -g pnpm

ADD package.json tsconfig.json tsconfig.build.json ./

RUN pnpm i

ADD src ./

RUN pnpm run build

CMD ["pnpm run start:prod"]