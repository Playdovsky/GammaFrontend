FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

FROM nginx:alpine as production-stage

COPY --from=build-stage /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

# template from Vue CLI docs: https://cli.vuejs.org/guide/deployment.html#docker-nginx
# To run locally use: docker run -it -p 8080:8080 --name gamma-frontend playdovsky/gamma-frontend