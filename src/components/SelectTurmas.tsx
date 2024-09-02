import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect, useState} from "react";
import db from "../../prisma/db";
import {Classes} from "@prisma/client";

export default function selectTurmas(){

    const [turmas, setTurmas] = useState<Classes[]>([]);

    useEffect(() => {
        const fetchTurmas = async () => {
           const response = await fetch(`${process.env.NEXT_PUBLIC_API}turmas`,{
               method: "GET",
           });
           if (response.ok){
            const {classes} = await response.json();
            setTurmas(classes);
           }
        }
        if (turmas.length === 0){
            fetchTurmas()
        }
    }, [])

    console.log(turmas)

   return(
       <Select>
            <SelectTrigger>
                <SelectValue placeholder='Selecione Uma Turma' />
            </SelectTrigger>
            <SelectContent>
                {turmas.map((turma) => (
                    <SelectItem value={`${turma.levelId}`}>Turma {turma.levelId} </SelectItem>
                ))}
            </SelectContent>
       </Select>
   )
}