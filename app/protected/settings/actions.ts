"use server"

import {db} from "@/drizzle/db";
import {userSettings} from "@/drizzle/schema";
import {eq} from "drizzle-orm";
import {getAuthUser} from "@/helpers/get-auth-user";

export const updateSettings = async (data: any) => {
    const user = await getAuthUser()

    try {
        const isExist = await db.select().from(userSettings).where(eq(userSettings.email, String(user.email)))

        if (isExist.length) {
            await db.update(userSettings).set({
                weight: data.weight,
                height: data.height,
                age: data.age,
                goal: data.goal,
                gender: data.gender,
                activity: data.activity,
                bmr: data.BMR
            }).where(eq(userSettings.email, String(user.email)))
        } else {
            await db.insert(userSettings).values({
                email: String(user.email),
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
        console.error(err)
        return JSON.stringify(err)
    }
}

export const getSettings = async () => {
    const user = await getAuthUser()

    try {
        const settings = await db.select().from(userSettings).where(eq(userSettings.email, String(user.email)))

        return settings
    } catch (err) {
        console.error(err)
        return []
    }
}