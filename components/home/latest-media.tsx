import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { InstagramIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { MediaScroll } from '@/components/media-scroll'
import { MEDIA_ITEMS } from '@/lib/site-data'

export function LatestMedia() {
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

        <div className="mt-12">
          <MediaScroll items={MEDIA_ITEMS} />
        </div>
      </div>
    </section>
  )
}
