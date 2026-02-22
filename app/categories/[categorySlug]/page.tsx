import { notFound } from 'next/navigation'
import { getAppsByCategorySlug, getAllCategories } from '@/lib/content'
import Card from '@/components/ui/Card'

export async function generateStaticParams() {
  const categories = getAllCategories()

  return categories
    .map((category) => (category?.slug ?? '').trim())
    .filter((slug) => slug.length > 0)
    .map((slug) => ({
      categorySlug: slug,
    }))
}

export default function CategoryPage({
  params,
}: {
  params: { categorySlug: string }
}) {
  const apps = getAppsByCategorySlug(params.categorySlug)
  const categories = getAllCategories()
  const category = categories.find((c) => c.slug === params.categorySlug)

  if (!category) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-sm text-gray-500 mb-12">{apps.length}件のアプリ</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
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
                {app.app.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {cat}
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
