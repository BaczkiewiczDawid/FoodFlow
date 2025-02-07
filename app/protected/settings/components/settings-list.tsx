"use client"

import {Switch} from "@/components/ui/switch";
import {useTheme} from "next-themes";
import {Input} from "@/components/ui/input";
import {useSettingsStore} from "@/app/context/settings";
import {useEffect, useMemo, useState} from "react";
import {Combobox} from "@/components/combobox";
import {getSettings, updateSettings} from "@/app/protected/settings/actions";
import {useDebounce} from "@/hooks/use-debounce";
import {Skeleton} from "@/components/ui/skeleton";
import {Loader} from "@/components/loader";

type SettingsListProps = {
    id: number,
    email: string,
    createdAt: Date,
    weight: number,
    height: number,
    age: number,
    goal: string,
    gender: string,
    activity: number,
    bmr: number
}

export const SettingsList = () => {
    const {setTheme} = useTheme()

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
    const activity = useSettingsStore(state => state.activity)
    const setActivity = useSettingsStore(state => state.setActivity)
    const BMR = useSettingsStore(state => state.BMR)
    const setBMR = useSettingsStore(state => state.setBMR)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const response: SettingsListProps[] = await getSettings();
                if (response?.length) {
                    const settings = response[0];

                    setWeight(settings.weight);
                    setHeight(settings.height);
                    setAge(settings.age);
                    setGoal(settings.goal);
                    setGender(settings.gender);
                    setActivity(settings.activity);
                    setBMR(settings.bmr);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const values = useMemo(() => ({
        weight, height, age, goal, gender, activity, BMR
    }), [weight, height, age, goal, gender, activity, BMR]);

    const debouncedValues = useDebounce(values, 500);

    useEffect(() => {
        if (isLoading) return;

        updateSettings(debouncedValues);
    }, [debouncedValues, isLoading]);

    const goalsList = [{
        value: "keep",
        displayValue: "Keep weight"
    }, {
        value: "lose",
        displayValue: "Lose weight"
    }, {
        value: "gain",
        displayValue: "Gain weight"
    }]
    const genderList = [
        {
            value: "male",
            displayValue: "Male"
        },
        {
            value: "female",
            displayValue: "Female"
        }]
    const activityList = [
        {
            value: 1.2,
            displayValue: "No activity"
        },
        {
            value: 1.375,
            displayValue: "Low activity"
        },
        {
            value: 1.55,
            displayValue: "Medium activity"
        },
        {
            value: 1.725,
            displayValue: "High activity"
        },
        {
            value: 1.9,
            displayValue: "Very high activity"
        }
    ]

    const calculateCalories = () => {
        if (gender === "male") {
            const basicBMR = 66.5 + (13.75 * weight) + (5 * height) - (6.75 * age)

            return basicBMR * Number(activity)
        } else {
            const basicBMR = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)

            return basicBMR * Number(activity)
        }
    }

    useEffect(() => {
        const calculatedBMR = calculateCalories()

        setBMR(calculatedBMR)
    }, [weight, height, age, activity, gender])

    return (
        <div className={"flex flex-col justify-between gap-y-4 w-full md:w-1/2 lg:w-1/3"}>
            {isLoading ? (
                <Loader type={"list"}/>
            ) : (
                <div>
                    <div className={"flex items-center justify-between mt-8"}>
                        <span>Dark mode</span>
                        <Switch onCheckedChange={(val) => setTheme(val ? "dark" : "light")}/>
                    </div>
                    <div className={"flex flex-col gap-y-2 mt-8"}>
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
                        <Input type={"number"} defaultValue={age}
                               onChange={(e) => setAge(Number(e.currentTarget.value))}/>
                    </div>
                    <div className={"flex flex-col gap-y-2"}>
                        <span>Goal</span>
                        <Combobox data={goalsList} defaultValue={goal} onSelect={setGoal}/>
                    </div>
                    <div className={"flex flex-col gap-y-2"}>
                        <span>Gender</span>
                        <Combobox data={genderList} defaultValue={gender} onSelect={setGender}/>
                    </div>
                    <div className={"flex flex-col gap-y-2"}>
                        <span>Daily activity</span>
                        <Combobox
                            data={activityList}
                            defaultValue={activityList.find((item) => item.value === Number(activity))?.displayValue ?? ""}
                            onSelect={setActivity}/>
                    </div>
                </div>
            )}
        </div>
    )
}