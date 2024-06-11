FROM node:20

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN mkdir -p /app
WORKDIR /app
RUN apt-get update  \
    && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
      chromium chromium-sandbox fonts-ipafont-gothic fonts-wqy-zenhei \
      fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1
COPY package*.json ./

RUN npm install
COPY .. .
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "npm run tachio:migrate:docker && npm run linearlite:migrate:docker && node --env-file .env api.js"]
