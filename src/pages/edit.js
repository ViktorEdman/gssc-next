import Layout from "@/components/Layout";
import ServerAdder from "@/components/ServerAdder";
import { useSession,  } from "next-auth/react";
import {useState} from "react"

/* import { getConfiguredServers } from "./api"; */
import prisma from "@/lib/prisma";

function Edit({ data, dbData }) {
    const {data: session}= useSession()
    const [servers, setServers] =  useState(dbData)

    const updateData = async () => {
        const res = await fetch("/api/games")
        const json = await res.json()
        setServers(json)
    }

    const deleteServer = async (id) => {
        const res = await fetch("/api/games", {method: "DELETE", body: JSON.stringify({id: id})})
        await updateData()
    }
    return (<>
        <Layout>
            <h2 className="mb-4
                text-2xl 
                font-extrabold 
                leading-none
                tracking-tight
              text-gray-900
              dark:text-white"
            >Currently monitored servers</h2>

{/*             <table className="w-full text-sm text-left text-slate-300">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Hostname</th>
                        <th scope="col"> Port</th>
                    </tr>
                </thead>
                <tbody >
                    {data.map(({ prettyName, type, host, port }) => (
                        <tr key={host + ":" + port} className="h-5">
                            <td>{prettyName}</td>
                            <td>{type}</td>
                            <td>{host}</td>
                            <td>{port}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
                        <table className="w-full text-sm text-left text-slate-300">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Game</th>
                        <th scope="col">Host</th>
                        <th scope="col"> Port</th>
                       {session?.user?.role === "admin"? <th scope="col"> Actions</th>: "" }
                    </tr>
                </thead>
                <tbody >
                    {servers.map(({ id, name, game, host, port }) => (
                        <tr key={id} className="h-5">
                            <td>{name}</td>
                            <td>{game}</td>
                            <td>{host}</td>
                            <td>{port}</td>
                            {session?.user?.role === "admin"? 
                            <td> 
                                <button 
                                className="px-1"
                                onClick={() => deleteServer(id)}
                                >del</button>
                                <button className="px-1">edit</button>
                            </td>
                            : "" }
                        </tr>
                    ))}
                </tbody>
            </table>
        {session?.user?.role === "admin" ? <ServerAdder setServers={setServers}/> : ""}
        </Layout>
    </>);
}


export async function getStaticProps() {
/*     const data = getConfiguredServers() */
    const dbData = await prisma.gameservers.findMany()
    return {
        props: {
           /*  data, */
            dbData
        },
        revalidate: 30
    }
}

export default Edit;