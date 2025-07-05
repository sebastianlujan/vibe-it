import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['https://766c-83-144-23-156.ngrok-free.app'],
  },
  allowedDevOrigins: ['http://localhost:3000', 'https://766c-83-144-23-156.ngrok-free.app'],
  reactStrictMode: false,
};

export default nextConfig;
