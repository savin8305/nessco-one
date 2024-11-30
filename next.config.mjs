import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Configure the bundle analyzer
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true", // Enable only when ANALYZE is set to "true"
});

// Create the Next.js Intl plugin
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "in.pinterest.com",
      },
      {
        protocol: "https",
        hostname: "restcountries.com",
      },
      {
        protocol: "https",
        hostname: "assets.nesscoindustries.com",
      },
      {
        protocol: "https",
        hostname: "www.nesscoindia.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "www.*", // Allows all 'www.' subdomains under 'https://'
      },
    ],
  },
  swcMinify: true,
  // Add experimental features if needed
  // experimental: {
  //   optimizePackageImports: [
  //     '@mantine/core',     // Add Mantine components
  //     '@mantine/hooks',    // Add Mantine hooks
  //     'lodash',            // Add Lodash for tree shaking
  //   ],
  // },
};

// Export the configuration with both plugins applied
export default bundleAnalyzer(withNextIntl(nextConfig));
