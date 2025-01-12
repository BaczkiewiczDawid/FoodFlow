import {getMeals} from "@/app/protected/meals/actions";
import {MealsView} from "@/components/meals/meals-view";

export default async function Page() {
    const meals = await getMeals()

    console.log(meals)

    return (
        <div className={"w-full"}>
            <h1 className={"text-xl"}>Meals list</h1>
            <MealsView meals={meals} />
        </div>
    )
}