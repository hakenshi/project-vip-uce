import {NextRequest, NextResponse} from "next/server";
import db from "../../../../../prisma/db";

export async function DELETE(request: NextRequest, {params}: { params: { email: string } }) {

    try {
        const user = await db.users.delete({
            where: {email: params.email}
        })
        return NextResponse.json({
            message: `${user.name} foi excluído.`,
        })
    } catch (err) {
        console.log(err)
    }
}
