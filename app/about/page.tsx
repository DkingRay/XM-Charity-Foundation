import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Target, Eye, ArrowRight, Quote } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { CORE_VALUES, TIMELINE } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about XM Charity Foundation — our mission, founder Ahmed Yusuf Saifullah (Ahmed XM), and the journey of compassion driving our work across Nigeria.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Building Bridges and Changing Lives"
        description="A Nigerian non-profit foundation dedicated to empowering marginalized communities through education, healthcare, and economic opportunities."
      />

      {/* Founder Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/727288228_122286498302018099_1619861257588860858_n.jpg"
                alt="Ahmed Yusuf Saifullah (Ahmed XM) — Founder of XM Charity Foundation"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Founder & Chairman
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ahmed Yusuf Saifullah
            </h2>
            <p className="mt-1 font-heading text-lg font-medium text-primary">
              Also known as Ahmed XM
            </p>
            <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Ahmed Yusuf Saifullah is a Nigerian financial market analyst, cryptocurrency trader, and philanthropist. Born July 7, 1997, in Bauchi State, he rose from humble beginnings to become one of Africa&apos;s most influential traders, founding XM Trading Academy.
              </p>
              <p>
                Driven by a deep sense of moral duty and gratitude, Ahmed established the XM Charity Foundation as a self-funded initiative — operating entirely without external or government funding. His mission: to renovate 50 schools across Nigeria in 2026 and expand into healthcare in 2027.
              </p>
              <p>
                &ldquo;A small token, a meaningful impact.&rdquo; This philosophy guides everything the foundation does, from rebuilding classroom blocks to distributing learning materials and supporting communities.
              </p>
            </div>
            <Button asChild className="mt-8">
              <Link href="/programs">
                Explore our programs
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto size-10 text-primary/40" />
          <blockquote className="mt-6 text-balance text-2xl font-heading font-bold leading-snug tracking-tight sm:text-3xl">
            &ldquo;Every child deserves a safe place to learn and dream. We refuse to look away. If we all abandon these schools, then we abandon the next generation.&rdquo;
          </blockquote>
          <p className="mt-4 font-medium text-muted-foreground">— Ahmed Yusuf Saifullah</p>
        </Reveal>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              text: 'To empower vulnerable communities across Nigeria through sustainable programs in education, healthcare, and humanitarian support — delivered with compassion, integrity, and full accountability.',
            },
            {
              icon: Eye,
              title: 'Our Vision',
              text: 'A Nigeria where every child has access to quality education, every community has access to healthcare, and every person has the opportunity to build a dignified future.',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
                <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-7" />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-bold">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What We Stand For
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Our core values
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, i) => (
              <Reveal key={value.title} delay={(i % 3) * 0.1}>
                <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40">
                  <span className="flex size-12 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
                    <value.icon className="size-6 text-accent" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold">
                    {value.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary px-4 py-20 text-secondary-foreground sm:px-6 lg:px-8 lg:py-28">
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
    </>
  )
}
