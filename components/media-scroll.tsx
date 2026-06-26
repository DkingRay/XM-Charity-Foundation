'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { MediaItem } from '@/lib/site-data'

type MediaScrollProps = {
  items: MediaItem[]
}

export function MediaScroll({ items }: MediaScrollProps) {
  const speed = items.length * 1.5
  const duplicated = [...items, ...items, ...items]

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicated.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="relative shrink-0 overflow-hidden rounded-xl bg-muted"
            style={{ width: 280, height: 280 }}
          >
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.title}
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
