FROM node:18-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --slient
COPY . ./
RUN npm run build

FROM node:18-alpine
WORKDIR /pentago
COPY --from=build /app/build ./
RUN npm install -g serve

CMD [ "serve", "-s", "build/" ]
