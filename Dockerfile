### Multi-stage Dockerfile for building and serving the Vite + Vue application
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies (using package-lock for deterministic installs)
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --silent

# Copy the rest of the app
COPY . .

# Build-time arg for Vite env variable
ARG VITE_API_BASE_URL=""
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build production assets
RUN npm run build

### Serve with nginx (slim image)
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Default Nginx config (overrides default site config)
COPY docker/nginx.conf.template /etc/nginx/conf.d/default.conf

# Create a small entrypoint that can write env config at runtime
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
