import db from "../../../../prisma/db";
import {Activities} from "@prisma/client";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button, buttonVariants} from "@/components/ui/button";
import {auth} from "@/actions/auth";
import Link from "next/link";


type SearchParams = {
    searchParams: {
        status: "PENDING" | "COMPLETED"
    }
}

export default async function AtividadePage({searchParams}:SearchParams) {
    const user = await auth();
    const {status} = searchParams;
    const atividadesDoBanco = await db.activities.findMany({
        where:{
            classes: {
                some: {
                    classId: user.classId as number
                }
            }
        }
    })

    // Busca atividades de acordo com o status
    const filtroAtividades = await db.userActivities.findMany({
        where: {
            userId: user.id,
            status: "COMPLETED"  // padrão para atividades pendentes se não houver status
        },
        include: {
            activity: true, // Inclui os dados da atividade
        }
    });

    const deleteActivity = async (id:number)=>{
        'use server'
        if(user) {
            await db.userActivities.create({
                data: {
                    activityId: id,
                    userId: user.id,
                    classId: user.classId as number,
                    status: "COMPLETED"
                }
            })
        }
    }

    return (
        <main>
            <div>
                <Link href={"?status=PENDING"}  className={buttonVariants({variant: "default"})}>
                    Pendente
                </Link>
                <Link href={"?status=COMPLETED"} className={buttonVariants({variant: "default"})}>
                    Completado
                </Link>
            </div>
            {filtroAtividades.map((userActivity) => (
                <div className="m-3 h-32" key={userActivity.activity.id}>
                    <Card className="flex">
                        <CardHeader className="flex justify-center w-full">
                            <CardTitle>{userActivity.activity.title}</CardTitle>
                            <CardDescription>{userActivity.activity.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-center text-center items-center">
                            <form action={async ()=>{
                                'use server'
                                deleteActivity(userActivity.activity.id)}}>
                                <Button type={"submit"}>Concluir</Button>
                            </form>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </main>
    );
}