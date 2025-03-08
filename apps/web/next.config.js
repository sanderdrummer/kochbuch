/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // trailingSlash: true,
  basePath: "/kochbuch",
  experimental: {
    // typedRoutes: true,
    reactCompiler: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
