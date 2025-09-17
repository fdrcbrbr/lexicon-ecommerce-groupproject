import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.dummyjson.com" },
      { hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
