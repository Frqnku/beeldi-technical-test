FROM node:20-alpine

RUN apk add --no-cache openssl openssl-dev postgresql-client

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

RUN pnpm prisma:generate
RUN pnpm run build

EXPOSE 3000

COPY start.sh .
RUN chmod +x start.sh
RUN chmod +x ./dist/seed.js
CMD ["./start.sh"]
