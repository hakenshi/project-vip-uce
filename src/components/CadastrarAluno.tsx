import AvatarPreview from "@/components/AvatarPreview";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {createUser} from "@/actions/user-crud";
import {useToast} from "@/hooks/use-toast";
import {UserSchema, UserValidation} from "@/lib/validation";

export default function CadastrarAluno() {

    const {toast} = useToast()

    const cadastrarAluno = async (form: FormData) => {

        const newUser = {
            image: form.get("image"),
            name: form.get("nome"),
            email: form.get("email"),
            password: form.get("senha"),
            confirmPassword: form.get("confirm-senha"),
        }


        const result = UserSchema.safeParse(newUser)

        if (!result.success) {
            const messages = result.error.errors.map((err) =>err.message).join('\n')
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

        const response = await createUser(form)

        if (response?.error) {
            toast({
                variant: "destructive",
                description: response.error,
            })
        }

        if (response.message && response.status == 201){
            toast({
                variant: "default",
                description: response.message
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger
                className={"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 p-2"}>
                Cadastar Aluno
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Cadastar Aluno</DialogTitle>
                <DialogDescription>Cadastrar um novo aluno</DialogDescription>

                <form action={cadastrarAluno} className={"grid gap-5"} content="multipart/formdata">
                    <div className={"flex flex-col justify-center items-center"}>
                        <AvatarPreview initialImage={''} name={'Aluno'}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor={"nome"}>Nome</Label>
                        <Input name={"nome"} placeholder={"Insira um nome"}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor={"email"}>Email</Label>
                        <Input name={"email"} placeholder={"email@email.com"}/>
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

    )
}