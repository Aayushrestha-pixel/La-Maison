FROM node:18-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM gcr.io/distroless/nodejs18-debian12:nonroot
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY routes ./routes
COPY controllers ./controllers
COPY app.js ./
COPY la-maison-openapi.yaml ./

EXPOSE 8000
CMD ["app.js"]