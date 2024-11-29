import {IngredientsItem} from "@/components/ingredients-item";
import {Ingredient} from "@/app/types/ingredient";

type Props = {
    ingredients: Ingredient[]
}

export const IngredientsList = ({ingredients}: Props) => {
    return (
        <ul className={"list-disc ml-4 mt-4"}>
            {ingredients.map((ingredient, index) => {
                return (
                    <IngredientsItem name={ingredient.name} amount={ingredient.amount} type={ingredient.type}/>
                )
            })}
        </ul>
    )
}