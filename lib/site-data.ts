import {
  HeartHandshake,
  GraduationCap,
  Stethoscope,
  Users,
  HandHeart,
  Sprout,
  ShieldCheck,
  Scale,
  Award,
  Leaf,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Media', href: '/media' },
  { label: 'Events', href: '/events' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
]

export const CONTACT = {
  email: 'hello@xmcharityfoundation.org',
  phone: '+234 800 000 0000',
  whatsapp: '2348000000000',
  address: 'Plot 12, Hope Avenue, Lagos, Nigeria',
  socials: {
    instagram: 'https://www.instagram.com/xm_charity_foundation/',
    facebook: 'https://www.facebook.com/',
    twitter: 'https://twitter.com/',
    youtube: 'https://youtube.com/',
  },
}

export const HERO_SLIDES = [
  {
    image: '/images/hero-1.png',
    alt: 'Volunteers distributing food supplies to families at a community outreach',
    tag: 'Community Outreach',
  },
  {
    image: '/images/hero-2.png',
    alt: 'A nurse providing care to a child during a medical mission',
    tag: 'Medical Missions',
  },
  {
    image: '/images/hero-3.png',
    alt: 'Schoolchildren smiling with new books and learning materials',
    tag: 'Education Support',
  },
]

export type Stat = {
  value: number
  suffix?: string
  label: string
}

export const IMPACT_STATS: Stat[] = [
  { value: 48000, suffix: '+', label: 'Beneficiaries Reached' },
  { value: 120, suffix: '+', label: 'Communities Served' },
  { value: 260, suffix: '+', label: 'Outreach Programs' },
  { value: 3500, suffix: '+', label: 'Volunteers Mobilized' },
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
    title: 'Education',
    icon: GraduationCap,
    image: '/images/program-education.png',
    summary:
      'Scholarships, learning materials, and school infrastructure that keep children in classrooms.',
    description:
      'We believe education is the surest path out of poverty. Our education program provides scholarships, school supplies, and learning environments that give every child a fair start.',
    metrics: [
      { value: '12,000+', label: 'Students supported' },
      { value: '40', label: 'Schools partnered' },
      { value: '850', label: 'Scholarships awarded' },
    ],
    objectives: [
      'Provide scholarships to underprivileged students',
      'Distribute books, uniforms, and learning materials',
      'Renovate classrooms and improve school facilities',
      'Train and support local teachers',
    ],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    icon: Stethoscope,
    image: '/images/program-healthcare.png',
    summary:
      'Free medical missions, screenings, and essential treatment for underserved communities.',
    description:
      'Through free medical missions and health camps, we bring quality healthcare to communities that need it most, focusing on prevention, treatment, and health education.',
    metrics: [
      { value: '18,500', label: 'Patients treated' },
      { value: '95', label: 'Medical missions' },
      { value: '30', label: 'Partner clinics' },
    ],
    objectives: [
      'Run free medical and surgical missions',
      'Provide screenings for common illnesses',
      'Distribute essential medication and supplies',
      'Promote community health awareness',
    ],
  },
  {
    slug: 'community-outreach',
    title: 'Community Outreach',
    icon: Users,
    image: '/images/program-outreach.png',
    summary:
      'On-the-ground relief, food distribution, and support reaching families where they live.',
    description:
      'Our outreach teams meet communities where they are, distributing relief packages, food, and essentials while building lasting relationships rooted in dignity.',
    metrics: [
      { value: '25,000', label: 'Relief packages' },
      { value: '120', label: 'Communities reached' },
      { value: '260', label: 'Outreach events' },
    ],
    objectives: [
      'Distribute food and relief materials',
      'Respond rapidly to community needs',
      'Build trusted local partnerships',
      'Support vulnerable families with essentials',
    ],
  },
  {
    slug: 'humanitarian-support',
    title: 'Humanitarian Support',
    icon: HandHeart,
    image: '/images/program-humanitarian.png',
    summary:
      'Clean water, shelter, and emergency response for communities in crisis.',
    description:
      'When disaster strikes, we move quickly to provide clean water, shelter, and emergency aid, restoring stability and hope to families affected by crisis.',
    metrics: [
      { value: '60', label: 'Water projects' },
      { value: '8,000', label: 'Families aided' },
      { value: '15', label: 'Emergency responses' },
    ],
    objectives: [
      'Provide clean water and sanitation',
      'Deliver emergency shelter and supplies',
      'Support displaced and vulnerable families',
      'Build long-term community resilience',
    ],
  },
  {
    slug: 'youth-empowerment',
    title: 'Youth Empowerment',
    icon: Sprout,
    image: '/images/program-youth.png',
    summary:
      'Skills training, mentorship, and entrepreneurship for the next generation.',
    description:
      'We equip young people with practical skills, mentorship, and seed support so they can build sustainable livelihoods and lead change in their communities.',
    metrics: [
      { value: '4,200', label: 'Youth trained' },
      { value: '35', label: 'Training programs' },
      { value: '600', label: 'Businesses started' },
    ],
    objectives: [
      'Deliver vocational and digital skills training',
      'Provide mentorship and career guidance',
      'Support youth-led entrepreneurship',
      'Create pathways to employment',
    ],
  },
]

export type Value = { title: string; description: string; icon: LucideIcon }

export const CORE_VALUES: Value[] = [
  {
    title: 'Compassion',
    description: 'We lead with empathy, meeting people with dignity and care.',
    icon: HeartHandshake,
  },
  {
    title: 'Integrity',
    description: 'We do what is right, honestly and consistently.',
    icon: ShieldCheck,
  },
  {
    title: 'Accountability',
    description: 'We are transparent with every donation and outcome.',
    icon: Scale,
  },
  {
    title: 'Service',
    description: 'We put communities first in everything we do.',
    icon: HandHeart,
  },
  {
    title: 'Excellence',
    description: 'We pursue the highest standards in our work and impact.',
    icon: Award,
  },
  {
    title: 'Sustainability',
    description: 'We build solutions that last well beyond our presence.',
    icon: Leaf,
  },
]

export const TIMELINE = [
  {
    year: '2016',
    title: 'A Foundation is Born',
    description:
      'XM Charity Foundation is established with a small team of volunteers and a big mission to serve the most vulnerable.',
  },
  {
    year: '2018',
    title: 'First Medical Mission',
    description:
      'We launched our first free medical mission, treating over 2,000 patients in underserved communities.',
  },
  {
    year: '2020',
    title: 'Crisis Response',
    description:
      'Mobilized emergency relief during a season of crisis, reaching thousands of families with food and essentials.',
  },
  {
    year: '2022',
    title: 'Education for All',
    description:
      'Awarded our 500th scholarship and renovated dozens of classrooms across partner schools.',
  },
  {
    year: '2024',
    title: 'Scaling Impact',
    description:
      'Expanded to 120 communities with sustainable water, health, and youth empowerment programs.',
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
    name: 'Amara O.',
    role: 'Scholarship Beneficiary',
    image: '/images/story-1.png',
    quote:
      'The foundation paid my school fees when my family had nothing. Today I am the first in my family to attend university.',
  },
  {
    name: 'Daniel K.',
    role: 'Volunteer',
    image: '/images/story-2.png',
    quote:
      'Volunteering changed how I see my community. Every outreach reminds me that small acts of kindness create real change.',
  },
  {
    name: 'Mama Ngozi',
    role: 'Community Member',
    image: '/images/story-3.png',
    quote:
      'The medical mission saved my grandchild. We are forever grateful for the care and compassion we received.',
  },
]

export type MediaItem = {
  id: number
  image: string
  category: 'Outreach' | 'Medical Missions' | 'Education' | 'Events' | 'Humanitarian Aid'
  type: 'photo' | 'video' | 'reel'
  title: string
  span?: 'tall' | 'wide'
}

export const MEDIA_ITEMS: MediaItem[] = [
  { id: 1, image: '/images/media-1.png', category: 'Outreach', type: 'photo', title: 'Food distribution drive', span: 'wide' },
  { id: 2, image: '/images/media-2.png', category: 'Education', type: 'photo', title: 'Back-to-school supplies', span: 'tall' },
  { id: 3, image: '/images/media-3.png', category: 'Medical Missions', type: 'video', title: 'Health awareness gathering' },
  { id: 4, image: '/images/media-4.png', category: 'Humanitarian Aid', type: 'reel', title: 'Community garden project', span: 'tall' },
  { id: 5, image: '/images/media-5.png', category: 'Events', type: 'photo', title: 'Annual fundraising gala', span: 'wide' },
  { id: 6, image: '/images/media-6.png', category: 'Humanitarian Aid', type: 'photo', title: 'Clean water project' },
  { id: 7, image: '/images/program-education.png', category: 'Education', type: 'photo', title: 'Classroom learning' },
  { id: 8, image: '/images/program-healthcare.png', category: 'Medical Missions', type: 'video', title: 'Free medical checkup' },
  { id: 9, image: '/images/program-youth.png', category: 'Education', type: 'reel', title: 'Youth skills workshop', span: 'tall' },
  { id: 10, image: '/images/program-outreach.png', category: 'Outreach', type: 'photo', title: 'Relief package handout', span: 'wide' },
  { id: 11, image: '/images/program-humanitarian.png', category: 'Humanitarian Aid', type: 'photo', title: 'Water container delivery' },
  { id: 12, image: '/images/donate-cta.png', category: 'Events', type: 'video', title: 'Community celebration' },
]

export const MEDIA_CATEGORIES = [
  'All',
  'Outreach',
  'Medical Missions',
  'Education',
  'Events',
  'Humanitarian Aid',
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
    title: 'Annual Medical Mission 2026',
    date: 'August 15, 2026',
    isoDate: '2026-08-15T09:00:00',
    location: 'Ikorodu, Lagos',
    image: '/images/program-healthcare.png',
    category: 'Medical Missions',
    description:
      'A three-day free medical mission offering screenings, treatment, and essential medication to underserved families.',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Back-to-School Outreach',
    date: 'September 5, 2026',
    isoDate: '2026-09-05T10:00:00',
    location: 'Abeokuta, Ogun',
    image: '/images/media-2.png',
    category: 'Education',
    description:
      'Distributing school bags, books, and uniforms to 1,000 students ahead of the new academic year.',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Hope Gala & Fundraiser',
    date: 'October 20, 2026',
    isoDate: '2026-10-20T18:00:00',
    location: 'Victoria Island, Lagos',
    image: '/images/media-5.png',
    category: 'Events',
    description:
      'An evening of celebration and giving to fund our 2027 community development programs.',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Clean Water Project Launch',
    date: 'March 22, 2026',
    isoDate: '2026-03-22T09:00:00',
    location: 'Epe, Lagos',
    image: '/images/media-6.png',
    category: 'Humanitarian Aid',
    description:
      'Commissioned a new borehole serving over 3,000 residents with safe, clean drinking water.',
    status: 'past',
  },
  {
    id: 5,
    title: 'Youth Empowerment Summit',
    date: 'February 10, 2026',
    isoDate: '2026-02-10T09:00:00',
    location: 'Ibadan, Oyo',
    image: '/images/program-youth.png',
    category: 'Youth',
    description:
      'A skills and mentorship summit equipping 500 young people for sustainable livelihoods.',
    status: 'past',
  },
  {
    id: 6,
    title: 'Festive Food Drive',
    date: 'December 18, 2025',
    isoDate: '2025-12-18T10:00:00',
    location: 'Surulere, Lagos',
    image: '/images/media-1.png',
    category: 'Outreach',
    description:
      'Distributed festive food packages to 2,500 families during the holiday season.',
    status: 'past',
  },
]

export const DONATION_PRESETS = [25, 50, 100, 250, 500]
