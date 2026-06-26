import { Hero } from '@/components/home/hero'
import { ImpactStats } from '@/components/home/impact-stats'
import { FeaturedPrograms } from '@/components/home/featured-programs'
import { LatestMedia } from '@/components/home/latest-media'
import { SuccessStories } from '@/components/home/success-stories'
import { DonationCta } from '@/components/home/donation-cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <FeaturedPrograms />
      <LatestMedia />
      <SuccessStories />
      <DonationCta />
    </>
  )
}
