import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const programs = await prisma.program.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(programs)
}

export async function POST(request: Request) {
  const body = await request.json()
  const program = await prisma.program.create({ data: body })
  return NextResponse.json(program, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...data } = body
  const program = await prisma.program.update({ where: { id }, data })
  return NextResponse.json(program)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await prisma.program.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
