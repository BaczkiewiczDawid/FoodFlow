"use server"

import {mealsList} from "@/drizzle/schema";
import {db} from "@/drizzle/db";
import {Ingredient} from "@/app/types/ingredient";

export const getMeals = async (limit: number, offset: number) => {
    try {
        const data = await db.select().from(mealsList).limit(limit).offset(offset)

        const formattedData = data.map((meal) => {
            return {
                ...meal,
                createdAt: meal.createdAt.toISOString(),
                ingredients: meal.ingredients as Ingredient[]
            }
        })

        return formattedData
    } catch (err) {
        console.error(err)

        return []
    }
}