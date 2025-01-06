"use client"

import {calculateMacro} from "@/hooks/calculate-macro";
import {useCalendarStore} from "@/app/context/calendar";

export const MacroSummary = () => {
    const meals = useCalendarStore((state: any) => state.meals)

    const totalMacro = calculateMacro(meals)

    return (
        <div className={"flex justify-between font-light text-sm md:w-1/3"}>
            <p>{totalMacro.kcal.toFixed(0)} Kcal</p>
            <p>{totalMacro.protein.toFixed(1)} B</p>
            <p>{totalMacro.fat.toFixed(1)} T</p>
            <p>{totalMacro.carbs.toFixed(1)} W</p>
        </div>
    )
}