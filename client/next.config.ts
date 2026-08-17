import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c917408.parspack.net",
      },
    ],
  },
};

export default nextConfig;
