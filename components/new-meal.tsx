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
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export const NewMeal = () => {
    const [selectedMeals, setSelectedMeals] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    const newMeal = () => {

    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className={"bg-amber-400 bottom-4 right-4 absolute w-12 h-12 text-center rounded-full text-4xl cursor-pointer"}
                        onClick={newMeal}
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
                                    <div key={index} className={"mt-4"}>
                                        <Label>Ingredient #{index + 1}</Label>
                                        <div className={"mt-2"}>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={"Select ingredient..."}/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value={"chicken"}>Chicken</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )
                            })}
                        </TabsContent>
                        <TabsContent value={"meal"}>
                            <div className={"mt-4"}>
                                <Label>Meal #1</Label>
                                <div className={"mt-2"}>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder={"Select ingredient..."}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value={"chicken"}>Chicken</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    <DialogFooter>
                        <Button>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}