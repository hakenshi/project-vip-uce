import { auth } from "@/actions/auth"
import db from "../../../../prisma/db"

export default async function TurmaPage() {

    const user = auth()
   

    return(
        <h1>{turma.id} </h1>
    )
}