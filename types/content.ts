export interface AppDoc {
  slug: string
  app: {
    slug: string
    name: string
    categories: string[]
    icon?: string
  }
  seo: {
    title: string
    description: string
    ogImage?: string
  }
  hero: {
    eyebrow?: string
    headline: string
    lead: string
    ctas?: Array<{
      label: string
      href: string
      variant?: 'primary' | 'secondary'
    }>
  }
  useCases?: {
    title: string
    items: Array<{
      title: string
      description: string
      icon?: string
    }>
  }
  capabilities?: {
    title: string
    operations?: string[]
    triggers?: string[]
  }
  relatedApps?: {
    title: string
    items: Array<{
      slug: string
      reason: string
    }>
  }
  faq?: {
    title: string
    items: Array<{
      q: string
      a: string
    }>
  }
  articles?: {
    title: string
    items: Array<{
      title: string
      href: string
    }>
  }
  content: string // Markdown本文
}

export interface Category {
  name: string
  slug: string
  count: number
}
