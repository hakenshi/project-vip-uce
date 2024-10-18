'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React, {FormEvent} from "react";
import {toast} from "@/hooks/use-toast";
import {ActivitySchema} from "@/lib/validation";
import {storeActivity, updateActivity} from "@/actions/activies";
import {Activities} from "@prisma/client";

export default function ActivitiesForm({classId, activity}: { classId?: number; activity?:Activities }) {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget);
        form.append('classId', `${classId}`)
        const novaAtividade = {
            title: form.get("title"),
            description: form.get('description'),
            file: form.get('file'),
        }


        const result = ActivitySchema.safeParse(novaAtividade);

        if (!result.success) {
            const messages = result.error.errors.map(e => e.message).join('\n')
            toast({
                variant: "destructive",
                description: messages
            })
            return
        }

        const response = activity ? await updateActivity(form, activity.id) : await storeActivity(form);

        if (response?.error) {
            toast({
                variant: "destructive",
                description: response.error
            })
        }
        if (response?.message && response?.status === 201) {
            toast({
                variant: "default",
                description: response.message,
            })
        }

    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-5"}>
            <div>
                <Label>Insira um título para a atividade</Label>
                <Input defaultValue={activity?.title ?? ""} name={"title"}/>
            </div>
            <div>
                <Label>Insira uma descrição para a atividade</Label>
                <Textarea defaultValue={activity?.description} name={"description"} style={{resize: "none"}}/>
            </div>
            <div>
                <Label>Anexe um arquivo para a atividade (Não é obrigatório)</Label>
                <Input name={"file"} type="file"/>
            </div>

            <div className={"flex w-full justify-end"}>
                <Button type="submit"> Postar Atividade</Button>
            </div>
        </form>
    )
}