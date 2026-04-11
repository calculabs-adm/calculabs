import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "nodemailer"],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.calculabs.com.br',
          },
        ],
        destination: 'https://calculabs.com.br/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Content Security Policy for all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms https://c.clarity.ms https://static.clarity.ms https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://www.googleadservices.com; connect-src 'self' https://www.clarity.ms https://c.clarity.ms https://www.google-analytics.com https://pagead2.googlesyndication.com; img-src 'self' data: https: https://www.clarity.ms https://c.clarity.ms https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; object-src 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
