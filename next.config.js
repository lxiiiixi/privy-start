/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['svix', '@privy-io/react-auth'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'svix': require.resolve('svix')
    };
    return config;
  }
};
