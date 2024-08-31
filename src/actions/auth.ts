import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {nextSecret} from "@/lib/utils";

export const auth = () => {
    const token = cookies().get('token');

    if (token) {
        try {
            return jwt.verify(token.value, nextSecret);
        }
        catch (error) {
            console.error(error);
            return null
        }
    }
}