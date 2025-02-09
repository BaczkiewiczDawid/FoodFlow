import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export const getAuthUser = async () => {
    const supabase = await createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return user;
}