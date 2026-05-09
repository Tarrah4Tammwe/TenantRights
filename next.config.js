/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.tenantrightsuk.info',
          },
        ],
        destination: 'https://tenantrightsuk.info/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
