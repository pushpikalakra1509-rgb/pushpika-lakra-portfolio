import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/pushpika-lakra-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;