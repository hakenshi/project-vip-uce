import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import db from "../../prisma/db";
import {saltAndEncrypt} from "@/app/bcrypt";
export const { handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Credentials({
            credentials:{
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                let user = null
                const password = await saltAndEncrypt(credentials.password);
                user = await db.prismaClient.users.findUnique({where: {email: credentials.email, password: password}});
                if(!user){
                    throw new Error("User not found");
                }
                return user;
            }
        }),
    ]
})