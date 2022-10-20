# base image
FROM node:14.15.0-alpine AS build
MAINTAINER Ronak <ronak.thacker@smartsensesolutions.com>

# set working directory
RUN mkdir -p /usr/src/app/frontend
WORKDIR /usr/src/app/frontend

ENV PATH=${PATH}:./node_modules/.bin
ENV NODE_PATH=/usr/src/app/frontend/node_modules

# copy package.json seperately for caching package installation
ADD package.json ./
ADD package-lock.json ./
RUN npm ci

RUN ngcc

# copy source code
ADD . .

# build expert
RUN ng build
# compress
RUN node brotli_compress.js


FROM nginx:1.17.9-alpine

# WORKDIR /etc/nginx

COPY --from=build /usr/src/app/frontend/dist/edc-frontend /usr/share/nginx/html

# ADD nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d

EXPOSE 80
