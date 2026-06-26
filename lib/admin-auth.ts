import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const COOKIE_NAME = 'admin_session'
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const SESSION_DURATION = '24h'

export { COOKIE_NAME }

export async function verifyPassword(
  email: string,
  password: string,
): Promise<string | null> {
  try {
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) return null

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) return null

    return jwt.sign({ id: admin.id, email: admin.email, name: admin.name }, JWT_SECRET, {
      expiresIn: SESSION_DURATION,
    })
  } catch {
    return null
  }
}

export function validateSessionToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}
