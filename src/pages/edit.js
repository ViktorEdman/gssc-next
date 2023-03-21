import Layout from "@/components/Layout";
import { getConfiguredServers } from "./api";
import { useSession } from "next-auth/react";

function Edit({ data }) {
    const {data: session} = useSession()
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
                    <tr key={host+":"+port}>
                        <td>{prettyName}</td>
                        <td>{type}</td>
                        <td>{host}</td>
                        <td>{port}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>User data:</div>
            <pre>{JSON.stringify(session)}</pre>
        </Layout>
    </>);
}

export async function getStaticProps() {
    const data = getConfiguredServers()
    return {
        props: {
            data
        },
        revalidate: 30
    }
}

export default Edit;