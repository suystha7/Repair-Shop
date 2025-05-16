import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    clientInstrumentationHook: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: "udemy-qo",
  project: "repair-shop",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
});
