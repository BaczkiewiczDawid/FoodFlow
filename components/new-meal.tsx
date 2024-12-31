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
import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {IngredientInput} from "@/components/calendar/ingredient-input";
import {Ingredient} from "@/app/types/ingredient";

export const NewMeal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedMeals, setSelectedMeals] = useState<Ingredient[]>([])
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])

    const addNewMeal = () => {
        if (selectedIngredients.length === 0 || selectedMeals.length === 0) return

        setIsOpen(false)
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        className={"bg-amber-400 bottom-4 right-4 absolute w-12 h-12 text-center rounded-full text-4xl cursor-pointer"}
                    >+
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new meal</DialogTitle>
                        <DialogDescription>Add Your meal ingredients or select whole meal</DialogDescription>
                    </DialogHeader>
                    <Tabs>
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
                                        setValue={setSelectedIngredients}
                                        inputType={"ingredient"}
                                    />
                                )
                            })}
                        </TabsContent>
                        <TabsContent value={"meal"}>
                            {Array.from({ length: selectedMeals.length + 1}).map((val, index) => {
                                return (
                                    <IngredientInput key={index} index={index} setValue={setSelectedIngredients} inputType={"meal"} />
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