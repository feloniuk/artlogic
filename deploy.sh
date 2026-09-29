#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="$HOME/artlogic.com.ua"
APP_NAME="artlogic"
APP_PORT=3001
cd "$APP_ROOT"

# На сервере системный Node 16, а Next 14 / resend требуют >= 20 — берём из nvm
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  set +u
  . "$HOME/.nvm/nvm.sh"
  nvm use > /dev/null
  set -u
fi
NODE_BIN="$(command -v node)"
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "Node $(node -v) is too old, need >= 20 (install via nvm)" >&2
  exit 1
fi
echo "==> Using Node $(node -v) at $NODE_BIN"

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
  PORT=$APP_PORT NODE_ENV=production npx pm2 start app.js --name "$APP_NAME" --interpreter "$NODE_BIN"
fi
npx pm2 save

echo "==> Deploy finished"
