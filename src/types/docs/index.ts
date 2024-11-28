import { TimeStamps, ID } from "../index"

export interface DocMeta {
  title: string
  description?: string
  tags?: string[]
  author?: string
  category?: string
  cover?: string
}

export interface Doc extends DocMeta {
  id: ID
  slug: string
  content?: string
  published?: boolean
  viewCount?: number
}

export interface DocCategory {
  id: ID
  name: string
  slug: string
  description?: string
  parentId?: ID
  order?: number
  docs: Doc[]
}

export interface DocTag {
  id: ID
  name: string
  slug: string
  description?: string
  count?: number
} 