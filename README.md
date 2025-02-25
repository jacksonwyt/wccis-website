# WCCIS Website

This repository contains the code for the WCCIS website (wccis.com).

## Project Structure

- **Frontend**: Next.js application in the `frontend/` directory
- **Backend**: Node.js Express API in the `backend/` directory

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup Instructions

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at http://localhost:3000

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The API will be available at http://localhost:5000

## Deployment

For detailed deployment instructions, please refer to the [DEPLOYMENT.md](./DEPLOYMENT.md) file.

### Quick Deployment Options

#### Option 1: Docker Compose

Deploy both frontend and backend using Docker Compose:

```bash
docker-compose up -d
```

#### Option 2: Manual Deployment

1. Build and deploy frontend:
   ```bash
   cd frontend
   bash scripts/deploy.sh
   ```

2. Build and deploy backend:
   ```bash
   cd backend
   bash scripts/deploy.sh
   ```

## Environment Variables

### Frontend

Set these in `.env.local` for development or `.env.production` for production:

- `NEXT_PUBLIC_API_URL`: URL of the backend API
- `NEXT_PUBLIC_SITE_URL`: URL of the frontend site
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID

### Backend

Set these in `.env` for development or `.env.production` for production:

- `PORT`: Port number for the server
- `NODE_ENV`: Environment (development or production)
- `FRONTEND_URL`: URL of the frontend
- Plus other variables for AWS S3, email, etc.

## License

Copyright © 2024 WCCIS. All rights reserved. 