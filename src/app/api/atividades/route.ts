import {storeFile} from "@/lib/images";
import {ActivitySchema} from "@/lib/validation";
import {NextRequest, NextResponse} from "next/server";
import db from "../../../../prisma/db";

export async function POST(request: NextRequest) {

    const form = await request.formData();

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
        return NextResponse.json({
            error: messages,
            stauts: 401,
        })
    }

    try {
        await db.activities.create({
            data: {
                title: novaAtividade.title,
                description: novaAtividade.description,
                file: activityFile,
            }
        })

        return NextResponse.json({
            message: "Atividade postada com sucesso",
            status: 201,
        })

    } catch (e: any) {
        console.log(e.message)
    }
}