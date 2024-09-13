import db from "../../../../prisma/db";
import {Card, CardFooter, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowsUpDown,
    faClipboard,
    faEllipsis,
    faTrash,
    faUserGroup,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {columns, userColumns} from "@/app/(admin)/turmas/columns";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Levels, Users} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import Loader from "@/components/loader";
import {clsx} from "clsx";
import {DataTable} from "@/app/(admin)/turmas/DataTable";

export default async function AdminPage() {

    const classes = await db.classes.findMany({
        select: {
            id: true,
            levelId: true,
            users: true,
        },
        orderBy: {
            levelId: "asc",
        }
    })

    const users = await db.users.findMany({
        where:{
            classId: null
        }
    })

    const levels = await db.levels.findMany({
        select: {
            id: true,
            level: true,
        }
    })

    const storeClass = async (form: FormData) => {
        'use server'

        try {
            await db.classes.create({
                data: {
                    levelId: parseInt(form.get('class') as string),
                }
            })

            revalidatePath('/turmas')
        } catch (e) {
            console.log(e)
        }

    }

    async function postActivity(form: FormData) {
        'use server'

        console.log(form)

    }

    return (
        <main className="text-center p-5 space-y-5">
            <Dialog>
                <DialogTrigger className={"bg-red-600 p-2 text-sm rounded text-white hover:bg-red-700"}>
                    Cadastrar Turma
                </DialogTrigger>
                <DialogContent className={"min-h-96"}>
                    <DialogHeader>
                        <DialogTitle>Cadastrar Turma</DialogTitle>
                    </DialogHeader>
                    <form action={storeClass} className={"flex flex-col justify-between"}>
                        <Select name={"class"}>
                            <SelectTrigger>
                                <SelectValue placeholder={"Escolha um nível"}/>
                            </SelectTrigger>
                            <SelectContent>
                                {levels.map((level: Levels) => (
                                    <SelectItem key={level.id} value={`${level.id}`}>{level.level}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button type={"submit"}>Cadastar Turma</Button>
                    </form>
                    {/*<DialogFooter className={"flex items-end"}>*/}
                    {/*    <Button>Cadastrar no nível</Button>*/}
                    {/*</DialogFooter>*/}
                </DialogContent>
            </Dialog>
            <div className={"flex gap-5 justify-center flex-wrap"}>
                {classes.map((classes, index) =>{

                    const userData = {
                        users,
                        idClasse: classes.id
                    }

                    return(
                        <Card key={classes.id}
                              className={"flex flex-col justify-between gap-2 w-full max-w-96 min-h-56 bg-white rounded shadow-md"}>
                            <CardTitle className="p-4 w-full flex flex-col items-center justify-center">
                                <Image width={80} height={80} src={"/LOGOVIP.png"} alt={""}/>
                                <p className="text-sm text-center my-5 font-normal">Nível {classes.levelId}</p>
                            </CardTitle>
                            <CardFooter className={"border-t flex justify-between items-center p-0"}>
                                <div className="p-2">
                                    <Dialog>
                                        <DialogTrigger className={"hover:bg-zinc-200 rounded-full"}>
                                            <FontAwesomeIcon icon={faUserGroup} className="p-2"/>
                                        </DialogTrigger>
                                        <DialogContent className={"max-w-screen-lg"}>
                                            <DialogHeader>
                                                <DialogTitle className={"text-center"}>Alunos na Turma</DialogTitle>
                                            </DialogHeader>
                                            <DataTable columns={columns} data={classes.users}/>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="p-2">
                                    <Dialog>
                                        <DialogTrigger className="hover:bg-zinc-200 rounded-full">
                                            <FontAwesomeIcon icon={faUserPlus} className="p-2"/>
                                        </DialogTrigger>
                                        <DialogContent className={"max-w-screen-lg"}>
                                            <DialogHeader>
                                                <DialogTitle>Adicionar Aluno na Turma</DialogTitle>
                                            </DialogHeader>
                                            <DataTable columns={userColumns} data={users}/>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger className="open-dialog hover:bg-zinc-200 rounded-full">
                                            <FontAwesomeIcon icon={faClipboard} className="p-2"/>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Postar Atividade</DialogTitle>
                                            </DialogHeader>
                                            <form action={postActivity} className={"flex flex-col gap-5"}>
                                                <div>
                                                    <Label>Insira um título para a atividade</Label>
                                                    <Input name={"title"}/>
                                                </div>
                                                <div>
                                                    <Label>Insira uma descrição para a atividade</Label>
                                                    <Textarea name={"description"} style={{resize: "none"}}/>
                                                </div>
                                                <div>
                                                    <Label>Anexe um arquivo para a atividade (Não é obrigatório)</Label>
                                                    <Input name={"file"} type="file"/>
                                                </div>

                                                <div className={"flex w-full justify-end"}>
                                                    <Button type="submit"> Postar Atividade</Button>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger className="open-dialog hover:bg-zinc-200 rounded-full">
                                            <FontAwesomeIcon icon={faTrash} className="p-2"/>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Excluir Turma</AlertDialogTitle>
                                                <AlertDialogDescription>Tem certeza de que deseja excluir essa
                                                    turma?</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <form action={async () => {
                                                    'use server'
                                                    await db.classes.delete({
                                                        where: {
                                                            id: classes.id
                                                        }
                                                    })
                                                    revalidatePath("/turmas")
                                                }}>
                                                    <AlertDialogAction type={"submit"}>
                                                        Sim.
                                                    </AlertDialogAction>
                                                </form>
                                                <AlertDialogCancel>Não.</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </main>
    )
}