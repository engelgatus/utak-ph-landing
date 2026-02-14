/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  images: {
    unoptimized: true, 
  },
  basePath: '/utak-ph-landing', 
  assetPrefix: '/utak-ph-landing/',
};

export default nextConfig;
