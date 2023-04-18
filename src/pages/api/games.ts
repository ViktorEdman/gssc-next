import prisma from "db"
import NextCors from "nextjs-cors";
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]'
import { cache } from "./index";



export default async function handler(req, res) {
    
    const session = await getServerSession(req, res, authOptions)
    
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
     if (req.method === "DELETE") {
        const {id} = JSON.parse(req.body)
        if (!session){
            res.status(401).json({error: "Unauthenticated"})
            return
           }
       if (session.user.role !== "admin") {
           res.status(403).json({error: "Unauthorized"})
           return
       }
       try {
            const dbRes = await prisma.gameservers.delete({
                where: {
                    id: id
                }
            })
            cache.delete("statuses")
            res.status(204).end()
            return
       } catch (error) {
            res.status(400).json({response: "Could not delete server"})
            return
       }
     }
     if (req.method === "POST") {
        const {name, game, host, port} = JSON.parse(req.body)
        if (!session){
             res.status(401).json({error: "Unauthenticated"})
             return
            }
        if (session.user.role !== "admin") {
            res.status(403).json({error: "Unauthorized"})
            return
        }
        
        console.log(req.body)
        try {
            const dbRes = await prisma.gameservers.create({
                data: {
                        name: name,
                        game: game,
                        host: host,
                        port: Number(port)
                    }
                })
                cache.delete("statuses")
                res.status(201).json({response: "created", result: dbRes})
                return
            
        } catch (error) {
            console.log(error)
            res.status(400).json({response: "Could not create game server", error: error})
            return
        }
        
    }
    const dbData = await prisma.gameservers.findMany()
    res.status(200).json(dbData)
    return
}