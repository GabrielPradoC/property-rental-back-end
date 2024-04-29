FROM node:18.19.1-alpine3.19

WORKDIR /app

COPY ./ /app
RUN npm install

CMD ["npm", "run", "start:dev"]