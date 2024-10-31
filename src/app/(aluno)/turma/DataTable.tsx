'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {flexRender, useReactTable} from "@tanstack/react-table";
import React from "react";
import {
    Column,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel
} from "@tanstack/table-core";

interface DataTableProps<TData, TValue> {
    columns: Column<TData, TValue>[];
    data: TData[];
    classId?: number;
    isActivity?: boolean;
}

export default function DataTable<TData, TValue> ({columns, data}: DataTableProps<TData, TValue>){

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return(
        <Table className={"table-fixed"} >
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className={"text-center hover:bg-transparent"}>
                        {headerGroup.headers.map((header) => {
                            return (
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
    )
}