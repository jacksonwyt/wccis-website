#!/bin/bash

# Backend Deployment Script

# Exit on error
set -e

echo "Starting backend deployment..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building the application..."
npm run build

# Optional: Run tests
# echo "Running tests..."
# npm test

echo "Backend build complete and ready for deployment!"

# For traditional hosting:
# echo "Deploying to production server..."
# rsync -avz --delete dist/ user@your-server:/path/to/backend/dist/
# rsync -avz package.json user@your-server:/path/to/backend/
# rsync -avz .env.production user@your-server:/path/to/backend/.env

# For PM2 process management (if using a traditional server):
# echo "Restarting PM2 process..."
# ssh user@your-server "cd /path/to/backend && pm2 restart app.js"

echo "Deployment complete!" 