FROM node:16-alpine

WORKDIR /usr/src/app

RUN npm init -y
RUN npm install express mysql

COPY . .

COPY wait-for-it.sh /usr/local/bin/wait-for-it

EXPOSE 3000

CMD [ "node", "index.js" ]