'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { InstagramIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { MEDIA_ITEMS, type MediaItem } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function LatestMedia() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const openItem = lightbox !== null ? MEDIA_ITEMS[lightbox] : null

  const move = (dir: number) => {
    if (lightbox === null) return
    setLightbox((lightbox + dir + MEDIA_ITEMS.length) % MEDIA_ITEMS.length)
  }

  return (
    <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              <InstagramIcon className="size-4" />
              From the Field
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Latest moments from our community
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Real photos, reels, and videos straight from our outreaches across
              Instagram and Facebook.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/media">
              View Media Center
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {MEDIA_ITEMS.map((item, i) => (
            <motion.button
              layout
              type="button"
              key={item.id}
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              className={cn(
                'group relative block w-full overflow-hidden rounded-xl bg-muted',
                i === 0 ? 'col-span-2 row-span-2' : 'aspect-square',
              )}
            >
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
                className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
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
                className="absolute left-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
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
                className="absolute bottom-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:bottom-auto sm:right-16"
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
    </section>
  )
}
