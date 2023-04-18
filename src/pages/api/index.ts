import prisma from "@/lib/prisma";
import gamedig from "gamedig"
import NextCors from "nextjs-cors"
import  TTLCache from "@isaacs/ttlcache"

export const cache = new TTLCache({max: 1, ttl: 30000})


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
    if (cache.has("statuses")) {
        const response = JSON.parse(cache.get("statuses"))
        res.status(200).json(response)
        return;
    }
    const response = await retrieveServerData()
    cache.set("statuses", JSON.stringify(response))
    res.status(200).json(response)
    return;
}