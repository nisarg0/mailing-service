FROM node:alpine
EXPOSE 8080
COPY . /app
WORKDIR /app
CMD node index.js