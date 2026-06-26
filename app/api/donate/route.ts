import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, recurring, name, email, phone } = body

    if (!amount || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const donation = await prisma.donation.create({
      data: {
        amount: Number(amount),
        recurring: Boolean(recurring),
        name,
        email,
        phone: phone || '',
        status: 'completed',
        reference: `DON-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      },
    })

    return NextResponse.json({ success: true, donation }, { status: 201 })
  } catch (error) {
    console.error('Donation error:', error)
    return NextResponse.json({ error: 'Failed to process donation' }, { status: 500 })
  }
}
