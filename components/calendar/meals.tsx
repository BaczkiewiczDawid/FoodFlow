"use client"

import {MealsList} from "@/components/calendar/meals-list";
import {getMealsForDay} from "@/app/protected/calendar/actions";
import {useEffect, useState} from "react";
import {useCalendarStore} from "@/app/context/calendar";
import {MealData} from "@/app/types/meal-data";

type Props = {
    mealOptions: {
        name: string,
        value: string
    }[]
}

export type Meal = {
    mealType: string,
    ingredients: MealData[]
}

export const Meals = ({mealOptions}: Props) => {
    const selectedDate = useCalendarStore((state) => state.selectedDate)
    const meals = useCalendarStore((state) => state.meals)
    const setMeals = useCalendarStore((state) => state.setMeals)

    const getMeals = async () => {
        return await getMealsForDay(selectedDate, "a6801067-87a6-406b-a73a-94e26e89f9b7")


    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMeals()
            setMeals(res)
        }

        fetchData()
    }, [selectedDate])

    return (
        <div className={"flex flex-col gap-y-4 mt-8 lg:w-2/3 xl:w-1/3"}>
            {mealOptions.map((option, index) => {
                const mealData = meals.filter((meal) => meal.mealType === option.value)

                return (
                    <MealsList
                        key={index}
                        mealType={option.name}
                        mealData={mealData[0]?.ingredients}
                    />
                )
            })}
        </div>
    )
}