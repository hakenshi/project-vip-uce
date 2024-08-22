import db from "./db";
import {saltAndEncrypt} from "@/app/bcrypt";

async function seed() {

    const {prismaClient} = db

    const adminUserType = await prismaClient.userType.upsert({
        where: { name: 'Admin' },
        update: {},
        create: {
            name: 'Admin',
        },
    });

    const regularUserType = await prismaClient.userType.upsert({
        where: { name: 'User' },
        update: {},
        create: {
            name: 'User',
        },
    });

    const adminPassword = await saltAndEncrypt("admin");

    const adminUser = await prismaClient.users.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: adminPassword,
            userTypeId: adminUserType.id,
            classId: classA.id,
        },
    });
}