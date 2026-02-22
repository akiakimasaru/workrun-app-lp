import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              LP Pro
            </h3>
            <p className="text-sm text-gray-500">
              アプリ連携のランディングページを量産する静的サイトジェネレーター
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/apps"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  アプリ一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  カテゴリ一覧
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              その他
            </h3>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} LP Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
