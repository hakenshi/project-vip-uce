'use server'
import db from "../../prisma/db";
import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";


export default async function storeClassmate(users, classId){

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

    revalidatePath('/turmas')
}