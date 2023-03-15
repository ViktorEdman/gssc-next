function ServerInfo({server, handleShowMore}) {
    return (
        server.error
          ? <li >
            <span className='red dot mr-2' />
            <span className="text-stone-100/50">
              {server.game} is DOWN
            </span>
          </li>
          : <li>
            <span className='green dot mr-2' />
            <span className=' text-stone-100	'>
              {server.game} is UP with {server.players.length}/{server.maxplayers} players
            </span>
            <button onClick={() => handleShowMore(server.game)}>
              {server.showMore ? "Show less" : "Show more"}
            </button>

            {
              server.showMore
                ? <ul>
                  {Object.keys(server).map((key) => {
                    if (typeof server[key] === "object") {
                      return null
                    }
                    return <li key={key}>{key}: {server[key]}</li>
                  })}
                </ul>
                : ""
            }

          </li>
      );
}

export default ServerInfo;