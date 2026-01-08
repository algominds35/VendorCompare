# Use Node.js 20
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy server code
COPY server/ ./

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
