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

# Install minimal dependencies for Chromium (bundled with Puppeteer)
RUN apt-get update && apt-get install -y \
    ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libcups2 libdbus-1-3 libdrm2 libxkbcommon0 libnspr4 libnss3 \
    libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libgtk-3-0 \
    libpango-1.0-0 libpangocairo-1.0-0 libxcb1 libxshmfence1 ffmpeg \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

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
