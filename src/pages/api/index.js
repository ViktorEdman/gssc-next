import gamedig from "gamedig"
import NextCors from "nextjs-cors"

export const servers = [
    {
        prettyName: "7 Days to Die",
        type: "7d2d",
        host: "edman.se",
        port: 26900

    },
    {
        prettyName: "Rust",
        type: "rust",
        host: "edman.se",
        port: 28000

    },
    {
        prettyName: "Minecraft",
        type: "minecraft",
        host: "edman.se",
        port: 25565

    },
    {
        prettyName: "Minecraft BE",
        type: "minecraftbe",
        host: "edman.se",
        port: 19666

    },
    {
        prettyName: "Valheim",
        type: "valheim",
        host: "edman.se",
        port: 2456

    }
]
let pollingStatus = false

let serverData = await retrieveServerData(servers)
setInterval(async () => {
    if (pollingStatus === true) {
        // console.log("Polling loop is running, retrieving data at", Date())
        const response = await retrieveServerData(servers)
        serverData = response

    }
    pollingStatus = false
}, 30000)

export async function retrieveServerData(servers) {
    const requests = servers.map(async server => {
        try {
            const response = await gamedig.query(server)
            response.game = server.prettyName
            return response
        } catch (error) {
            return ({
                game: server.prettyName,
                error: "Upstream server is not responding",
                rawError: JSON.stringify(error)
            })
        }

    })
    const responses = await Promise.allSettled(requests)
    return responses.map(response => response.value)
}

export function getServerSideData() {
    pollingStatus = true
    return serverData;
}

export function getConfiguredServers() {
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
