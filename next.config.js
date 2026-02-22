/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercelでは通常のNext.jsビルドを使用
  // output: 'export' を設定しないことで、通常のSSG/SSRモードで動作
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
