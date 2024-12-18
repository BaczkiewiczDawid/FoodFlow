import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {Separator} from "@/components/ui/separator";
import {IngredientItem} from "@/app/protected/ingredients/components/ingredient-item";
import {Ingredient} from "@/app/types/ingredient";

export const IngredientsList = () => {
    const dummyIngredientsData: Ingredient[] = [
        {
            name: "Chicken",
            amount: 200,
            type: "grammage"
        },
        {
            name: "Cheese",
            amount: 100,
            type: "grammage"
        },
        {
            name: "Pasta",
            amount: 150,
            type: "grammage"
        },
        {
            name: "Tomato souce",
            amount: 200,
            type: "grammage"
        },
        {
            name: "Onion",
            amount: 1,
            type: "piece"
        }
    ]

    return (
        <>
            <p className={"font-bold mt-8"}>Ingredients</p>
            <ul className={"list-none ml-4 mt-4"}>
                {dummyIngredientsData.map((ingredient, index) => {
                    return (
                        <div key={index}>
                            <IngredientItem
                                name={ingredient.name}
                                amount={ingredient.amount}
                                type={ingredient.type}
                            />
                            <Separator/>
                        </div>
                    )
                })}
            </ul>
        </>
    )
}