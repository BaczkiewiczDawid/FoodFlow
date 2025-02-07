"use server"

import {db} from "@/drizzle/db";
import {userSettings} from "@/drizzle/schema";
import {eq} from "drizzle-orm";

export const updateSettings = async (data: any) => {
    console.log("updateSettings", data)

    try {
        const isExist = await db.select().from(userSettings).where(eq(userSettings.email, "baczkiewicz.dawid22@gmail.com"))

        if (isExist) {
            await db.update(userSettings).set({
                weight: data.weight,
                height: data.height,
                age: data.age,
                goal: data.goal,
                gender: data.gender,
                activity: data.activity,
                bmr: data.BMR
            }).where(eq(userSettings.email, "baczkiewicz.dawid22@gmail.com"))
        } else {
            await db.insert(userSettings).values({
                email: "baczkiewicz.dawid22@gmail.com",
                weight: data.weight,
                height: data.height,
                age: data.age,
                goal: data.goal,
                gender: data.gender,
                activity: data.activity,
                bmr: data.BMR
            })
        }
    } catch (err) {
        return JSON.stringify(err)
    }
}