"use client"

import {Separator} from "../../../../components/ui/separator";
import {IngredientItem} from "@/app/protected/ingredients/components/ingredient-item";
import {Ingredient} from "@/app/types/ingredient";
import {useApi} from "@/helpers/useApi";
import {useEffect, useState} from "react";

export const IngredientsList = () => {
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getIngredientsList = async () => {
        try {
            setIsLoading(true)
            const response = await useApi("/api/ingredients/get-ingredients", {
                email: "baczkiewicz.dawid22@gmail.com"
            })

            return response
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getIngredientsList()

            setIngredientsList(response.data)
            setIsLoading(false)
        }

        fetchData()
    }, [])

    return (
        <>
            <p className={"font-bold mt-8"}>Ingredients</p>
            <ul className={"list-none ml-4 mt-4"}>
                {ingredientsList.map((ingredient, index) => {
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