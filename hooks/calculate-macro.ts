import {MealData} from "@/app/types/meal-data";


type DataType = {
    mealType: string
    ingredients: MealData[]
}

export const calculateMacro = (data: DataType[]) => {
    const result = { kcal: 0, protein: 0, fat: 0, carbs: 0 };

    data.forEach((meal) => {
        meal.ingredients.forEach((ingredient: any) => {
            result.kcal += ingredient.kcal;
            result.protein += ingredient.protein;
            result.fat += ingredient.fat;
            result.carbs += ingredient.carbs;
        });
    });

    return result;
}
