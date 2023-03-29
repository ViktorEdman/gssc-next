import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma; 

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}
export default prisma;

export const getUserByName = async (username) => {
    const res = await prisma.users.findUnique({
        where: {
            name: username
        }
    })
    return res;
}

export const createUser = async (username, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const res = await prisma.users.create({data: {name: username, password: hashedPassword, role: role}})
    return res
}

export const deleteUser = async (username) => {
    const res = await prisma.users.delete({
        where: {
            name: username
        }
    }) 
    return res
}

export const getUsers = async () => {
    const res = await prisma.users.findMany()
    return res
}