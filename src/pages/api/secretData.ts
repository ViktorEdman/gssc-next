import { getServerSession } from "next-auth/next" 
import { authOptions } from './auth/[...nextauth]' 


export default async function handler(req, res) { 
    const session = await getServerSession(req, res, authOptions)
    if (!session) res.status(403).json({error: "Unauthorized", session})
    if (session?.user) res.status(200).json({response: "this is allowed", session})
}
