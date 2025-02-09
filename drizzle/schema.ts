import {date, integer, json, jsonb, pgTable, serial, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";

export const userIngredients = pgTable('userIngredients', {
    id: serial("id").primaryKey(),
    created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    name: varchar("name").notNull(),
    amount: integer("amount").notNull(),
    type: varchar("type").notNull(),
    email: varchar("email").notNull()
})

export const dailyData = pgTable("dailyData", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    date: date("date").notNull(),
    mealsEaten: json("mealsEaten"),
    ingredients: jsonb("ingredients"),
    type: varchar("type").notNull(),
    email: varchar("email").notNull()
})

export const ingredientsList = pgTable("ingredientsList", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    kcal: integer("kcal").notNull(),
    protein: integer("protein").notNull(),
    fat: integer("fat").notNull(),
    carbs: integer("carbs").notNull()
})

export const mealsList = pgTable("mealsList", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    name: varchar("name").notNull(),
    ingredients: json("ingredients").notNull(),
    kcal: integer("kcal").notNull(),
    protein: integer("protein").notNull(),
    carbs: integer("carbs").notNull(),
    fat: integer("fat").notNull(),
    description: varchar("description").notNull(),
    details: varchar("details").notNull(),
})

export const userSettings = pgTable("userSettings", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    email: varchar("email").notNull(),
    weight: integer("weight").notNull(),
    height: integer("height").notNull(),
    age: integer("age").notNull(),
    goal: varchar("goal").notNull(),
    gender: varchar("gender").notNull(),
    activity: integer("activity").notNull(),
    bmr: integer("bmr").notNull()
})