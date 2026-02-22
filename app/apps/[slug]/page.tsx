import { notFound } from 'next/navigation'
import { getAppBySlug, getAllApps } from '@/lib/content'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export async function generateStaticParams() {
  const apps = getAllApps()
  return apps.map((app) => ({
    slug: app.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const app = getAppBySlug(params.slug)

  if (!app) {
    return {
      title: 'アプリが見つかりません',
    }
  }

  return {
    title: app.seo.title,
    description: app.seo.description,
    openGraph: {
      title: app.seo.title,
      description: app.seo.description,
      images: app.seo.ogImage ? [app.seo.ogImage] : [],
    },
  }
}

export default function AppDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const app = getAppBySlug(params.slug)

  if (!app) {
    notFound()
  }

  // 関連アプリを解決（存在するslugのみ）
  const relatedApps = app.relatedApps
    ? {
        ...app.relatedApps,
        items: app.relatedApps.items
          .map((item) => {
            const relatedApp = getAppBySlug(item.slug)
            return relatedApp ? { ...item, app: relatedApp } : null
          })
          .filter((item): item is NonNullable<typeof item> => item !== null),
      }
    : null

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 border-b border-gray-200">
          {app.hero.eyebrow && (
            <p className="text-sm text-gray-500 mb-3">{app.hero.eyebrow}</p>
          )}
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
            {app.hero.headline}
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            {app.hero.lead}
          </p>
          {app.hero.ctas && app.hero.ctas.length > 0 && (
            <div className="flex gap-4">
              {app.hero.ctas.map((cta, idx) => (
                <Button
                  key={idx}
                  href={cta.href}
                  variant={cta.variant || 'primary'}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </section>

        {/* Use Cases */}
        {app.useCases && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                {app.useCases.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {app.useCases.items.map((item, idx) => (
                  <Card key={idx} className="p-6">
                    {item.icon && <div className="text-3xl mb-4">{item.icon}</div>}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Capabilities */}
        {app.capabilities && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                {app.capabilities.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {app.capabilities.operations &&
                  app.capabilities.operations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        操作
                      </h3>
                      <ul className="space-y-2">
                        {app.capabilities.operations.map((op, idx) => (
                          <li
                            key={idx}
                            className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700"
                          >
                            {op}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                {app.capabilities.triggers &&
                  app.capabilities.triggers.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        トリガー
                      </h3>
                      <ul className="space-y-2">
                        {app.capabilities.triggers.map((trigger, idx) => (
                          <li
                            key={idx}
                            className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700"
                          >
                            {trigger}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </section>
        )}

        {/* Related Apps */}
        {relatedApps && relatedApps.items.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                {relatedApps.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedApps.items.map((item) => (
                  <Card key={item.slug} href={`/apps/${item.slug}`} className="p-6">
                    {item.app.app.icon && (
                      <div className="text-4xl mb-4">{item.app.app.icon}</div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.app.app.name}
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">{item.reason}</p>
                    <p className="text-xs text-gray-500">
                      {item.app.seo.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {app.faq && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                {app.faq.title}
              </h2>
              <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                {app.faq.items.map((item, idx) => (
                  <details
                    key={idx}
                    className="bg-white border-b border-gray-200 last:border-b-0"
                  >
                    <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                      {item.q}
                    </summary>
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Articles */}
        {app.articles && app.articles.items.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                {app.articles.title}
              </h2>
              <ul className="space-y-3">
                {app.articles.items.map((article, idx) => (
                  <li key={idx}>
                    <a
                      href={article.href}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Markdown Content */}
        {app.content && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <div className="bg-white border border-gray-200 rounded-lg p-8 prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {app.content}
                </ReactMarkdown>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
