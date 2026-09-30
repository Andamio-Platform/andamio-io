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
      // and copy. The old light-paper is Introducing Andamio, its own page.
      {
        source: "/whitepaper/light-paper",
        destination: "/papers/introducing-andamio",
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
      // Orphaned pages folded into live routes (2026-09).
      { source: "/contact", destination: "/about#contact", permanent: true },
      { source: "/customers", destination: "/use-cases", permanent: true },
      {
        source: "/customers/:path*",
        destination: "/use-cases",
        permanent: true,
      },
      { source: "/explore/concept-a", destination: "/", permanent: true },
      { source: "/explore/system", destination: "/brand", permanent: true },
      { source: "/about/whitepaper", destination: "/papers", permanent: true },
      {
        source: "/about/our-team",
        destination: "/about#team",
        permanent: true,
      },
      {
        source: "/about/our-technology",
        destination: "/about#technology",
        permanent: true,
      },
      { source: "/summit", destination: "/community", permanent: true },
      {
        source: "/calendar",
        destination: "/community#calendar",
        permanent: true,
      },
      {
        source: "/fund/12",
        destination: "/community#catalyst",
        permanent: true,
      },
      {
        source: "/fund/14",
        destination: "/community#catalyst",
        permanent: true,
      },
    ];
  },
};

export default config;
