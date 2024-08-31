'use server'

import {NextRequest, NextResponse} from "next/server";
import db from "../../../../../prisma/db";
import * as fs from "fs/promises";
import path from "node:path";
import {saltAndEncrypt} from "@/bcrypt";

export async function PATCH(request: NextRequest, { params }:{params: { id: string }}){
    const formData:FormData = await request.formData();
    const image = formData.get('image')
    const fileName = image ? `${image?.name.replaceAll(' ', '_')}` : null
    const dirPath = path.join(process.cwd(), "/public/images");

    try {
        await fs.mkdir(dirPath, {recursive: true});
        const user = await db.users.findFirstOrThrow({
            where:{
                id: parseInt(params.id),
            }
        })

        if (user.image && image) {
            const oldFilePath = path.join("/public", user.image);
            console.log(oldFilePath)
            if(await fs.stat(oldFilePath).catch(() => false)){
                await fs.unlink(oldFilePath);
            }
        }

        if (image && fileName) {
            await fs.writeFile(path.join(dirPath, fileName), Buffer.from(await image?.arrayBuffer()));
        }

        if (formData.get('password')){
            password = await saltAndEncrypt(formData.get('password') as string)
        }

        const userUpdate = await db.users.update({
            where: {
                id: user.id
            },
            data: {
                email: formData.get('email') as string ?? user.email,
                name: formData.get('nome') as string ?? user.name,
                image: `/images/${fileName}` ?? user.image,
                password: password ?? user.password,
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

export async function GET(request: NextRequest, {params} : {params: {id: string}}) {

    try {
        const user = await db.users.findFirstOrThrow({
            where: {
                id: Number(params.id),
            }
        })
        return NextResponse.json({
            user: user
        })
    }
    catch (error){
        return NextResponse.json({
            error: error,
        })
    }
}
