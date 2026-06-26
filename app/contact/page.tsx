'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Check, MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CONTACT } from '@/lib/site-data'
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  TiktokIcon,
  WhatsappIcon,
} from '@/components/brand-icons'

const SOCIALS = [
  { label: 'Instagram', href: CONTACT.socials.instagram, icon: InstagramIcon },
  { label: 'Facebook', href: CONTACT.socials.facebook, icon: FacebookIcon },
  { label: 'Twitter / X', href: CONTACT.socials.twitter, icon: TwitterIcon },
  { label: 'TikTok', href: CONTACT.socials.tiktok, icon: TiktokIcon },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in name, email, and message.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd love to hear from you"
        description="Have a question, suggestion, or partnership idea? Reach out — we're here to help."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {sent ? (
              <Reveal>
                <div className="rounded-2xl border border-border bg-card p-10 text-center">
                  <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-8" />
                  </span>
                  <h2 className="mt-6 font-heading text-2xl font-bold">
                    Message Sent!
                  </h2>
                  <p className="mt-3 text-lg text-muted-foreground">
                    Thank you for reaching out. Our team will respond within 24–48
                    hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setSent(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
                  <h2 className="font-heading text-2xl font-bold">
                    Send us a message
                  </h2>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="mt-1.5 min-h-32"
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="mt-4 text-sm text-destructive">{error}</p>
                  )}
                  <Button
                    size="lg"
                    className="mt-4 w-full"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    <Send className="size-4" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-2 lg:sticky lg:top-28">
            <Reveal delay={0.15}>
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-bold">
                    Contact Information
                  </h3>
                  <div className="mt-5 space-y-5">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-medium">Office Address</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {CONTACT.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 size-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a
                          href={`tel:${CONTACT.phone}`}
                          className="mt-0.5 block text-sm text-muted-foreground hover:text-accent"
                        >
                          {CONTACT.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="mt-0.5 block text-sm text-muted-foreground hover:text-accent"
                        >
                          {CONTACT.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageCircle className="mt-0.5 size-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <a
                          href={`https://wa.me/${CONTACT.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block text-sm text-muted-foreground hover:text-accent"
                        >
                          Chat with us on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-bold">
                    Follow Us
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Stay connected on social media for the latest updates.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <s.icon className="size-5" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-primary/5 p-6 text-center">
                  <h3 className="font-heading text-lg font-bold">
                    Office Hours
                  </h3>
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
                    <p>Saturday: 9:00 AM – 1:00 PM</p>
                    <p className="text-xs">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
