/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  // eslint-disable-next-line no-undef
  basePath: process.env.PAGES_BASE_PATH,
  experimental: {
    // typedRoutes: true,
    reactCompiler: true,
  },
};

export default nextConfig;
