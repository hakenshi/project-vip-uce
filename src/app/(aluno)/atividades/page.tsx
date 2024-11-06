import db from "../../../../prisma/db";
import {Activities} from "@prisma/client";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button, buttonVariants} from "@/components/ui/button";
import {auth} from "@/actions/auth";
import Link from "next/link";
import {revalidatePath} from "next/cache";


type SearchParams = {
    searchParams: {
        status: "COMPLETED"
    }
}

export default async function AtividadePage({searchParams}: SearchParams) {
    const user = await auth();
    const {status} = searchParams;
    const atividadesPendentes = await db.activities.findMany({
        where: {
            classes: {
                some: {
                    classId: user.classId as number
                }
            }
        }
    })

    // Busca atividades de acordo com o status
    const atividadesCompletadas = await db.userActivities.findMany({
        where: {
            userId: user.id,
            status: "COMPLETED"
        },
        include: {
            activity: true
        }
    });

    const deleteActivity = async (id: number) => {
        'use server'
        if (user) {
            await db.userActivities.create({
                data: {
                    activityId: id,
                    userId: user.id,
                    classId: user.classId as number,
                    status: "COMPLETED"
                }
            })
        }
        revalidatePath("/atividades")
    }

    const atividadesCompletedasFiltro = atividadesCompletadas.map(userActivity => userActivity.activityId)

    return (
        <main>
            <div className={"flex w-full justify-center p-5 gap-5"}>
                <Link href={"/atividades"} className={buttonVariants({variant: "default"})}>
                    Pendente
                </Link>
                <Link href="?status=COMPLETED" className={buttonVariants({variant: "default"})}>
                    Completado
                </Link>
            </div>
            <div className={"border m-5 rounded"}>
                {status && status === "COMPLETED"
                    ? atividadesCompletadas.map((userActivity, index) => (
                        <div className="m-3" key={index}>
                            <Card className="flex">
                                <CardHeader className="flex justify-center w-full">
                                    <CardTitle>{userActivity.activity.title}</CardTitle>
                                    <CardDescription className={"text-ellipsis line-clamp-2 max-h"}>{userActivity.activity.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    ))
                    : atividadesPendentes
                        .filter(activity => !atividadesCompletedasFiltro.includes(activity.id))
                        .map((activity, index) => (
                            <div className="m-3" key={index}>
                                <Card className="flex">
                                    <CardHeader className="flex justify-center w-full">
                                        <CardTitle>{activity.title}</CardTitle>
                                        <CardDescription className={"line-clamp-3"}>{activity.description}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex justify-center text-center items-center">
                                        <form
                                            action={async () => {
                                                'use server';
                                                await deleteActivity(activity.id);
                                            }}
                                        >
                                            <Button type="submit">Concluir</Button>
                                        </form>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
            </div>
        </main>
    );

}