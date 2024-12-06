import createMDX from '@next/mdx'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // 启用 MDX 编译缓存
    providerImportSource: "@mdx-js/react",
    remarkPlugins: [],
    rehypePlugins: [],
    // 开启实验性能优化
    format: 'mdx',
    development: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx','md', 'ts', 'tsx'],
  // 启用构建时优化
  swcMinify: true,
  // 启用增量静态再生成
  experimental: {
    mdxRs: true,
    // 启用构建缓存
    turbotrace: {
      logLevel: 'error',
      contextDirectory: process.cwd(),
    },
  },
  // 优化图片加载
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      }
    ],
    // 启用图片优化
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // 优化构建输出
  output: 'standalone',
  // 启用 webpack 持久化缓存
  webpack: (config, { dev, isServer }) => {
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [fileURLToPath(import.meta.url)],
      },
    }
    return config
  },
  // 开启页面优化
  optimizeFonts: true,
}

export default withMDX(nextConfig)
