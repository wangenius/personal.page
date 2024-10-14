/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental:{
    appDir: true
  },
  images: {
    unoptimized: true,
  },
  // Use basePath only in production
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/wangenius.com',
  } : {}),
}

module.exports = nextConfig