"use client"

import { Activities } from "@prisma/client"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "./ui/card"
import { Button } from "./ui/button"

export default function({atividades}:{atividades:Activities[]}){

    return(
        <>
            
            {atividades.map((atividade: Activities) => 
                <div className="m-3 h-32">
                    <Card className="flex">
                        <CardHeader className="flex justify-center w-full">
                        <CardTitle>{atividade.title}</CardTitle>
                        <CardDescription>{atividade.description}</CardDescription>
                        </CardHeader>
                        {/* <CardContent>
                        <p>{atividade.file}</p>
                        </CardContent> Fazer a file */} 
                        <CardFooter className="flex justify-center text-center items-center">
                        <Button>Concluir</Button>
                        </CardFooter>
                    </Card>
                </div>
          
            )}
        
        </>

    )

}