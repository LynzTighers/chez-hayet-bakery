import type { NextConfig } from "next";

// Where the Express API lives. The browser only ever talks to this site, and Next.js
// forwards /api/* to the API, so cookies stay on one domain and CORS isn't needed.
//   local dev:  http://localhost:4000 (default)
//   Vercel:     set API_URL=https://api.chezhayetoh.com in the project's env vars
const apiUrl = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  experimental: {
    // The build cache (on by default) reused stale Tailwind CSS on Vercel, so new
    // classes added in components never reached the live site. Builds are small;
    // always compile CSS fresh.
    turbopackFileSystemCacheForBuild: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
