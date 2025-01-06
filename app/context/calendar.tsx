import {create} from "zustand";
import moment from "moment";
import {Meal} from "@/components/calendar/meals";

type Props = {
    selectedDate: string,
    setSelectedDate: (date: string) => void
    meals: Meal[]
    setMeals: (meals: Meal[]) => void
}

export const useCalendarStore = create<Props>((set) => ({
    selectedDate: moment().format("YYYY-DD-MM"),
    setSelectedDate: (date: string) => set({selectedDate: date}),
    meals: [],
    setMeals: (meals: Meal[]) => set({meals: meals})
}))