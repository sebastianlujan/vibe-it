import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['https://a5dc-83-144-23-154.ngrok-free.app', 'https://b7c0-83-144-23-154.ngrok-free.app'],
  },

  allowedDevOrigins: ['http://localhost:3000', 'https://a5dc-83-144-23-154.ngrok-free.app', 'https://5f39-83-144-23-154.ngrok-free.app'],
  reactStrictMode: false,
};

export default nextConfig;
