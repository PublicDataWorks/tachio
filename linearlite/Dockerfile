FROM node:20 as build
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .. .
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
