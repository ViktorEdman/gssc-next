import ServerInfo from '@/components/ServerInfo'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Header from '../components/Header'


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
    console.log(serversData.find((server) => server.game === game))
    const updatedServers = serversData.map((server) =>
      server.game === game
        ? { ...server, showMore: !server.showMore }
        : server
    )
    setServersData(updatedServers)
  }

  return (
    <>
      <Header/>
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
          {serversData.map((server) => (
            <ServerInfo server={server} key={server.game} handleShowMore={handleShowMore}/>
          ))}
        </ul>
      </main>
    </>
  )


}

export async function getStaticProps() {
  const serverData = await fetch("http://localhost:3000/api")
  const data = await serverData.json()
  return {
     props: {
       data 
      },
      revalidate: 30, 
    }
}
