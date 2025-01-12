"use client"

import {MealCard} from "@/components/meal-card";
import {useMemo, useState} from "react";
import {Ingredient} from "@/app/types/ingredient";

type Props = {
    meals: {
        id: string,
        name: string,
        description: string,
        createdAt: string,
        fat: number,
        carbs: number,
        protein: number,
        kcal: number,
        ingredients: Ingredient[]
        details: string
    }[]
}

export const MealsView = ({meals}: Props) => {
    const [selectedMeal, setSelectedMeal] = useState<string | undefined>(undefined)
    const [selectedMealDetails, setSelectedMealDetails] = useState<any>([])

    console.log(selectedMeal)

    useMemo(() => {
        setSelectedMealDetails(meals.filter((meal) => meal.id === selectedMeal)[0])
    }, [selectedMeal, meals])

    console.log(selectedMealDetails)

    return (
        <div className={"flex justify-between"}>
            <div className={"md:w-1/3 mt-4 md:mt-12 flex flex-col gap-y-4"}>
                {meals.map((meal) => {
                    return (
                        <MealCard
                            key={meal.id}
                            id={Number(meal.id)}
                            ingredients={meal?.ingredients?.map((ingredient: Ingredient) => ingredient?.name)}
                            macros={{
                                kcal: meal.kcal,
                                protein: meal.protein,
                                carbs: meal.carbs,
                                fat: meal.fat
                            }}
                            name={meal.name}
                            linkDisabled
                            onClick={() => setSelectedMeal(meal.id)}
                        />
                    )
                })}
            </div>
            <div className={"w-2/3 px-36 mt-4 md:mt-12"}>
                {selectedMealDetails && (
                    <div className={"flex flex-col"}>
                        <h2 className={"text-xl"}>{selectedMealDetails.name}</h2>
                        <span
                            className={"font-light text-sm"}>{selectedMealDetails.ingredients.map((ingredient: Ingredient) => ingredient.name).join(" | ")}</span>
                        <span className={"font-light text-sm mt-4"}>{selectedMealDetails.description}</span>
                        <span className={"font-light text-sm mt-4"}>{selectedMealDetails.details}</span>
                    </div>
                )}
            </div>
        </div>
    )
}