/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['cdn.sanity.io'],  // Add the domains from which you'll be loading images.
    loader: 'default',
  },

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
