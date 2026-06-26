import {
  HeartHandshake,
  GraduationCap,
  Users,
  HandHeart,
  Sprout,
  ShieldCheck,
  Scale,
  Award,
  Leaf,
  Building,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Support', href: '/donate' },
  { label: 'Media', href: '/media' },
  { label: 'Events', href: '/events' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
]

export const CONTACT = {
  email: 'info@xmcharityfoundation.org',
  phone: '+234 800 000 0000',
  whatsapp: '2348000000000',
  address: 'Suite A6, Third Floor, Real Tower Plaza, A.E. Ekukinam Street, Utako, Abuja, Nigeria',
  socials: {
    instagram: 'https://www.instagram.com/xm_charity_foundation/',
    facebook: 'https://www.facebook.com/OfficialAhmedXM',
    twitter: 'https://x.com/ahmedxm01',
    tiktok: 'https://www.tiktok.com/@ahmed_xm_',
  },
}

const IMG = (filename: string) => `/images/${filename}`

export const HERO_SLIDES = [
  {
    image: IMG('727588697_122286498308018099_2441904961173424883_n.jpg'),
    alt: 'School renovation project — newly rebuilt classroom blocks at a school in Bauchi',
    tag: 'School Renovation',
  },
  {
    image: IMG('727550799_122286498254018099_2205527912629372701_n.jpg'),
    alt: 'Students receiving new learning materials and school supplies from the foundation',
    tag: 'Education Support',
  },
  {
    image: IMG('727288228_122286498302018099_1619861257588860858_n.jpg'),
    alt: 'Community outreach — foundation team with community members during a visit',
    tag: 'Community Outreach',
  },
]

export type Stat = {
  value: number
  suffix?: string
  label: string
}

export const IMPACT_STATS: Stat[] = [
  { value: 50000, suffix: '+', label: 'Lives Impacted' },
  { value: 50, suffix: '', label: 'Schools Renovated (Goal 2026)' },
  { value: 25, suffix: '+', label: 'Communities Served' },
  { value: 15, suffix: '+', label: 'School Projects Completed' },
]

export type Program = {
  slug: string
  title: string
  icon: LucideIcon
  image: string
  summary: string
  description: string
  metrics: { value: string; label: string }[]
  objectives: string[]
}

export const PROGRAMS: Program[] = [
  {
    slug: 'education',
    title: 'School Renovation',
    icon: Building,
    image: IMG('727588697_122286498308018099_2441904961173424883_n.jpg'),
    summary:
      'Rebuilding and renovating public schools across Nigeria — restoring classrooms, toilets, and providing furniture and learning materials.',
    description:
      'Our flagship program focuses on renovating dilapidated public schools across Northern Nigeria and beyond. We rebuild classroom blocks, restore toilet facilities, provide new desks and chairs, and distribute learning materials. Every child deserves a safe place to learn and dream, and we refuse to look away.',
    metrics: [
      { value: '15+', label: 'Schools renovated' },
      { value: '50', label: 'Goal for 2026' },
      { value: '8,000+', label: 'Students impacted' },
    ],
    objectives: [
      'Renovate dilapidated classroom blocks in public schools',
      'Provide new desks, chairs, and learning materials',
      'Restore toilet and sanitation facilities',
      'Create safe, dignified learning environments for children',
    ],
  },
  {
    slug: 'community-outreach',
    title: 'Community Outreach',
    icon: Users,
    image: IMG('723197065_122285177018018099_7750306090125267792_n.jpg'),
    summary:
      'On-the-ground relief, food distribution, and direct support reaching families and communities across Northern Nigeria.',
    description:
      'Our outreach teams go directly into communities to distribute food packages, relief materials, and essential supplies. Every outreach is an opportunity to build relationships rooted in dignity, compassion, and service. A small token can create a meaningful impact.',
    metrics: [
      { value: '10,000+', label: 'Relief packages' },
      { value: '25+', label: 'Communities reached' },
      { value: '50+', label: 'Outreach events' },
    ],
    objectives: [
      'Distribute food and essential relief materials',
      'Reach vulnerable families in underserved areas',
      'Build trusted relationships with local communities',
      'Respond quickly to emerging community needs',
    ],
  },
  {
    slug: 'humanitarian-support',
    title: 'Humanitarian Support',
    icon: HandHeart,
    image: IMG('719969387_122284752398018099_9149896095269479543_n.jpg'),
    summary:
      'Emergency relief, water projects, and infrastructure support for communities in times of need.',
    description:
      'When communities face hardship, we provide emergency relief including food, water, shelter, and essential supplies. We also invest in sustainable infrastructure like water projects that serve communities long after our initial response.',
    metrics: [
      { value: '3,000+', label: 'Families aided' },
      { value: '8', label: 'Water projects' },
      { value: '12', label: 'Emergency responses' },
    ],
    objectives: [
      'Provide emergency food and relief supplies',
      'Support clean water and sanitation access',
      'Assist displaced and vulnerable families',
      'Build long-term community resilience',
    ],
  },
  {
    slug: 'youth-empowerment',
    title: 'Youth & Education',
    icon: GraduationCap,
    image: IMG('723109644_122285176976018099_4112867470274838597_n.jpg'),
    summary:
      'Scholarships, student financial support, and integration of modern skills like finance and technology into education.',
    description:
      'We invest in the next generation through student financial support, scholarships, and partnerships with university student unions. Modern education concepts like finance and technology are integrated into learning materials, preparing young Nigerians for the future.',
    metrics: [
      { value: '500+', label: 'Students supported' },
      { value: '5', label: 'University partnerships' },
      { value: '1,000+', label: 'Learning materials' },
    ],
    objectives: [
      'Provide financial support to students in need',
      'Partner with university student unions',
      'Integrate finance and technology into learning',
      'Support youth leadership and development',
    ],
  },
]

export type Value = { title: string; description: string; icon: LucideIcon }

export const CORE_VALUES: Value[] = [
  {
    title: 'Compassion',
    description: 'We lead with empathy, meeting every person with dignity, care, and respect.',
    icon: HeartHandshake,
  },
  {
    title: 'Integrity',
    description: 'We operate with full transparency and accountability in all we do.',
    icon: ShieldCheck,
  },
  {
    title: 'Service',
    description: 'We put communities first in every decision and action we take.',
    icon: HandHeart,
  },
  {
    title: 'Faith',
    description: 'Driven by gratitude and a sense of moral duty to give back in our own little way.',
    icon: HeartHandshake,
  },
  {
    title: 'Excellence',
    description: 'We pursue the highest standards in our work, from renovation quality to community engagement.',
    icon: Award,
  },
  {
    title: 'Sustainability',
    description: 'We build solutions that create lasting change, not temporary fixes.',
    icon: Leaf,
  },
]

export const TIMELINE = [
  {
    year: '2017',
    title: 'Founder Begins His Journey',
    description:
      'Ahmed Yusuf Saifullah, born in Bauchi State, begins his rise as a financial market analyst and cryptocurrency trader, founding what would become XM Trading Academy.',
  },
  {
    year: '2024 – 2025',
    title: 'Foundation Established',
    description:
      'The XM Charity Foundation is launched — a self-funded initiative with a mission to renovate schools and support communities across Nigeria without external or government funding.',
  },
  {
    year: '2025',
    title: 'First School Renovations',
    description:
      'The foundation begins renovating dilapidated schools in Bauchi metropolis, restoring classroom blocks, toilets, and providing furniture. The mission to renovate 50 schools is announced.',
  },
  {
    year: 'June 2026',
    title: 'Major Commissioning',
    description:
      'Four blocks (eight classrooms) successfully commissioned in Bauchi metropolis. Multiple school renovations completed and shared across social media, inspiring thousands.',
  },
  {
    year: '2026 – 2027',
    title: '50-School Goal & Beyond',
    description:
      'The foundation aims to complete 50 school renovations in 2026, continuing to expand its impact across Nigeria.',
  },
]

export type Story = {
  name: string
  role: string
  image: string
  quote: string
}

export const STORIES: Story[] = [
  {
    name: 'Aisha M.',
    role: 'Student, Bauchi',
    image: IMG('723109644_122285176976018099_4112867470274838597_n.jpg'),
    quote:
      'Our school was falling apart. The foundation rebuilt our classrooms and gave us new desks. Now we are proud to come to school every day. May Allah bless them.',
  },
  {
    name: 'Ibrahim S.',
    role: 'Teacher, Bauchi State',
    image: IMG('720226698_122284752314018099_1040437894573776917_n.jpg'),
    quote:
      'For years we taught in crumbling classrooms. The foundation restored our school and our hope. This is more than a renovation — it is an investment in the future of our children.',
  },
  {
    name: 'Community Elder',
    role: 'Community Leader, Bauchi',
    image: IMG('719506394_122284752464018099_5562625399107309443_n.jpg'),
    quote:
      'We are grateful for this blessing. Without external or government funding, they came and made a difference. A small token, a meaningful impact.',
  },
]

export type MediaItem = {
  id: number
  image: string
  category: 'School Renovation' | 'Education' | 'Outreach' | 'Events'
  type: 'photo' | 'video' | 'reel'
  title: string
  span?: 'tall' | 'wide'
}

const ALL_IMAGES = [
  '727588697_122286498308018099_2441904961173424883_n.jpg',
  '727550799_122286498254018099_2205527912629372701_n.jpg',
  '727288228_122286498302018099_1619861257588860858_n.jpg',
  '725641030_122286111038018099_2129789106909836960_n.jpg',
  '724818017_122285697002018099_8405143684719318262_n.jpg',
  '723197065_122285177018018099_7750306090125267792_n.jpg',
  '723109644_122285176976018099_4112867470274838597_n.jpg',
  '720282373_122285411132018099_6453543109505619715_n.jpg',
  '720226698_122284752314018099_1040437894573776917_n.jpg',
  '719969387_122284752398018099_9149896095269479543_n.jpg',
  '719556490_122284850090018099_4914428958774086704_n.jpg',
  '719506394_122284752464018099_5562625399107309443_n.jpg',
  '719426349_122285235404018099_6166799000959899654_n.jpg',
  '719203030_122284849718018099_3497546787518534834_n.jpg',
  '717596072_122284752194018099_8612082434875538740_n.jpg',
  '717286733_122284752176018099_7271539336851618725_n.jpg',
  '716230133_122284575332018099_7820708418825074856_n.jpg',
  '711368979_122284226318018099_8953911967068775381_n.jpg',
  '700074606_122282215760018099_3527457504966491796_n.jpg',
]

export const MEDIA_ITEMS: MediaItem[] = [
  { id: 1, image: IMG(ALL_IMAGES[0]), category: 'School Renovation', type: 'photo', title: 'Newly renovated classroom blocks in Bauchi', span: 'wide' },
  { id: 2, image: IMG(ALL_IMAGES[1]), category: 'Education', type: 'photo', title: 'Students receiving learning materials', span: 'tall' },
  { id: 3, image: IMG(ALL_IMAGES[2]), category: 'Outreach', type: 'photo', title: 'Foundation team during community outreach' },
  { id: 4, image: IMG(ALL_IMAGES[3]), category: 'Education', type: 'photo', title: 'Community learning materials distribution', span: 'tall' },
  { id: 5, image: IMG(ALL_IMAGES[4]), category: 'School Renovation', type: 'photo', title: 'School renovation project — before and after', span: 'wide' },
  { id: 6, image: IMG(ALL_IMAGES[5]), category: 'Outreach', type: 'photo', title: 'Food distribution to families in need' },
  { id: 7, image: IMG(ALL_IMAGES[6]), category: 'Education', type: 'photo', title: 'Children with new school supplies' },
  { id: 8, image: IMG(ALL_IMAGES[7]), category: 'Events', type: 'photo', title: 'Commissioning ceremony for renovated school' },
  { id: 9, image: IMG(ALL_IMAGES[8]), category: 'School Renovation', type: 'photo', title: 'Renovated classroom interior', span: 'tall' },
  { id: 10, image: IMG(ALL_IMAGES[9]), category: 'Outreach', type: 'photo', title: 'Community gathering during outreach program', span: 'wide' },
  { id: 11, image: IMG(ALL_IMAGES[10]), category: 'Education', type: 'photo', title: 'Students in their newly furnished classroom' },
  { id: 12, image: IMG(ALL_IMAGES[11]), category: 'School Renovation', type: 'photo', title: 'Foundation members at school project site' },
]

export const MEDIA_CATEGORIES = [
  'All',
  'School Renovation',
  'Education',
  'Outreach',
  'Events',
] as const

export type EventItem = {
  id: number
  title: string
  date: string
  isoDate: string
  location: string
  image: string
  category: string
  description: string
  status: 'upcoming' | 'past'
}

export const EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'School Renovation Commissioning — Bauchi',
    date: 'June 25, 2026',
    isoDate: '2026-06-25T10:00:00',
    location: 'Bauchi Metropolis, Bauchi State',
    image: IMG(ALL_IMAGES[0]),
    category: 'School Renovation',
    description:
      'Commissioning of four blocks (eight classrooms) after successful renovation. A milestone in our 50-school mission.',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Back-to-School Supplies Distribution',
    date: 'September 2026',
    isoDate: '2026-09-01T09:00:00',
    location: 'Bauchi State',
    image: IMG(ALL_IMAGES[1]),
    category: 'Education',
    description:
      'Distributing school bags, books, uniforms, and learning materials to students ahead of the new academic year.',
    status: 'upcoming',
  },
  {
    id: 3,
    title: '50-School Mission — Next Renovation Phase',
    date: 'August 2026',
    isoDate: '2026-08-01T09:00:00',
    location: 'Northern Nigeria',
    image: IMG(ALL_IMAGES[4]),
    category: 'School Renovation',
    description:
      'Continuing our ongoing mission to renovate 50 schools across Nigeria. Next phase targets additional schools in Bauchi and neighboring states.',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Two Schools Renovated in Northern Nigeria',
    date: 'June 9, 2026',
    isoDate: '2026-06-09T10:00:00',
    location: 'Northern Nigeria',
    image: IMG(ALL_IMAGES[5]),
    category: 'School Renovation',
    description:
      'Successfully renovated two schools — restored 4 blocks of classrooms, toilets, and provided new chairs and books.',
    status: 'past',
  },
  {
    id: 5,
    title: 'Community Food Distribution',
    date: 'May 2026',
    isoDate: '2026-05-15T10:00:00',
    location: 'Bauchi State',
    image: IMG(ALL_IMAGES[6]),
    category: 'Outreach',
    description:
      'Food and relief package distribution to families in underserved communities across Bauchi.',
    status: 'past',
  },
  {
    id: 6,
    title: 'Bauchi School Renovation — Phase 1 Complete',
    date: 'May 2026',
    isoDate: '2026-05-01T10:00:00',
    location: 'Bauchi Metropolis, Bauchi State',
    image: IMG(ALL_IMAGES[8]),
    category: 'School Renovation',
    description:
      'Completed renovation of classroom blocks in Bauchi metropolis, restoring safe learning environments for hundreds of children.',
    status: 'past',
  },
]

export const DONATION_PRESETS = [25, 50, 100, 250, 500]
