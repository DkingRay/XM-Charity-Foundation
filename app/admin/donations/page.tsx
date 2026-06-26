'use client'

import { useEffect, useState } from 'react'
import { Search, Check, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

type Donation = {
  id: string
  amount: number
  recurring: boolean
  name: string
  email: string
  phone: string
  date: string
  status: 'completed' | 'pending'
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/donations')
      .then((r) => r.json())
      .then(setDonations)
  }, [])

  const filtered = donations.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Donations
          </h1>
          <p className="mt-1 text-muted-foreground">
            View and manage incoming donations.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Donor</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  No donations found.
                </td>
              </tr>
            ) : (
              filtered.map((donation) => (
                <tr key={donation.id} className="bg-card transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3.5">
                    <p className="font-medium">{donation.name}</p>
                    <p className="text-xs text-muted-foreground">{donation.email}</p>
                  </td>
                  <td className="px-4 py-3.5 font-heading font-bold">
                    ${donation.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3.5">
                    {donation.recurring ? (
                      <Badge variant="secondary">Monthly</Badge>
                    ) : (
                      <Badge variant="outline">One-time</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    {donation.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600">
                        <Check className="size-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-600">
                        <Clock className="size-3.5" />
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
