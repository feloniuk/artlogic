#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="$HOME/artlogic.com.ua"
APP_NAME="artlogic"
APP_PORT=3001
cd "$APP_ROOT"

echo "==> Installing dependencies"
npm install

echo "==> Generating Prisma client"
npm run prisma:generate

echo "==> Building project"
npm run build

echo "==> Setting permissions"
chmod 600 .env

echo "==> (Re)starting app on 127.0.0.1:$APP_PORT"
if npx pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  PORT=$APP_PORT NODE_ENV=production npx pm2 restart "$APP_NAME" --update-env
else
  PORT=$APP_PORT NODE_ENV=production npx pm2 start app.js --name "$APP_NAME"
fi
npx pm2 save

echo "==> Deploy finished"
