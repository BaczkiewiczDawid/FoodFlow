type Props = {
    name: string,
    ingredients: string[],
    macros: {
        kcal: number,
        protein: number,
        carbs: number,
        fat: number
    }
}


export const MealInfo = ({name, ingredients, macros}: Props) => {
    return (
        <div className={"w-full bg-gray-700 rounded px-4 py-2 flex flex-col cursor-pointer bg-gradient-to-tr from-blue-300 to-blue-400"}>
            <span>{name}</span>
            <span className={"font-light text-sm"}>{ingredients.join(" | ")}</span>
            <div className={"text-sm font-light flex justify-between mt-4"}>
                <span>Kcal: {macros.kcal}</span>
                <span>Carbs: {macros.carbs}g</span>
                <span>Protein: {macros.protein}g</span>
                <span>Fat: {macros.fat}g</span>
            </div>
        </div>
    )
}