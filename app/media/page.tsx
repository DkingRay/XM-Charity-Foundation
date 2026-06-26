import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { InstagramIcon } from '@/components/brand-icons'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { MediaGallery } from '@/components/media-gallery'
import { Button } from '@/components/ui/button'
import { MEDIA_ITEMS, CONTACT } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Media Center',
  description:
    'Explore photos, videos, and reels from XM Charity Foundation school renovations, outreaches, education programs, and events.',
}

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media Center"
        title="Moments from the field"
        description="Real photos, videos, and reels capturing the impact of our work across communities."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <MediaGallery items={MEDIA_ITEMS} />

          <Reveal className="mt-16 text-center">
            <p className="text-muted-foreground">
              Follow us on social media for the latest updates from the field.
            </p>
            <Button asChild variant="outline" className="mt-4">
              <a
                href={CONTACT.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="size-4" />
                Follow on Instagram
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
