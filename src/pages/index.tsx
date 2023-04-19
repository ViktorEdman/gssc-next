import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { retrieveServerData } from "./api";
import LoadingSpinner from "@/components/LoadingSpinner";
import ServerList from "@/components/ServerList";

export default function Home({ data, date }) {
    //Sort servers into online first, offline second
    data.sort((a, b) => {
        if (a.error !== undefined && b.error === undefined) return 1;
        if (a.error === undefined && b.error !== undefined) return -1;
        return 0;
    });

    // initiate serverdata with static props
    const [serversData, setServersData] = useState(data);
    // Timestam latest update from server
    const [lastUpdate, setLastUpdate] = useState(new Date(date));
    // animate loading new server data
    const [loading, setLoading] = useState(false);

    const updateData = () => {
        setLoading(true);
        fetch("/api")
            .then((res) => res.json())
            .then((data) => {
                data.sort((a, b) => {
                    if (a.error !== undefined && b.error === undefined)
                        return 1;
                    if (a.error === undefined && b.error !== undefined)
                        return -1;
                    return 0;
                });
                setServersData(data);
                setLastUpdate(new Date(Date.now()));
                setLoading(false);
            });
    };

    useEffect(() => {
        updateData()
        const interval = setInterval(() => updateData(), 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Layout>
                <ServerList serversData={serversData} loading={loading} />
                <div className='text-stone-100'>
                    Last update was at{" "}
                    {lastUpdate.toLocaleTimeString("sv-se", {
                        timeZone: "CET",
                    })}
                </div>
                {loading ? (
                    <div className='text-stone-100'>
                        Loading data... <LoadingSpinner />
                    </div>
                ) : null}
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    const date = Date.now();
    const serverData = await retrieveServerData();
    const data = JSON.parse(JSON.stringify(serverData));
    return {
        props: {
            data,
            date,
        },
        revalidate: 30,
    };
}
