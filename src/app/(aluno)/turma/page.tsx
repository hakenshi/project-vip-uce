import {auth} from "@/actions/auth";
import db from "../../../../prisma/db";
import {userColumns} from "@/app/(admin)/turmas/columns";
import {columns} from "@/app/(aluno)/turma/columns";
import DataTable from "@/app/(aluno)/turma/DataTable";
import Image from "next/image";
import React from "react";

export default async function TurmaPage() {

    const user = auth();
    const myClass = await db.users.findFirst({
        where: {
            id: user.id
        },
        select: {
            class: {
                include: {
                    users: true,
                },
            }
        },
    })

    return (
        myClass?.class ?
            (
                <div className={"flex flex-col justify-center items-center h-1/2"}>
                    <div className={"w-9/12 p-10 rounded flex flex-col gap-5 items-center border-2"}>
                        <div className={"flex flex-col items-center"}>
                            <Image width={80+10} height={100-10} src={"/LOGOVIP.png"} alt={"logo english pinhal"}/>
                            <h1 className={""}>Nível da turma: {myClass.class.levelId}</h1>
                        </div>
                        <DataTable columns={columns} data={myClass.class.users}/>
                    </div>
                </div>
            )
            : (
                <div className={"flex justify-center items-center"}>
                    Você não está em nenhuma turma.
                </div>
            )
    )
}