# WCCIS Website Deployment Guide

This document provides instructions for deploying the WCCIS website to production.

## Prerequisites

- Domain: wccis.com
- SSL certificates for wccis.com and api.wccis.com
- Server or cloud hosting account (AWS, Digital Ocean, etc.)
- Node.js 18+ installed on the deployment server
- Access to your domain's DNS settings

## Architecture Overview

The application consists of two parts:
- **Frontend**: Next.js application 
- **Backend**: Node.js Express API

## Deployment Options

### Option 1: Vercel + Cloud Hosting (Recommended)

#### Frontend Deployment (Vercel)

1. Create a Vercel account if you don't have one already
2. Connect your repository to Vercel
3. Set up the following environment variables in Vercel:
   - `NEXT_PUBLIC_API_URL=https://api.wccis.com/api`
   - `NEXT_PUBLIC_GA_ID=[your Google Analytics ID]`
   - `NEXT_PUBLIC_SITE_URL=https://wccis.com`
4. Configure your build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Deploy the application
6. Set up your custom domain (wccis.com) in Vercel

#### Backend Deployment (Cloud Provider)

1. Provision a server or container from your preferred cloud provider
2. Set up Node.js environment
3. Clone your repository to the server
4. Navigate to the backend directory
5. Create a `.env` file with your production settings
6. Run deployment script: `bash scripts/deploy.sh`
7. Set up a process manager like PM2:
   ```
   npm install -g pm2
   pm2 start dist/index.js --name wccis-api
   pm2 save
   pm2 startup
   ```
8. Configure Nginx as a reverse proxy

### Option 2: Traditional Hosting

#### Setup DNS

1. Configure your DNS settings:
   - Point `wccis.com` to your frontend server
   - Point `api.wccis.com` to your backend server

#### Frontend Deployment

1. SSH into your frontend server
2. Clone your repository
3. Navigate to the frontend directory
4. Run deployment script: `bash scripts/deploy.sh`
5. Configure Nginx or Apache to serve the static files

#### Backend Deployment

1. SSH into your backend server
2. Clone your repository
3. Navigate to the backend directory
4. Run deployment script: `bash scripts/deploy.sh`
5. Set up PM2 as mentioned above
6. Configure Nginx as a reverse proxy

## Setting up Nginx

### Frontend Nginx Config

```nginx
server {
    listen 80;
    server_name wccis.com www.wccis.com;
    
    # Redirect to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name wccis.com www.wccis.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL configurations
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "DENY";
    add_header X-XSS-Protection "1; mode=block";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.wccis.com;";
    
    # Root directory
    root /path/to/frontend/.next/;
    
    # Next.js static files
    location /_next/static {
        alias /path/to/frontend/.next/static/;
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # Static files
    location /static {
        alias /path/to/frontend/public/static/;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
    
    # Serve other Next.js files
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Backend Nginx Config

```nginx
server {
    listen 80;
    server_name api.wccis.com;
    
    # Redirect to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.wccis.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL configurations
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "DENY";
    add_header X-XSS-Protection "1; mode=block";
    
    # Proxy to Node.js application
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Tasks

1. **Test the deployment**
   - Verify all routes and functionality work as expected
   - Test on different browsers and devices

2. **Set up monitoring**
   - Consider using services like Sentry, LogRocket, or New Relic

3. **Set up backups**
   - Regularly backup your database and any uploaded content

4. **Performance optimization**
   - Run Lighthouse tests and optimize as needed
   - Set up a CDN like Cloudflare for better performance

## Troubleshooting

- **Connectivity issues**: Check DNS settings and ensure proper routing
- **Server errors**: Check logs at `/var/log/nginx/error.log` and PM2 logs
- **SSL issues**: Verify certificate validity and renewal setup

## Maintenance

- Regularly update dependencies
- Monitor server health and performance
- Set up automatic security updates 

## Next.js Standalone Deployment

This project uses Next.js with the `output: 'standalone'` configuration in `next.config.js`. This provides several benefits:

- Creates a minimal production build with reduced dependencies
- Improves startup time and reduces memory usage
- Better compatibility with serverless and containerized environments

### Important Note About Starting the Application

When using the `standalone` output configuration, you **cannot** use the standard `next start` command to start the application. Instead, you must use:

```bash
node .next/standalone/server.js
```

This is reflected in the `render.yaml` configuration and in the package.json scripts:

```json
"start:standalone": "node .next/standalone/server.js"
```

### Node.js Options for Deployment

When deploying to platforms like Render, be careful with the Node.js options you use. Some options are deprecated or not allowed in newer Node.js versions, especially in Node.js 22+. 

For maximum compatibility, it's recommended to only use simple, well-supported flags:

```
NODE_OPTIONS="--max-old-space-size=512"
```

Avoid using the following flags which are no longer supported in recent Node.js versions and will cause deployment failures:
- `--optimize-for-size` 
- `--no-lazy`
- `--gc-interval=100`
- `--max-semi-space-size=16`
- `--max-executable-size=48`

These V8 engine flags were supported in older versions but are being increasingly restricted in newer Node.js versions for security and stability reasons.

### Troubleshooting Deployment Issues

If you encounter a TypeScript error like: `TypeError: Cannot read properties of undefined (reading 'default')`, it's likely that the application is being started with `next start` instead of using the standalone server.

Make sure your deployment platform is using the correct start command:

```bash
# Don't use this with standalone output
npm run start         # This runs: next start

# Use this instead
npm run start:standalone  # This runs: node .next/standalone/server.js
```

For Render deployments, the `startCommand` in `render.yaml` should be set to use the standalone server. 