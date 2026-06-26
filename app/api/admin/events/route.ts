import { NextResponse } from 'next/server'
import { EVENTS } from '@/lib/site-data'

let storedEvents = [...EVENTS]

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(storedEvents)
}

export async function POST(request: Request) {
  const event = await request.json()
  const newEvent = { ...event, id: storedEvents.length + 1 }
  storedEvents.push(newEvent)
  return NextResponse.json(newEvent, { status: 201 })
}

export async function PUT(request: Request) {
  const updated = await request.json()
  storedEvents = storedEvents.map((e) => (e.id === updated.id ? updated : e))
  return NextResponse.json(updated)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))
  storedEvents = storedEvents.filter((e) => e.id !== id)
  return NextResponse.json({ success: true })
}
