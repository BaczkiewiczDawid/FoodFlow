import Link from "next/link";
import {MealInfo} from "@/components/meal-info";

type Props = {
    id: number
    name: string,
    ingredients: string[],
    macros: {
        kcal: number,
        protein: number,
        carbs: number,
        fat: number
    }
    linkDisabled?: boolean
    onClick?: () => void
}

export const MealCard = ({id, name, ingredients, macros, linkDisabled, onClick}: Props) => {
    return (
        <div onClick={onClick}>
            {linkDisabled ?
                <MealInfo name={name} ingredients={ingredients} macros={macros}/> :
                <Link href={linkDisabled ? `/protected/meals` : `/protected/meal-details/${id}`}>
                    <MealInfo name={name} ingredients={ingredients} macros={macros}/>
                </Link>}
        </div>
    )
}