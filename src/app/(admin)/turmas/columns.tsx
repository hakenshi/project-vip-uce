'use client'

import {ColumnDef} from "@tanstack/table-core";
import {Classes, Users} from "@prisma/client";
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
import {useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import EditarAluno from "@/components/EditarAluno";
import {deleteUser} from "@/actions/user-crud";
import {useToast} from "@/hooks/use-toast";
import {Select} from "@/components/ui/select";
import SelectTurmas from "@/components/SelectTurmas";



export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: 'image',
        header: 'Foto',
        cell: ({row}) => {

            const user = row.original

            return (
                <div className={"w-full flex justify-center"}>
                    <Avatar>
                        <AvatarImage className={"object-cover"} src={`${user.image}`} />
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
            return(
                <Button className={"space-x-2"} variant={"ghost"}
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <span>Data de Criação</span> <FontAwesomeIcon icon={faArrowsUpDown} />
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
        cell: ({row}) => {

            const user = row.original

            const [isOpen, setIsOpen] = useState(false)
            const [removeAlert, setRemoveAlert] = useState(false)
            const [isAlertOpen, setIsAlertOpen] = useState(false)

            const {toast} = useToast()

            return(
                <>
                    <Dialog  open={isOpen} onOpenChange={() => setIsOpen(false)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Trocar Aluno de Turma</DialogTitle>
                            </DialogHeader>
                            <form className={"grid gap-5"}>
                                <SelectTurmas />
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
                                <AlertDialogAction onClick={() => {/* lógica de salvar */}}>
                                    Salvar
                                </AlertDialogAction>
                                <AlertDialogCancel onClick={() => setRemoveAlert(false)}>Cancelar</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog open={isAlertOpen} onOpenChange={() => setIsAlertOpen(false)} >
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
                                }} >Sim</AlertDialogAction>
                                <AlertDialogCancel>Não</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                                <span className={"sr-only"}>Opções</span>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setIsOpen(true )}>
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