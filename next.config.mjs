/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // One canonical hostname. Vercel also redirects at the edge; this is the fallback.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.repael.com" }],
        destination: "https://repael.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
