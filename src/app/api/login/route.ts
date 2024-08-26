'use server'

import {NextApiRequest, NextApiResponse} from "next";
import db from "../../../../prisma/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {saltAndEncrypt} from "@/bcrypt";
import {NextRequest, NextResponse} from "next/server";


export async function POST(req: NextRequest) {

    const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET as string;

    const {email, password} = await req.json();

    console.log(req.body);

    if (!email || !password) {
        return NextResponse.json({
            message: "Por favor preencha todos os campos"
        }, {status: 400});
    }

        const user = await db.users.findFirstOrThrow({
            where: {
                email: email,
            }
        })
        const isPasswordValid = await bcrypt.compare(password, user.password);

        const token = jwt.sign(user, NEXT_AUTH_SECRET, {expiresIn: '24h'});

        if (!isPasswordValid || !user) {
            return NextResponse.json({
                message: "Email ou senha incorretos",
            })
        }
        return NextResponse.json({
            token,
            user:{
                id: user.id,
                name: user.name,
                classId: user.classId,
                userTypeId: user.userTypeId,
                email: user.email,
                image: user.image,
                created_at: user.created_at,
                updated_at: user.updated_at,
            }
        })
}