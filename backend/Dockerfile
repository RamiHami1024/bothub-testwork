
FROM node:20

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "nest", "start", "--watch" ] 
