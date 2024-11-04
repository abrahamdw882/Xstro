FROM node:23-alpine
RUN apk add --no-cache git python3 py3-pip build-base cairo-dev jpeg-dev pango-dev giflib-dev
RUN ln -sf python3 /usr/bin/python
WORKDIR /app
RUN git clone  https://github.com/abrahamdw882/Xstro
COPY package*.json ./
RUN npm install --production
EXPOSE 8080
CMD ["npm", "start"]
