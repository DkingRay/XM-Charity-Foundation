'use client'

import { useState } from 'react'
import { Save, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PROGRAMS, IMPACT_STATS, type Stat } from '@/lib/site-data'

export default function AdminProgramsPage() {
  const [stats, setStats] = useState<Stat[]>(() =>
    IMPACT_STATS.map((s) => ({ ...s })),
  )
  const [saved, setSaved] = useState(false)

  const updateStat = (index: number, field: keyof Stat, value: string | number) => {
    setStats((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Programs & Impact
        </h1>
        <p className="mt-1 text-muted-foreground">
          Edit impact stats visible on the homepage. Program details are managed via
          the data layer.
        </p>
      </div>

      <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold">Impact Stats</h2>
          <Button onClick={handleSave} disabled={saved}>
            <Save className="size-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          These stats display on the homepage and impact page.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="rounded-lg border border-border bg-muted/50 p-4">
              <Label className="text-xs text-muted-foreground">{stat.label}</Label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  type="number"
                  value={stat.value}
                  onChange={(e) => updateStat(i, 'value', Number(e.target.value))}
                  className="font-heading font-bold"
                />
                <Input
                  value={stat.suffix || ''}
                  onChange={(e) => updateStat(i, 'suffix', e.target.value)}
                  className="w-12 text-center"
                  placeholder="+"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-lg font-bold">Programs Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {PROGRAMS.length} active programs.
        </p>
        <div className="mt-6 space-y-4">
          {PROGRAMS.map((program) => (
            <div
              key={program.slug}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <program.icon className="size-5" />
                </span>
                <div>
                  <p className="font-heading font-bold">{program.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {program.metrics.map((m) => m.value).join(' · ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <a
                  href={`/programs/${program.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  View page
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
