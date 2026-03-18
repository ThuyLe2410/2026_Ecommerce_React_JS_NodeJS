import {
  pgTable,
  varchar,
  json,
  integer,
  bigint,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: varchar("id", { length: 36 }).primaryKey(),
  image: varchar("image", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  rating: json("rating").notNull(),
  priceCents: integer("price_cents"),
  keywords: json("keywords").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderTimeMs: bigint("orderTimeMs", { mode: "number" }),
  totalCostCents: integer("totalCostCents"),
  products: json("products"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const cart = pgTable("cart", {
  productId: varchar("productId", { length: 36 }).primaryKey(),
  quantity: integer("quantity"),
  deliveryOptionId: varchar("deliveryOptionId"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const deliveryOptions = pgTable("deliveryOptions", {
  id: varchar("id").primaryKey(),
  deliveryDays: integer("deliveryDays"),
  priceCents: integer("priceCents"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
