import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-semibold text-gray-900">
            LP Pro
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/apps"
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              アプリ一覧
            </Link>
            <Link
              href="/category-list"
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              カテゴリ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
