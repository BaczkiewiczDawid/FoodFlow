import {getMeals} from "@/app/protected/meals/actions";
import {MealsView} from "@/components/meals/meals-view";

export default async function Page() {
    let limit = 10
    let offset = 0

    const meals = await getMeals(10, offset)

    return (
        <div className={"w-full ml-2"}>
            <h1 className={"text-xl font-bold"}>Meals list</h1>
            <MealsView initialState={meals} limit={limit}/>
        </div>
    )
}