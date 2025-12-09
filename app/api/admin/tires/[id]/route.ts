import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { tires } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  const item = await db.select().from(tires).where(eq(tires.id, id)).limit(1)

  if (item.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(item[0])
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const id = Number(params.id)

  await db.update(tires).set(data).where(eq(tires.id, id))

  return NextResponse.json({ success: true })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  await db.delete(tires).where(eq(tires.id, id))

  return NextResponse.json({ success: true })
}
