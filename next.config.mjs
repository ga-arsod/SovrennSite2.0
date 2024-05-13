/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '"www.shutterstock.com',
            port: '',
            pathname: '/account123/**',
          },
        ],
      },
};

export default nextConfig;
