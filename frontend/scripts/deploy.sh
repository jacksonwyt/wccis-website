#!/bin/bash

# Frontend Deployment Script

# Exit on error
set -e

echo "Starting frontend deployment..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building the application..."
npm run build

# Optional: Run tests
# echo "Running tests..."
# npm test

echo "Frontend build complete and ready for deployment!"

# For deployment platforms like Vercel, you might not need additional steps
# as they handle the deployment process once you push to your repository

# For traditional hosting:
# echo "Deploying to production server..."
# rsync -avz --delete .next/ user@your-server:/path/to/frontend/.next/
# rsync -avz --delete public/ user@your-server:/path/to/frontend/public/
# rsync -avz package.json user@your-server:/path/to/frontend/
# rsync -avz next.config.js user@your-server:/path/to/frontend/

echo "Deployment complete!" 