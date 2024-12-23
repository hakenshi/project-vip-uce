'use client'

import {ColumnDef} from "@tanstack/table-core";
import {Activities, Users} from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {faArrowsUpDown, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import React, {FormEvent, useRef, useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import EditarAluno from "@/components/EditarAluno";
import {deleteUser, removeUserFromClass, updateUserClass} from "@/actions/user-crud";
import {toast, useToast} from "@/hooks/use-toast";
import {Select} from "@/components/ui/select";
import SelectTurmas from "@/components/SelectTurmas";
import {Checkbox} from "@/components/ui/checkbox";
import db from "../../../../prisma/db";
import {revalidatePath} from "next/cache";
import {deleteActivity} from "@/actions/activies";
import ActivitiesForm from "@/app/(admin)/turmas/ActivitiesForm";
import storeClassmate from "@/actions/classes";


export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "select",
        header: ({table}) => (
            <Checkbox
                //     checked={
                //         table.getIsAllColumnsVisible() ||
                //         (table.getIsAllRowsSelected() && "indeterminate")
                // }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'image',
        header: 'Foto',
        cell: ({row}) => {

            const user = row.original

            return (
                <div className={"w-full flex justify-center"}>
                    <Avatar>
                        <AvatarImage className={"object-cover"} src={`${user.image}`}/>
                        <AvatarFallback>
                            {user?.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            )
        }
    },
    {
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'created_at',
        header: ({column}) => {
            return (
                <Button className={"space-x-2"} variant={"ghost"}
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <span>Data de Criação</span> <FontAwesomeIcon icon={faArrowsUpDown}/>
                </Button>
            )
        },
        cell: ({row}) => {
            const user = row.original
            return Intl.DateTimeFormat('pt-br', {
                dateStyle: "short",
            }).format(user.created_at)
        },
        sortingFn: 'datetime'
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({row, table}) => {

            const user = row.original
            const classId = table.options.meta?.classId
            const [isOpen, setIsOpen] = useState(false)
            const [removeAlert, setRemoveAlert] = useState(false)
            const [isAlertOpen, setIsAlertOpen] = useState(false)
            const {toast} = useToast()

            const handleSumbit = async (e: FormEvent) => {

                e.preventDefault()

                if (e.target) {
                    const turmaId = e.target.turma.value

                    if (classId == turmaId) {
                        alert("Esse aluno já está nessa turma.")
                        return
                    }

                    const response = await updateUserClass(turmaId, user.id)

                    if (response.message) {
                        toast({
                            variant: "default",
                            description: response.message,
                        })
                    }

                }
            }

            return (
                <>
                    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Trocar Aluno de Turma</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSumbit} className={"grid gap-5"}>
                                <SelectTurmas/>
                                <div className={"grid justify-items-end"}>
                                    <Button>Salvar</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog open={removeAlert} onOpenChange={() => setRemoveAlert(false)}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Retirar Aluno</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tem certeza de que deseja retirar este aluno?
                                    Ao clicar em sim, o aluno será removido da turma.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction onClick={async () => {
                                    const response = await removeUserFromClass(user.id)

                                    if (response?.message) {
                                        toast({
                                            variant: "default",
                                            description: response?.message
                                        })
                                    }
                                }}>
                                    Salvar
                                </AlertDialogAction>
                                <AlertDialogCancel onClick={() => setRemoveAlert(false)}>Cancelar</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog open={isAlertOpen} onOpenChange={() => setIsAlertOpen(false)}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apagar Aluno</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                Tem certeza de que deseja apagar este aluno? <br/>
                                Ao clicar em sim, o aluno será apagado do sistema.
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogAction onClick={async () => {
                                    const response = await deleteUser(user.email)
                                    toast({
                                        variant: "default",
                                        description: response.message,
                                    })
                                }}>Sim</AlertDialogAction>
                                <AlertDialogCancel>Não</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                                <span className={"sr-only"}>Opções</span>
                                <FontAwesomeIcon icon={faEllipsis}/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => setIsOpen(true)}>
                                Trocar Turma
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setRemoveAlert(true)}>
                                Retirar Aluno
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
                                Apagar Aluno
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        }
    }
]


export const userColumns: ColumnDef<Users>[] = [
    {
        accessorKey: "select",
        header: '',
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'image',
        header: 'Foto',
        cell: ({row}) => {

            const user = row.original

            return (
                <div className={"w-full flex justify-center"}>
                    <Avatar>
                        <AvatarImage className={"object-cover"} src={`${user.image}`}/>
                        <AvatarFallback>
                            {user?.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            )
        }
    },
    {
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        accessorKey: 'users.email',
        header: 'Email',
        cell: ({row}) => {
            const user = row.original
            return user.email
        }
    },
    {
        accessorKey: 'users.created_at',
        header: ({column}) => {
            return (
                <Button className={"space-x-2"} variant={"ghost"}
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <span>Data de Criação</span> <FontAwesomeIcon icon={faArrowsUpDown}/>
                </Button>
            )
        },
        cell: ({row}) => {
            const user = row.original
            return Intl.DateTimeFormat('pt-br', {
                dateStyle: "short",
            }).format(user.created_at)
        },
        sortingFn: 'datetime'
    },
    {
        id: 'actions',
        enableHiding: false,
        header: ({table}) => {

            const selectCount = table.getSelectedRowModel().rows.length
            const users = table.getSelectedRowModel().rows.map(row => row.original.id)
            const classId = table.options.meta?.classId

            return (
                selectCount > 0 && (<form action={ ()=>storeClassmate(users, classId)}><Button type={"submit"}>Adicionar Alunos ({selectCount})</Button></form>)
            )
        }
    }
]

export const activitiesColumns: ColumnDef<{ activity: Activities }>[] = [
    {
        accessorKey: 'activity.title',
        header: 'Título',
    },
    {
        accessorKey: 'activity.description',
        header: 'Descrição',
    },
    {
        accessorKey: 'activity.created_at',
        header: "Data de postagem",
        cell: ({row}) => {
            return Intl.DateTimeFormat('pt-br', {
                dateStyle: "short",
            }).format(new Date(row.original.activity.created_at))
        }
    },
    {
        accessorKey: 'activity.actions',
        header: '',
        cell: ({row, table}) => {

            const {id} = row.original.activity
            const classId = table.options.meta?.classId

            return (
                <div className={"flex gap-2 justify-center"}>
                   <Dialog>
                       <DialogTrigger className={"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-500 text-secondary hover:bg-sky-600/80 h-10 px-4 py-2"}>Editar</DialogTrigger>
                       <DialogContent>
                           <DialogTitle>
                               Editar Atividade
                           </DialogTitle>
                           <DialogContent >
                               <DialogHeader>
                                   <DialogTitle>Postar Atividade</DialogTitle>
                               </DialogHeader>
                               <ActivitiesForm activity={row.original.activity} classId={classId} />
                           </DialogContent>
                       </DialogContent>
                   </Dialog>
                    <AlertDialog>
                        <AlertDialogTrigger
                            className={"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"}>Excluir</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Excluir Atividade</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Ao clicar em sim, a atividade será exlcuida. Você tem certeza de que deseja excluir?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction onClick={async () => {
                                    const response = await deleteActivity(id)

                                    if (response?.status === 204) {
                                        toast({
                                            variant: "default",
                                            description: response.messase
                                        })
                                    } else {
                                        toast({
                                            variant: "destructive",
                                            description: response?.message
                                        })
                                    }

                                }}>Confirmar</AlertDialogAction>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        }
    }
]