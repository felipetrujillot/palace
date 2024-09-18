FROM node:22-alpine

RUN mkdir -p /usr/src/palace
WORKDIR /usr/src/palace
COPY . .

#RUN npm install -D oxc-parser
RUN npm install -D oxc-parser
RUN npm ci && npm cache clean --force
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8004

EXPOSE 8004

ENTRYPOINT ["node", ".output/server/index.mjs"]