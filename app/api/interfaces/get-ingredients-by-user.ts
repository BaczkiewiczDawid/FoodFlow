import {userIngredients} from "@/drizzle/schema";
import {eq} from "drizzle-orm";
import {db} from "@/drizzle/db";

export const getIngredientsByUser = async (user: string | null) => {
    if (!user) {
        throw new Error("User email is required")
    }

    try {
        const data = await db.select({
            name: userIngredients.name,
            amount: userIngredients.amount,
            type: userIngredients.type
        }).from(userIngredients).where(eq(userIngredients.email, user))

        return {
            status: true,
            message: "Ingredients fetched successfully",
            data: data
        }
    } catch (err) {
        console.error(err)
        return {
            status: false,
            message: "Failed to get ingredients",
            data: []
        }
    }
}