"use client"

import {MealCard} from "@/components/meal-card";
import {useEffect, useMemo, useRef, useState} from "react";
import {Ingredient} from "@/app/types/ingredient";
import {Skeleton} from "@/components/ui/skeleton";
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "../../components/ui/sonner";

type Props = {
    initialState: {
        id: number,
        name: string,
        description: string,
        createdAt: string,
        fat: number,
        carbs: number,
        protein: number,
        kcal: number,
        ingredients: Ingredient[]
        details: string
    }[]
    limit: number
}

export const MealsView = ({initialState, limit}: Props) => {
    const [selectedMeal, setSelectedMeal] = useState<number | undefined>(undefined)
    const [selectedMealDetails, setSelectedMealDetails] = useState<any>([])
    const [mealsList, setMealsList] = useState(initialState)
    const observerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(limit);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useMemo(() => {
        setSelectedMealDetails(mealsList.filter((meal) => meal.id === selectedMeal)[0])
    }, [selectedMeal, mealsList])

    const fetchMeals = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const response = await fetch(`/api/meals/meals-list?limit=${limit}&offset=${offset}`);
        const newMeals = await response.json();

        if (newMeals.length === 0) {
            useToast(false, "fetch", "meals");
            setHasMore(false);
        } else {
            setMealsList((prevMeals) => [...prevMeals, ...newMeals]);
            setOffset((prevOffset) => prevOffset + limit);
        }

        setLoading(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchMeals();
                console.log("fetching")
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [observerRef.current, loading, hasMore]);

    return (
        <div className={"flex h-[80%]"}>
            <div className={"mt-4 md:mt-12 flex flex-col"}>
                <div className={"flex flex-col gap-y-4"}>
                    {mealsList?.map((meal, index) => {
                        return (
                            <MealCard
                                key={index}
                                id={meal.id}
                                ingredients={meal?.ingredients?.map((ingredient: Ingredient) => ingredient?.name)}
                                macros={{
                                    kcal: meal.kcal,
                                    protein: meal.protein,
                                    carbs: meal.carbs,
                                    fat: meal.fat
                                }}
                                name={meal.name}
                                linkDisabled
                                onClick={() => setSelectedMeal(meal.id)}
                            />
                        )
                    })}
                </div>
                <div ref={observerRef} className={"flex flex-col gap-y-2 py-4"}>
                    <Skeleton className={"w-full h-4"}/>
                    <Skeleton className={"w-full h-4"}/>
                    <Skeleton className={"w-full h-4"}/>
                </div>
            </div>
            <div className={"px-36 mt-4 md:mt-12"}>
                {selectedMealDetails && (
                    <div className={"flex flex-col sticky top-8"}>
                        <h2 className={"text-xl"}>{selectedMealDetails.name}</h2>
                        <span
                            className={"font-light text-sm"}>{selectedMealDetails.ingredients?.map((ingredient: Ingredient) => ingredient.name).join(" | ")}</span>
                        <span className={"font-light text-sm mt-4"}>{selectedMealDetails.description}</span>
                        <span className={"font-light text-sm mt-4"}>{selectedMealDetails.details}</span>
                    </div>
                )}
            </div>
            <Toaster/>
        </div>
    )
}