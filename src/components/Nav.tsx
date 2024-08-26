'use client'

import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

const Nav = () => {

    const user = JSON.parse(sessionStorage.getItem("user") as string);

    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
    const fileRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (fileRef.current) {
            // @ts-ignore
            const files = e.target.files[0];
            setPreviewImage(URL.createObjectURL(files));
        }
    }

    const handleSumbit = (e: React.FormEvent) => {

        e.preventDefault()

        if (formRef.current && formRef.current?.senha.value !== formRef.current?.confirmarSenha.value) {
            alert('as senhas não coincidem')
            formRef.current.senha.value = ''
            formRef.current.confirmarSenha.value = ''
            return
        }
        if (formRef.current) {
            const formData = new FormData(formRef.current);

            fetch(`/api/user/${user.id}`, {
                method: "PATCH",
                body: formData,
            })
                .then((response: Response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json()
                })
                .then((response: Response) => {
                    if (response.ok) {
                        sessionStorage.setItem("user", JSON.stringify(response));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    return (
        <nav className="w-full flex justify-between items-center p-7 bg-gradient-to-tr from-red-600 to-red-700">
            <button>
                <FontAwesomeIcon icon={faBars} className={"text-white text-2xl"}/>
            </button>
            <Dialog>
                <DialogTrigger>
                    <Avatar>
                        <AvatarImage src={user.image} alt={"avatar"}/>
                        <AvatarFallback className={"bg-zinc-700 text-white"}>
                            {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Editar Perfil
                        </DialogTitle>
                    </DialogHeader>
                    <form ref={formRef} className={"grid grid-rows-4"} onSubmit={handleSumbit}>
                        <div className={"flex flex-col justify-center items-center"}>
                            <Avatar onClick={() => fileRef.current?.click()} className={"w-32 h-32 cursor-pointer"}>
                                <AvatarImage src={previewImage ?? user.image}/>
                                <AvatarFallback className={"bg-zinc-700 text-white text-4xl"}>
                                    {user.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                                <input onChange={handleImageChange} name='image' hidden type="file" ref={fileRef}
                                       accept=".jpg, .png, .jpeg"/>
                            </Avatar>
                        </div>
                        <div className="grid gap-1 py-2">
                            <Label htmlFor={"nome"}>Nome</Label>
                            <Input defaultValue={user.name} name={"nome"} placeholder={"Insira um nome"}/>
                        </div>
                        <div className="grid gap-1 py-2">
                            <Label htmlFor={"email"}>Email</Label>
                            <Input defaultValue={user.email} name={"email"} placeholder={"email@email.com"}/>
                        </div>
                        <div className="grid gap-1 py-2">
                            <Label htmlFor={"senha"}>Senha</Label>
                            <Input name={"senha"} placeholder={"Insira uma senha"}/>
                        </div>
                        <div className="grid gap-1 py-2">
                            <Label htmlFor={"confirm-senha"}>Confirmar Senha</Label>
                            <Input name={"confirmarSenha"} placeholder={"Confirme sua senha"}/>
                        </div>
                        <Button type={"submit"}>Salvar</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </nav>
    );
};

export default Nav;