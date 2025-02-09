import {create} from "zustand";
import {Ingredient} from "@/app/types/ingredient";

type Props = {
    ingredientsList: Ingredient[]
    setIngredientsList: (newList: Ingredient[] | ((prev: Ingredient[]) => Ingredient[])) => void;
}

export const useIngredientsStore = create<Props>((set) => ({
    ingredientsList: [],
    setIngredientsList: (newList) => set((state) => ({
        ingredientsList: typeof newList === "function" ? newList(state.ingredientsList) : newList
    }))}))