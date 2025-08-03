FROM node:18-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_BASE_API_URL=http://localhost:8000/api
ENV NEXT PUBLIC_BASE_API_URL=${NEXT_PUBLIC_BASE_API_URL}

COPY package.json next.config.js tsconfig.json ./
COPY package.json next.config.js tsconfig.json \
        tailwind.config.js postcss.config.js ./
RUN npm install

COPY public  ./public
COPY src     ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next        ./.next
COPY --from=builder /app/public       ./public

EXPOSE 3000
CMD ["npm", "run", "serve"]
