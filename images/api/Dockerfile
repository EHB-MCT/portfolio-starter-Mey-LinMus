FROM node:latest as development
WORKDIR /usr/app
COPY package*.json .
RUN npm install --quiet


FROM node:latest as production
WORKDIR /usr/app
COPY --from=development /usr/app /usr/app
COPY ./ ./
CMD ["npm", "run", "start"]
