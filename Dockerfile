FROM node:8.6-alpine

RUN apk add --update-cache build-base python git postgresql bash

WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install --quiet

COPY . /app

CMD ["npm", "start"]