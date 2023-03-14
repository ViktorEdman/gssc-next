import Head from 'next/head'
import { Inter } from 'next/font/google'

import { getServerSideData } from "./api/index.js"


const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }) {

  data.sort((a, b) => {
    if (a.error !== undefined && b.error === undefined) return 1
    if (a.error === undefined && b.error !== undefined) return -1
    return 0
  })

  return (
    <>
      <Head>
        <title>GSSC dashboard</title>
        <meta name="description" content="Monitor and edit game servers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <main className="container mx-auto text-xl">
        <h1 className="mb-4
         text-2xl 
         font-extrabold 
         leading-none
          tracking-tight
           text-gray-900
            md:text-5xl
             lg:text-6xl
              dark:text-white"
        >
          Server Dashboard
        </h1>
        <ul>
          {data.map((server) => (
            server.error
              ? <li key={server.game} >
                <span className='red dot mr-2' />
                <span className="text-stone-100/50">
                  {server.game} is DOWN
                </span>
              </li>
              : <li key={server.game}>
                <span className='green dot mr-2' />
                <span className=' text-stone-100	'>
                  {server.game} is UP with {server.players.length}/{server.maxplayers} players
                </span>
              </li>
          ))}
        </ul>
      </main>
    </>
  )


}

export async function getServerSideProps({ res, req }) {
  // Fetch data from external API
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  // Pass data to the page via props
  const serverData = getServerSideData()
  const data = JSON.parse(JSON.stringify(serverData))
  return { props: { data } }
}
