import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import serwist from "@serwist/next";

const withSerwist = serwist({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: !!process.env.ANALYZE,
});

const nextConfig: NextConfig = withSerwist(
  withBundleAnalyzer({
    /* config options here */
  }),
);

export default nextConfig;
