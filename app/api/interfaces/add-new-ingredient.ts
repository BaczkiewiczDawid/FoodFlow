import {db} from "@/drizzle/db";
import {userIngredients} from "@/drizzle/schema";

export const addNewIngredient = async (data: any) => {
    try {
        const dbData = await db.insert(userIngredients).values({
            name: data.name,
            amount: Number(data.quantity),
            type: data.type,
            email: data.email
        })

        return {
            status: true,
            data: [],
            message: "Ingredient added successfully"
        }
    } catch (error) {
        console.error(error)
        return {
            status: false,
            data: [],
            message: "Failed to add ingredient"
        }
    }
}