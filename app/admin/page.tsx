'use client'

import { useEffect, useState } from 'react'
import {
  Heart,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { IMPACT_STATS } from '@/lib/site-data'

type DashboardData = {
  totalDonations: number
  totalCompleted: number
  monthlyTotal: number
  donationCount: number
  subscriberCount: number
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
      title: 'Total Donations',
      value: data ? `$${data.totalDonations.toLocaleString()}` : '—',
      label: `${data?.donationCount ?? '—'} donations`,
      icon: DollarSign,
      trend: 'up',
      color: 'text-emerald-600 bg-emerald-100',
    },
    {
      title: 'Completed',
      value: data ? `$${data.totalCompleted.toLocaleString()}` : '—',
      label: 'successfully processed',
      icon: Heart,
      trend: 'up',
      color: 'text-primary bg-primary/10',
    },
    {
      title: 'This Month',
      value: data ? `$${data.monthlyTotal.toLocaleString()}` : '—',
      label: `${data?.monthlyDonationCount ?? '—'} this month`,
      icon: TrendingUp,
      trend: 'up',
      color: 'text-amber-600 bg-amber-100',
    },
    {
      title: 'Subscribers',
      value: data?.subscriberCount.toLocaleString() ?? '—',
      label: 'newsletter subscribers',
      icon: Users,
      trend: 'up',
      color: 'text-violet-600 bg-violet-100',
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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.05}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className={`flex size-10 items-center justify-center rounded-lg ${card.color}`}>
                  <card.icon className="size-5" />
                </span>
                <span className={`flex items-center gap-0.5 text-sm font-medium ${card.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {card.trend === 'up' ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
                </span>
              </div>
              <p className="mt-4 font-heading text-2xl font-extrabold">{card.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{card.title}</p>
              <p className="text-xs text-muted-foreground/70">{card.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal delay={0.1}>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-lg font-bold">
              Impact at a Glance
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {IMPACT_STATS.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-muted p-4 text-center">
                  <p className="font-heading text-xl font-extrabold text-primary">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-lg font-bold">
              Quick Actions
            </h2>
            <div className="mt-6 space-y-3">
              {[
                { label: 'View Donations', href: '/admin/donations', icon: Heart },
                { label: 'Manage Events', href: '/admin/events', icon: Calendar },
                { label: 'Edit Programs', href: '/admin/programs', icon: TrendingUp },
              ].map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <action.icon className="size-4" />
                  </span>
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
