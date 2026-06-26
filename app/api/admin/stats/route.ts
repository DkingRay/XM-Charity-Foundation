import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [donations, subscribers, programCount, eventCount, mediaCount] = await Promise.all([
    prisma.donation.findMany(),
    prisma.subscriber.count(),
    prisma.program.count(),
    prisma.event.count(),
    prisma.mediaItem.count(),
  ])

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0)
  const completedDonations = donations.filter((d) => d.status === 'completed')
  const totalCompleted = completedDonations.reduce((sum, d) => sum + d.amount, 0)

  const now = new Date()
  const monthlyDonations = donations.filter((d) => {
    const date = new Date(d.createdAt)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  })
  const monthlyTotal = monthlyDonations.reduce((sum, d) => sum + d.amount, 0)

  return NextResponse.json({
    totalDonations,
    totalCompleted,
    monthlyTotal,
    donationCount: donations.length,
    subscriberCount: subscribers,
    monthlyDonationCount: monthlyDonations.length,
    programCount,
    eventCount,
    mediaCount,
  })
}
