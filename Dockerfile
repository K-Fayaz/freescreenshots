# Multi-stage build
FROM node:18-alpine AS build

# Build the React frontend
WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install

COPY client/ ./client/
RUN cd client && chmod +x node_modules/.bin/vite && npm run build

# Production stage - Changed from Alpine to Debian Slim
FROM node:18-slim AS production

WORKDIR /app

# Copy server dependencies and install
COPY server/package*.json ./
RUN npm ci --only=production

# Install Google Chrome and dependencies
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set Chrome as the executable and skip Puppeteer's Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Copy server code
COPY server/ ./

# Copy built React app to server's public directory
COPY --from=build /app/client/dist/ ./public/

# Debug: List what's in the public directory
RUN ls -la ./public

# Create a non-root user for security
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user
USER pptruser

# Set environment variable for port
ENV PORT=8080

# Expose port (Cloud Run uses PORT env variable)
EXPOSE 8080

# Start the server (make sure this matches your package.json start script)
CMD ["node", "index.js"]