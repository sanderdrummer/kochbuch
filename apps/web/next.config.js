/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // eslint-disable-next-line no-undef, turbo/no-undeclared-env-vars
  basePath: process.env.PAGES_BASE_PATH,
  experimental: {
    // typedRoutes: true,
  },
};

export default nextConfig;
