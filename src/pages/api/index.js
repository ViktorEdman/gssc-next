import gamedig from "gamedig"
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
        console.log("Polling loop is running, retrieving data at", new Date().toISOString().slice(11, 19) + " UTC")
        const response = await retrieveServerData(servers)
        serverData = response

    }
    pollingStatus = false
}, 5000)

export async function retrieveServerData(servers) {
    const requests = servers.map(async server => {
        try {
            const response = await gamedig.query(server)
            response.game = server.prettyName
            return response
        } catch (error) {
            return ({
                game: server.prettyName,
                error: "Upstream server is not responding"
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

export default function handler(req, res) {
    pollingStatus = true
    res.status(200).json(serverData)
}

/* server.get('/api/:game', async (req, res) => {
    pollingStatus = true
    const { game } = req.params
    const gameStatus = serverData.find(server => server.game === game)
    if (gameStatus === undefined) {
        badGateway(res)
        return
    }
    res.send(gameStatus)

}) */
function badGateway(res) {
    res.send({ error: "Upstream server is not responding" })
}
