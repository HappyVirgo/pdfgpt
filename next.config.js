/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  publicRuntimeConfig: {
    BACKEND_API_BASEURL: process.env.BACKEND_API_BASEURL,
  },
};

module.exports = nextConfig;
