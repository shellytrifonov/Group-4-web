/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
  
    async headers() {
      return [
        {
          source: "/_next/static/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
      ];
    },
  
    images: {
      formats: ["image/avif", "image/webp"],
      deviceSizes: [320, 420, 768, 1024, 1200],
      imageSizes: [16, 32, 48, 64, 96],
    },
  
    reactStrictMode: true,
  
    swcMinify: true,
  };
  
  export default nextConfig;  