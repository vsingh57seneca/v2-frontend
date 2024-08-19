import { DEBUG } from './config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: DEBUG === 0 ? '/keebgram' : ''
};

export default nextConfig;
