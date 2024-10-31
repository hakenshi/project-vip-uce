'use client'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell as faBellRegular} from "@fortawesome/free-regular-svg-icons";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Link from "next/link";
import {socket} from "../../express/socket.io";

export default function Notificacao({classId}: { classId: number }) {
    const [notificacoes, setNotificacoes] = useState<string[] | []>([])

    useEffect(() => {
        if (classId){
            socket.on(`turma-${classId}`, (message: string) => {
                console.log(`Mensagem recebida: ${message}`)
                setNotificacoes(n => [...n, message])
            })

            return () => {
                socket.off(`turma-${classId}`)
            }
        }
    }, [classId])

    const limparNotificacao = () => {
        setNotificacoes([])
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <FontAwesomeIcon className={"text-xl text-white"} icon={faBellRegular}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    {notificacoes.length === 0 ?
                        <DropdownMenuItem>Nada para exibir</DropdownMenuItem> :
                        notificacoes.map((notificacao, i) => (
                            <DropdownMenuItem key={i}><Link href={"/atividades"}>{notificacao}</Link></DropdownMenuItem>
                        ))}
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className={"p-0 m-0"}>
                        <Button onClick={() => limparNotificacao()} className={"w-full p-0 m-0"}>
                            Limpar
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}