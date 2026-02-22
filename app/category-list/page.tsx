import { getAllCategories } from '@/lib/content'
import Card from '@/components/ui/Card'

export default function CategoryListPage() {
  const categories = getAllCategories()

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-12">
          カテゴリ一覧
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h2>
              <p className="text-sm text-gray-500">{category.count}件のアプリ</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
