import {FormInput} from "@/components/FormInput";
import Image from "next/image";
import logo from "../../public/LOGOVIP.png"
import React from "react";
import {login} from "@/actions/login";

export default function Home() {

    const handleSubmit = async (form:FormData) => {
        'use server'
        await login(form);
    }

    return (
        <main className="flex justify-center items-center h-screen">
            <div
                className="border p-5 rounded m-2 w-[32rem] h-[32rem] bg-white flex justify-center items-center shadow-lg shadow-zinc-200">
                <form action={handleSubmit} className="p-5 w-full flex flex-col gap-5">
                    <div className="flex w-full justify-center">
                        <Image className={"w-32"} width={114} src={logo} alt={"logo vip english"}/>
                    </div>
                    <FormInput name={"email"} label={"Email"} placeholder={"email@gmail.com"}/>
                    <FormInput type={'password'} name={"senha"} label={"Senha"} placeholder={"•••••••"}/>
                    <div className="flex justify-center">
                        <button className="bg-red-600 hover:bg-red-700 p-2 text-white rounded w-44" type={"submit"}>
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}