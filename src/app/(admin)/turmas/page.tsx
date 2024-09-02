import db from "../../../../prisma/db";
import {Card, CardFooter, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faTrash, faUserGroup, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export default async function AdminPage() {

    const classes = await db.classes.findMany()

    return (
        <main className="text-center p-5 container space-y-5">

            <Dialog>
                <DialogTrigger className={"p-2 bg-sky-500 hover:bg-sky-600 text-white rounded "}>
                    Cadastrar Turma
                </DialogTrigger>
                <DialogContent>
                    <form>
                        XD
                    </form>
                </DialogContent>
            </Dialog>

            {classes.map(classes => (
                <Card
                    className={"flex flex-col justify-between gap-2 w-full max-w-96 min-h-56 bg-white rounded shadow-md"}>
                    <CardTitle className="p-4 w-full flex flex-col items-center justify-center">
                        <Image width={80} height={80} src={"/LOGOVIP.png"} alt={""}/>
                        <p className="text-sm text-center my-5 font-normal">Nível {classes.id}</p>
                    </CardTitle>
                    <CardFooter className={"border-t flex justify-between items-center p-0"}>
                        <div className="p-2">
                            <Dialog>
                                <DialogTrigger className={"hover:bg-zinc-200 rounded-full"}>
                                    <FontAwesomeIcon icon={faUserGroup} className="p-2"/>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Alunos na Turma</DialogTitle>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="p-2">

                            <Dialog>
                                <DialogTrigger className="open-dialog hover:bg-zinc-200 rounded-full">
                                    <FontAwesomeIcon icon={faUserPlus} className="p-2"/>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Adicionar Aluno na Turma</DialogTitle>
                                    </DialogHeader>
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
                                </DialogContent>
                            </Dialog>

                            <AlertDialog>
                                <AlertDialogTrigger className="open-dialog hover:bg-zinc-200 rounded-full">
                                    <FontAwesomeIcon icon={faTrash} className="p-2"/>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Excluir Turma</AlertDialogTitle>
                                        <AlertDialogDescription>Tem certeza de que deseja excluir essa turma?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction>Sim</AlertDialogAction>
                                    <AlertDialogCancel>Não.</AlertDialogCancel>
                                </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </main>
    )
}