import {userIngredients} from "@/drizzle/schema";
import {and, eq} from "drizzle-orm";
import {db} from "@/drizzle/db";

export const deleteIngredient = async (data: any) => {
    try {
        const response = await db.delete(userIngredients).where(and(
            eq(userIngredients.name, data.name),
            eq(userIngredients.type, data.type),
            eq(userIngredients.email, data.email)))

        return {
            status: true,
            message: "Ingredient deleted successfully",
            data: [],
        }
    } catch (error) {
        console.error(error)

        return {
            status: false,
            message: "Failed to delete ingredient",
            data: []
        }
    }
}