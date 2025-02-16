import {Label} from "../../components/ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select";
import {Input} from "../../components/ui/input";
import {useEffect, useState} from "react";
import {Ingredient} from "@/app/types/ingredient";

type Props = {
    index: number
    setValue: (value: any) => void
    inputType: "meal" | "ingredient"
    options: { [key: string]: string | number }[]
    hideIndex?: boolean
}

type IngredientType = "piece" | "grammage"

export const IngredientInput = ({index, setValue, inputType, options, hideIndex}: Props) => {
    const [type, setType] = useState<IngredientType>("piece")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState<number>(1)

    const updateData = (index: number, newItem: Ingredient) => {
        if (inputType === "ingredient") {
            setValue((prevData: Ingredient[]) => {
                const updatedData = [...prevData];

                if (index < updatedData.length) {
                    updatedData[index] = newItem;
                } else {
                    updatedData.push(newItem);
                }

                return updatedData;
            });
        } else {
            const selectedMeal = options.find((option) => String(option.name).toLowerCase() === name)

            setValue(selectedMeal?.ingredients)
        }
    }

    useEffect(() => {
        if (!name || !amount || !type) return;

        updateData(index, {name, amount, type})
    }, [name, amount, type]);

    return (
        <div className={"mt-4"}>
            <Label>{inputType.charAt(0).toUpperCase() + inputType.slice(1)} {!hideIndex && `#${index + 1}`}</Label>
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
                        <SelectGroup className={"max-h-48 overflow-y-auto"}>
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
                        <Select defaultValue={"grammage"} onValueChange={(e) => setType(e as IngredientType)}>
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