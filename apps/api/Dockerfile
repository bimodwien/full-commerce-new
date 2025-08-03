# Stage build
FROM node:18-alpine AS builder
WORKDIR /app


COPY package.json ./
RUN npm install && npm install -g tsc-alias


COPY prisma ./prisma


RUN npx prisma generate --schema=prisma/schema.prisma


COPY tsconfig.json ./
COPY src/ ./src
RUN npm run build


FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist        ./dist
COPY --from=builder /app/prisma      ./prisma

EXPOSE 8000
CMD ["node", "dist/index.js"]