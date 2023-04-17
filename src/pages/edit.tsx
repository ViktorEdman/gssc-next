import Layout from "@/components/Layout";
import ServerAdder from "@/components/ServerAdder";
import { useSession,  } from "next-auth/react";
import {useState} from "react"

import prisma from "@/lib/prisma";

function Edit({ data }) {
    const {data: session}= useSession()
    const [servers, setServers] =  useState(data)

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
                        <table className="w-full text-sm text-left text-slate-300">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Game</th>
                        <th scope="col">Host</th>
                        <th scope="col"> Port</th>
                       {//@ts-ignore
                       session?.user?.role === "admin"? <th scope="col"> Actions</th>: "" }
                    </tr>
                </thead>
                <tbody >
                    {servers.map(({ id, name, game, host, port }) => (
                        <tr key={id} className="h-5">
                            <td>{name}</td>
                            <td>{game}</td>
                            <td>{host}</td>
                            <td>{port}</td>
                            { //@ts-ignore
                            session?.user?.role === "admin"? 
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
        {//@ts-ignore
        session?.user?.role === "admin" ? <ServerAdder setServers={setServers}/> : ""}
        </Layout>
    </>);
}


export async function getStaticProps() {
    const data = await prisma.gameservers.findMany()
    return {
        props: {
            data
        },
        revalidate: 30
    }
}

export default Edit;