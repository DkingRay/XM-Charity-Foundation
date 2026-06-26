export type DonationRecord = {
  id: string
  amount: number
  recurring: boolean
  name: string
  email: string
  phone: string
  date: string
  status: 'completed' | 'pending'
}

export type SubscriberRecord = {
  email: string
  date: string
}

export type AdminEvent = {
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

export type AdminStat = {
  value: number
  suffix?: string
  label: string
}

const donations: DonationRecord[] = [
  {
    id: '1',
    amount: 250,
    recurring: false,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 800 000 0001',
    date: '2026-06-25T10:30:00',
    status: 'completed',
  },
  {
    id: '2',
    amount: 100,
    recurring: true,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+234 800 000 0002',
    date: '2026-06-24T14:00:00',
    status: 'completed',
  },
  {
    id: '3',
    amount: 50,
    recurring: false,
    name: 'Samuel Ade',
    email: 'samuel@example.com',
    phone: '+234 800 000 0003',
    date: '2026-06-23T09:15:00',
    status: 'pending',
  },
]

const subscribers: SubscriberRecord[] = [
  { email: 'john@example.com', date: '2026-06-20T08:00:00' },
  { email: 'jane@example.com', date: '2026-06-19T12:30:00' },
  { email: 'blessing@example.com', date: '2026-06-18T16:45:00' },
]

export function getDonations(): DonationRecord[] {
  return [...donations]
}

export function getSubscribers(): SubscriberRecord[] {
  return [...subscribers]
}

export function addDonation(donation: Omit<DonationRecord, 'id' | 'date'>): DonationRecord {
  const record: DonationRecord = {
    ...donation,
    id: String(donations.length + 1),
    date: new Date().toISOString(),
  }
  donations.push(record)
  return record
}

export function addSubscriber(email: string): SubscriberRecord {
  const record: SubscriberRecord = {
    email,
    date: new Date().toISOString(),
  }
  subscribers.push(record)
  return record
}

export function getDashboardStats() {
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0)
  const completedDonations = donations.filter((d) => d.status === 'completed')
  const totalCompleted = completedDonations.reduce((sum, d) => sum + d.amount, 0)
  const monthlyDonations = donations.filter((d) => {
    const date = new Date(d.date)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  })
  const monthlyTotal = monthlyDonations.reduce((sum, d) => sum + d.amount, 0)

  return {
    totalDonations,
    totalCompleted,
    monthlyTotal,
    donationCount: donations.length,
    subscriberCount: subscribers.length,
    monthlyDonationCount: monthlyDonations.length,
  }
}
