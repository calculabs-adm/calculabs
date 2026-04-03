import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "nodemailer"],
  experimental: {
    turbo: false, // Disable Turbopack to test if it's causing issues
  },
};

export default nextConfig;
