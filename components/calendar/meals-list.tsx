type Props = {
    mealType: string,
    mealData: {
        id: number
        name: string,
        kcal: number,
        protein: number,
        fat: number,
        carbs: number
    }[]
}

export const MealsList = ({mealType, mealData}: Props) => {
    if (!mealData) return

    const macroSum = mealData.reduce(
        (acc, ingredient) => {
            acc.kcal += ingredient.kcal;
            acc.protein += ingredient.protein;
            acc.fat += ingredient.fat;
            acc.carbs += ingredient.carbs;
            return acc;
        },
        { kcal: 0, protein: 0, fat: 0, carbs: 0 }
    );

    console.log(mealData)

    return (
        <div>
            <div className={"bg-muted p-4 rounded-md"}>
                <div className={"flex flex-col"}>
                    <p>{mealType}</p>
                    <div className={"flex justify-between font-light text-sm"}>
                        <p>{macroSum.kcal} Kcal</p>
                        <p>{macroSum.protein} B</p>
                        <p>{macroSum.fat} T</p>
                        <p>{macroSum.carbs} W</p>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col p-4 gap-y-4"}>
                {mealData.map((meal, index) => {
                    return (
                        <div key={index}>
                            <p>{meal.name}</p>
                            <div className={"flex justify-between font-light text-sm"}>
                                <p>{meal.kcal} Kcal</p>
                                <p>{meal.protein} B</p>
                                <p>{meal.fat} T</p>
                                <p>{meal.carbs} W</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}