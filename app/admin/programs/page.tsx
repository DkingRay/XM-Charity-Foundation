'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type Program = {
  id: string
  slug: string
  title: string
  image: string
  summary: string
  description: string
  metrics: { value: string; label: string }[]
  objectives: string[]
}

const defaultForm: Omit<Program, 'id'> = {
  slug: '',
  title: '',
  image: '/images/placeholder.svg',
  summary: '',
  description: '',
  metrics: [{ value: '', label: '' }],
  objectives: [''],
}

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [editing, setEditing] = useState<Program | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<Program, 'id'>>(defaultForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    const res = await fetch('/api/admin/programs')
    const data = await res.json()
    setPrograms(data)
  }

  const openNew = () => {
    setForm({ ...defaultForm, slug: '', title: '' })
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (program: Program) => {
    setForm({
      slug: program.slug,
      title: program.title,
      image: program.image,
      summary: program.summary,
      description: program.description,
      metrics: program.metrics.length ? program.metrics : [{ value: '', label: '' }],
      objectives: program.objectives.length ? program.objectives : [''],
    })
    setEditing(program)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this program?')) return
    await fetch(`/api/admin/programs?id=${id}`, { method: 'DELETE' })
    setPrograms((prev) => prev.filter((p) => p.id !== id))
  }

  const handleSave = async () => {
    setSaving(true)
    const body = {
      ...form,
      slug: form.slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    }
    const method = editing ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/programs', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing ? { id: editing.id, ...body } : body),
    })
    const saved = await res.json()
    if (editing) {
      setPrograms((prev) => prev.map((p) => (p.id === saved.id ? saved : p)))
    } else {
      setPrograms((prev) => [...prev, saved])
    }
    setShowForm(false)
    setEditing(null)
    setSaving(false)
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">Programs</h1>
          <p className="mt-1 text-muted-foreground">
            Manage programs shown on the website.
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="size-4" />
          Add Program
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold">
            {editing ? 'Edit Program' : 'New Program'}
          </h2>
          <div className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1.5" placeholder="auto-generated" />
              </div>
            </div>
            <div>
              <Label htmlFor="img">Image Path</Label>
              <Input id="img" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="mt-1.5" placeholder="/images/filename.jpg" />
            </div>
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="mt-1.5" rows={2} />
            </div>
            <div>
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1.5" rows={4} />
            </div>
            <div>
              <Label>Metrics</Label>
              <div className="mt-2 space-y-2">
                {form.metrics.map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={m.value} onChange={(e) => { const next = [...form.metrics]; next[i] = { ...next[i], value: e.target.value }; setForm({ ...form, metrics: next }) }} placeholder="e.g. 15+" className="w-32" />
                    <Input value={m.label} onChange={(e) => { const next = [...form.metrics]; next[i] = { ...next[i], label: e.target.value }; setForm({ ...form, metrics: next }) }} placeholder="e.g. Schools renovated" className="flex-1" />
                    {form.metrics.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => setForm({ ...form, metrics: form.metrics.filter((_, j) => j !== i) })}>
                        <X className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setForm({ ...form, metrics: [...form.metrics, { value: '', label: '' }] })}>
                  Add Metric
                </Button>
              </div>
            </div>
            <div>
              <Label>Objectives</Label>
              <div className="mt-2 space-y-2">
                {form.objectives.map((obj, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={obj} onChange={(e) => { const next = [...form.objectives]; next[i] = e.target.value; setForm({ ...form, objectives: next }) }} placeholder="Enter an objective" className="flex-1" />
                    {form.objectives.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => setForm({ ...form, objectives: form.objectives.filter((_, j) => j !== i) })}>
                        <X className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setForm({ ...form, objectives: [...form.objectives, ''] })}>
                  Add Objective
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={handleSave} disabled={saving}>
              <Check className="size-4" />
              {saving ? 'Saving...' : editing ? 'Update Program' : 'Create Program'}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              <X className="size-4" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {programs.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
            No programs yet. Add your first program.
          </div>
        ) : (
          programs.map((program) => (
            <div key={program.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading font-bold truncate">{program.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">{program.summary}</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">
                    /{program.slug} &middot; {program.metrics?.length ?? 0} metrics &middot; {program.objectives?.length ?? 0} objectives
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <Button variant="ghost" size="icon" onClick={() => openEdit(program)}>
                  <Pencil className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(program.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
