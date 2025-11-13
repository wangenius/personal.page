import { createMDX } from "fumadocs-mdx/next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withMDX = createMDX();

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
