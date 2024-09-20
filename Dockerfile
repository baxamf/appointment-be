FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [ "sh", "-c", "npm run start:prod" ]

