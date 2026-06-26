import Link from 'next/link'
import Image from 'next/image'
import { Heart, Gift } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'

export function DonationCta() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/donate-cta.png"
        alt="Children celebrating together at sunset"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl text-primary-foreground">
          <h2 className="text-balance font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Be the Reason Someone Smiles Today.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-primary-foreground/85">
            Your gift provides food, healthcare, education, and hope to families
            who need it most. Every contribution creates lasting change.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/donate">
                <Heart className="size-5" fill="currentColor" />
                Donate Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/get-involved#sponsorship">
                <Gift className="size-5" />
                Sponsor a Project
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
