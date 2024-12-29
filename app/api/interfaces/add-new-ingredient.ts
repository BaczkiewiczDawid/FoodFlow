import {db} from "@/drizzle/db";
import {userIngredients} from "@/drizzle/schema";

export const addNewIngredient = async (data: any) => {
    try {
        const dbData = await db.insert(userIngredients).values({
            name: data.name,
            amount: data.amount,
            type: data.type,
            email: data.email
        })

        console.log(dbData)
    } catch (error) {
        console.error(error)
    }
}