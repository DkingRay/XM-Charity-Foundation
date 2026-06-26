'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, Film, Image as ImageIcon, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MEDIA_ITEMS, type MediaItem } from '@/lib/site-data'

export default function AdminMediaPage() {
  const [items] = useState<MediaItem[]>(MEDIA_ITEMS)

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Media Gallery
        </h1>
        <p className="mt-1 text-muted-foreground">
          {items.length} media items in the gallery.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <div className="relative aspect-video">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute right-2 top-2">
                {item.type === 'video' && (
                  <span className="flex size-8 items-center justify-center rounded-full bg-background/85 text-primary backdrop-blur-sm">
                    <Play className="size-3.5" fill="currentColor" />
                  </span>
                )}
                {item.type === 'reel' && (
                  <span className="flex size-8 items-center justify-center rounded-full bg-background/85 text-primary backdrop-blur-sm">
                    <Film className="size-3.5" />
                  </span>
                )}
                {item.type === 'photo' && (
                  <span className="flex size-8 items-center justify-center rounded-full bg-background/85 text-primary backdrop-blur-sm">
                    <ImageIcon className="size-3.5" />
                  </span>
                )}
              </div>
            </div>
            <div className="p-4">
              <Badge variant="outline" className="mb-2">
                {item.category}
              </Badge>
              <p className="text-sm font-medium">{item.title}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground capitalize">
                  {item.type}
                  {item.span && ` · ${item.span}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
