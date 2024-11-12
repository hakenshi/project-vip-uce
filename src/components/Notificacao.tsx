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
import {faBell as faBellSolid} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Link from "next/link";
import {socket} from "../../express/socket.io";
import {Notifications} from "@prisma/client";
import {response} from "express";

export default function Notificacao({classId}: { classId: number }) {
    const [notificacoes, setNotificacoes] = useState<Notifications[]>([]);

    const fetchNotificacoes = async () => {
        try {
            const response = await fetch(`http://localhost:8000/turma/notificao/${classId}`);
            const data: Notifications[] = await response.json();

            setNotificacoes(data);

        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    };

    const getMessage = (message: "MESSAGE" | "ALERT") => {
        const messageTypes = {
            "MESSAGE": "Você tem uma nova atividade",
            "ALERT": "Você tem uma atividade pendente.",
        };
        const notificationMessage = messageTypes[message];
        if (!notificationMessage) {
            alert("Tipo de mensagem inexistente");
            return;
        }
        return {notificationType: messageTypes, notificationMessage};
    };

    useEffect(() => {
        fetchNotificacoes()

        socket.on(`turma-${classId}`, ({notification}) => {
            fetchNotificacoes(); // Busca notificações novamente quando houver uma atualização
        });
    }, [classId]);

    const limparNotificacao = () => {
        setNotificacoes([]);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <FontAwesomeIcon className="text-xl text-white"
                                     icon={notificacoes.length > 0 ? faBellSolid : faBellRegular}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Notificações ({notificacoes.length})</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    {notificacoes.length === 0 ? (
                        <DropdownMenuItem>Nada para exibir</DropdownMenuItem>
                    ) : (
                        notificacoes.map((notificacao, i) => (
                            <DropdownMenuItem key={i}>
                                <Link
                                    href="/atividades">{notificacao ? getMessage(notificacao.notificationType)?.notificationMessage : ""}</Link>
                            </DropdownMenuItem>
                        ))
                    )}
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="p-0 m-0">
                        <Button onClick={limparNotificacao} className="w-full p-0 m-0">
                            Limpar
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
