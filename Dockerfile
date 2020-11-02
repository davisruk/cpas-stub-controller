FROM node:15.0.1-alpine3.12 AS compile-image
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
FROM nginx:latest
COPY --from=compile-image /app/dist/cpas-control-centre /usr/share/nginx/html