/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'development' ? 'export' : undefined,
  images: { unoptimized: true },
  basePath: '',
  optimizeFonts: false,
};

module.exports = nextConfig;