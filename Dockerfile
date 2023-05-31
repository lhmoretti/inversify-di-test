# Build stage
FROM node:18-alpine as build

# set working directory
WORKDIR /di-test

# copy package.json - package-lock.json - .env
COPY package*.json ./
COPY .env ./

RUN npm install
RUN npm install -g pm2

ADD docker-entrypoint.sh /

COPY ./docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh
RUN ["/docker-entrypoint.sh"]


# copy source code
COPY . .

# expose port 3000
EXPOSE 3000

# Init app
ENTRYPOINT ["/docker-entrypoint.sh"]