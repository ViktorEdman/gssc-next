function ServerInfo({server, handleShowMore}) {
    const {name, map, password} = server
        
    
    return (
        server.error
          ? <li >
            <span className='red dot mr-2' />
            <span className="text-stone-100/50">
              {server.game} is DOWN
            </span>
          </li>
          : <li className="bg-black/40 max-w-md my-4 py-2 px-2 rounded-2xl font">
            <span className='green dot mr-2' />
            <span className=' text-stone-100	'>
              {server.game} is UP with {server.players.length}/{server.maxplayers} players
            </span>
            <button 
            onClick={() => handleShowMore(server.game)}
            className="rounded bg-blue-500 mx-5 px-4 py-2">
              {server.showMore ? "Show less" : "Show more"}
            </button>

            {
              server.showMore
                ? <ul className="text-white/80 ml-8">
                    
                    <li>Server name: {name}</li>
                    <li>Map: {map}</li>
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