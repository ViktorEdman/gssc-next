import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) res.status(401).json({response: "forbidden, come back when you sign in"})
    if (session) res.status(200).json({response: "this is allowed"})
}