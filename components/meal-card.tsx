type Props = {
    id: number
    name: string,
    ingredients: string[],
    macros: {
        kcal: number,
        protein: number,
        carbs: number,
        fat: number
    }
}

export const MealCard = ({id, name, ingredients, macros}: Props) => {
    return (
        <div className={"w-full bg-gray-700 rounded p-2 flex flex-col"} key={id}>
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