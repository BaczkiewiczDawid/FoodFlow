"use server"

import {mealsList} from "@/drizzle/schema";
import {db} from "@/drizzle/db";

export const getMeals = async () => {
    try {
        const data = await db.select().from(mealsList)

        return data
    } catch (err) {
        console.error(err)

        return []
    }
}