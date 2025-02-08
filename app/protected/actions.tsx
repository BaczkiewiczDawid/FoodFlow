"use server"

import {userSettings} from "@/drizzle/schema";
import {db} from "@/drizzle/db";
import {eq} from "drizzle-orm";

export const getBMR = async () => {
    try {
        const res = await db.select({bmr: userSettings.bmr}).from(userSettings).where(eq(userSettings.email, "baczkiewicz.dawid22@gmail.com"))

        return res[0].bmr
    } catch (err) {
        console.error(err)
        return null
    }
}