"use server"

import {userSettings} from "@/drizzle/schema";
import {db} from "@/drizzle/db";
import {eq} from "drizzle-orm";
import {getAuthUser} from "@/helpers/get-auth-user";

export const getBMR = async () => {
    const user = await getAuthUser()

    try {
        const res = await db.select({bmr: userSettings.bmr}).from(userSettings).where(eq(userSettings.email, String(user.email)))

        return res[0].bmr
    } catch (err) {
        console.error(err)
        return null
    }
}