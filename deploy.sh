#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="/home/felon007/artlogic.com.ua"
cd "$APP_ROOT"

echo "==> Pulling latest changes"
git pull origin main

echo "==> Installing dependencies"
npm install

echo "==> Generating Prisma client"
npm run prisma:generate

echo "==> Building project"
npm run build

echo "==> Setting permissions"
find "$APP_ROOT" \
  \( -path "$APP_ROOT/node_modules" -o -path "$APP_ROOT/.git" -o -path "$APP_ROOT/.next" \) -prune \
  -o -type d -print0 | xargs -0 --no-run-if-empty chmod 755
find "$APP_ROOT" \
  \( -path "$APP_ROOT/node_modules" -o -path "$APP_ROOT/.git" -o -path "$APP_ROOT/.next" \) -prune \
  -o -type f -print0 | xargs -0 --no-run-if-empty chmod 644
chmod 644 app.js
chmod 600 .env

mkdir -p tmp
touch tmp/restart.txt

echo "==> Deploy finished, Passenger will restart the app"
