'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  Heart,
  Handshake,
  Gift,
  Users,
  ArrowRight,
  Check,
  Send,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PROGRAMS } from '@/lib/site-data'

const VOLUNTEER_BENEFITS = [
  'Make a direct impact in your community',
  'Gain valuable skills and experience',
  'Join a passionate network of changemakers',
  'Receive a certificate of service',
]

const PARTNER_BENEFITS = [
  'Co-create community development programs',
  'Access impact reporting and data',
  'Tax-deductible partnership opportunities',
  'Brand visibility across our platforms',
]

export default function GetInvolvedPage() {
  const [volunteerSent, setVolunteerSent] = useState(false)
  const [volunteerLoading, setVolunteerLoading] = useState(false)
  const [volunteerError, setVolunteerError] = useState('')
  const [volunteerForm, setVolunteerForm] = useState({
    name: '', email: '', phone: '', interest: '', message: '',
  })

  const [partnerSent, setPartnerSent] = useState(false)
  const [partnerLoading, setPartnerLoading] = useState(false)
  const [partnerError, setPartnerError] = useState('')
  const [partnerForm, setPartnerForm] = useState({
    name: '', organization: '', email: '', phone: '', message: '',
  })

  return (
    <>
      <PageHero
        eyebrow="Join the Movement"
        title="Together, we can do more"
        description="Whether you give your time, resources, or voice — your involvement creates ripple effects that transform entire communities."
      />

      <section
        id="volunteer"
        className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Volunteer
              </p>
              <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                Be the change. Volunteer with us.
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Whether you have a few hours or a few days, your time and talent
                can make a real difference in the lives of families across our
                communities.
              </p>
              <ul className="mt-6 space-y-3">
                {VOLUNTEER_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              {volunteerSent ? (
                <div className="rounded-2xl border border-border bg-card p-8 text-center">
                  <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-7" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold">
                    Thank You for Signing Up!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Our volunteer coordinator will reach out within 48 hours with
                    the next steps.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setVolunteerSent(false)}
                  >
                    Submit Another Response
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h3 className="font-heading text-lg font-bold">
                    Volunteer Sign-Up
                  </h3>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="v-name">Full Name</Label>
                      <Input
                        id="v-name" placeholder="Your name"
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="v-email">Email Address</Label>
                      <Input
                        id="v-email" type="email" placeholder="you@example.com"
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="v-phone">Phone Number</Label>
                      <Input
                        id="v-phone" type="tel" placeholder="+234 800 000 0000"
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="v-area">Area of Interest</Label>
                      <Input
                        id="v-area" placeholder="e.g. Education, Healthcare"
                        value={volunteerForm.interest}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, interest: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="v-message">Why do you want to volunteer?</Label>
                      <Textarea
                        id="v-message" placeholder="Tell us about yourself..."
                        value={volunteerForm.message}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  {volunteerError && (
                    <p className="mt-4 text-sm text-destructive">{volunteerError}</p>
                  )}
                  <Button
                    className="mt-4 w-full"
                    disabled={volunteerLoading}
                    onClick={async () => {
                      if (!volunteerForm.name || !volunteerForm.email) {
                        setVolunteerError('Please fill in your name and email.')
                        return
                      }
                      setVolunteerLoading(true)
                      setVolunteerError('')
                      try {
                        const res = await fetch('/api/volunteer', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(volunteerForm),
                        })
                        if (!res.ok) throw new Error()
                        setVolunteerSent(true)
                      } catch {
                        setVolunteerError('Something went wrong. Please try again.')
                      } finally {
                        setVolunteerLoading(false)
                      }
                    }}
                  >
                    <Send className="size-4" />
                    {volunteerLoading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="partnerships"
        className="scroll-mt-24 bg-muted px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal delay={0.1} className="order-2 lg:order-1">
              {partnerSent ? (
                <div className="rounded-2xl border border-border bg-card p-8 text-center">
                  <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-7" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold">
                    Thank You for Your Interest!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Our partnerships team will contact you within 3 business days.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setPartnerSent(false)}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h3 className="font-heading text-lg font-bold">
                    Partner With Us
                  </h3>
                  <div className="mt-6 grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="p-name">Full Name</Label>
                        <Input
                          id="p-name" placeholder="Your name"
                          value={partnerForm.name}
                          onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="p-org">Organization</Label>
                        <Input
                          id="p-org" placeholder="Organization name"
                          value={partnerForm.organization}
                          onChange={(e) => setPartnerForm({ ...partnerForm, organization: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="p-email">Email Address</Label>
                        <Input
                          id="p-email" type="email" placeholder="you@example.com"
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="p-phone">Phone Number</Label>
                        <Input
                          id="p-phone" type="tel" placeholder="+234 800 000 0000"
                          value={partnerForm.phone}
                          onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="p-message">How would you like to partner?</Label>
                      <Textarea
                        id="p-message"
                        placeholder="Tell us about your organization and partnership ideas..."
                        value={partnerForm.message}
                        onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  {partnerError && (
                    <p className="mt-4 text-sm text-destructive">{partnerError}</p>
                  )}
                  <Button
                    className="mt-4 w-full"
                    disabled={partnerLoading}
                    onClick={async () => {
                      if (!partnerForm.name || !partnerForm.email) {
                        setPartnerError('Please fill in your name and email.')
                        return
                      }
                      setPartnerLoading(true)
                      setPartnerError('')
                      try {
                        const res = await fetch('/api/partner', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(partnerForm),
                        })
                        if (!res.ok) throw new Error()
                        setPartnerSent(true)
                      } catch {
                        setPartnerError('Something went wrong. Please try again.')
                      } finally {
                        setPartnerLoading(false)
                      }
                    }}
                  >
                    <Send className="size-4" />
                    {partnerLoading ? 'Sending...' : 'Send Inquiry'}
                  </Button>
                </div>
              )}
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Partnerships
                </p>
                <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Collaborate for lasting impact
                </h2>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                  We partner with corporations, foundations, government agencies,
                  and community organizations to amplify impact and reach more
                  families in need.
                </p>
                <ul className="mt-6 space-y-3">
                  {PARTNER_BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="size-3.5" />
                      </span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        id="sponsorship"
        className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Sponsorship
            </p>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sponsor a program
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Choose a program to sponsor and fund the change you want to see.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program, i) => (
              <Reveal key={program.slug} delay={i * 0.1}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={program.image || '/placeholder.svg'}
                      alt={program.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm">
                      <program.icon className="size-4" />
                      {program.title}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-pretty leading-relaxed text-muted-foreground">
                      {program.summary}
                    </p>
                    <Button asChild className="mt-6 w-full">
                      <Link href={`/programs/${program.slug}`}>
                        Sponsor {program.title}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
