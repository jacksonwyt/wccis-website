// Custom server.js for Next.js standalone mode
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 10000;

// Helper function to log errors
const logError = (err, context = '') => {
  console.error(`[ERROR]${context ? ' ' + context : ''}:`, err);
  if (err.stack) {
    console.error(err.stack);
  }
};

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

        // Log incoming requests in production for debugging
        if (process.env.NODE_ENV === 'production') {
          console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);
        }

        // Handle static files from the public directory
        if (
          pathname.startsWith('/_next/') ||
          pathname.startsWith('/static/') ||
          pathname.startsWith('/images/') ||
          pathname.includes('.')
        ) {
          try {
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
          } catch (staticError) {
            logError(staticError, 'Static file handling');
            // Continue to Next.js handler if static file handling fails
          }
        }

        // Let Next.js handle the request
        handle(req, res, parsedUrl).catch(nextError => {
          logError(nextError, 'Next.js request handler');
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end('Internal Server Error');
          }
        });
      } catch (err) {
        logError(err, 'Request processing');
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      }
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    logError(ex, 'Next.js initialization');
    process.exit(1);
  }); 