import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { AppDoc, Category } from '@/types/content'

const contentDirectory = path.join(process.cwd(), 'content', 'apps')

/**
 * カテゴリ名をスラッグ化（小文字・ハイフン）
 */
export function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 特殊文字を削除
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/-+/g, '-') // 連続するハイフンを1つに
    .trim()
}

/**
 * 全アプリを取得
 */
export function getAllApps(): AppDoc[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(contentDirectory)
  const allApps = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const slug = fileName.replace(/\.md$/, '')

      return {
        slug,
        app: {
          slug,
          name: data.app?.name || '',
          categories: data.app?.categories || [],
          icon: data.app?.icon,
        },
        seo: {
          title: data.seo?.title || data.app?.name || '',
          description: data.seo?.description || '',
          ogImage: data.seo?.ogImage,
        },
        hero: {
          eyebrow: data.hero?.eyebrow,
          headline: data.hero?.headline || '',
          lead: data.hero?.lead || '',
          ctas: data.hero?.ctas || [],
        },
        useCases: data.useCases,
        capabilities: data.capabilities,
        relatedApps: data.relatedApps,
        faq: data.faq,
        articles: data.articles,
        content,
      } as AppDoc
    })
    .filter((app) => app.app.name) // 名前がないものは除外

  return allApps
}

/**
 * スラッグでアプリを取得
 */
export function getAppBySlug(slug: string): AppDoc | null {
  const allApps = getAllApps()
  return allApps.find((app) => app.slug === slug) || null
}

/**
 * 全カテゴリを取得（件数付き）
 */
export function getAllCategories(): Category[] {
  const allApps = getAllApps()
  const categoryMap = new Map<string, number>()

  allApps.forEach((app) => {
    app.app.categories.forEach((categoryName) => {
      const count = categoryMap.get(categoryName) || 0
      categoryMap.set(categoryName, count + 1)
    })
  })

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      slug: slugifyCategory(name),
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ja'))
}

/**
 * カテゴリスラッグでアプリを取得
 */
export function getAppsByCategorySlug(categorySlug: string): AppDoc[] {
  const allApps = getAllApps()
  return allApps.filter((app) =>
    app.app.categories.some(
      (categoryName) => slugifyCategory(categoryName) === categorySlug
    )
  )
}
