import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyPassword, COOKIE_NAME } from '@/lib/admin-auth'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    const token = await verifyPassword('admin@xmcharityfoundation.org', password)
    if (!token) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
