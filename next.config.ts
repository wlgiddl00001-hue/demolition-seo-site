import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/seoul-:region/:service",
        destination: "/:region/:service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;