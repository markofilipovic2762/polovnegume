import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { tires } from "@/drizzle/schema"
import { eq, and, gte, lte, ilike, sql } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const filterList = []

    if (searchParams.get("width"))
      filterList.push(eq(tires.width, Number(searchParams.get("width"))))

    if (searchParams.get("aspect_ratio"))
      filterList.push(eq(tires.aspect_ratio, Number(searchParams.get("aspect_ratio"))))

    if (searchParams.get("diameter"))
      filterList.push(eq(tires.diameter, Number(searchParams.get("diameter"))))

    if (searchParams.get("season"))
      filterList.push(eq(tires.season, searchParams.get("season")!))

    if (searchParams.get("brand"))
      filterList.push(ilike(tires.brand, searchParams.get("brand")!))

    if (searchParams.get("minPrice"))
      filterList.push(gte(sql`${tires.price}::numeric`, Number(searchParams.get("minPrice"))))

    if (searchParams.get("maxPrice"))
      filterList.push(lte(sql`${tires.price}::numeric`, Number(searchParams.get("maxPrice"))))

    const results = await db
      .select()
      .from(tires)
      .where(filterList.length ? and(...filterList) : undefined)

    return NextResponse.json({ tires: results, count: results.length })
  } catch (error) {
    console.error("[v0] Error fetching tires:", error)
    return NextResponse.json({ error: "Failed to fetch tires" }, { status: 500 })
  }
}
