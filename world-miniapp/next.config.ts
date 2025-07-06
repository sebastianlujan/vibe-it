import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['https://a5dc-83-144-23-154.ngrok-free.app', 'https://6f30-83-144-23-154.ngrok-free.app'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ['http://localhost:3000', 'https://a5dc-83-144-23-154.ngrok-free.app', 'https://5f39-83-144-23-154.ngrok-free.app'],
  reactStrictMode: false,
};

export default nextConfig;
