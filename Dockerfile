# Steg 1: Bygg React-applikationen
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# Steg 2: Servera den färdigbyggda applikationen
FROM nginxinc/nginx-unprivileged:alpine AS final

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]