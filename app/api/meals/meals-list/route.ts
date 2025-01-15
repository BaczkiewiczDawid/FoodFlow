import {getMeals} from "@/app/protected/meals/actions";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const limit = searchParams.get("limit") || 10;
        const offset = searchParams.get("offset") || 0;

        const data = await getMeals(Number(limit), Number(offset));

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({error: err})
    }
}