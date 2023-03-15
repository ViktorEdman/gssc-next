import ServerInfo from '@/components/ServerInfo'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { getServerSideData } from './api'


const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }) {

  data.sort((a, b) => {
    if (a.error !== undefined && b.error === undefined) return 1
    if (a.error === undefined && b.error !== undefined) return -1
    return 0
  })
  const uiData = data.map(server => {
    return { ...server, showMore: false }
  })

  const [serversData, setServersData] = useState(uiData)
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
        <ul className="w-max max-w-80">
          {serversData.map((server) => (
            <ServerInfo server={server} key={server.game} handleShowMore={handleShowMore}/>
          ))}
        </ul>
        </Layout>
    </>
  )


}

export async function getStaticProps() {
  const serverData = getServerSideData()
  const data = JSON.parse(JSON.stringify(serverData))
  return {
     props: {
       data 
      },
      revalidate: 30
    }
}
