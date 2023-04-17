import ServerInfo from "./ServerInfo";

function ServerList({serversData, loading}) {
  return (<>
    <ul className={`w-full z-100 ${loading ? "animate-pulse" : null}`}>
      {serversData.map((server) => (
        <ServerInfo server={server} key={server.game} />
      ))}
    </ul>
  </>);
}

export default ServerList;