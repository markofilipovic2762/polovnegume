import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { tires } from "@/drizzle/schema"
import { eq, and, gte, lte, sql } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = []

    if (searchParams.get("width")) filters.push(eq(tires.width, Number(searchParams.get("width"))))
    if (searchParams.get("aspect_ratio")) filters.push(eq(tires.aspect_ratio, Number(searchParams.get("aspect_ratio"))))
    if (searchParams.get("diameter")) filters.push(eq(tires.diameter, Number(searchParams.get("diameter"))))
    if (searchParams.get("season")) filters.push(eq(tires.season, searchParams.get("season")!))
    if (searchParams.get("brand")) filters.push(eq(tires.brand, searchParams.get("brand")!))
    if (searchParams.get("minPrice")) filters.push(gte(sql`CAST(${tires.price} AS NUMERIC)`, Number(searchParams.get("minPrice"))))
    if (searchParams.get("maxPrice")) filters.push(lte(sql`CAST(${tires.price} AS NUMERIC)`, Number(searchParams.get("maxPrice"))))

    const result = await db
      .select()
      .from(tires)
      .where(filters.length ? and(...filters) : undefined)

    return NextResponse.json({ tires: result, count: result.length })
  } catch (e) {
    console.error("Error:", e)
    return NextResponse.json({ error: "Failed to load tires" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    await db.insert(tires).values(data)

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Error:", e)
    return NextResponse.json({ error: "Failed to add tire" }, { status: 500 })
  }
}
