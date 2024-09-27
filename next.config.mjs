/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['openweathermap.org', 'www.airvisual.com'],
  },
  output: 'standalone',
};

export default nextConfig;
