import { getServerSession } from "next-auth/next" 
import { authOptions } from './auth/[...nextauth]' 
import { getToken } from "next-auth/jwt"
const secret = process.env.NEXTAUTH_SECRET


export default async function handler(req, res) { 
    const session = await getToken({req, secret})
    res.status(200).json({response: "this is allowed", session})
}
