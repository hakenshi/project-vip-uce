'use server'

import {cookies} from "next/headers";
import db from "../../prisma/db";
import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";
import {Simulate} from "react-dom/test-utils";
import {storeFile} from "@/lib/images";
import {ActivitySchema} from "@/lib/validation";

export async function deleteActivity(id: number) {
    if (cookies().get('token')) {
        try {
            await db.activities.delete({where: {id}});
            revalidatePath('/turmas')
            return {
                messase: "Atividade excluída com sucesso.",
                status: 204
            }
        } catch (e: any) {
            console.log(e)
            return {
                message: e.message,
            }
        }
    }
}

export async function storeActivity(form: FormData) {
    const novaAtividade = {
        title: form.get("title") as string,
        description: form.get('description') as string,
        file: form.get('file'),
    }
    const file = form.get('file') as File

    let activityFile

    if (file.size > 0) {
        activityFile = await storeFile(form)
    }

    const result = ActivitySchema.safeParse(novaAtividade)

    if (!result.success) {
        const messages = result.error.errors.map((err) => err.message).join('\n')
        return {
            error: messages,
            stauts: 401,
        }
    }

    try {
        const atvidade = await db.activities.create({
            data: {
                title: novaAtividade.title,
                description: novaAtividade.description,
                file: activityFile,
            }
        })

        await db.classesActivities.create({
            data: {
                classId: parseInt(form.get('classId') as string),
                activitiesId: atvidade.id
            }
        })

        revalidatePath('/turmas')
        return {
            message: "Atividade postada com sucesso",
            status: 201,
        }

    } catch (e: any) {
        console.log(e.message)
    }
}

export async function updateActivity(form: FormData, id: number | undefined) {
    const novaAtividade = {
        title: form.get("title") as string,
        description: form.get('description') as string,
        file: form.get('file'),
    }
    const file = form.get('file') as File

    const atividadeFile = await db.activities.findFirstOrThrow({where: {id}, select: {file: true}});

    let activityFile

    if (file.size > 0) {
        activityFile = await storeFile(form)
    }

    const result = ActivitySchema.safeParse(novaAtividade)

    if (!result.success) {
        const messages = result.error.errors.map((err) => err.message).join('\n')
        return {
            error: messages,
            stauts: 401,
        }
    }

    try {
         await db.activities.update({
            where: {id},
            data: {
                title: novaAtividade.title,
                description: novaAtividade.description,
                file: activityFile ? activityFile : atividadeFile,
            }
        })

        revalidatePath('/turmas')
        return {
            message: "Atividade atualizada com sucesso",
            status: 201,
        }

    } catch (e: any) {
        console.log(e.message)
    }
}

