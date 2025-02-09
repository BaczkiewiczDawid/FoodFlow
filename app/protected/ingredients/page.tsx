import {IngredientsList} from "@/app/protected/ingredients/components/ingredients-list";
import {NewIngredient} from "@/app/protected/ingredients/components/new-ingredient";
import {getAuthUser} from "@/helpers/get-auth-user";

export default async function Page() {
    const user = await getAuthUser()

    return (
        <>
            <h1 className={"font-bold text-xl"}>My ingredients</h1>
            <div className={"w-full lg:w-1/2"}>
                <IngredientsList user={user}/>
                <NewIngredient user={user}/>
            </div>
        </>
    )
}