import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { STORIES } from '@/lib/site-data'

export function SuccessStories() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Stories of Hope
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Real lives, real impact
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Behind every number is a person whose life was changed by an act of
            generosity.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {STORIES.map((story, i) => (
            <Reveal key={story.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
                <Quote className="size-9 text-accent" fill="currentColor" />
                <blockquote className="mt-4 flex-1 text-pretty text-lg leading-relaxed text-foreground/90">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="relative size-12 overflow-hidden rounded-full">
                    <Image
                      src={story.image || '/placeholder.svg'}
                      alt={story.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block font-heading font-bold">
                      {story.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {story.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
