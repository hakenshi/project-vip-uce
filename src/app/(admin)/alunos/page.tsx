import React from "react";
import db from "../../../../prisma/db";

import {columns} from "@/app/(admin)/alunos/columns";
import {DataTable} from "@/app/(admin)/alunos/DataTable";

export default async function AdminPage() {

    const response = await db.users.findMany({
        select: {
            name: true,
            email: true,
            created_at: true,
            image: true,
        }
    })

    return (
        <main className="flex flex-col items-center gap-5 m-5 p-5">
            {/*@ts-ignore*/}
            <DataTable columns={columns} data={response}/>
        </main>
    )
}