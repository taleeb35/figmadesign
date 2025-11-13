#!/usr/bin/env bash
set -e

# Load Node 22 from nvm for the PM2 process
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22 >/dev/null 2>&1 || true

# Run Vite preview on port 3000
exec node node_modules/vite/bin/vite.js preview --host 0.0.0.0 --port "${PORT:-3000}" --strictPort