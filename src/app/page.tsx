"use client";

import {FormInput} from "@/components/FormInput";
import Image from "next/image";
import logo from "../../public/LOGOVIP.png";
import React, {useState} from "react";
import {login} from "@/actions/login";
import {UserEnum} from "@/enums/user-enum";
import {useRouter} from "next/navigation"; // useRouter for client-side navigation
import {toast} from "@/hooks/use-toast";
import {socket} from "../../express/socket.io";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const {user, token} = await login(formData);

        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token}),
        });

        if (!response.ok) {
            toast({
                variant: "destructive",
                description: "Algo deu errado.",
            });
            setLoading(false);
            return
        }
        if (user && token) {
            if (user.userTypeId === UserEnum.admin) {
                router.push("/dashboard");
            }else {
                socket.emit('auth-user', user.classId, (response: { success: boolean }) => {
                    if (response.success) {
                        console.log("Usuário autenticado")
                        router.push("/turma")
                    }
                    else{
                        console.log("Algo deu errado.")
                    }
                })
            }
            setLoading(false);
        }
    };

    return (
        <main className="flex justify-center items-center h-screen">
            <div
                className="border p-5 rounded m-2 w-[32rem] h-[32rem] bg-white flex justify-center items-center shadow-lg shadow-zinc-200">
                <form onSubmit={handleSubmit} className="p-5 w-full flex flex-col gap-5">
                    <div className="flex w-full justify-center">
                        <Image className="w-32" width={114} src={logo} alt="logo vip english"/>
                    </div>
                    <FormInput name="email" label="Email" placeholder="email@gmail.com"/>
                    <FormInput type="password" name="senha" label="Senha" placeholder="•••••••"/>
                    <div className="flex justify-center">
                        <button
                            className="bg-red-600 hover:bg-red-700 p-2 text-white rounded w-44"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
