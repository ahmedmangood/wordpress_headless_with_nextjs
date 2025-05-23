/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.WORDPRESS_HOSTNAME,
        port: "10018",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
