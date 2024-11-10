'use client'

import {ColumnDef} from "@tanstack/table-core";
import {Users} from "@prisma/client";
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
            const [isEditing, setIsEditing] = useState(false)
            const [isAlertOpen, setIsAlertOpen] = useState(false)

            const {toast} = useToast()

            return(
                <>
                    <Dialog  open={isOpen} onOpenChange={() => setIsOpen(false)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Ver Aluno</DialogTitle>
                            </DialogHeader>
                            <div className={"flex items-center justify-between"}>
                                   <div>
                                       <Avatar className={"w-60 h-60"}>
                                           <AvatarImage className={"object-cover"} src={`${user.image}`} />
                                           <AvatarFallback className={"text-3xl"}>
                                               {user?.name.substring(0, 2).toUpperCase()}
                                           </AvatarFallback>
                                       </Avatar>
                                   </div>
                                <div>
                                    <div>
                                        <p className={"truncate"}><strong>Nome:</strong> {user.name}</p>
                                        <p className={"truncate"}><strong>Email: </strong>{user.email}</p>
                                        <p className={"truncate"}><strong>Tipo de usuário:</strong> {user.userTypeId}</p>
                                        <p className={"truncate"}><strong>Turma:</strong></p>
                                        <p className={"truncate"}><strong>Data de adição:</strong> {new Date(user.created_at).toLocaleDateString('pt-br')}</p>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isEditing} onOpenChange={() => setIsEditing(false)}>
                        <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Aluno</DialogTitle>
                        </DialogHeader>
                            <EditarAluno user={user}/>
                        </DialogContent>
                    </Dialog>
                    <AlertDialog open={isAlertOpen} onOpenChange={() => setIsAlertOpen(false)} >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza de que deseja excluir este aluno?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                Essa ação é irreversível
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
                            <DropdownMenuItem onClick={() =>setIsOpen(true)}>
                                Ver Aluno
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                Editar Aluno
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
                                Excluir Aluno
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={()=> navigator.clipboard.writeText(user.name)}>
                                Copiar Nome
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        }
    }
]