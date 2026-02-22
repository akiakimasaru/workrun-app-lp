/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercelでは通常のNext.jsビルドを使用
  // output プロパティを設定しない = 通常のSSG/SSRモード
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
