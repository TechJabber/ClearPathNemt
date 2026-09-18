FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY packages/shared ./packages/shared
COPY packages/backend ./packages/backend

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build
RUN pnpm --filter @clear-path/shared build
RUN pnpm --filter @clear-path/backend build

# Expose port
EXPOSE 3001

# Start application
CMD ["pnpm", "--filter", "@clear-path/backend", "start"]
