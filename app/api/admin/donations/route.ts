import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(donations)
}
