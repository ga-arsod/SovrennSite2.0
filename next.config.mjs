/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dwht5p5xdhql3.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['lh3.googleusercontent.com'], // Add the hostname here
  },
};

export default nextConfig;
