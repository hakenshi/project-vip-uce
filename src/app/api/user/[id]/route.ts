'use server'

import {NextRequest, NextResponse} from "next/server";
import {useSearchParams} from "next/navigation";
import db from "../../../../../prisma/db";
import * as fs from "fs/promises";
import path from "node:path";
import { Users } from "@prisma/client";

export async function PATCH(request: NextRequest, { params }:{params: { id: string }}){
    const formData = await request.formData();
    const image = formData.get('image')
    const buffer:Buffer = Buffer.from(await image?.arrayBuffer())
    const fileName = `${image?.name.replaceAll(' ', '_')}`

    const dirPath = path.join(process.cwd(), "/public/images/");

    try {
        await fs.mkdir(dirPath, {recursive: true});
        const user = await db.users.findFirstOrThrow({
            where:{
                id: parseInt(params.id),
            }
        })

        if (user.image){
            const oldFilePath = path.join(dirPath, user.image);
            if(await fs.stat(oldFilePath).catch(() => false)){
                await fs.unlink(oldFilePath);
            }
        }

        await fs.writeFile(path.join(dirPath, fileName), buffer);

        const userUpdate = await db.users.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                email: formData.get('email') as string ?? user.email,
                name: formData.get('name') as string ?? user.name,
                image: `/images/${fileName}` ?? user.image,
                password: formData.get('password') as string ?? user.password,
            }
        })

        return NextResponse.json({
            user: userUpdate,
            "status": 201
        })
    }
    catch(err){
        console.error(err);
        return NextResponse.json({
            "message": err.message,
            "status": 500,
        })
    }
}