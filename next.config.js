/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: '/canceled',
        destination: '/',
        permanent: true, // true means it's a 301 redirect, false gives a 307 redirect.
      },
    ];
  },
}

module.exports = nextConfig;
