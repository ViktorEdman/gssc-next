import Layout from "@/components/Layout";
import ServerAdder from "@/components/ServerAdder";
import { useSession,  } from "next-auth/react";

import { getConfiguredServers } from "./api";
import prisma from "@/lib/prisma";

function Edit({ data, dbData }) {
    const {data: session}= useSession()
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
            </table>
        {session?.user.role === "admin" ? <ServerAdder/> : ""}
        {session? <pre>{JSON.stringify(session, null, 2)} </pre> : ""}
        </Layout>
    </>);
}

export async function getStaticProps() {
    const data = getConfiguredServers()
    const dbData = await prisma.gameservers.findMany()
    return {
        props: {
            data,
            dbData
        },
        revalidate: 30
    }
}

export default Edit;