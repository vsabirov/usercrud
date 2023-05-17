FROM node:alpine

RUN mkdir -p /frontend
WORKDIR /frontend

RUN npm i -g pnpm

ADD package.json ./

RUN pnpm i

ADD src public ./

RUN pnpm run build

CMD ["pnpm run start"]