import prisma from "@/lib/prisma";
import gamedig from "gamedig"
import NextCors from "nextjs-cors"


export async function retrieveServerData() {
    const servers = await prisma.gameservers.findMany()
    const requests = servers.map(async server => {
        const {game: type, host, port} = server
        try {
            const response = await gamedig.query({
                type,
                host,
                port
            })
            response.game = server.name
            return response
        } catch (error) {
            return ({
                game: server.name,
                error: "Upstream server is not responding",
                rawError: JSON.stringify(error)
            })
        }

    })
    const responses = await Promise.allSettled(requests)
    return responses.map(response => {
        if (response.status === "fulfilled") return response.value
    })
}



export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
     const response = await retrieveServerData()
    res.status(200).json(response)
}