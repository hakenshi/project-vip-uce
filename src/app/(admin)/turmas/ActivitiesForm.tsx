'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React, {FormEvent} from "react";
import {toast} from "@/hooks/use-toast";
import {ActivitySchema} from "@/lib/validation";

export default function ActivitiesForm() {

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget);
        const novaAtividade = {
            title: form.get("title"),
            description: form.get('description'),
            file: form.get('file'),
        }


        const result = ActivitySchema.safeParse(novaAtividade);

        if (!result.success){

            const messages = result.error.errors.map(e => e.message).join('\n')
            toast({
                variant: "destructive",
                description: messages
            })
            return
        }

        const response = await fetch(process.env.NEXT_PUBLIC_API+"atividades", {
            method: "POST",
            body: form
        })

        if (!response.ok){
            return
        }

        const data = await response.json();

        console.log(data)

        if (data?.error){
            toast({
                variant: "destructive",
                description: data.error
            })
        }
        if (data?.message && data?.status === 201){
            toast({
                variant: "default",
                description: data.message,
            })
        }

    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-5"}>
            <div>
                <Label>Insira um título para a atividade</Label>
                <Input name={"title"}/>
            </div>
            <div>
                <Label>Insira uma descrição para a atividade</Label>
                <Textarea name={"description"} style={{resize: "none"}}/>
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