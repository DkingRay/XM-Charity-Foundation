import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Heart } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { PROGRAMS } from '@/lib/site-data'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const program = PROGRAMS.find((p) => p.slug === slug)
  if (!program) return {}
  return {
    title: program.title,
    description: program.description,
  }
}

export default async function ProgramDetailPage({ params }: Props) {
  const slug = (await params).slug
  const program = PROGRAMS.find((p) => p.slug === slug)
  if (!program) notFound()

  const related = PROGRAMS.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero
        title={program.title}
        description={program.summary}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={program.image || '/placeholder.svg'}
                  alt={program.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <program.icon className="size-7" />
              </span>
              <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight">
                About the {program.title} Program
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {program.description}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 rounded-2xl border border-border bg-card p-6">
                {program.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="font-heading text-2xl font-extrabold text-primary">
                      {m.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Goals
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Program objectives
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {program.objectives.map((obj, i) => (
              <Reveal key={obj} delay={i * 0.05}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-4" />
                  </span>
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    {obj}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="text-center">
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Explore More
              </p>
              <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                Other ways we create impact
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.1}>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.image || '/placeholder.svg'}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm">
                        <p.icon className="size-4" />
                        {p.title}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex-1 text-pretty leading-relaxed text-muted-foreground">
                        {p.summary}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:text-accent">
                        Learn More
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-secondary px-4 py-16 text-secondary-foreground sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-balance font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Support the {program.title} Program
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
              Follow our work, spread the word, and help us inspire more communities across Nigeria.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
