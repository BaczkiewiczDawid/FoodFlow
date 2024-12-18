import {IngredientsList} from "@/app/protected/ingredients/components/ingredients-list";
import {Button} from "@/components/ui/button";

export default async function Page() {
    return (
        <>
            <h1 className={"font-bold text-xl"}>My ingredients</h1>
            <div className={"w-full lg:w-1/2"}>
                <IngredientsList/>
                <Button className={"ml-4 mt-8"}>Add new ingredient</Button>
            </div>
        </>
    )
}