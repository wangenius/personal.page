
export interface DocMeta {
  title: string
  description?: string
  tags?: string[]
  author?: string
  category?: string
  cover?: string
}

export interface Doc extends DocMeta {
  id: string
  slug: string
  content?: string
  published?: boolean
  viewCount?: number
}

export interface DocCategory {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  order?: number
  docs: Doc[]
}

export interface DocTag {
  id: string
  name: string
  slug: string
  description?: string
  count?: number
} 