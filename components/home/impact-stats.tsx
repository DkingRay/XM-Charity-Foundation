import { AnimatedCounter } from '@/components/animated-counter'
import { Reveal } from '@/components/reveal'
import { IMPACT_STATS } from '@/lib/site-data'

export function ImpactStats() {
  return (
    <section className="relative z-10 -mt-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-xl lg:grid-cols-4">
          {IMPACT_STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="bg-card"
            >
              <div className="flex h-full flex-col items-center justify-center px-6 py-8 text-center">
                <span className="font-heading text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
