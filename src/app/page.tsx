import {FormInput} from "@/components/FormInput";
import Image from "next/image";
import logo from "../../public/LOGOVIP.png"
import React from "react";
import db from "../../prisma/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import {nextSecret} from "@/lib/utils";
import {UserEnum} from "@/enums/user-enum";
export default function Home() {
    const login = async (form: FormData) => {
        'use server'
        const user = await db.users.findFirstOrThrow({
            where:{
                email: form.get("email") as string,
            }
        })

        const password = await bcrypt.compare(form.get("senha") as string, user.password);

        if (password && user){
            const token = jwt.sign(user, nextSecret, {expiresIn: '24h'});

            if (token) {
                cookies().set('token', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60,
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                })

                if (user.userTypeId === UserEnum.admin){
                    redirect('/dashboard')
                }
                else{
                    redirect('/turma')
                }
            }
        }
        else {
            console.log('email ou senha incorretos')
        }
    }

  return (
    <main className="flex justify-center items-center h-screen">
        <div
            className="border p-5 rounded m-2 w-[32rem] h-[32rem] bg-white flex justify-center items-center shadow-lg shadow-zinc-200">
            <form action={login} className="p-5 w-full flex flex-col gap-5">
                <div className="flex w-full justify-center">
                    <Image className={"w-32"} width={114} src={logo} alt={"logo vip english"}/>
                </div>
                <FormInput name={"email"} label={"Email"} placeholder={"email@gmail.com"}/>
                <FormInput type={'password'} name={"senha"} label={"Senha"} placeholder={"•••••••"}/>
                <div className="flex justify-center">
                    <button className="bg-red-600 hover:bg-red-700 p-2 text-white rounded w-44" type={"submit"}>Enviar
                    </button>
                </div>
            </form>
        </div>
    </main>
  );
}