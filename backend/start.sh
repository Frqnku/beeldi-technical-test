#!/bin/sh

until pg_isready -h db -p 5432; do
  echo "Waiting for database..."
  sleep 2
done

pnpm prisma migrate dev --name init
pnpm prisma migrate deploy
pnpm seed
pnpm start