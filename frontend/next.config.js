const bundleAnalyzer = require('@next/bundle-analyzer');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

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
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    scrollRestoration: true,
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
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
      // Optimize client-side bundles
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 150000, // Reduced from 240000 to 150000
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name(module) {
              // Get the package name
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              
              // Group common packages together
              if (packageName.includes('react') || packageName.includes('next')) {
                return 'react-vendor';
              }
              
              if (packageName.includes('@radix-ui')) {
                return 'radix-vendor';
              }
              
              return `vendor-${packageName.replace('@', '')}`;
            },
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
