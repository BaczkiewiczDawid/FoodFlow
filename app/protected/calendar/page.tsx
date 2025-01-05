import {NewMeal} from "@/components/new-meal";
import {MealsList} from "@/components/calendar/meals-list";
import {getMealsForDay} from "@/app/protected/calendar/actions";

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

    const meals = await getMealsForDay("2025-05-01", "a6801067-87a6-406b-a73a-94e26e89f9b7")

    return (
        <div>
            <NewMeal mealOptions={mealOptions}/>
            <h1 className={"font-bold text-xl"}>31 December, 2024</h1>
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