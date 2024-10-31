import {Users} from "@prisma/client";
import {cookies} from "next/headers";
import {UserEnum} from "@/enums/user-enum";
import {redirect} from "next/navigation";
import {toast} from "@/hooks/use-toast";

export const login = async (form: FormData) => {

    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers:{
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            email: form.get('email')?.toString(),
            senha: form.get('senha')?.toString(),
        }),
    })
    if (!response.ok) {
        return {
            message: "deu erro"
        }
    }

    const {user, token}:{user: Users, token: string} = await response.json();

    return {
        user, token
    }

}