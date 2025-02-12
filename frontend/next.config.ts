/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  experimental: {
    // This should match your app's behavior
    appDir: false
  }
}

module.exports = nextConfig