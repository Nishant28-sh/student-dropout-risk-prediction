/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },

  async rewrites() {
    return [
      {
        source: "/api/predict",
        destination: "http://localhost:5000/predict",
      },
    ];
  },
};

module.exports = nextConfig;
