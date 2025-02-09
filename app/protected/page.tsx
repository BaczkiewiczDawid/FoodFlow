import {MacroChart} from "@/components/chart-components/macro-chart";
import {MealCard} from "@/components/meal-card";
import {getMealsForDay} from "@/app/protected/calendar/actions";
import {getDates} from "@/hooks/get-dates";
import {calculateMacro} from "@/hooks/calculate-macro";
import {getBMR} from "@/app/protected/actions";
import {getAuthUser} from "@/helpers/get-auth-user";

export default async function ProtectedPage() {
    const user = await getAuthUser()

    const {today} = getDates()

    const mealsData = await getMealsForDay(today, "a6801067-87a6-406b-a73a-94e26e89f9b7")

    const totalMacro = calculateMacro(mealsData)

    const BMR = await getBMR() ?? 2500

    const protein = Number((BMR * 0.25 / 4).toFixed(1))
    const fat = Number((BMR * 0.25 / 9).toFixed(1))
    const carbs = Number((BMR * 0.5 / 4).toFixed(1))

    const kcalData = {
        labels: ["Calories, Total"],
        datasets: [
            {
                label: "Calories",
                data: [Number(totalMacro.kcal.toFixed(0)), BMR],
                backgroundColor: [
                    "rgb(255, 99, 132)", "rgb(225,225,225)"
                ],
                borderWidth: 0,
                weight: 2,
            },
        ]
    }
    const carbsData = {
        labels: ["Carbs, Total"],
        datasets: [
            {
                label: "Calories",
                data: [Number(totalMacro.carbs.toFixed(1)), carbs],
                backgroundColor: [
                    "rgb(255, 99, 132)", "rgb(225,225,225)"
                ],
                borderWidth: 0,
                weight: 2,
            },
        ]
    }
    const proteinData = {
        labels: ["Protein, Total"],
        datasets: [
            {
                label: "Calories",
                data: [Number(totalMacro.protein.toFixed(1)), protein],
                backgroundColor: [
                    "rgb(255, 99, 132)", "rgb(225,225,225)"
                ],
                borderWidth: 0,
                weight: 2,
            },
        ]
    }
    const fatData = {
        labels: ["Fat, Total"],
        datasets: [
            {
                label: "Calories",
                data: [Number(totalMacro.fat.toFixed(1)), fat],
                backgroundColor: [
                    "rgb(255, 99, 132)", "rgb(225,225,225)"
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
        <div className="flex-1 w-full flex flex-col gap-12 lg:flex-row lg:justify-between lg:p-12">
            <div className={"lg:w-1/2"}>
                <h1 className={"font-normal text-2xl lg:text-xl"}>Hello, <p className={"font-bold"}>{user.email}</p>
                </h1>
                <p className={"mt-4 lg:mt-12"}>Today, You've eaten</p>
                <div className={"grid grid-cols-2 gap-x-4 gap-y-8 w-[90%] lg:grid-cols-4 mt-4"}>
                    <MacroChart data={kcalData} name={"Kcal"}/>
                    <MacroChart data={carbsData} name={"Carbs"}/>
                    <MacroChart data={proteinData} name={"Protein"}/>
                    <MacroChart data={fatData} name={"Fat"}/>
                </div>
            </div>
            <div className={"lg:w-1/2"}>
                <h2 className={"font-bold text-xl"}>Your next meal</h2>
                <div className={"flex flex-col gap-y-4 lg:mt-8"}>
                    {meals.map((meal) => {
                        return (
                            <MealCard key={meal.id} id={meal.id} name={meal.name} ingredients={meal.ingredients}
                                      macros={meal.macros}/>
                        )
                    })}
                    <div className={"w-full bg-gray-700 rounded"}></div>
                    <div className={"w-full bg-gray-700 rounded"}></div>
                </div>
            </div>
        </div>
    );
}
