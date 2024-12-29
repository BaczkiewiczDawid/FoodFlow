import {integer, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";

export const userIngredients = pgTable('userIngredients', {
    id: serial("id").primaryKey(),
    created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    name: varchar("name").notNull(),
    amount: integer("amount").notNull(),
    type: varchar("type").notNull(),
    email: varchar("email").notNull()
})