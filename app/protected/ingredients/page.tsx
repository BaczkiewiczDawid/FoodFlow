import {IngredientsList} from "@/app/protected/ingredients/components/ingredients-list";
import {NewIngredient} from "@/app/protected/ingredients/components/new-ingredient";

export default async function Page() {
    return (
        <>
            <h1 className={"font-bold text-xl"}>My ingredients</h1>
            <div className={"w-full lg:w-1/2"}>
                <IngredientsList/>
                <NewIngredient/>
            </div>
        </>
    )
}