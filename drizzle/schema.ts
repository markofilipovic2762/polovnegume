import { pgTable, serial, varchar, integer, numeric, text } from "drizzle-orm/pg-core"

export const tires = pgTable("tires", {
  id: serial("id").primaryKey(),
  brand: varchar("brand", { length: 100 }),
  model: varchar("model", { length: 100 }),
  width: integer("width"),
  aspect_ratio: integer("aspect_ratio"),
  diameter: integer("diameter"),
  season: varchar("season", { length: 50 }),
  condition: varchar("condition", { length: 50 }),
  quantity: integer("quantity"),
  price: numeric("price"),
  description: text("description"),
  image_url: text("image_url"),
})
