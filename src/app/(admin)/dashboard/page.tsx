import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import db from "../../../../prisma/db";
import {BookUp, GraduationCap, NotebookPen, UsersIcon} from "lucide-react";

const ano = new Intl.DateTimeFormat("pt-br",{
    year: "numeric",
}).format(new Date()).toString();

export default async function AdminPage() {

    const users = await db.users.findMany({
        where:{
            userTypeId: 2
        }
    })

    const classes = await db.classes.findMany()

    const levels = await db.levels.findMany()

    const activities = await db.activities.findMany()

    return (
            <main className="text-center flex flex-col gap-5 container p-5">
                <div className="flex flex-col items-center md:gap-0 gap-5  md:flex-row justify-around">
                    <Card className={"w-64 h-64 text-center"}>
                        <CardHeader>
                            <CardTitle>Alunos</CardTitle>
                            <CardDescription>Quantidade de Alunos Cadastrados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex flex-col items-center text-xl"}>
                                <GraduationCap/>
                                <p>{users.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"w-64 h-64 text-center"}>
                        <CardHeader>
                            <CardTitle>Turmas</CardTitle>
                            <CardDescription>Quantidade de Turmas Cadastradas</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex flex-col items-center text-xl"}>
                                <UsersIcon/>
                                <p>{classes.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"w-64 h-64 text-center"}>
                        <CardHeader>
                            <CardTitle>Níveis</CardTitle>
                            <CardDescription>Quantidade de Níveis Cadastrados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex flex-col items-center text-xl"}>
                                <BookUp/>
                                <p>{levels.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"w-64 h-64 text-center"}>
                        <CardHeader>
                            <CardTitle>Atividades</CardTitle>
                            <CardDescription>Quantidade de Atividades Postadas</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex flex-col items-center text-xl"}>
                                <NotebookPen/>
                                <p>{activities.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </main>

    )
}