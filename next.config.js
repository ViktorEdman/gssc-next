/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["sv-SE", "en-US"],
    defaultLocale: "sv-SE"
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true
    }
    return config
  },
  output: "standalone",
}
module.exports = nextConfig
