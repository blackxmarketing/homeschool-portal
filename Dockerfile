# Production image. The SQLite database lives in /data. Mount a persistent volume there.
FROM node:22-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# The Droplet has ~1 GB of RAM and 2 GB of swap. Without a ceiling Node stops
# at its own default and dies rather than using the swap, which is what broke
# every deploy once the app grew. Slower, but it finishes.
ENV NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--max-old-space-size=1536
RUN npm run build
# Focus Buddy (the Chrome extension) as a zip, for the download on the parent Settings page.
# Never blocks a deploy: if it fails, the portal still ships without the download.
RUN mkdir -p /app/downloads && ((node extension/build.mjs && node extension/zip.mjs && cp extension/focus-buddy-*.zip /app/downloads/) || echo "Focus Buddy zip skipped")

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 DATA_DIR=/data PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
# Teacher portraits and clips (Next serves public/ only if it is copied in).
COPY --from=build /app/public ./public
COPY --from=build /app/downloads ./downloads
RUN mkdir -p /data
VOLUME /data
EXPOSE 3000
CMD ["node", "server.js"]
