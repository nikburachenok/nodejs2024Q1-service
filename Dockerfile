FROM node:20.11.1-alpine as build

WORKDIR /user/app

COPY package*.json .

RUN npm install

COPY . .

FROM node:20.11.1-alpine as main

WORKDIR /user/app

COPY --from=build /user/app /user/app

EXPOSE ${PORT}

CMD npx prisma migrate dev && npm run start:dev