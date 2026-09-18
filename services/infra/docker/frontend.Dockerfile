FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY packages/shared ./packages/shared
COPY packages/frontend ./packages/frontend

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build shared types
RUN pnpm --filter @clear-path/shared build

# Build Next.js
RUN pnpm --filter @clear-path/frontend build

# Expose port
EXPOSE 3000

# Start application
CMD ["pnpm", "--filter", "@clear-path/frontend", "start"]
