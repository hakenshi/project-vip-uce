import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {nextSecret} from "@/lib/utils";
import {Users} from "@prisma/client";

export const auth = () => {
    const token = cookies().get('token')?.value as string;
        return jwt.verify(token, nextSecret) as Users;
}