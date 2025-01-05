"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {IngredientInput} from "@/components/calendar/ingredient-input";
import {Ingredient} from "@/app/types/ingredient";
import {useApi} from "@/helpers/useApi";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {addNewMealData} from "@/app/protected/calendar/actions";

type Props = {
    mealOptions: {
        name: string,
        value: string
    }[]
}

export const NewMeal = ({ mealOptions }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedMeals, setSelectedMeals] = useState<Ingredient[]>([])
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
    const [userIngredients, setUserIngredients] = useState<Ingredient[]>([])
    const [mealType, setMealType] = useState<string | undefined>(undefined)

    const getIngredientsList = async () => {
        try {
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

            setUserIngredients(response.data)
        }

        fetchData()
    }, [])

    const addNewMeal = () => {
        if (!selectedIngredients || !selectedMeals) return

        setIsOpen(false)
        addNewMealData(selectedIngredients, mealType)
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        className={"bg-amber-400 bottom-4 right-4 fixed w-12 h-12 text-center rounded-full text-4xl cursor-pointer"}
                    >+
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new meal</DialogTitle>
                        <DialogDescription>Add Your meal ingredients or select whole meal</DialogDescription>
                    </DialogHeader>
                    <Select onValueChange={(value) => setMealType(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={"Select meal"}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {mealOptions.map((option, index) => {
                                    return (
                                        <SelectItem
                                            key={index}
                                            value={option.value}
                                        >
                                            {option.name}
                                        </SelectItem>
                                    )
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Tabs defaultValue={"ingredient"}>
                        <TabsList className={"grid w-full grid-cols-2"}>
                            <TabsTrigger value={"ingredient"}>Ingredient</TabsTrigger>
                            <TabsTrigger value={"meal"}>Meal</TabsTrigger>
                        </TabsList>
                        <TabsContent value={"ingredient"}>
                            {Array.from({length: selectedIngredients.length + 1}).map((val, index) => {
                                return (
                                    <IngredientInput
                                        key={index}
                                        index={index}
                                        options={userIngredients}
                                        setValue={setSelectedIngredients}
                                        inputType={"ingredient"}
                                    />
                                )
                            })}
                        </TabsContent>
                        <TabsContent value={"meal"}>
                            {Array.from({length: selectedMeals.length + 1}).map((val, index) => {
                                return (
                                    <IngredientInput
                                        key={index}
                                        index={index}
                                        options={[]}
                                        setValue={setSelectedIngredients}
                                        inputType={"meal"}/>
                                )
                            })}
                        </TabsContent>
                    </Tabs>
                    <DialogFooter>
                        <Button onClick={addNewMeal}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}