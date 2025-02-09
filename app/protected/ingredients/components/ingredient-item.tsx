"use client"

import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useApi} from "@/helpers/useApi";
import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger
} from "../../../../components/ui/dialog";
import {Input} from "../../../../components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../../../components/ui/select";
import {Button} from "../../../../components/ui/button";
import {User} from "@supabase/auth-js";
import {useToast} from "@/hooks/use-toast";
import {Ingredient} from "@/app/types/ingredient";
import {useIngredientsStore} from "@/app/context/ingredients";

type Props = {
    name: string,
    amount: number
    type: "grammage" | "piece"
    user: User
}

export const IngredientItem = ({name, amount, type, user}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newAmount, setNewAmount] = useState<number>(amount);
    const [newType, setNewType] = useState<string>(type);
    const setIngredientsList = useIngredientsStore(state => state.setIngredientsList)

    const deleteItem = () => {
        try {
            const response = useApi("/api/ingredients/delete-ingredient", {
                name,
                amount,
                type,
                email: user.email
            })

            setIngredientsList((prev: Ingredient[]) =>
                prev.filter((ingredient) => ingredient.name !== name)
            );

            useToast(true, "delete", "ingredient")
        } catch (err) {
            console.error(err)
            useToast(false, "delete", "ingredient")
        }
    }

    const editItem = () => {
        setIsOpen(false)
        try {
            const response = useApi("/api/ingredients/edit-ingredient", {
                name,
                amount: newAmount,
                type: newType,
                email: user.email
            })

            setIngredientsList((prev: Ingredient[]) =>
                prev.map((ingredient) =>
                    ingredient.name === name
                        ? {...ingredient, amount: newAmount, type: newType as Ingredient["type"]}
                        : ingredient
                )
            );

            useToast(true, "edit", "ingredient")
        } catch (err) {
            console.error(err)
            useToast(false, "edit", "ingredient")
        }
    }

    return (
        <li className={"px-4 py-2"}>
            <div className={"flex justify-between"}>
                <span>{name}</span>
                <div className={"flex flex-row items-center justify-between"}>
                    <span>{amount} {type === "grammage" ? "g" : type}</span>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <PencilSquareIcon onClick={() => setIsOpen(true)}
                                              className={"w-4 h-4 ml-4 cursor-pointer"}/>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit data</DialogTitle>
                                <DialogDescription>Provide new value for: {name}</DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-between items-center">
                                <Input
                                    id="quantity"
                                    placeholder={"Enter new value..."}
                                    type={"number"}
                                    className="flex-grow mr-4"
                                    defaultValue={amount}
                                    onChange={(e) => setNewAmount(parseFloat(e.target.value))}
                                />
                                <Select defaultValue={type} onValueChange={(e) => setNewType(e)}>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem className="cursor-pointer" value={"grammage"}>
                                                Grammage
                                            </SelectItem>
                                            <SelectItem className="cursor-pointer" value={"piece"}>
                                                Piece
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter>
                                <Button className={"mt-4"} onClick={editItem}>Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <TrashIcon onClick={deleteItem} className={"w-4 h-4 ml-4 text-red-500 cursor-pointer"}/>
                </div>
            </div>


        </li>
    )
}