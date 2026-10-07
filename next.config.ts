import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["better-sqlite3"],
  typescript: {
    // The server is a 1 GB Droplet, and `next build` type-checks the whole
    // repo - tests included - which ran it out of memory on every deploy.
    // `npm run typecheck` already checks everything (and more thoroughly,
    // since it covers the tests) and has to pass before anything is pushed.
    // See CLAUDE.md, "How to work", step 2.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
