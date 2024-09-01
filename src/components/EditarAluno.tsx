import AvatarPreview from "@/components/AvatarPreview";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {createUser, updateUser} from "@/actions/user-crud";
import {useToast} from "@/hooks/use-toast";
import {UserEditSchema, UserSchema, UserValidation} from "@/lib/validation";

type UserProps = {
    user: {
        id: number;
        classId: number | null;
        userTypeId: number;
        email: string;
        name: string;
        image: string | null;
        password: string;
        created_at: Date;
        updated_at: Date;
    }
}

export default function EditarAluno({user}: UserProps) {

    const {toast} = useToast()

    const editarAluno = async (form: FormData) => {

        const newUser = {
            image: form.get("image"),
            name: form.get("nome"),
            email: form.get("email"),
            password: form.get("senha"),
            confirmPassword: form.get("confirm-senha"),
        }


        const result = UserEditSchema.safeParse(newUser)

        if (!result.success) {
            const messages = result.error.errors.map((err) => err.message).join('\n')
            toast({
                variant: "destructive",
                description: messages,
            })
            return
        }

        if (form.get('senha') !== form.get('confirm-senha')) {
            toast({
                variant: "destructive",
                title: "Senhas não iguais.",
                description: "Parece que as senhas enviadas não são iguais, por favor envia-as novamente.",
            })
            return
        }

        const response = await updateUser(form)

        if (response?.message && response?.status == 201) {
            toast({
                variant: "default",
                description: response.message
            })
        }
    }

    return (

        <form action={editarAluno} className={"grid gap-5"} content="multipart/formdata">
            <div className={"flex flex-col justify-center items-center"}>
                <AvatarPreview initialImage={user.image} name={'Aluno'}/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor={"nome"}>Nome</Label>
                <Input name={"nome"} defaultValue={user.name} placeholder={"Insira um nome"}/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor={"email"}>Email</Label>
                <Input name={"email"} defaultValue={user.email} placeholder={"email@email.com"}/>
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

    )
}