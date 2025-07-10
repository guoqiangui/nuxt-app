import type { User } from '~/server/database/generated/prisma/client'
import jwt from 'jsonwebtoken'

export function generateToken(user: User) {
  const runtimeConfig = useRuntimeConfig()
  const JWT_SECRET = runtimeConfig.JWT_SECRET
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' })

  return token
}
