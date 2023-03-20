import ServerInfo from '@/components/ServerInfo'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { getServerSideData } from './api'
import LoadingSpinner from '@/components/LoadingSpinner'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data, date }) {


  //Sort servers into online first, offline second
  data.sort((a, b) => {
    if (a.error !== undefined && b.error === undefined) return 1
    if (a.error === undefined && b.error !== undefined) return -1
    return 0
  })

  // initiate serverdata with static props
  const [serversData, setServersData] = useState(data)
  // Set showMore array to same size as number of servers
  const [showMore, setShowMore] = useState(new Array(data.length).fill(false))
  // Timestam latest update from server
  const [lastUpdate, setLastUpdate] = useState(new Date(date))
  // Set whether to show raw data
  const [displayRawData, setDisplayRawData] = useState(false)
  // animate loading new server data
  const [loading, setLoading] = useState(false)

  const handleShowMore = (server) => {
    const serverIndex = serversData.map(s => s.game).indexOf(server)
    console.log(serverIndex)
    let newShowMore = [...showMore]
    newShowMore[serverIndex] = !showMore[serverIndex]
    setShowMore(newShowMore)
  }

  const updateData = () => {
    setLoading(true)
    fetch('/api')
    .then((res) => res.json())
    .then((data) => {
      data.sort((a, b) => {
        if (a.error !== undefined && b.error === undefined) return 1
        if (a.error === undefined && b.error !== undefined) return -1
        return 0
      })
      setServersData(data)
      setLastUpdate(new Date(Date.now()))
      setLoading(false)
    })

  }

  useEffect(() => {
    const interval = setInterval(() => updateData(), 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Layout>
        <ul className={`w-full w-80 z-100 ${loading ? "animate-pulse" : null}`}>
          {serversData.map((server, index) => (
            <ServerInfo server={server} key={server.game} handleShowMore={handleShowMore} showMore={showMore[index]}/>
          ))}
        </ul>
        <div className='text-stone-100'>Last update was at {
        lastUpdate.toLocaleTimeString('sv-se', {timeZone: "CET"})
        }</div>
        {
        loading?
        <div className='text-stone-100'>Loading data... <LoadingSpinner/></div>
        :null
        }
        
        <button 
        onClick={() => setDisplayRawData(!displayRawData)}
        className="bg-blue-500 rounded px-2 py-2 my-5 text-white dark:bg-blue-800"
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
    revalidate: 60
  }
}
