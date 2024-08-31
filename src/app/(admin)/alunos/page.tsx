import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import AvatarPreview from "@/components/AvatarPreview";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React from "react";

export default function AdminPage() {
    return (
        <main className="flex flex-col items-center gap-5 m-5 p-5">

            <Dialog>
                <DialogTrigger>
                    <Button>Cadastrar Aluno</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        Cadastrar Aluno
                    </DialogHeader>
                    <form className={"grid gap-5"} content="multipart/formdata">
                        <div className={"flex flex-col justify-center items-center"}>
                            <AvatarPreview initialImage={''} name={'Aluno'}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={"nome"}>Nome</Label>
                            <Input  name={"nome"} placeholder={"Insira um nome"}/>
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

            <div className="container border rounded overflow-x-auto">

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className={"text-center"}>Foto</TableHead>
                            <TableHead className={"text-center"}>Nome</TableHead>
                            <TableHead className={"text-center"}>Email</TableHead>
                            <TableHead className={"text-center"}>Data de Admissão</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className={"text-center"}>Email</TableCell>
                            <TableCell className={"text-center"}>Email</TableCell>
                            <TableCell className={"text-center"}>Email</TableCell>
                            <TableCell className={"text-center"}>Email</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}