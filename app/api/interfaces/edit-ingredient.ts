import {userIngredients} from "@/drizzle/schema";
import {db} from "@/drizzle/db";
import {and, eq} from "drizzle-orm";

export const editIngredient = async (data: any) => {
    try {
        const response = await db.update(userIngredients).set({
            amount: data.amount,
            type: data.type
        }).where(and(eq(userIngredients.email, data.email), eq(userIngredients.name, data.name)))

        return {
            status: true,
            data: [],
            message: "Ingredient edited successfully"
        }
    } catch (err) {
        console.error(err)

        return {
            status: false,
            message: "Failed to edit ingredient",
            data: []
        }
    }
}