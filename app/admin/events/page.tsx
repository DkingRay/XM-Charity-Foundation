'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

type EventItem = {
  id: string
  title: string
  date: string
  isoDate: string
  location: string
  image: string
  category: string
  description: string
  status: 'upcoming' | 'past'
}

const defaultForm: Omit<EventItem, 'id'> = {
  title: '',
  date: '',
  isoDate: '',
  location: '',
  image: '/images/placeholder.svg',
  category: 'Events',
  description: '',
  status: 'upcoming',
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [editing, setEditing] = useState<EventItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<EventItem, 'id'>>(defaultForm)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const res = await fetch('/api/admin/events')
    const data = await res.json()
    setEvents(data)
  }

  const openNew = () => {
    setForm({ ...defaultForm })
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (event: EventItem) => {
    setForm({
      title: event.title,
      date: event.date,
      isoDate: event.isoDate,
      location: event.location,
      image: event.image,
      category: event.category,
      description: event.description,
      status: event.status,
    })
    setEditing(event)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return
    await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' })
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/events', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing ? { id: editing.id, ...form } : form),
    })
    const saved = await res.json()
    if (editing) {
      setEvents((prev) => prev.map((e) => (e.id === saved.id ? saved : e)))
    } else {
      setEvents((prev) => [...prev, saved])
    }
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">Events</h1>
          <p className="mt-1 text-muted-foreground">
            Manage upcoming and past events.
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="size-4" />
          Add Event
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold">
            {editing ? 'Edit Event' : 'New Event'}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="date">Date (display)</Label>
              <Input id="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. August 15, 2026" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="isoDate">ISO Date</Label>
              <Input id="isoDate" type="datetime-local" value={form.isoDate ? form.isoDate.slice(0, 16) : ''} onChange={(e) => setForm({ ...form, isoDate: e.target.value ? new Date(e.target.value).toISOString() : '' })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="image">Image Path</Label>
              <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select id="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'upcoming' | 'past' })} className="mt-1.5 flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1.5" />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={handleSave}>
              <Check className="size-4" />
              {editing ? 'Update Event' : 'Create Event'}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              <X className="size-4" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
            No events yet. Add your first event.
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold">{event.title}</h3>
                  <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>{event.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.date} &middot; {event.location}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEdit(event)}>
                  <Pencil className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(event.id)}>
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
