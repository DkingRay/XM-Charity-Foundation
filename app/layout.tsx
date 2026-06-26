import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Sora } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { LayoutGuard } from '@/components/layout-guard'
import { BackToTop } from '@/components/back-to-top'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const sora = Sora({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'XM Charity Foundation — Transforming Lives, Building Hope',
    template: '%s | XM Charity Foundation',
  },
  description:
    'XM Charity Foundation empowers communities through compassion, outreach, education, and sustainable development. Volunteer or partner with us today.',
  generator: 'v0.app',
  keywords: [
    'charity',
    'nonprofit',
    'foundation',
    'community outreach',

    'education',
    'humanitarian aid',
    'volunteer',
    'donate',
  ],
  openGraph: {
    title: 'XM Charity Foundation — Transforming Lives, Building Hope',
    description:
      'Empowering communities through compassion, outreach, education, and sustainable development.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0e5a66',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <LayoutGuard><SiteHeader /></LayoutGuard>
        <main>{children}</main>
        <LayoutGuard><SiteFooter /></LayoutGuard>
        <LayoutGuard><BackToTop /></LayoutGuard>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
