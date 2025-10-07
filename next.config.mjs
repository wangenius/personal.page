import { createMDX } from "fumadocs-mdx/next";
import path from "path";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "local-origin.dev", "*.local-origin.dev"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "src/components"),
      "@": path.resolve(__dirname, "src"),
      "@theme": path.resolve(__dirname, "src/theme"),
    };

    // 添加对.awebp文件的支持
    config.module.rules.push({
      test: /\.awebp$/,
      type: "asset/resource",
    });

    return config;
  },
};

export default withMDX(config);
