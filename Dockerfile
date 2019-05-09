FROM node:11-alpine

WORKDIR /code

COPY package.json yarn.lock /code/
RUN yarn --pure-lockfile
COPY . /code/
