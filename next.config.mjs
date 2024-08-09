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
    domains: ['lh3.googleusercontent.com','sovrenn-website-images.s3.ap-south-1.amazonaws.com'],
  },
};

export default nextConfig;
