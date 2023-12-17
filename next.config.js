/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.igdb.com',
        },
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
        },
        {
          protocol: 'https',
          hostname: 'static-cdn.jtvnw.net',
        },
      ],
    },
}

module.exports = nextConfig
