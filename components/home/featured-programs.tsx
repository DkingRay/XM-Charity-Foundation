import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { PROGRAMS } from '@/lib/site-data'

export function FeaturedPrograms() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            What We Do
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Programs that create lasting change
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Every program is designed to meet urgent needs today while building
            stronger, self-reliant communities for tomorrow.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program, i) => (
            <Reveal key={program.slug} delay={(i % 3) * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={program.image || '/placeholder.svg'}
                    alt={program.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm">
                    <program.icon className="size-4" />
                    {program.title}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex-1 text-pretty leading-relaxed text-muted-foreground">
                    {program.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-5">
                    {program.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <p className="font-heading text-xl font-bold text-foreground">
                          {m.value}
                        </p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:text-accent"
                  >
                    Learn More
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/programs">
              View All Programs
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
