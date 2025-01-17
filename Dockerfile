# Build stage
FROM node:18 as builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci
RUN npm install -g sequelize-cli

# Copy source
COPY . .

# Production stage
FROM node:18-slim

WORKDIR /usr/src/app

# Install required packages and sequelize-cli
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/* && \
    npm install -g sequelize-cli

# Create non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy built artifacts from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app .

# Set proper ownership
RUN chown -R appuser:appgroup /usr/src/app

# Switch to non-root user
USER appuser

# Set NODE_ENV
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start script that waits for database and runs migrations
CMD ["sh", "-c", "echo 'Waiting for database...' && sleep 10 && echo 'Configurando banco de dados...' && node src/database/init.js && echo 'Starting application...' && npm start"]
