# ----------------------------
# 1) Build frontend (Vite/React)
# ----------------------------
FROM node:20-slim AS client
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build


# ----------------------------
# 2) Install server deps
# ----------------------------
FROM node:20-slim AS server
WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci --omit=dev

# Copy server source
COPY server ./


# ----------------------------
# 3) Final runtime image
# ----------------------------
FROM node:20-slim AS runner
WORKDIR /app

# Copy server
COPY --from=server /app/server ./server

# ✅ Copy frontend build into where your Express expects it:
# server/index.js uses: path.join(__dirname, "client-dist")
COPY --from=client /app/dist ./server/client-dist

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "server/index.js"]
