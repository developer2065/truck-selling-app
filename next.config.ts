const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // حذف بخش i18n که برای App Router نیاز نیست

  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "app");
    return config;
  },

  // تنظیمات دیگر مورد نیاز
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["example.com"], // برای تصاویر خارجی
    unoptimized: process.env.NODE_ENV !== "production", // برای رفع مشکلات در محیط توسعه
  },
};

module.exports = nextConfig;
