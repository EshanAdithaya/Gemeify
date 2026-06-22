# Builder stage
FROM node:20-bullseye AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci

COPY . ./
RUN npm run build

# Runtime stage
FROM node:20-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "dist/main"]
