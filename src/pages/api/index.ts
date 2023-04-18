import prisma from "@/lib/prisma";
import gamedig from "gamedig"
import NextCors from "nextjs-cors"




let pollingStatus = false

let serverData = [
    {
        game: "N/A",
        error: "No server data retrieved yet."
    }
];

(async () => {
    serverData = await retrieveServerData()
})()

setInterval(async () => {
    if (pollingStatus === true) {
        const response = await retrieveServerData()
        serverData = response

    }
    pollingStatus = false
}, 30000)

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

export function getServerSideData() {
    pollingStatus = true
    return serverData;
}

export async function getConfiguredServers() {
    const servers = await prisma.gameservers.findMany()
    return servers;
}

export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    res.status(200).json(getServerSideData())
}
