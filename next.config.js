/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Keep the standalone introduction independent of the site's shared layout.
  async rewrites() {
    return [{ source: '/hello', destination: '/hello/index.html' }]
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': ['.git/**/*']
    }
  }
}
module.exports = nextConfig
