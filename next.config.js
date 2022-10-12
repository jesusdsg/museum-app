/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'lh5.ggpht.com', 'lh3.ggpht.com', 'lh4.ggpht.com', 'lh6.ggpht.com'],
  },
}

module.exports = nextConfig
