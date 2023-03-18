# Dockerfile

# base image
FROM node:current-alpine

# create & set working directory
RUN mkdir -p /app
WORKDIR /app

# copy source files
COPY . /app

# install dependencies
RUN npm install -g pnpm
RUN pnpm install

# start app
RUN pnpm run build
EXPOSE 3000
CMD pnpm run start
