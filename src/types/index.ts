// 通用响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页请求参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应
export interface PaginatedResponse<T> {
  total: number
  items: T[]
  page: number
  pageSize: number
}

// 通用 ID 类型
export type ID = string | number

// 基础时间戳类型
export interface TimeStamps {
  createdAt: string
  updatedAt: string
} 