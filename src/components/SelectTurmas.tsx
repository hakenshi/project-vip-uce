import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect, useState} from "react";
import db from "../../prisma/db";
import {Classes} from "@prisma/client";

export default function selectTurmas(){

    const [turmas, setTurmas] = useState<Classes[]>([]);

    useEffect(() => {
        const fetchTurmas = async () => {
           const response = await fetch('http://localhost:3000/api/turmas',{
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

   return(
       <Select name={"turma"}>
            <SelectTrigger>
                <SelectValue placeholder='Selecione Uma Turma' />
            </SelectTrigger>
            <SelectContent>
                {turmas.map((turma) => (
                    <SelectItem key={turma.id} value={`${turma.id}`}>Nível {turma.levelId} </SelectItem>
                ))}
            </SelectContent>
       </Select>
   )
}