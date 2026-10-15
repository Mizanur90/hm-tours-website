import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // টাইপস্ক্রিপ্ট এরর থাকলেও বিল্ড সফল হবে
    ignoreBuildErrors: true,
  },
  eslint: {
    // ইএসলিন্ট ওয়ার্নিং ইগনোর করবে
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;