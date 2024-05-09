/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['lib-empationapi', 'EmpationAPI'],
};

module.exports = nextConfig;
