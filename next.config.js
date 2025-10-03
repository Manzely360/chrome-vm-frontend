/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
      async rewrites() {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://chrome-vm-backend-production.up.railway.app';
        return [
          {
            source: '/api/health',
            destination: `${backendUrl}/health`,
          },
          {
            source: '/api/:path*',
            destination: `${backendUrl}/api/:path*`,
          },
        ];
      },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
