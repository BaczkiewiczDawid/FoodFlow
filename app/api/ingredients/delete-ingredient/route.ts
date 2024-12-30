import {NextRequest, NextResponse} from "next/server";
import {deleteIngredient} from "@/app/api/interfaces/delete-ingredient";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const paramsObject = Object.fromEntries(searchParams.entries())

        const data = await deleteIngredient(paramsObject)

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({error: "Error"}, {status: 500})
    }
}