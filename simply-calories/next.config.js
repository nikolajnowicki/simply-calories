// next.config.js

const nextConfig = {
  images: {
    domains: ["www.edamam.com", "edamam-product-images.s3.amazonaws.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

module.exports = nextConfig;
