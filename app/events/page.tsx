'use client'

import Image from 'next/image'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { EVENTS } from '@/lib/site-data'

function EventCard({
  event,
}: {
  event: (typeof EVENTS)[number]
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden sm:aspect-square sm:w-56">
        <Image
          src={event.image || '/placeholder.svg'}
          alt={event.title}
          fill
          sizes="(min-width: 640px) 224px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge
          className={`absolute left-3 top-3 ${
            event.status === 'upcoming'
              ? 'bg-accent text-accent-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col justify-center p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {event.category}
        </p>
        <h3 className="mt-1 font-heading text-xl font-bold">{event.title}</h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" />
            {event.location}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const upcoming = EVENTS.filter((e) => e.status === 'upcoming')
  const past = EVENTS.filter((e) => e.status === 'past')

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Join us in making a difference"
        description="From school renovation commissioning to community outreaches — see how you can be part of our upcoming events."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="upcoming">
            <TabsList className="mx-auto mb-10">
              <TabsTrigger value="upcoming" className="gap-2">
                <Clock className="size-4" />
                Upcoming
                {upcoming.length > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">
                    {upcoming.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="past">
                Past Events
                {past.length > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 text-[11px] font-bold">
                    {past.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {upcoming.length > 0 ? (
                <div className="space-y-6">
                  {upcoming.map((event, i) => (
                    <Reveal key={event.id} delay={i * 0.05}>
                      <EventCard event={event} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                  <h3 className="font-heading text-xl font-bold">
                    No upcoming events
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Check back soon for new events and programs.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-6">
                {past.map((event, i) => (
                  <Reveal key={event.id} delay={i * 0.05}>
                    <EventCard event={event} />
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
