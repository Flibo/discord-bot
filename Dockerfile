FROM node:8.6-alpine

RUN apk add --update-cache build-base python git

WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install nodemon -g
RUN npm install --quiet

COPY . /app

CMD ["npm", "start"]