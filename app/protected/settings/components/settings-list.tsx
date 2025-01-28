"use client"

import {Switch} from "@/components/ui/switch";
import {useTheme} from "next-themes";
import {Input} from "@/components/ui/input";
import {useSettingsStore} from "@/app/context/settings";

import {firstLetterToUpperCase} from "@/helpers/first-letter-to-upper-case";
import {useState} from "react";
import {Combobox} from "@/components/combobox";

export const SettingsList = () => {
    const {setTheme} = useTheme()

    const [isOpen, setIsOpen] = useState(false)

    const weight = useSettingsStore(state => state.weight)
    const setWeight = useSettingsStore(state => state.setWeight)
    const height = useSettingsStore(state => state.height)
    const setHeight = useSettingsStore(state => state.setHeight)
    const age = useSettingsStore(state => state.age)
    const setAge = useSettingsStore(state => state.setAge)
    const goal = useSettingsStore(state => state.goal)
    const setGoal = useSettingsStore(state => state.setGoal)
    const gender = useSettingsStore(state => state.gender)
    const setGender = useSettingsStore(state => state.setGender)

    const goalsList = ["lose", "keep", "gain"]
    const genderList = ["male", "female"]

    return (
        <div className={"flex flex-col justify-between gap-y-4 w-full md:w-1/2 lg:w-1/3"}>
            <div className={"flex items-center justify-between mt-8"}>
                <span>Dark mode</span>
                <Switch onCheckedChange={(val) => setTheme(val ? "dark" : "light")}/>
            </div>
            <div className={"flex flex-col gap-y-2"}>
                <span>Weight</span>
                <Input type={"number"} defaultValue={weight}
                       onChange={(e) => setWeight(Number(e.currentTarget.value))}/>
            </div>
            <div className={"flex flex-col gap-y-2"}>
                <span>Height</span>
                <Input type={"number"} defaultValue={height}
                       onChange={(e) => setHeight(Number(e.currentTarget.value))}/>
            </div>
            <div className={"flex flex-col gap-y-2"}>
                <span>Age</span>
                <Input type={"number"} defaultValue={age} onChange={(e) => setAge(Number(e.currentTarget.value))}/>
            </div>
            <div className={"flex flex-col gap-y-2"}>
                <span>Goal</span>
                <Combobox data={goalsList} defaultValue={goal} onSelect={setGoal}/>
            </div>
            <div className={"flex flex-col gap-y-2"}>
                <span>Gender</span>
                <Combobox data={genderList} defaultValue={gender} onSelect={setGender}/>
            </div>
        </div>
    )
}