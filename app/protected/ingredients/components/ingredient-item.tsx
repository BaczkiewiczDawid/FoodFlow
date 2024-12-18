import {PencilSquareIcon} from "@heroicons/react/24/outline";

type Props = {
    name: string,
    amount: number
    type: "grammage" | "piece"
}

export const IngredientItem = ({name, amount, type}: Props) => {
    return (
        <li className={"px-4 py-2"}>
            <div className={"flex justify-between"}>
                <span>{name}</span>
                <div className={"flex flex-row items-center justify-between"}>
                    <span>{amount} {type}</span>
                    <PencilSquareIcon className={"w-4 h-4 ml-4 cursor-pointer"}/>
                </div>
            </div>
        </li>
    )
}