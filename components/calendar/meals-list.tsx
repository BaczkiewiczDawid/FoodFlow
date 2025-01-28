import {Ingredient} from "@/app/types/ingredient";
import {firstLetterToUpperCase} from "@/helpers/first-letter-to-upper-case";
import {MealData} from "@/app/types/meal-data";
import {Trash} from "lucide-react";
import {deleteIngredient} from "@/app/protected/calendar/actions";
import {useCalendarStore} from "@/app/context/calendar";
import {useState} from "react";

type Props = {
    mealType: string,
    mealData: MealData[]
}

export const MealsList = ({mealType, mealData}: Props) => {
    const selectedDate = useCalendarStore(state => state.selectedDate)

    const sumMacros = (data: any) => {
        if (data) {
            return data.reduce(
                (acc: any, ingredient: any) => {
                    acc.kcal += ingredient.kcal;
                    acc.protein += ingredient.protein;
                    acc.fat += ingredient.fat;
                    acc.carbs += ingredient.carbs;
                    return acc;
                },
                {kcal: 0, protein: 0, fat: 0, carbs: 0}
            )
        } else {
            return {
                kcal: 0,
                protein: 0,
                fat: 0,
                carbs: 0
            }
        }
    }

    const handleDelete = (name: string) => {
        deleteIngredient(name, mealType, selectedDate)
    }

    const macroSum = sumMacros(mealData)

    return (
        <div>
            <div>
                <div className={"bg-muted p-4 rounded-md"}>
                    <div className={"flex flex-col"}>
                        <p>{mealType}</p>
                        <div className={"flex justify-between font-light text-sm"}>
                            <p>{macroSum.kcal.toFixed(0)} Kcal</p>
                            <p>{macroSum.protein.toFixed(1)} B</p>
                            <p>{macroSum.fat.toFixed(1)} T</p>
                            <p>{macroSum.carbs.toFixed(1)} W</p>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col p-4 gap-y-4 w-full"}>
                    {mealData?.map((meal, index) => {
                        return (
                            <div className={"flex justify-between items-center"}>
                                <div key={index} className={"w-full pr-4"}>
                                    <p>{firstLetterToUpperCase(meal.name)}</p>
                                    <div className={"flex justify-between font-light text-sm w-4/5"}>
                                        <p>{meal.kcal.toFixed(0)} Kcal</p>
                                        <p>{meal.protein.toFixed(1)} B</p>
                                        <p>{meal.fat.toFixed(1)} T</p>
                                        <p>{meal.carbs.toFixed(1)} W</p>
                                    </div>
                                </div>
                                <div>
                                    <Trash className={"w-4 h-4 text-white cursor-pointer"} onClick={() => handleDelete(meal.name)}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}