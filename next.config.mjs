/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // 'http' because your URL uses http (not https)
        hostname: "**", // The exact IP/hostname
        port: "", // The port from your URL
        pathname: "/**", // Allow any path under this host (e.g., /seatingView/**)
      },
      // Keep your existing example.com if needed, migrated to remotePatterns:
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;
