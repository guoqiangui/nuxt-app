import type { Serialize } from 'nitropack/types'
// API 响应类型定义
import type { Catalogue, Column, Course, Order } from '~/server/database/generated/prisma/client'

// 通用的 API 响应包装类型
export interface ApiResponse<T> {
  ok: boolean
  data: T
  message?: string
  timestamp: number
}

// 分页响应类型
export interface PaginatedResponse<T> {
  list: T[]
  total: number
}

// 使用 Nitro 的 Serialize 类型来自动处理 Decimal 序列化
export type CourseResponse = Serialize<Course>
export type ColumnResponse = Serialize<Column>

export type CourseWithCatalogueResponse = Serialize<Course & { Catalogue: Catalogue[] }>

export type OrderWithCourseResponse = Serialize<Order & { course: Course }>
