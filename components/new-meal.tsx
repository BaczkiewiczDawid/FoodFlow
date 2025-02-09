"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../components/ui/dialog";
import {Button} from "../components/ui/button";
import {useEffect, useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../components/ui/tabs";
import {IngredientInput} from "@/components/calendar/ingredient-input";
import {Ingredient} from "@/app/types/ingredient";
import {useApi} from "@/helpers/useApi";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select";
import {addNewMealData, getMealsForDay} from "@/app/protected/calendar/actions";
import {useCalendarStore} from "@/app/context/calendar";
import {Toaster} from "../components/ui/sonner";
import {useToast} from "@/hooks/use-toast";

type Props = {
    mealOptions: {
        name: string,
        value: string
    }[]
}

export const NewMeal = ({mealOptions}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedMeals, setSelectedMeals] = useState<Ingredient[]>([])
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
    const [userIngredients, setUserIngredients] = useState<Ingredient[]>([])
    const [mealType, setMealType] = useState<string | undefined>(undefined)
    const [mealsList, setMealsList] = useState<any>([])

    const setMeals = useCalendarStore((state) => state.setMeals)
    const {selectedDate} = useCalendarStore((state) => state)

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

    const getMealsList = async () => {
        try {
            const response = await useApi("/api/meals/meals-list", {
                limit: 10,
                offset: 0,
            })

            return response
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const ingredientsResponse = await getIngredientsList()
            const mealsResponse = await getMealsList()

            if (!ingredientsResponse || !mealsResponse) {
                useToast(false, "fetch", "ingredients or meals")
            }

            setUserIngredients(ingredientsResponse.data)
            setMealsList(mealsResponse)
        }

        fetchData()
    }, [])

    const getMeals = async () => {
        return await getMealsForDay(selectedDate, "a6801067-87a6-406b-a73a-94e26e89f9b7")
    }

    const fetchMeals = async () => {
        const fetchData = async () => {
            const res = await getMeals()
            setMeals(res)
        }

        fetchData()
    }

    const addNewMeal = async () => {
        if (!selectedIngredients || !selectedMeals) return

        setIsOpen(false)
        const res = await addNewMealData(selectedIngredients, mealType, selectedDate)
        fetchMeals()

        useToast(res.status, "add", "ingredient(s)")
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        className={"bg-blue-300 bottom-4 right-4 fixed w-12 h-12 text-center rounded-full text-4xl cursor-pointer text-background lg:right-8"}
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
                        <TabsContent value={"ingredient"} className={"overflow-y-auto max-h-64"}>
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
                        <TabsContent value={"meal"} className={"overflow-y-auto max-h-64"}>
                            {Array.from({length: selectedMeals.length + 1}).map((val, index) => {
                                return (
                                    <IngredientInput
                                        key={index}
                                        index={index}
                                        options={mealsList}
                                        setValue={setSelectedIngredients}
                                        inputType={"meal"}
                                        hideIndex
                                    />
                                )
                            })}
                        </TabsContent>
                    </Tabs>
                    <DialogFooter>
                        <Button onClick={addNewMeal}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Toaster/>
        </div>
    )
}