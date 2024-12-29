"use client"

import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useApi} from "@/helpers/useApi";

type Props = {
    name: string,
    amount: number
    type: "grammage" | "piece"
}

export const IngredientItem = ({name, amount, type}: Props) => {
    const deleteItem = () => {
        try {
            const response = useApi("/api/ingredients/delete-ingredient", {
                name,
                amount,
                type,
                email: "baczkiewicz.dawid22@gmail.com"
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <li className={"px-4 py-2"}>
            <div className={"flex justify-between"}>
                <span>{name}</span>
                <div className={"flex flex-row items-center justify-between"}>
                    <span>{amount} {type}</span>
                    <PencilSquareIcon className={"w-4 h-4 ml-4 cursor-pointer"}/>
                    <TrashIcon onClick={deleteItem} className={"w-4 h-4 ml-4 text-red-500 cursor-pointer"}/>
                </div>
            </div>
        </li>
    )
}