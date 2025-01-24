"use server"

import {db} from "@/drizzle/db";
import {dailyData, ingredientsList, userIngredients} from "@/drizzle/schema";
import {and, eq, inArray, sql} from "drizzle-orm";
import {Ingredient} from "@/app/types/ingredient";
import {firstLetterToUpperCase} from "@/helpers/first-letter-to-upper-case";

export const addNewMealData = async (ingredients: any, mealType: string | undefined, selectedDate: string) => {
    if (!mealType) throw new Error("Meal type is required")

    try {
        console.log(selectedDate)

        const data = await db.insert(dailyData).values({
            date: selectedDate,
            userID: "a6801067-87a6-406b-a73a-94e26e89f9b7",
            mealsEaten: {},
            ingredients: ingredients,
            type: mealType
        })

        await updateMyIngredients(ingredients)

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

const updateMyIngredients = async (ingredients: Ingredient[]) => {
    if (!ingredients || ingredients.length === 0) {
        throw new Error("No ingredients found!");
    }

    try {
        const promises = ingredients.map((ingredient) =>
            db.update(userIngredients)
                .set({
                    amount: sql`${userIngredients.amount} - ${ingredient.amount}`,
                })
                .where(eq(userIngredients.name, firstLetterToUpperCase(ingredient.name)))
        );

        await Promise.all(promises);
        return {success: true, message: "Ingredients updated successfully."};
    } catch (err) {
        console.error(err);
        throw new Error("Failed to update ingredients.");
    }
};

export const getMealsForDay = async (date: string, userID: string) => {
    try {
        const data: any[] = await db
            .select()
            .from(dailyData)
            .where(and(eq(dailyData.date, date), eq(dailyData.userID, userID)));

        if (data.length === 0) return [];

        const allIngredients = data.flatMap((el) => {
            if (Array.isArray(el.ingredients)) {
                return el.ingredients.flatMap((ingredient: any) => {
                    if (Array.isArray(ingredient)) {
                        return ingredient.map((ing: any) => ing.name);
                    }
                    return ingredient.name.toLowerCase();
                });
            }
            return [];
        });

        if (allIngredients.length === 0) return [];

        const ingredientsDetails = await db
            .select()
            .from(ingredientsList)
            .where(inArray(ingredientsList.name, allIngredients));

        const groupedData: Record<string, { mealType: string; ingredients: any[] }> = {};

        data.forEach((el) => {
            const mealType = el.type;

            if (!groupedData[mealType]) {
                groupedData[mealType] = {mealType, ingredients: []};
            }

            const mealIngredients = el.ingredients.flatMap((ingredient: any) => {
                const ingredientsArray = Array.isArray(ingredient) ? ingredient : [ingredient];

                return ingredientsArray.map((ing: any) => {
                    const ingredientDetail = ingredientsDetails.find(
                        (detail) => detail.name.toLowerCase() === ing.name.toLowerCase()
                    );

                    if (ingredientDetail) {
                        const factor = ing.type === "grammage" ? ing.amount / 100 : 1;

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
            });

            groupedData[mealType].ingredients.push(
                ...mealIngredients.filter((ingredient: Ingredient) => ingredient !== undefined)
            );
        });

        const finalData = Object.values(groupedData);

        return finalData;
    } catch (err) {
        console.error("Błąd w getMealsForDay:", err);
        return [];
    }
};


