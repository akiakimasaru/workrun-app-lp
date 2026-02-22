import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-8">
          アプリLP一覧
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          各種アプリケーションのランディングページを閲覧できます。
        </p>
        <nav className="flex flex-col sm:flex-row gap-4">
          <Button href="/apps">アプリ一覧</Button>
          <Button href="/categories" variant="secondary">
            カテゴリ一覧
          </Button>
        </nav>
      </div>
    </div>
  )
}
