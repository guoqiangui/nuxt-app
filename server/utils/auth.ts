import type { H3Event } from 'h3'
import type { User } from '~/server/database/generated/prisma/client'
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
