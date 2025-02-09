import {NewMeal} from "@/components/new-meal";
import {getDates} from "@/hooks/get-dates";
import {DateSelector} from "@/components/calendar/date-selector";
import {Meals} from "@/components/calendar/meals";
import {MacroSummary} from "@/components/calendar/macro-summary";
import {getAuthUser} from "@/helpers/get-auth-user";

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
    const user = await getAuthUser()

    const {today} = getDates()

    return (
        <div>
            <NewMeal mealOptions={mealOptions} user={user}/>
            <DateSelector date={today as string}/>
            <div className={"mt-4"}>
                <MacroSummary />
            </div>
            <Meals mealOptions={mealOptions}/>
        </div>
    )
}