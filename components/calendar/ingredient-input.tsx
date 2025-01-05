import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Ingredient} from "@/app/types/ingredient";

type Props = {
    index: number
    setValue: (value: any) => void
    inputType: "meal" | "ingredient"
    options: { [key: string]: string | number }[]
}

type IngredientType = "piece" | "grammage"

export const IngredientInput = ({index, setValue, inputType, options}: Props) => {
    const [type, setType] = useState<IngredientType>("piece")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState<number>(1)

    const updateData = (index: number, newItem: Ingredient) => {
        setValue((prevData: Ingredient[]) => {
            const updatedData = [...prevData];

            if (index < updatedData.length) {
                updatedData[index] = newItem;
            } else {
                updatedData.push(newItem);
            }

            return updatedData;
        });
    }

    useEffect(() => {
        if (!name || !amount || !type) return;

        updateData(index, {name, amount, type})
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
                            {options.map((option, index) => {
                                return (
                                    <SelectItem
                                        key={index}
                                        value={String(option.name).toLowerCase()}
                                    >
                                        {option.name}
                                    </SelectItem>
                                )
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {inputType === "ingredient" && (
                    <div className={"flex items-center gap-x-4"}>
                        <Input type={"number"} defaultValue={amount}
                               onChange={(e) => setAmount(Number(e.target.value))}/>
                        <Select defaultValue={"piece"} onValueChange={(e) => setType(e as IngredientType)}>
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