import {create} from "zustand";

type Props = {
    weight: number,
    setWeight: (weight: number) => void
    height: number,
    setHeight: (height: number) => void
    age: number,
    setAge: (age: number) => void
    goal: string,
    setGoal: (goal: string) => void
}

export const useSettingsStore = create<Props>((set) => ({
    weight: 75,
    setWeight: (weight: number) => set({weight: weight}),
    height: 180,
    setHeight: (height: number) => set({height: height}),
    age: 18,
    setAge: (age: number) => set({age: age}),
    goal: "keep",
    setGoal: (goal: string) => set({goal: goal}),
}))