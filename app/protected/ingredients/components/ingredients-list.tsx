"use client"

import {Separator} from "@/components/ui/separator";
import {IngredientItem} from "@/app/protected/ingredients/components/ingredient-item";
import {Ingredient} from "@/app/types/ingredient";
import {useApi} from "@/helpers/useApi";
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "@/components/ui/sonner";
import {User} from "@supabase/auth-js";

type Props = {
    user: User
}

export const IngredientsList = ({user}: Props) => {
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getIngredientsList = async () => {
        try {
            setIsLoading(true)
            const response = await useApi("/api/ingredients/get-ingredients", {
                email: user.email
            })

            return response
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getIngredientsList()

            if (!response) {
                useToast(false, "fetch", "ingredients")
            }

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
                                user={user}
                            />
                            <Separator/>
                        </div>
                    )
                })}
            </ul>
            <Toaster/>
        </>
    )
}