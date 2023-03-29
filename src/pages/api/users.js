import { getUserByName } from "@/lib/prisma";

export default async function handler(req, res) {
    const users = await getUserByName("admin")
    res.status(200).json({ success: true, data: users });
}