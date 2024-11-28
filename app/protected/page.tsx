import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

import {Chart} from "@/components/chart-components/chart";
import {MacroChart} from "@/components/chart-components/macro-chart";
import {MealCard} from "@/components/meal-card";

export default async function ProtectedPage() {
    const supabase = await createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }


    const data = {
        labels: ["Calories, Total"],
        datasets: [
            {
                label: "Calories",
                data: [320, 120],
                backgroundColor: [
                    'rgb(255, 99, 132)', "rgb(225,225,225)"
                ],
                borderWidth: 0,
                weight: 2,
            },
        ]
    }

    const meals = [
        {
            id: 1,
            name: "Chicken Cheese pasta",
            ingredients: ["Chicken", "Cheese", "Pasta", "Tomato souce"],
            macros: {
                kcal: 530,
                protein: 52,
                carbs: 40,
                fat: 10
            }
        },
        {
            id: 2,
            name: "Chicken Cheese pasta",
            ingredients: ["Chicken", "Cheese", "Pasta", "Tomato souce"],
            macros: {
                kcal: 530,
                protein: 52,
                carbs: 40,
                fat: 10
            }
        },
        {
            id: 3,
            name: "Chicken Cheese pasta",
            ingredients: ["Chicken", "Cheese", "Pasta", "Tomato souce"],
            macros: {
                kcal: 530,
                protein: 52,
                carbs: 40,
                fat: 10
            }
        }
    ]

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <h1 className={"font-normal"}>Hello, <p className={"font-bold"}>{user.email}</p></h1>
            <div className={"grid grid-cols-2 gap-x-4 gap-y-8 w-[90%]"}>
                <MacroChart data={data} name={"Kcal"}/>
                <MacroChart data={data} name={"Carbs"}/>
                <MacroChart data={data} name={"Protein"}/>
                <MacroChart data={data} name={"Fat"}/>
            </div>
            <h2 className={"font-bold text-xl"}>Your next meal</h2>
            <div className={"flex flex-col gap-y-4"}>
                {meals.map((meal) => {
                    return (
                        <MealCard id={meal.id} name={meal.name} ingredients={meal.ingredients} macros={meal.macros}/>
                    )
                })}
                <div className={"w-full bg-gray-700 rounded"}></div>
                <div className={"w-full bg-gray-700 rounded"}></div>
            </div>
        </div>
    );
}
