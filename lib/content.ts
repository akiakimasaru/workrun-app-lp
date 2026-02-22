import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { AppDoc, Category } from '@/types/content'

const contentDirectory = path.join(process.cwd(), 'content', 'apps')

/**
 * 文字列から簡単なハッシュを生成（フォールバック用）
 */
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * カテゴリ名をスラッグ化（小文字・ハイフン）
 * 日本語名の場合はURL-safeなslugを生成し、空の場合はフォールバックを使用
 */
export function slugifyCategory(name: string): string {
  if (!name || typeof name !== 'string') {
    return `cat-${simpleHash('unknown')}`
  }

  // 日本語カテゴリ名のマッピング
  const CATEGORY_SLUG_MAP: Record<string, string> = {
    'メール・コミュニケーション': 'mail-communication',
    'チャット・コミュニケーション': 'chat-communication',
    'コラボレーション': 'collaboration',
    'ドキュメント・ノート': 'document-note',
    'プロジェクト管理': 'project-management',
    'ファイル管理': 'file-management',
    'データ管理': 'data-management',
    'ソフトウェア開発': 'software-development',
    '契約締結': 'contract',
    'Webデータベース': 'web-database',
    '受発注・在庫管理': 'inventory-management',
    '決済': 'payment',
    'ワークフロー': 'workflow',
    'Webサイト制作': 'web-development',
    '入力フォーム': 'form',
    'カレンダー': 'calendar',
    'EC・POSシステム': 'ec-pos',
    'AIアシスタント': 'ai-assistant',
    'ナレッジベース': 'knowledge-base',
    '会計・経理': 'accounting',
    'カスタマーサポート': 'customer-support',
    'セールス': 'sales',
    '人事・労務': 'hr',
    'マーケティング': 'marketing',
  }

  // マッピングがあればそれを使用
  const mapped = CATEGORY_SLUG_MAP[name.trim()]
  if (mapped) {
    return mapped
  }

  // 通常のslugify処理
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 特殊文字を削除（日本語は残る）
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/-+/g, '-') // 連続するハイフンを1つに
    .replace(/^-+|-+$/g, '') // 先頭・末尾のハイフンを削除

  // 日本語が含まれている場合は、ローマ字変換を試みるか、ハッシュを使用
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(name)) {
    // 日本語が含まれている場合
    // まず、既存のマッピングを確認
    if (!mapped) {
      // マッピングがない場合は、ハッシュベースのslugを生成
      slug = `cat-${simpleHash(name)}`
    }
  }

  // 空の場合はフォールバック
  if (!slug || slug.length === 0) {
    slug = `cat-${simpleHash(name)}`
  }

  return slug
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
    .map(([name, count]) => {
      const slug = slugifyCategory(name)
      return {
        name,
        slug,
        count,
      }
    })
    .filter((category) => {
      // 空のslugを持つカテゴリを除外
      const trimmedSlug = (category.slug || '').trim()
      return trimmedSlug.length > 0
    })
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
