FROM node:14

WORKDIR /usr/src/app

COPY *.json ./

RUN npm install --only=production

COPY . .

CMD ["npm", "start"]