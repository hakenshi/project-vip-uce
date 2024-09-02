import db from "../../../../prisma/db";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {

    console.log(request);

    const classes = await db.classes.findMany()

    return NextResponse.json({
        classes:classes
    })
}