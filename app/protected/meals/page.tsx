import {MealCard} from "@/components/meal-card";

export default async function Page() {
    return (
        <div className={"w-full"}>
            <h1 className={"text-xl"}>Meals list</h1>
            <div className={"flex justify-between"}>
                <div className={"md:w-1/3 mt-4 md:mt-12"}>
                    <MealCard
                        id={1}
                        ingredients={[]}
                        macros={{kcal: 233, protein: 23, carbs: 43, fat: 12}}
                        name={"Chicken pasta"}
                        linkDisabled
                    />
                </div>
                <div className={"w-2/3 px-36"}>
                    <h2 className={"text-xl"}>Chicken pasta</h2>
                    <p>Ingredients</p>
                    <p>Description</p>
                </div>
            </div>
        </div>
    )
}