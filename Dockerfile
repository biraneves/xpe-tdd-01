FROM node:18.12.1

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn

COPY ./src/ ./src

EXPOSE 3000

CMD ["yarn", "start"]