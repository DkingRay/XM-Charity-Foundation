'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, Play, Film } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

type MediaItem = {
  id: string
  image: string
  category: string
  type: string
  title: string
  span: string | null
}

const defaultForm: Omit<MediaItem, 'id'> = {
  image: '/images/placeholder.svg',
  category: 'School Renovation',
  type: 'photo',
  title: '',
  span: null,
}

const CATEGORIES = ['School Renovation', 'Education', 'Outreach', 'Events']

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [editing, setEditing] = useState<MediaItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<MediaItem, 'id'>>(defaultForm)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const res = await fetch('/api/admin/media')
    const data = await res.json()
    setItems(data)
  }

  const openNew = () => {
    setForm({ ...defaultForm })
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (item: MediaItem) => {
    setForm({
      image: item.image,
      category: item.category,
      type: item.type,
      title: item.title,
      span: item.span,
    })
    setEditing(item)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media item?')) return
    await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' })
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd })
    const result = await res.json()
    if (result.url) {
      setForm({ ...form, image: result.url })
    }
    setUploading(false)
  }

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/media', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing ? { id: editing.id, ...form } : form),
    })
    const saved = await res.json()
    if (editing) {
      setItems((prev) => prev.map((i) => (i.id === saved.id ? saved : i)))
    } else {
      setItems((prev) => [...prev, saved])
    }
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">Media Gallery</h1>
          <p className="mt-1 text-muted-foreground">{items.length} media items.</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="size-4" />
          Add Media
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold">
            {editing ? 'Edit Media Item' : 'New Media Item'}
          </h2>
          <div className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1.5 flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <select id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-1.5 flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                  <option value="reel">Reel</option>
                </select>
              </div>
              <div>
                <Label htmlFor="span">Span (optional)</Label>
                <select id="span" value={form.span || ''} onChange={(e) => setForm({ ...form, span: e.target.value || null })} className="mt-1.5 flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                  <option value="">None</option>
                  <option value="wide">Wide</option>
                  <option value="tall">Tall</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Image</Label>
              <div className="mt-1.5 flex items-center gap-3">
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images/filename.jpg or URL" className="flex-1" />
                <input type="file" accept="image/*" className="hidden" ref={fileRef} onChange={handleUpload} />
                <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
                  <Upload className="size-4" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              {form.image && (
                <div className="mt-3 relative aspect-video w-48 rounded-lg overflow-hidden border border-border">
                  <Image src={form.image} alt="Preview" fill className="object-cover" sizes="192px" />
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={handleSave}>
              <Plus className="size-4" />
              {editing ? 'Update' : 'Create'}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.length === 0 ? (
          <div className="col-span-full rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
            No media yet. Add your first media item.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="relative aspect-video">
                <Image src={item.image || '/placeholder.svg'} alt={item.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                <div className="absolute right-2 top-2 flex gap-1">
                  {item.type === 'video' && (
                    <span className="flex size-7 items-center justify-center rounded-full bg-background/85 text-primary backdrop-blur-sm">
                      <Play className="size-3" fill="currentColor" />
                    </span>
                  )}
                  {item.type === 'reel' && (
                    <span className="flex size-7 items-center justify-center rounded-full bg-background/85 text-primary backdrop-blur-sm">
                      <Film className="size-3" />
                    </span>
                  )}
                  {item.type === 'photo' && (
                    <span className="flex size-7 items-center justify-center rounded-full bg-background/85 text-primary backdrop-blur-sm">
                      <ImageIcon className="size-3" />
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">{item.category}</Badge>
                <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground capitalize">{item.type}{item.span ? ` · ${item.span}` : ''}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="size-7" onClick={() => openEdit(item)}>
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
