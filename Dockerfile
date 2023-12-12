FROM node:20.10.0

EXPOSE 3000
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/src/app.js"]
