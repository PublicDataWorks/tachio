FROM node:20
RUN mkdir -p /app
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev chromium
COPY package*.json ./
RUN npm install
COPY .. .
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "npm run tachio:migrate:docker && npm run linearlite:migrate:docker && node --env-file .env api.js"]
