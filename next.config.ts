import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScriptエラーを一時的に無視（必要に応じて）
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLintエラーを一時的に無視（必要に応じて）
  eslint: {
    ignoreDuringBuilds: true,
  },
  // パスエイリアスの解決を確実にする
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
};


export default nextConfig;
