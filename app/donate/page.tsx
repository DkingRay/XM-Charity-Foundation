import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Handshake, ArrowRight, Shield, Check } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { PROGRAMS } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Support Our Mission',
  description:
    'XM Charity Foundation is proudly self-funded. Learn how you can support our mission through partnership, volunteering, and spreading awareness.',
}

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Commitment"
        title="Proudly self-funded, fully transparent"
        description="The XM Charity Foundation operates exclusively on self-funding by its founder, Ahmed Yusuf Saifullah (Ahmed XM). We do not accept public donations — ensuring full transparency and independence."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="size-8" />
            </span>
            <h2 className="mt-6 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Thank You for Your Willingness to Support
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              The foundation is proudly self-funded by its founder, without external or government funding. This allows us to maintain complete transparency and independence in all our work.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              The best ways to support our mission are through your prayers, following our work, spreading awareness, and partnering with us to amplify our impact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ways to support */}
      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              How You Can Help
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ways to support our mission
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Handshake className="size-7" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold">Partner With Us</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Corporations, foundations, and organizations can partner with us to co-create community development programs.
                </p>
                <Button asChild className="mt-6">
                  <Link href="/get-involved#partnerships">
                    Partner With Us
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Heart className="size-7" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold">Volunteer</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Your time and talent can make a real difference. Join our team of volunteers in communities across Nigeria.
                </p>
                <Button asChild className="mt-6">
                  <Link href="/get-involved#volunteer">
                    Become a Volunteer
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Shield className="size-7" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold">Spread Awareness</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Follow us on social media, share our story, and help us inspire others to take action for their communities.
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <a
                    href="https://www.instagram.com/xm_charity_foundation/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow on Instagram
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Work
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              See where your support goes
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Every project is fully documented and shared transparently with the public.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.slice(0, 3).map((program, i) => (
              <Reveal key={program.slug} delay={i * 0.1}>
                <Link
                  href={`/programs/${program.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${program.image})` }} />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm">
                      <program.icon className="size-4" />
                      {program.title}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-pretty leading-relaxed text-muted-foreground">
                      {program.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-primary transition-colors group-hover:text-accent">
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
    </>
  )
}
