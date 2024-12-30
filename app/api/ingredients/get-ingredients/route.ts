import {NextRequest, NextResponse} from "next/server";
import {deleteIngredient} from "@/app/api/interfaces/delete-ingredient";
import {getIngredientsByUser} from "@/app/api/interfaces/get-ingredients-by-user";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const user = searchParams.get("email")

        const data = await getIngredientsByUser(user)

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({error: "Error"}, {status: 500})
    }
}