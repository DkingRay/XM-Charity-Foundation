import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { AnimatedCounter } from '@/components/animated-counter'
import { Button } from '@/components/ui/button'
import {
  IMPACT_STATS,
  PROGRAMS,
  STORIES,
  TIMELINE,
} from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'See the measurable impact of XM Charity Foundation — thousands of beneficiaries, communities served, and lives transformed.',
}

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="Measurable change, lasting hope"
        description="Every number represents a life touched, a community strengthened, and a future renewed."
      />

      <section className="-mt-12 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-xl lg:grid-cols-4">
            {IMPACT_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="bg-card">
                <div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                  <span className="font-heading text-4xl font-extrabold text-primary sm:text-5xl lg:text-6xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-3 text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Program Impact
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Results by program
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program, i) => (
              <Reveal key={program.slug} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <program.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold">
                    {program.title}
                  </h3>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {program.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <p className="font-heading text-lg font-extrabold text-primary">
                          {m.value}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="link" className="mt-4 p-0">
                    <Link href={`/programs/${program.slug}`}>
                      View details
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Stories of Hope
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Real lives, real impact
            </h2>
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

      <section className="bg-secondary px-4 py-16 text-secondary-foreground sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Journey
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Milestones along the way
            </h2>
          </Reveal>
          <ol className="mt-14 space-y-10 border-l-2 border-border pl-8">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.05}>
                <li className="relative">
                  <span className="absolute -left-[2.6rem] flex size-6 items-center justify-center rounded-full bg-primary ring-4 ring-secondary">
                    <span className="size-2 rounded-full bg-primary-foreground" />
                  </span>
                  <p className="font-heading text-sm font-bold text-primary">
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-balance font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Help us reach more communities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
              Your support makes this impact possible. Join us in transforming
              more lives across Nigeria.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/get-involved">
                  Get Involved
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
