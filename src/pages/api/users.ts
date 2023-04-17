import {  createUser, deleteUser, getUsers } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method === "POST") {
        postHandler(req, res)
        return
    }

    if (req.method === "DELETE") {
        deleteHandler(req, res)
        return
    }
     
    const users = await getUsers()
    res.status(200).json({ success: true, data: users });
}

async function postHandler(req, res) {
    let {username, password} = req.body
    try {
        const dbResponse = await createUser(username, password, "user")
        res.status(201).json(dbResponse)
        return;
    } catch (error) {
        res.status(400).send("Could not create user "+username)
        return;
    }
}

async function deleteHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session || session.role !== "admin") {
        res.status(403).json({success: false, message: "Unauthorized"})
        return;
    }
    let {username, password} = req.body
    try {
        const dbResponse = await deleteUser(username)
        res.status(200).json(dbResponse)
        return;
    } catch (error) {
        res.status(400).send("Could not delete user "+username)
        return;
    }
}