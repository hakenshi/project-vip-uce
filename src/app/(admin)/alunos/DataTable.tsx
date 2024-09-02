'use client'

import {
    Column,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel
} from "@tanstack/table-core";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React from "react";
import {Input} from "@/components/ui/input";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import AvatarPreview from "@/components/AvatarPreview";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import CadastrarAluno from "@/components/CadastrarAluno";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

interface DataTableProps<TData, TValue> {
    columns: Column<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue> ({columns, data}: DataTableProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="container mx-auto py-2 border rounded overflow-x-auto">
            <div className="flex md:justify-evenly p-5 items-center">
                <div>
                    <Input
                        placeholder={"Insira um nome..."}
                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                        onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
                    />
                </div>
                <div>
                <CadastrarAluno />
                </div>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className={"text-center hover:bg-transparent"}>
                            {headerGroup.headers.map((header) => {
                                return(
                                    <TableHead className={"text-center"} key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className={"text-center hover:bg-transparent"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className={"text-center"}>
                            <TableCell colSpan={columns.length}>
                                Sem resultados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-end md:justify-center">
                <Button onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        variant={"ghost"}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <Button  onClick={() => table.nextPage()}
                         disabled={!table.getCanNextPage()}
                         variant={"ghost"}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
            </div>
        </div>
    )
}