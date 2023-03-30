import { useState } from "react";

function ServerInfo({server}) {
    const {name, map, password} = server
    const [showMore, setShowMore] = useState(false)
        
    
    return (
        server.error
          ? <li className="px-2">
            <span className='red dot mr-2' />
            <span className="text-stone-100/50">
              {server.game} is DOWN
            </span>
          </li>
          : <li className="bg-black/40 max-w-md my-2 py-2 px-2 rounded-2xl cursor-pointer"
          
          onClick={(e) =>  {
            e.preventDefault()
            setShowMore(!showMore)
          }}>
            <span className='green dot mr-2' />
            <span className=' text-stone-100	'>
              {server.game} is UP with {server.players.length}/{server.maxplayers} players
              <span
              className="float-right">{showMore ? "-" : "+"}</span>
            </span>
{/*             <button 
            onClick={() => handleShowMore(server.game)}
            className="rounded bg-blue-500  dark:bg-blue-800 my-3 mx-5 px-4 py-2 text-white">
              {showMore ? "Show less" : "Show more"}
            </button> */}

            {
              showMore
                ? <ul className="text-white/80 ml-8">
                    
                    <li>Server name: {name}</li>
                    {map.length > 0?<li>Map: {map}</li> : null}
                    <li>Password protected: {password? "yes" : "no"}</li>
                    {server.raw.version
                    ? <li>Server version: {server.raw.version}</li>
                    : null}
                    {server.raw.appId
                    ? <li><a 
                    href={`https://store.steampowered.com/app/${server.raw.appId}`}
                    className="hover:underline text-blue-500 visited:text-purple-800"
                    target="_blank"
                    >Buy on steam!</a></li>
                    :null}
                </ul>
                : ""
            }

          </li>
      );
}

export default ServerInfo;