FROM node:16.17.0

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD ["npm", "run", "dev"]