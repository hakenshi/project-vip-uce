'use client'

import Image from "next/image";
import logo from "@/images/LOGOVIP.png";
import {FormInput} from "@/components/FormInput";
import React, {useRef} from "react";
import {json} from "node:stream/consumers";
import {Users} from "@prisma/client";
import {UserEnum} from "@/enums/user-enum";
import {redirect, useRouter} from "next/navigation";
import {useStateContext} from "@/components/contexts/useStateContext";

export default function SignIn() {

    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const { setUser, setSessionToken,user,token } = useStateContext()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formRef.current) {
            fetch('/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formRef.current.email.value,
                    password: formRef.current.senha.value,
                }),
            }).then((response: Response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } else {
                    return response.json();
                }
            })
                .then(({token, user}) => {
                    if (token && user) {
                        setSessionToken(token)
                        setUser(user)
                        sessionStorage.setItem("auth_user", user.id);
                    }
                    if (user && user.userTypeId == UserEnum.admin) {
                        router.replace('/dashboard')
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    return (
        <form className="p-5 w-full flex flex-col gap-5" ref={formRef} onSubmit={handleSubmit}>
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
    )
}