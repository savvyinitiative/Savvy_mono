/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.ctfassets.net'
          },
          {
            protocol: 'https',
            hostname: 's3.eu-west-2.amazonaws.com'
          },
          {
            protocol: 'http',
            hostname: 'localhost'
          },
        ]
      }
}

module.exports = nextConfig
