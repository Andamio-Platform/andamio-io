/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
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
    ];
  },
};

export default config;
