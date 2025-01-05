import {NewMeal} from "@/components/new-meal";
import {MealsList} from "@/components/calendar/meals-list";
import {getMealsForDay} from "@/app/protected/calendar/actions";
import moment from "moment";
import {getDates} from "@/hooks/get-dates";

const mealOptions = [
    {
        name: "Breakfast",
        value: "breakfast"
    },
    {
        name: "Lunch",
        value: "lunch"
    },
    {
        name: "Dinner",
        value: "dinner"
    },
    {
        name: "Supper",
        value: "supper"
    },
]

export default async function Page() {
    const {today, dateString} = getDates()

    const meals = await getMealsForDay(today, "a6801067-87a6-406b-a73a-94e26e89f9b7")

    const totalMacro = meals.map((meal) => {
        return meal.macro.reduce((acc, ingredient) => {
            acc.kcal += ingredient.kcal
            acc.protein += ingredient.protein
            acc.fat += ingredient.fat
            acc.carbs += ingredient.carbs

            return acc
        }, {kcal: 0, protein: 0, fat: 0, carbs: 0})
    })

    return (
        <div>
            <NewMeal mealOptions={mealOptions}/>
            <h1 className={"font-bold text-xl"}>{dateString}</h1>
            <div>
                <div className={"flex justify-between font-light text-sm md:w-1/3"}>
                    <p>{totalMacro[0].kcal} Kcal</p>
                    <p>{totalMacro[0].protein} B</p>
                    <p>{totalMacro[0].fat} T</p>
                    <p>{totalMacro[0].carbs} W</p>
                </div>
            </div>
            <div className={"flex flex-col gap-y-4 mt-8 lg:w-2/3 xl:w-1/3"}>
                {mealOptions.map((option, index) => {
                    const mealData = meals.filter((meal) => meal.mealType === option.value)

                    return (
                        <MealsList
                            key={index}
                            mealType={option.name}
                            mealData={mealData[0]?.macro}
                        />
                    )
                })}
            </div>
        </div>
    )
}