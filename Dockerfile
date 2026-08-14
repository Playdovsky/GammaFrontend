FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

FROM nginx:alpine as production-stage

ENV PORT=8080

COPY --from=build-stage /app/dist /app

COPY nginx.conf.template /etc/nginx/nginx.conf.template

EXPOSE 8080

CMD ["/bin/sh", "-c", "envsubst '$BACKEND_URL $BACKEND_HOST $PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]

# template from Vue CLI docs: https://cli.vuejs.org/guide/deployment.html#docker-nginx
# To run locally use
# docker run -d \
#  -p 8080:8080 \
#  -e BACKEND_URL="http://host.docker.internal:8000" \
#  -e BACKEND_HOST="host.docker.internal:8000" \
#  --name frontend-app \
#  gamma-frontend