/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/utak-ph-landing' : '',
  assetPrefix: isProd ? '/utak-ph-landing/' : '',
};

export default nextConfig;
