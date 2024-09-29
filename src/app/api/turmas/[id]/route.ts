import {NextRequest, NextResponse} from "next/server";
import db from "../../../../../prisma/db";

export async function PATCH(request: NextRequest, params: {params: {id: string}}) {

    const classId = parseInt(params.params.id);
    const {userId} = await request.json()

   try{
       const user = await db.users.update({
           where: {
               id: userId
           },
           data: {
               classId
           },
           include: {
               class: true,
           }
       })

       return NextResponse.json({
           message: `${user.name} foi movido para o nível ${user.class?.levelId}`
       })
   }
   catch (error){
       console.log(error)
       return
   }
}