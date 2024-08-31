'use server'

import db from "../../../../prisma/db";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {NextRequest, NextResponse} from "next/server";
import * as crypto from "node:crypto";

export async function POST(req: NextRequest) {


    const {email, password} = await req.json();

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

    if (!isPasswordValid || !user) {
        return NextResponse.json({
            message: "Email ou senha incorretos",
        })
    }

    const token = jwt.sign(user, nextSecret, {expiresIn: '24h'});

    return NextResponse.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            classId: user.classId,
            userTypeId: user.userTypeId,
            email: user.email,
            image: user.image,
        }
    })
}