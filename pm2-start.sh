#!/usr/bin/env bash
# pm2-start.sh

# Go to project directory (where this file lives)
cd "$(dirname "$0")"

# Production env
export NODE_ENV=production

# Port to use for Vite preview / your app
export PORT=3000

# Start Vite preview server for the built app
npm run preview -- --host 0.0.0.0 --port 3000
