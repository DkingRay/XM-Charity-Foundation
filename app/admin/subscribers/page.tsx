'use client'

import { useEffect, useState } from 'react'
import { Search, Mail, Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Subscriber = {
  email: string
  date: string
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then((r) => r.json())
      .then(setSubscribers)
  }, [])

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleExport = () => {
    const csv = 'email,date\n' + filtered.map((s) => `${s.email},${s.date}`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscribers.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Subscribers
          </h1>
          <p className="mt-1 text-muted-foreground">
            Newsletter subscribers ({subscribers.length} total).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Subscribed On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-12 text-center text-muted-foreground">
                  No subscribers found.
                </td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr key={sub.email} className="bg-card transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-2">
                      <Mail className="size-4 text-muted-foreground" />
                      {sub.email}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">
                    {new Date(sub.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
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
