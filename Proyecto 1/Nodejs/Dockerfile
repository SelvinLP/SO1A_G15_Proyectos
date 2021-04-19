FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install mongoose

COPY . .

RUN mkdir -p /elements/procs

CMD [ "node", "index.js" ]
