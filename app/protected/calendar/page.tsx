import {NewMeal} from "@/components/new-meal";
import {getDates} from "@/hooks/get-dates";
import {DateSelector} from "@/components/calendar/date-selector";
import {Meals} from "@/components/calendar/meals";
import {MacroSummary} from "@/components/calendar/macro-summary";

const mealOptions = [
    {
        name: "Breakfast",
        value: "breakfast"
    },
    {
        name: "Lunch",
        value: "lunch"
    },
    {
        name: "Dinner",
        value: "dinner"
    },
    {
        name: "Supper",
        value: "supper"
    },
]

export default async function Page() {
    const {today} = getDates()

    return (
        <div>
            <NewMeal mealOptions={mealOptions}/>
            <DateSelector date={today as string}/>
            <div className={"mt-4"}>
                <MacroSummary />
            </div>
            <Meals mealOptions={mealOptions}/>
        </div>
    )
}