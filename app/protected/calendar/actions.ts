"use server"

import {db} from "@/drizzle/db";
import {dailyData, ingredientsList} from "@/drizzle/schema";
import {and, eq, inArray} from "drizzle-orm";
import {Ingredient} from "@/app/types/ingredient";

export const addNewMealData = async (ingredients: any, mealType: string | undefined) => {
    if (!mealType) throw new Error("Meal type is required")

    try {
        const data = await db.insert(dailyData).values({
            date: "05-01-2025",
            userID: "a6801067-87a6-406b-a73a-94e26e89f9b7",
            mealsEaten: {},
            ingredients: ingredients,
            type: mealType
        })

        return {
            status: true,
            data: data,
            message: "Successfully added new meal"
        }
    } catch (err) {
        console.error(err)

        return {
            status: false,
            data: [],
            message: "Failed to add new meal"
        }
    }
}


export type ReturnData = {
    mealType: string,
    macro: {
        id: number,
        name: string
        kcal: number,
        protein: number,
        fat: number,
        carbs: number
    }[]
}[]

export const getMealsForDay = async (date: string, userID: string) => {
    try {
        const data: any[] = await db
            .select()
            .from(dailyData)
            .where(and(eq(dailyData.date, date), eq(dailyData.userID, userID)));

        if (data.length === 0) return [];

        const allIngredients = data.flatMap((el) =>
            el.ingredients.map((ingredient: Ingredient) => ingredient.name)
        );

        const ingredientsDetails = await db
            .select()
            .from(ingredientsList)
            .where(inArray(ingredientsList.name, allIngredients));

        const groupedData: Record<string, { mealType: string; ingredients: any[] }> = {};

        data.forEach((el) => {
            const mealType = el.type;

            if (!groupedData[mealType]) {
                groupedData[mealType] = { mealType, ingredients: [] };
            }

            const mealIngredients = el.ingredients.map((ingredient: Ingredient) => {
                const ingredientDetail = ingredientsDetails.find(
                    (detail) => detail.name === ingredient.name
                );

                if (ingredientDetail) {
                    const factor = ingredient.type === "grammage" ? ingredient.amount / 100 : 1;

                    return {
                        ...ingredientDetail,
                        kcal: ingredientDetail.kcal * factor,
                        protein: ingredientDetail.protein * factor,
                        fat: ingredientDetail.fat * factor,
                        carbs: ingredientDetail.carbs * factor,
                    };
                }
                return undefined;
            });

            groupedData[mealType].ingredients.push(
                ...mealIngredients.filter((ingredient: Ingredient) => ingredient !== undefined)
            );
        });

        const finalData = Object.values(groupedData);

        return finalData;
    } catch (err) {
        console.error(err);
        return [];
    }
};

