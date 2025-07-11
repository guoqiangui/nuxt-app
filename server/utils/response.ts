export interface ApiResponse<T> {
  ok: boolean
  data?: T
  message?: string
  timestamp?: number
}

/**
 * 创建成功响应
 */
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    ok: true,
    data,
    message,
    timestamp: Date.now(),
  }
}
