/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    }
    return config
  },


}
module.exports = nextConfig
