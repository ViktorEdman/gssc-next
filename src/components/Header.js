import Head from "next/head";

function Header() {
    return (<Head>
        <title>GSSC dashboard</title>
        <meta name="description" content="Monitor and edit game servers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
    </Head>);
}

export default Head;