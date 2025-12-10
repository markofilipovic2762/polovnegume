import { pgTable, serial, varchar, integer, numeric, text } from "drizzle-orm/pg-core"

export const tires = pgTable("tires", {
  id: serial("id").primaryKey(),
  brand: text("brand"),
  model: text("model"),
  width: integer("width"),
  aspect_ratio: integer("aspect_ratio"),
  diameter: integer("diameter"),
  season: text("season"),
  condition: text("condition"),
  quantity: integer("quantity"),
  price: numeric("price"),
  description: text("description"),
  image_url: text("image_url"),
})
