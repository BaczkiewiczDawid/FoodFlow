import {NextRequest, NextResponse} from "next/server";
import {deleteIngredient} from "@/app/api/interfaces/delete-ingredient";
import {editIngredient} from "@/app/api/interfaces/edit-ingredient";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const paramsObject = Object.fromEntries(searchParams.entries())

        const data = await editIngredient(paramsObject)

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({error: "Error"}, {status: 500})
    }
}