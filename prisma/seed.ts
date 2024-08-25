import db from "./db";
import {saltAndEncrypt} from "../src/bcrypt";
import {Users} from "@prisma/client";

async function seed() {

    const adminUserType = db.userType.create({
        data:{
            name: "Admin",
        }
    })

    const regularUserType = await db.userType.create({
        data: {
            name: 'User',
        },
    });

    const levels = await db.levels.createMany({
        data: [
            {
                level: "Nível 1",
            },
            {
                level: "Nível 2",
            },
            {
                level: "Nível 3",
            },
            {
                level: "Nível 4",
            },
            {
                level: "Nível 5",
            },
            {
                level: "Nível 6",
            },
            {
                level: "Nível 7",
            },
            {
                level: "Nível 8",
            },
            {
                level: "Nível 9",
            },
            {
                level: "Nível 10",
            }
        ]
    })

    const classes = await db.classes.createMany({
        data: [
            {
                levelId: 1,
            }
        ]
    })

    const adminPassword = await saltAndEncrypt("admin") as string;

    const adminUser: Users = await db.users.create({
        data: {
            email: 'admin@admin.com',
            name: 'Admin',
            password: adminPassword,
            userTypeId: 1,
            classId: 1,
        },
    });
}

seed()