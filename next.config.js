/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercelでは通常のNext.jsビルドを使用（output: 'export'は不要）
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
