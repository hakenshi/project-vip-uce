import db from "../../../../prisma/db";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {

    const classes = await db.classes.findMany({
        orderBy: {
            levelId: 'asc'
        }
    })

    return NextResponse.json({
        classes:classes
    })
}

export async function POST(request: NextRequest) {

    const {users, classId} = await request.json();

    await db.users.updateMany({
        where: {
            id:{
                in: users
            }
        },
        data: {
            classId:classId
        }
    })

    return NextResponse.json({
        "message": "debugging"
    })
}