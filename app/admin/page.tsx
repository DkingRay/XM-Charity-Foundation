'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Heart,
  Users,
  DollarSign,
  Calendar,
  BookOpen,
  Image as ImageIcon,
  TrendingUp,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

type DashboardData = {
  programCount: number
  eventCount: number
  mediaCount: number
  totalDonations: number
  donationCount: number
  subscriberCount: number
  monthlyTotal: number
  monthlyDonationCount: number
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setData)
  }, [])

  const cards = [
    {
      title: 'Programs',
      value: data?.programCount ?? '—',
      label: 'active programs',
      icon: BookOpen,
      href: '/admin/programs',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Events',
      value: data?.eventCount ?? '—',
      label: 'total events',
      icon: Calendar,
      href: '/admin/events',
      color: 'text-violet-600 bg-violet-100',
    },
    {
      title: 'Media Items',
      value: data?.mediaCount ?? '—',
      label: 'in gallery',
      icon: ImageIcon,
      href: '/admin/media',
      color: 'text-amber-600 bg-amber-100',
    },
    {
      title: 'Subscribers',
      value: data?.subscriberCount.toLocaleString() ?? '—',
      label: 'newsletter subscribers',
      icon: Users,
      href: '/admin/subscribers',
      color: 'text-emerald-600 bg-emerald-100',
    },
    {
      title: 'Donations',
      value: data ? `$${data.totalDonations.toLocaleString()}` : '—',
      label: `${data?.donationCount ?? 0} total`,
      icon: DollarSign,
      href: '/admin/donations',
      color: 'text-rose-600 bg-rose-100',
    },
    {
      title: 'This Month',
      value: data ? `$${data.monthlyTotal.toLocaleString()}` : '—',
      label: `${data?.monthlyDonationCount ?? 0} this month`,
      icon: TrendingUp,
      href: '/admin/donations',
      color: 'text-cyan-600 bg-cyan-100',
    },
  ]

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Overview of your foundation&apos;s activity and impact.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.03}>
            <Link href={card.href}>
              <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <span className={`flex size-11 items-center justify-center rounded-xl ${card.color}`}>
                    <card.icon className="size-5" />
                  </span>
                  <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    View all &rarr;
                  </span>
                </div>
                <p className="mt-4 font-heading text-2xl font-extrabold">{card.value}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{card.title}</p>
                <p className="text-xs text-muted-foreground/60">{card.label}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal delay={0.1}>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-lg font-bold">Quick Actions</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { label: 'New Program', href: '/admin/programs', icon: BookOpen },
                { label: 'Add Event', href: '/admin/events', icon: Calendar },
                { label: 'Upload Media', href: '/admin/media', icon: ImageIcon },
                { label: 'View Donations', href: '/admin/donations', icon: Heart },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border bg-muted/50 p-4 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <action.icon className="size-5" />
                  </span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-lg font-bold">System Info</h2>
            <div className="mt-5 space-y-4">
              {[
                { label: 'Platform', value: 'Next.js 16 + Prisma + PostgreSQL' },
                { label: 'Database', value: 'Supabase (PostgreSQL)' },
                { label: 'Auth', value: 'JWT + bcrypt' },
                { label: 'Hosting', value: 'Vercel' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
