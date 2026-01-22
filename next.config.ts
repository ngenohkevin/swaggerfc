import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "swaggerfc-cms.iopulse.cloud",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
