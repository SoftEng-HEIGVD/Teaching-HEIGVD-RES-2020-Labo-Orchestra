FROM node:15.13.0-alpine

COPY package.json .
COPY package-lock.json .
COPY ./src ./src
RUN npm install --production
EXPOSE 2205
ENTRYPOINT ["node", "./src/index.js"]