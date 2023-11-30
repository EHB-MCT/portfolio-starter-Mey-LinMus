FROM node:16.0-alpine

WORKDIR /usr/images/api
COPY package*.json .

RUN npm install --quiet
COPY ./src ./src


ENV git_work_tree=/usr/images/api/ git_dir=/usr/.git

RUN apk update && \
    apk add git

CMD ["npm", "run", "dev"]