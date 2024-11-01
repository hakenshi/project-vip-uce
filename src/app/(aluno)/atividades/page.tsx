import ListaAtividade from "@/components/ListaAtividade";
import db from "../../../../prisma/db";

export default async function AtividadePage() {
    const atividades = await db.activities.findMany()
    return(
        <main>
            <ListaAtividade atividades={atividades}/>
        </main>
    )
}