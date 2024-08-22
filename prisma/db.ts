import {PrismaClient} from "@prisma/client";
const globalForPrisma = globalThis as unknown as {prismaClient: PrismaClient};

const db = globalForPrisma || new PrismaClient();
if(process.env.NODE_ENV !== "production") {
    globalForPrisma.prismaClient = db
}

export default db