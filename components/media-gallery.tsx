'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { InstagramIcon } from '@/components/brand-icons'
import { cn } from '@/lib/utils'
import {
  MEDIA_CATEGORIES,
  type MediaItem,
} from '@/lib/site-data'

type MediaGalleryProps = {
  items: MediaItem[]
  showFilter?: boolean
}

export function MediaGallery({ items, showFilter = true }: MediaGalleryProps) {
  const [active, setActive] = useState<(typeof MEDIA_CATEGORIES)[number]>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered =
    active === 'All' ? items : items.filter((m) => m.category === active)

  const openItem = lightbox !== null ? filtered[lightbox] : null

  const move = (dir: number) => {
    if (lightbox === null) return
    setLightbox((lightbox + dir + filtered.length) % filtered.length)
  }

  return (
    <div>
      {showFilter && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {MEDIA_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActive(cat)
                setLightbox(null)
              }}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                active === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {filtered.map((item, i) => (
          <motion.button
            layout
            type="button"
            key={item.id}
            onClick={() => setLightbox(i)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            className={cn(
              'group relative block w-full break-inside-avoid overflow-hidden rounded-xl bg-muted',
              item.span === 'tall'
                ? 'aspect-[3/4]'
                : item.span === 'wide'
                  ? 'aspect-[4/3]'
                  : 'aspect-square',
            )}
          >
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {(item.type === 'video' || item.type === 'reel') && (
              <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/85 text-primary backdrop-blur-sm">
                <Play className="size-4" fill="currentColor" />
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {item.category}
              </p>
              <p className="text-sm font-medium text-white">{item.title}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation()
                move(-1)
              }}
              className="absolute left-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation()
                move(1)
              }}
              className="absolute right-4 bottom-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:bottom-auto sm:right-16"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.div
              key={openItem.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={openItem.image || '/placeholder.svg'}
                  alt={openItem.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                {(openItem.type === 'video' || openItem.type === 'reel') && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                    <span className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Play className="size-7" fill="currentColor" />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {openItem.category}
                  </p>
                  <h3 className="font-heading text-lg font-bold">
                    {openItem.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <InstagramIcon className="size-3.5" />
                  From social media
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
