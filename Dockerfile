# Builds Angular app with node and deploys to nginx
# PORT env is provided for compatibility with hosting solutions that change the exposed port
# of the web container - Heroku I'm looking at you
# PORT allows a container to be instantiated locally on a default port of 4200 or to be overridden
# The port mapping must use the value specified by the PORT env entry
# to use defaults locally:
#  docker run -d -it -p:9090:4200/tcp --name cpas-control-centre-ui davisruk/cpas-control-centre
# to override defaults locally
#  docker run -d -it -e PORT=9999 -p:9090:9999/tcp --name cpas-control-centre-ui davisruk/cpas-control-centre

FROM node:15.0.1-alpine3.12 AS compile-image
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
FROM nginx:latest
ENV PORT=4200
COPY --from=compile-image /app/dist/cpas-control-centre /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
