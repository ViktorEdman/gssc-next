import ServerInfo from '@/components/ServerInfo'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { getServerSideData } from './api'


const inter = Inter({ subsets: ['latin'] })

export default function Home({ data, date }) {

  data.sort((a, b) => {
    if (a.error !== undefined && b.error === undefined) return 1
    if (a.error === undefined && b.error !== undefined) return -1
    return 0
  })

  const [serversData, setServersData] = useState(data
    .map(server => ({ ...server, showMore: false })))
  
  const [lastUpdate, setLastUpdate] = useState(new Date(date))
  const [displayRawData, setDisplayRawData] = useState(false)

  const handleShowMore = (game) => {
    const updatedServers = serversData.map((server) =>
      server.game === game
        ? { ...server, showMore: !server.showMore }
        : server
    )
    setServersData(updatedServers)
  }

  return (
    <>
      <Layout>
        <ul className="w-full z-100">
          {serversData.map((server) => (
            <ServerInfo server={server} key={server.game} handleShowMore={handleShowMore} />
          ))}
        </ul>
        <div>Last update was at {
        lastUpdate.toLocaleTimeString('sv-se', {timeZone: "CET"})
        }</div>
        <button 
        onClick={() => setDisplayRawData(!displayRawData)}
        className="bg-blue-500 rounded px-2 py-2 my-5"
        >
          {displayRawData
          ? "Hide raw data"
          : "Show raw data"}
        </button>
        {displayRawData
          ? 
          <div className=' bg-black/40 rounded-xl py-2 px-2 text-stone-100'>
          <code className='whitespace-pre-wrap max-w-lg break-words'>
            {JSON.stringify(serversData, null, '\t')}
          </code>
          </div>

          : null}
      </Layout>
    </>
  )


}

export async function getStaticProps() {
  console.log('Generating static props at ', Date())
  const serverData = getServerSideData()
  const data = JSON.parse(JSON.stringify(serverData))
  const date = Date.now()
  return {
    props: {
      data,
      date
    },
    revalidate: 30
  }
}
