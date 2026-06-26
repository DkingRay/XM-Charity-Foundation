'use client'

import { useState } from 'react'
import { Heart, Shield, Check, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DONATION_PRESETS, IMPACT_STATS } from '@/lib/site-data'

const IMPACT_EXAMPLES = [
  { amount: 25, impact: 'Provides school supplies for 5 children' },
  { amount: 50, impact: 'Funds a medical screening for 10 people' },
  { amount: 100, impact: 'Distributes food packages to 8 families' },
  { amount: 250, impact: 'Sponsors a vocational training for 2 youth' },
  { amount: 500, impact: 'Funds a community water project' },
]

export default function DonatePage() {
  const [amount, setAmount] = useState<number | ''>(50)
  const [custom, setCustom] = useState('')
  const [recurring, setRecurring] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  const handlePreset = (val: number) => {
    setAmount(val)
    setCustom('')
  }

  const handleCustom = (val: string) => {
    setCustom(val)
    setAmount('')
  }

  const displayAmount = amount !== '' ? amount : custom ? Number(custom) : 0

  const handleSubmit = async () => {
    if (!displayAmount || !formData.name || !formData.email) {
      setError('Please fill in your name, email, and select an amount.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: displayAmount,
          recurring,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Make a Gift"
        title="Your generosity creates lasting change"
        description="Every contribution — big or small — brings food, healthcare, education, and hope to families who need it most."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {submitted ? (
              <Reveal>
                <div className="rounded-2xl border border-border bg-card p-10 text-center">
                  <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-8" />
                  </span>
                  <h2 className="mt-6 font-heading text-2xl font-bold">
                    Thank You for Your Generosity!
                  </h2>
                  <p className="mt-3 text-pretty text-lg text-muted-foreground">
                    Your donation of <strong>${displayAmount.toLocaleString()}</strong>{' '}
                    will go directly toward transforming lives and building hope in
                    communities across Nigeria.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A receipt will be sent to your email shortly.
                  </p>
                  <Button
                    asChild
                    className="mt-8"
                    onClick={() => setSubmitted(false)}
                  >
                    <a href="/">Return Home</a>
                  </Button>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
                  <h2 className="font-heading text-2xl font-bold">
                    Complete your donation
                  </h2>

                  <div className="mt-8">
                    <Label>Select Amount</Label>
                    <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
                      {DONATION_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handlePreset(preset)}
                          className={`rounded-lg border px-4 py-3 text-center font-heading text-lg font-bold transition-all ${
                            amount === preset
                              ? 'border-accent bg-accent/10 text-accent ring-1 ring-accent'
                              : 'border-border bg-background text-foreground hover:border-accent/50'
                          }`}
                        >
                          ${preset}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Label htmlFor="custom-amount">Custom Amount</Label>
                      <div className="relative mt-1.5">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="custom-amount"
                          type="number"
                          min={1}
                          placeholder="Enter amount"
                          value={custom}
                          onChange={(e) => handleCustom(e.target.value)}
                          className="pl-8 text-lg font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={recurring}
                      onClick={() => setRecurring(!recurring)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                        recurring ? 'bg-accent' : 'bg-input'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm transition-transform ${
                          recurring ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <Label className="cursor-pointer font-medium">
                      Make this a monthly donation
                    </Label>
                  </div>

                  <Separator className="my-8" />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="payment">Payment Method</Label>
                      <div className="mt-1.5 flex h-8 items-center rounded-lg border border-input bg-transparent px-2.5 text-sm text-muted-foreground">
                        Card / Bank Transfer / USSD
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="mt-4 text-sm text-destructive">{error}</p>
                  )}

                  <Button
                    size="lg"
                    className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    <Heart className="size-5" fill="currentColor" />
                    {loading ? 'Processing...' : `Donate $${displayAmount.toLocaleString()}${recurring ? ' monthly' : ''}`}
                  </Button>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    <Shield className="mb-0.5 inline size-3.5" /> Secure donation.
                    You will receive a tax-deductible receipt.
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-2 lg:sticky lg:top-28">
            <Reveal delay={0.15}>
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-bold">
                    Your Impact at a Glance
                  </h3>
                  <div className="mt-5 space-y-4">
                    {IMPACT_EXAMPLES.map((item) => (
                      <div key={item.amount} className="flex items-start gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="size-3.5" />
                        </span>
                        <div>
                          <p className="font-heading font-bold">${item.amount}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.impact}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-bold">
                    Our Commitment
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    100% of your donation goes directly to funding our programs. We
                    are committed to transparency and accountability in every
                    project we undertake.
                  </p>
                </div>

                <div className="rounded-2xl bg-primary/5 p-6 text-center">
                  <p className="font-heading text-3xl font-extrabold text-primary">
                    {IMPACT_STATS[0].value.toLocaleString()}+
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    beneficiaries reached so far
                  </p>
                  <Button asChild variant="link" className="mt-2">
                    <a href="/impact">
                      See our impact
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-muted px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="font-heading text-2xl font-bold">
            Other ways to give
          </h2>
          <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Bank Transfer',
                desc: 'Direct transfers to our bank account. Contact us for details.',
              },
              {
                title: 'PayPal / PayStack',
                desc: 'Secure online payments via card, USSD, or mobile money.',
              },
              {
                title: 'Sponsor a Project',
                desc: 'Fund a specific program or community project of your choice.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="font-heading font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  )
}
