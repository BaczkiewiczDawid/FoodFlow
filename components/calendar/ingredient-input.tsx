import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Ingredient} from "@/app/types/ingredient";

type Props = {
    index: number
    setValue: (value: any) => void
    inputType: "meal" | "ingredient"
}

export const IngredientInput = ({index, setValue, inputType}: Props) => {
    const [type, setType] = useState("piece")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState<number>(1)

    useEffect(() => {
        if (!name || !amount || !type) return;

        setValue((prev: Ingredient[]) => {
            const ingredientExists = prev.some((item) => item.name === name);

            if (ingredientExists) {
                return prev.map((item) =>
                    item.name === name
                        ? {...item, amount, type}
                        : item
                );
            } else {
                return [...prev, {name, amount, type}];
            }
        });
    }, [name, amount, type]);


    return (
        <div className={"mt-4"}>
            <Label>{inputType.charAt(0).toUpperCase() + inputType.slice(1)} #{index + 1}</Label>
            <div className={"mt-2 flex items-center gap-x-4"}>
                <Select
                    onValueChange={(value) => {
                        setName(value)
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={`Select ${inputType}...`}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={"chicken"}>Chicken</SelectItem>
                            <SelectItem value={"pasta"}>Pasta</SelectItem>
                            <SelectItem value={"cheese"}>Cheese</SelectItem>
                            <SelectItem value={"onion"}>Onion</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {inputType === "ingredient" && (
                    <div className={"flex items-center gap-x-4"}>
                        <Input type={"number"} defaultValue={amount}
                               onChange={(e) => setAmount(Number(e.target.value))}/>
                        <Select defaultValue={"piece"} onValueChange={(e) => setType(e)}>
                            <SelectTrigger>
                                <SelectValue placeholder={"Select type"}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={"grammage"}>Grammage</SelectItem>
                                    <SelectItem value={"piece"}>Piece</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
        </div>
    )
}