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

    const router = useRouter();
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

    )
}