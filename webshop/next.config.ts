import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // juster til domenet bildene dine faktisk kommer fra
      { protocol: "https", hostname: "**" }
    ],
  },
};

export default nextConfig;