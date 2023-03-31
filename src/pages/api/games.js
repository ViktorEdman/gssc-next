import prisma from "db"
import NextCors from "nextjs-cors";
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req, res) {
    const dbData = await prisma.gameservers.findMany()
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
     if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions)
        if (!session){
             res.status(401).json({response: "forbidden, come back when you sign in"})
             return
            }
        if (session) {
            console.log(session)
            res.status(201).json({response: "created"})
            return
        }
        const {name, game, host, port} = req.body
        try {
            const dbRes = await prisma.gameservers.create({
                data: {
                        name,
                        game,
                        host,
                        port
                    }
                })
                res.status(201).json(dbRes)
            return
            
        } catch (error) {
            res.status(400).send("Could not create game server")
        }
        
    }
    res.status(200).json(dbData)
}