FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY api ./api
COPY frontend ./frontend
RUN npm install --production || true
EXPOSE 3000
CMD ["node", "api/server.js"]