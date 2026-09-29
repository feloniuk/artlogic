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

if ! command -v pm2 > /dev/null; then
  echo "==> Installing pm2"
  npm install -g pm2
fi

echo "==> (Re)starting app on 127.0.0.1:$APP_PORT"
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  PORT=$APP_PORT NODE_ENV=production pm2 restart "$APP_NAME" --update-env
else
  PORT=$APP_PORT NODE_ENV=production pm2 start app.js --name "$APP_NAME" --interpreter "$NODE_BIN"
fi
pm2 save

# Поднимаем pm2 (и artlogic) после перезагрузки сервера
CRON_LINE="@reboot . \$HOME/.nvm/nvm.sh && pm2 resurrect"
if ! crontab -l 2>/dev/null | grep -qF "pm2 resurrect"; then
  (crontab -l 2>/dev/null; echo "$CRON_LINE") | crontab -
  echo "==> Added @reboot pm2 resurrect to crontab"
fi

for _ in $(seq 1 15); do
  if curl -sfI "http://127.0.0.1:$APP_PORT/" > /dev/null; then
    echo "==> App responds on 127.0.0.1:$APP_PORT"
    break
  fi
  sleep 1
done
if ! curl -sfI "http://127.0.0.1:$APP_PORT/" > /dev/null; then
  echo "==> App is NOT responding, last logs:" >&2
  pm2 logs "$APP_NAME" --lines 40 --nostream
  exit 1
fi

echo "==> Deploy finished"
