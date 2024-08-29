import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request:NextRequest) {
    const token = request.get('Authorization')?.replace('Bearer ', '');

    if(!token){
        return NextResponse.json({message: 'No token provided'}, {status: 401});
    }

    try {
        jwt.verify(token, process.env.NEXT_AUTH_SECRET)
    }
    catch (error){
        return NextResponse.json({message: error.message, status: 401});
    }

    return NextResponse.next();
}