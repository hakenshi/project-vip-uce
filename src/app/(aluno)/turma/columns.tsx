'use client'

import {ColumnDef} from "@tanstack/table-core";
import {Users} from "@prisma/client";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: 'image',
        header: 'Foto',
        cell: ({row}) => {
            const {image, name} = row.original
            return <div className={"w-full flex justify-center"}>
                <Avatar>
                    <AvatarImage className={"object-cover"} src={`${image}`}/>
                    <AvatarFallback>
                        {name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
        }
    },
    {
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
]