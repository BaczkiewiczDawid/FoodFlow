import {NextRequest, NextResponse} from "next/server";
import {addNewIngredient} from "@/app/api/interfaces/add-new-ingredient";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const paramsObject = Object.fromEntries(searchParams.entries())

        const data = await addNewIngredient(paramsObject)

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({error: "Error"}, {status: 500})
    }
}