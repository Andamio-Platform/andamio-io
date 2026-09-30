/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  webpack: (webpackConfig, { isServer }) => {
    // @pjaudiomv/qrcode-svg optionally requires fs inside save(); the badge only calls svg().
    if (!isServer) {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
      };
    }
    return webpackConfig;
  },
  // Escape hatch when `.next` is locked by a concurrent `next dev` (Windows).
  ...(process.env.ANDAMIO_DIST_DIR
    ? { distDir: process.env.ANDAMIO_DIST_DIR }
    : {}),
  async redirects() {
    return [
      // Papers naming purge (2026-07-02): "whitepaper" is banned from routes
      // and copy. /whitepaper -> /papers; the old light-paper leader renders
      // on the hub itself, so it lands there too.
      {
        source: "/whitepaper/light-paper",
        destination: "/papers",
        permanent: true,
      },
      {
        source: "/whitepaper",
        destination: "/papers",
        permanent: true,
      },
      {
        source: "/whitepaper/:slug",
        destination: "/papers/:slug",
        permanent: true,
      },
      // Use cases consolidated into one template (2026-09).
      {
        source: "/use-cases/FanEngagement",
        destination: "/use-cases/BarcaFanLab",
        permanent: true,
      },
      {
        source: "/use-cases/CatalystReviewers",
        destination: "/use-cases/DecentralizedInnovation",
        permanent: true,
      },
      {
        source: "/use-cases/LeadGenerator",
        destination: "/use-cases/LeadGenDAO",
        permanent: true,
      },
    ];
  },
};

export default config;
