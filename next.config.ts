import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    { source: "/", destination: "/home", permanent: true },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dragonball-api.com",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
