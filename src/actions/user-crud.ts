'use server'

import {UserSchema, UserValidation} from "@/lib/validation";
import db from "../../prisma/db";
import {revalidatePath} from "next/cache";
import {saltAndEncrypt} from "@/bcrypt";
import {storeImage, updateStoreImage} from "@/lib/images";
import { cookies } from "next/headers";

export const createUser = async (form: FormData) => {

    const newUser = {
        image: form.get('image'),
        name: form.get("nome"),
        email: form.get("email"),
        password: form.get("senha"),
    }

    const image = form.get("image") as File;

    let userImage

    if (image.size > 0){
       userImage = await storeImage(form)
    }

    const result = UserSchema.safeParse(newUser);

    if (!result.success) {
        const messages = result.error.errors.map((err) =>err.message).join('\n')
        return {
            error: messages,
            stauts: 401,
        }
    }

    const password = await saltAndEncrypt(newUser.password as string)

    try{
        await db.users.create({
            data:{
                image: userImage,
                name: newUser.name as string,
                email: newUser.email as string,
                password: password as string,
                userType:{
                    connect: {
                        id: 2
                    }
                }
            }
        })
        revalidatePath('/alunos')
        return {
            message: "Aluno cadastrado com sucesso",
            status: 201
        }

    }
    catch (e: any){
        console.log(e.message)
    }
}

export async function updateUser(form: FormData, email: string) {

    const image = form.get('image') as File;

    const user = await db.users.findFirstOrThrow({
        where:{
            email
        }
    })

    let userImage
    if (image.size > 0){
        userImage = await updateStoreImage(form, user.image)
    }
    let password
    if (form.get('senha')){
        password = await saltAndEncrypt(form.get('senha') as string)
    }

    try {
        await db.users.update({
            where:{
                id: user.id
            },
            data:{
                email: form.get('email') as string ?? user.email,
                name: form.get('nome') as string ?? user.name,
                image: userImage ?? user.image,
                password: password ?? user.password,
            }
        })

        revalidatePath('/alunos')

        return {
            message: "Aluno editado com sucesso",
            status: 201,
        }
    }
    catch (e){
        console.log(e)
    }
}

export async function deleteUser(email: string){

    const token = cookies().get('token')

    if(token){
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}user/${email}`,{
            method: "DELETE"
        })
        if (response.ok){
            revalidatePath('/alunos')
            return response.json()
        }
    }
}

export async function updateUserClass(classId: number, userId: number) {
    const token = cookies().get('token')

    if (token){
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}turmas/${classId}`, {
            method: "PATCH",
            body: JSON.stringify({
                userId
            })
        })
        if (response.ok){
            revalidatePath('/turmas')
            return response.json()
        }
    }
}

export async function removeUserFromClass (userId: number){
    if (cookies().get('token')){
       const user =  await db.users.update({
            where: {
                id: userId
            },
            data: {
                classId: null
            }
        })

        revalidatePath('/turmas')

        return {
            message: `${user.name} foi removido da turma.`
        }
    }
}
