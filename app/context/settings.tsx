import {create} from "zustand";
import {getSettings} from "@/app/protected/settings/actions";
import {useEffect} from "react";
import {useTheme} from "next-themes";

type Props = {
    weight: number,
    setWeight: (weight: number) => void
    height: number,
    setHeight: (height: number) => void
    age: number,
    setAge: (age: number) => void
    goal: string,
    setGoal: (goal: string) => void
    gender: string,
    setGender: (gender: string) => void
    activity: number,
    setActivity: (activity: number) => void
    BMR: number,
    setBMR: (BMR: number) => void
}

export const useSettingsStore = create<Props>((set) => {
    return {
        weight: 75,
        setWeight: (weight: number) => set({weight: weight}),
        height: 180,
        setHeight: (height: number) => set({height: height}),
        age: 18,
        setAge: (age: number) => set({age: age}),
        goal: "keep",
        setGoal: (goal: string) => set({goal: goal}),
        gender: "male",
        setGender: (gender: string) => set({gender: gender}),
        activity: 1.2,
        setActivity: (activity: number) => set({activity: activity}),
        BMR: 0,
        setBMR: (BMR: number) => set({BMR: BMR})
    }
})