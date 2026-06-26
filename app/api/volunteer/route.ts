import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, interest, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await prisma.volunteer.create({
      data: {
        name,
        email,
        phone: phone || '',
        interest: interest || '',
        message: message || '',
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Volunteer error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
