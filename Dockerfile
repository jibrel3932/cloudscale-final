# CloudScale Final Project - Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies first (layer caching)
COPY app/package.json ./
RUN npm install --omit=dev

# Copy application source
COPY app/ ./

EXPOSE 80

# Healthcheck hits the /health endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost:80/health || exit 1

CMD ["node", "server.js"]
