import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { PROGRAMS } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Our Programs',
  description:
    'Explore XM Charity Foundation programs across school renovation, community outreach, humanitarian support, and youth empowerment.',
}

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Programs that create lasting change"
        description="Five focused programs working together to meet immediate needs and build long-term resilience in the communities we serve."
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl space-y-20">
          {PROGRAMS.map((program, i) => (
            <Reveal key={program.slug}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={program.image || '/placeholder.svg'}
                    alt={program.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <program.icon className="size-7" />
                  </span>
                  <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight">
                    {program.title}
                  </h2>
                  <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                  <dl className="mt-6 grid grid-cols-3 gap-4">
                    {program.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="font-heading text-2xl font-extrabold text-primary">
                          {m.value}
                        </dt>
                        <dd className="mt-1 text-sm text-muted-foreground">
                          {m.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Button asChild className="mt-8">
                    <Link href={`/programs/${program.slug}`}>
                      Learn more
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
