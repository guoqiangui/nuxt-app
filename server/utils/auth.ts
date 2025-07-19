import type { H3Event } from 'h3'
import type { User } from '~/server/database/generated/prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function generateToken(user: User) {
  const runtimeConfig = useRuntimeConfig()
  const JWT_SECRET = runtimeConfig.JWT_SECRET
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' })

  return token
}

export function getUserInfoFromToken(event: H3Event) {
  const runtimeConfig = useRuntimeConfig()
  const JWT_SECRET = runtimeConfig.JWT_SECRET
  const token = getHeader(event, 'token')
  if (!token)
    return null

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, username: string }
    return decoded
  }
  catch {
    return null
  }
}

/**
 * 验证密码是否正确
 * @param plainPassword 明文密码
 * @param hashedPassword 哈希密码
 * @returns Promise<boolean> 密码是否正确
 */
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

/**
 * 哈希密码
 * @param password 明文密码
 * @param saltRounds 盐轮数，默认为10
 * @returns Promise<string> 哈希后的密码
 */
export async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
  return await bcrypt.hash(password, saltRounds)
}
