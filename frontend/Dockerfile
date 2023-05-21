FROM node:alpine

RUN mkdir -p /frontend
WORKDIR /frontend

RUN npm i -g pnpm

ADD package.json .env ./

RUN pnpm i

ADD public/ ./public
ADD src/ ./src

RUN pnpm run build

EXPOSE 2000

CMD ["pnpm", "run", "start"]