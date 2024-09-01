import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Users} from "@prisma/client";
import AvatarPreview from "@/components/AvatarPreview";
import {saltAndEncrypt} from "@/bcrypt";
import * as fs from "node:fs";
import path from "node:path";
import db from "../../prisma/db";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {nextSecret} from "@/lib/utils";
import {updateStoreImage} from "@/lib/images";

const Nav = ({user}: { user: Users }) => {

    const updateUser = async (form: FormData) => {
        'use server'
        if (form.get('senha') != form.get('confirm-senha')) {
            alert('As senhas não coincidem.')
            return
        }
        const imagePath = await updateStoreImage(form, user.image)

        let password
        if (form.get('senha')){
            password = await saltAndEncrypt(form.get("senha") as string);
        }


        const updatedUser = await db.users.update({
            where: {
                id: user.id,
            },
            data: {
                name: form.get("nome") as string ?? user.name,
                email: form.get("email") as string ?? user.name,
                password: password ?? user.password,
                image: imagePath ?? user.image
            }
        })

        const updatedUserToken = jwt.sign(updatedUser, nextSecret, {expiresIn: '24h'});

        cookies().set('token', updatedUserToken)

        revalidatePath('/dashboard')

        return {success: true}
    }

    return (
        <nav className="w-full flex justify-between items-center p-7 bg-gradient-to-tr from-red-600 to-red-700">
            <button>
                <FontAwesomeIcon icon={faBars} className={"text-white text-2xl"}/>
            </button>
            <Dialog>
                <DialogTrigger>
                    <Avatar>
                        <AvatarImage className={"object-cover"} src={user?.image as string} alt={"avatar"}/>
                        <AvatarFallback className={"bg-zinc-700 text-white"}>
                            {user?.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Editar Perfil
                        </DialogTitle>
                    </DialogHeader>
                    <form action={updateUser} className={"grid gap-5"} content="multipart/formdata">
                        <div className={"flex flex-col justify-center items-center"}>
                            <AvatarPreview initialImage={user?.image} name={user?.name}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={"nome"}>Nome</Label>
                            <Input defaultValue={user?.name} name={"nome"} placeholder={"Insira um nome"}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={"email"}>Email</Label>
                            <Input defaultValue={user?.email} name={"email"} placeholder={"email@email.com"}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={"senha"}>Senha</Label>
                            <Input type={"password"} name={"senha"} placeholder={"Insira uma senha"}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={"confirm-senha"}>Confirmar Senha</Label>
                            <Input type={"password"} name={"confirm-senha"} placeholder={"Confirme sua senha"}/>
                        </div>
                        <div className={"py-2"}>
                            <Button className={"w-full"} type={"submit"}>Salvar</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </nav>
    );
};

export default Nav;