FROM node:lts-alpine as chat-angular-builder
LABEL org.opencontainers.image.source="https://github.com/yurinogueira/comitari"

WORKDIR /app

COPY ./frontend/package*.json ./app/

RUN npm install

COPY ./frontend/ /app/

ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Run the web
FROM nginx:stable-alpine as chat-angular
LABEL maintainer="yurinogueira@id.uff.br"

LABEL vendor="Grupinix"

COPY --from=chat-angular-builder /app/dist/out/ /usr/share/nginx/html
COPY ./docker/nginx/prod.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
