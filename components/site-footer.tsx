'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin, Check } from 'lucide-react'
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  TiktokIcon,
} from '@/components/brand-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NAV_LINKS, CONTACT } from '@/lib/site-data'

const programLinks = [
  { label: 'Education', href: '/programs/education' },
  { label: 'Youth & Education', href: '/programs/youth-empowerment' },
  { label: 'Community Outreach', href: '/programs/community-outreach' },
  { label: 'Humanitarian Support', href: '/programs/humanitarian-support' },
  { label: 'Youth Empowerment', href: '/programs/youth-empowerment' },
]

const socials = [
  { label: 'Instagram', href: CONTACT.socials.instagram, icon: InstagramIcon },
  { label: 'Facebook', href: CONTACT.socials.facebook, icon: FacebookIcon },
  { label: 'Twitter / X', href: CONTACT.socials.twitter, icon: TwitterIcon },
  { label: 'TikTok', href: CONTACT.socials.tiktok, icon: TiktokIcon },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="XM Charity Foundation"
                width={160}
                height={45}
                className="h-10 w-auto invert"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sidebar-foreground/70">
              Transforming lives and building hope through compassion, outreach,
               education, and sustainable community development.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <s.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sidebar-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                Programs
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {programLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sidebar-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                Contact
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-sidebar-foreground/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{CONTACT.address}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-accent" />
                  <a href={`tel:${CONTACT.phone}`} className="hover:text-accent">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 shrink-0 text-accent" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-accent">
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/60">
              Stay Connected
            </h3>
            <p className="mt-4 text-sm text-sidebar-foreground/70">
              Get stories of impact and updates from the field, straight to your
              inbox.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="border-sidebar-border bg-sidebar-accent text-sidebar-foreground placeholder:text-sidebar-foreground/50"
              />
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? (
                  <>
                    <Check className="size-4" />
                    Subscribed
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
              {status === 'error' && (
                <p className="text-xs text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sidebar-border pt-8 text-sm text-sidebar-foreground/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} XM Charity Foundation. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
