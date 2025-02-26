// Custom server.js for Next.js standalone mode
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

// Get environment variables with fallbacks
const port = parseInt(process.env.PORT, 10) || 10000;
const dev = process.env.NODE_ENV !== 'production';

// Create the Next.js app
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

// Ensure we log any errors that occur during startup
app.prepare()
  .then(() => {
    console.log(`> Next.js app is running in ${dev ? 'development' : 'production'} mode`);
    console.log(`> Environment variables:`);
    console.log(`  - NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`  - NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}`);
    console.log(`  - NEXT_PUBLIC_SITE_URL: ${process.env.NEXT_PUBLIC_SITE_URL}`);
    console.log(`  - PORT: ${port}`);

    createServer((req, res) => {
      try {
        // Parse the URL
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        // Handle static files from the public directory
        if (
          pathname.startsWith('/_next/') ||
          pathname.startsWith('/static/') ||
          pathname.startsWith('/images/') ||
          pathname.includes('.')
        ) {
          const filePath = path.join(__dirname, 'public', pathname);
          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            if (stat.isFile()) {
              // Set cache headers for static assets
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
        }

        // Let Next.js handle the request
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling request:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error('An error occurred during Next.js initialization:');
    console.error(ex);
    process.exit(1);
  }); 