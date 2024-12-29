import {NextRequest, NextResponse} from "next/server";
import {addNewIngredient} from "@/app/api/interfaces/add-new-ingredient";
import {deleteIngredient} from "@/app/api/interfaces/delete-ingredient";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const paramsObject = Object.fromEntries(searchParams.entries())

        const data = deleteIngredient(paramsObject)

        return NextResponse.json({message: "Ingredient added successfully", data: data})
    } catch (err) {
        return NextResponse.json({error: "Error"}, {status: 500})
    }
}