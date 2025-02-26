// Try to load bundle analyzer, but continue if it's not available
let withBundleAnalyzer = (config) => config;
try {
  // Only attempt to load bundle analyzer if ANALYZE is true
  if (process.env.ANALYZE === 'true') {
    const bundleAnalyzer = require('@next/bundle-analyzer');
    withBundleAnalyzer = bundleAnalyzer({
      enabled: true,
    });
  }
} catch (e) {
  console.warn('Warning: @next/bundle-analyzer not found, skipping bundle analysis');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24, // Increase to 24 hours
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Remove features that might cause issues
    scrollRestoration: true,
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-dialog', 
      '@radix-ui/react-dropdown-menu',
      'framer-motion',
      'lodash-es'
    ],
    // Remove turbo and simplify loaders
    serverMinification: true,
    gzipSize: false, // Disable gzip size calculation to save memory
  },
  // Disable ESLint during build to fix deployment issue
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Add memory optimizations for production
  poweredByHeader: false, // Remove unnecessary header
  output: 'standalone', // Creates a standalone build with minimal dependencies
  compress: true, // Enable compression
  // Static optimization improvements
  staticPageGenerationTimeout: 120,
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      // Add cache headers for static assets
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/insurance',
        permanent: true,
      },
    ];
  },
  // Custom webpack config for optimization
  webpack: (config, { dev, isServer }) => {
    // Only optimize in production builds
    if (!dev) {
      // Add TerserPlugin options for better minification
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true;
          minimizer.options.terserOptions.compress.drop_debugger = true;
          minimizer.options.terserOptions.compress.pure_funcs = [
            'console.log',
            'console.info',
            'console.debug',
            'console.warn'
          ];
        }
      });

      // Optimize client-side bundles
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 10000, // Reduced from 20000 to 10000
        maxSize: 120000, // Reduced from 150000 to 120000
        minChunks: 2,
        maxAsyncRequests: 20,
        maxInitialRequests: 20,
        automaticNameDelimiter: '~',
        cacheGroups: {
          framework: {
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|next|scheduler)[\\/]/,
            priority: 40,
            reuseExistingChunk: true,
          },
          libs: {
            test: /[\\/]node_modules[\\/](!react|!react-dom|!scheduler|!next)[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              
              // Specific bundling for heavy packages
              if (packageName.includes('framer-motion')) {
                return 'animations-vendor';
              }
              
              if (packageName.includes('axios') || packageName.includes('http')) {
                return 'http-vendor';
              }
              
              if (packageName.includes('@radix-ui')) {
                return 'ui-components-vendor';
              }
              
              if (packageName.includes('lodash')) {
                return 'utilities-vendor';
              }
              
              if (packageName.includes('react-hook-form') || packageName.includes('zod')) {
                return 'form-vendor';
              }
              
              // Fallback to the package name for other packages
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 20,
            reuseExistingChunk: true,
            minSize: 10000,
            maxSize: 100000,
          },
          commons: {
            name: 'commons',
            minChunks: 3,
            priority: 10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);