# Deployment Guide for WCCIS Website

This guide provides instructions for deploying the WCCIS website to Render.

## Prerequisites

- A Render account
- Git repository with your code
- Node.js 22.x or later

## Deployment Steps

### 1. Fork or Clone the Repository

Make sure you have the latest version of the codebase.

### 2. Configure Environment Variables

Ensure all necessary environment variables are set in your Render dashboard:

- `NODE_ENV`: production
- `NEXT_PUBLIC_API_URL`: https://wccis.com/api
- `NEXT_PUBLIC_SITE_URL`: https://wccis.com
- `PORT`: 10000
- `NODE_OPTIONS`: --max-old-space-size=512
- `NEXT_TELEMETRY_DISABLED`: 1

### 3. Deploy Using render.yaml

The easiest way to deploy is using the `render.yaml` file in the repository:

1. Log in to your Render dashboard
2. Click "New" and select "Blueprint"
3. Connect your repository
4. Render will automatically detect the `render.yaml` file and configure the services

### 4. Manual Deployment

If you prefer to deploy manually:

#### Frontend

1. Create a new Web Service in Render
2. Connect your repository
3. Configure the service:
   - **Name**: wccis-frontend
   - **Runtime**: Node
   - **Node Version**: 22.12.0
   - **Root Directory**: frontend
   - **Build Command**:
     ```
     npm ci --no-optional --no-audit --prefer-offline &&
     NODE_ENV=production 
     NEXT_PUBLIC_API_URL=https://wccis.com/api 
     NEXT_PUBLIC_SITE_URL=https://wccis.com 
     NODE_OPTIONS='--max-old-space-size=512' 
     npm run build:render &&
     cp -r public .next/standalone/ &&
     cp -r .next/static .next/standalone/.next/ &&
     cp -r .next/server .next/standalone/.next/ &&
     cp server.js .next/standalone/ &&
     cp test-server.js .next/standalone/ &&
     cp standalone-package.json .next/standalone/package.json &&
     cd .next/standalone && npm install --production --no-optional sharp && cd ../.. &&
     npm prune --production
     ```
   - **Start Command**:
     ```
     NODE_ENV=production 
     NEXT_PUBLIC_API_URL=https://wccis.com/api 
     NEXT_PUBLIC_SITE_URL=https://wccis.com 
     PORT=10000 
     node .next/standalone/server.js
     ```

#### Backend

1. Create a new Web Service in Render
2. Connect your repository
3. Configure the service:
   - **Name**: wccis-backend
   - **Runtime**: Node
   - **Root Directory**: backend
   - **Build Command**: `yarn install && yarn build`
   - **Start Command**: `NODE_ENV=production node dist/index.js`

### 5. Troubleshooting

If you encounter the "Cannot find module './bundle5'" error:

1. Make sure you're using the `build:render` script which includes the fix-standalone.js script
2. Verify that the webpack bundle5 files are being copied correctly
3. Check the Render logs for any other errors

## Understanding the Fix

The error "Cannot find module './bundle5'" occurs because Next.js 15.x's standalone output doesn't properly include all required webpack files. Our solution:

1. We created a `fix-standalone.js` script that copies the missing bundle5 files from the node_modules directory to the standalone build
2. We updated the build process in render.yaml to use this script
3. We simplified the Next.js configuration to reduce potential issues

## Additional Notes

- The frontend uses Next.js 15.1.7 with React 19
- The application is configured to use minimal memory (512MB) to stay within Render's free tier limits
- Static assets are cached for improved performance

For any issues or questions, please contact the development team. 