'use client'

import { useState, useMemo } from 'react'
import { AppDoc } from '@/types/content'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'

export default function AppsClient({ apps }: { apps: AppDoc[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'name' | 'newest'>('name')

  // 全カテゴリを取得
  const allCategories = useMemo(() => {
    const categorySet = new Set<string>()
    apps.forEach((app) => {
      app.app.categories.forEach((cat) => categorySet.add(cat))
    })
    return Array.from(categorySet).sort()
  }, [apps])

  // フィルタリングとソート
  const filteredApps = useMemo(() => {
    let filtered = apps

    // 検索
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.app.name.toLowerCase().includes(query) ||
          app.seo.description.toLowerCase().includes(query) ||
          app.app.categories.some((cat) =>
            cat.toLowerCase().includes(query)
          )
      )
    }

    // カテゴリフィルタ
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((app) =>
        app.app.categories.some((cat) => selectedCategories.includes(cat))
      )
    }

    // ソート
    if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) =>
        a.app.name.localeCompare(b.app.name, 'ja')
      )
    } else {
      // newestはファイルのmtimeを使用（簡易実装）
      filtered = [...filtered].reverse()
    }

    return filtered
  }, [apps, searchQuery, selectedCategories, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-8">
            アプリ一覧
          </h1>

          {/* 検索 */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="アプリ名・説明・カテゴリで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* カテゴリフィルタ */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* ソート */}
          <div className="mb-6 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              並び替え:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'newest')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">名前順</option>
              <option value="newest">新着順</option>
            </select>
            <p className="text-sm text-gray-500">
              {filteredApps.length}件のアプリが見つかりました
            </p>
          </div>
        </div>

        {/* アプリカード一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <Card key={app.slug} href={`/apps/${app.slug}`} className="p-6">
              {app.app.icon && (
                <div className="text-4xl mb-4">{app.app.icon}</div>
              )}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {app.app.name}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-2">
                {app.seo.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {app.app.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
