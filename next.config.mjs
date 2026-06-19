/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The marketing site is fully static — no server runtime needed. This lets it
  // deploy anywhere (Vercel, Cloudflare Pages, an nginx box on the DO droplet, S3…)
  // by serving the generated `out/` directory. Comment this out if you deploy to
  // Vercel and want ISR/Image Optimization instead.
  output: "export",
  images: {
    // next/image optimization needs a server; static export uses plain <img>.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
