#!/usr/bin/env bash
# pm2-start.sh

# Go to project directory (where this file lives)
cd "$(dirname "$0")"

# Production environment
export NODE_ENV=production

# Port for the Vite preview server / app
export PORT=3000

# Start Vite preview for the built app
npm run preview -- --host 0.0.0.0 --port 3000
