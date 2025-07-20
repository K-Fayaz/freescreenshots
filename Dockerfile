# Multi-stage build
FROM node:18-alpine AS build

# Build the React frontend
WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm ci

COPY client/ ./client/
RUN cd client && npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy server dependencies and install
COPY server/package*.json ./
RUN npm ci --only=production

# Copy server code
COPY server/ ./

# Copy built React app to server's public directory
COPY --from=build /app/client/dist ./public

# Expose port (Cloud Run uses PORT env variable)
EXPOSE $PORT

# Start the server
CMD ["npm", "start"]