/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // External gem imagery is loaded via plain <img> tags, so the Next Image
  // optimizer is not required. Remote patterns are left open for future use.
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
