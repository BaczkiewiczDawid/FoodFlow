import {IngredientsList} from "@/components/ingredients-list";
import {Ingredient} from "@/app/types/ingredient";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const ingredients: Ingredient[] = [
        {
            id: 1,
            name: "Chicken",
            amount: 200,
            type: "grammage",
        },
        {
            id: 2,
            name: "Cheese",
            amount: 100,
            type: "grammage",
        },
        {
            id: 3,
            name: "Pasta",
            amount: 150,
            type: "grammage",
        },
        {
            id: 4,
            name: "Tomato souce",
            amount: 200,
            type: "grammage",
        },
        {
            id: 5,
            name: "Onion",
            amount: 1,
            type: "piece",
        }
    ]

    return (
        <div>
            <h1 className={"font-bold text-xl"}>Chicken Cheesa pasta</h1>
            <p className={"font-light mt-4"}>Jakiś opis, Jakiś opis Jakiś opis Jakiś opis Jakiś opis, Jakiś opis Jakiś
                opis Jakiś opisJakiś opis Jakiś
                opis Jakiś opisJakiś opis</p>
            <div>
                <p className={"font-bold mt-8"}>Ingredients</p>
                <IngredientsList ingredients={ingredients}/>
            </div>
        </div>
    )
}