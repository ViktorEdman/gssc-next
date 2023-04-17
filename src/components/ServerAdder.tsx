import GamePicker from "@/components/GamePicker";
import {useState} from "react"

type serverForm = HTMLFormControlsCollection & {
    name: HTMLInputElement,
    host: HTMLInputElement,
    port: HTMLInputElement
}

function ServerAdder({setServers}) {
    const [game, setGame] = useState(null)
    const [error, setError] = useState("")
    return ( <>
        <div className="bg-slate-500 rounded-xl my-8 w-full p-5">
        <h2 className="text-white">Add new server </h2>
        <form 
        onSubmit={async (event) => {
            event.preventDefault()
            if (!(event.target instanceof HTMLFormElement)) return
            const {name, host, port} = event.target.elements as serverForm
            const formData = {
                name: name.value,
                game,                
                host: host.value,
                port: port.value
            }
            const res = await fetch("/api/games", {method: "POST", body: JSON.stringify(formData)})
            if (!res.ok) {
                setError("Could not create server")
            } else {
                setError("")
            }

            const serverRes = await fetch("/api/games")
            const serverData = await serverRes.json()
            setServers(serverData);
        }}
        className="grid grid-cols-2 gap-1 text-xs text-black w-full justify-left">
            <div className="flex-none">
                <input type="text" placeholder="Name" id="name" className="w-full px-3 h-full" />
            </div>
            <GamePicker setGame={setGame}/>
            <div className="flex-none  ">
                <input type="text" placeholder="Hostname" id="host" className="w-full py-2 px-3 leading-2 h-full" />
            </div>
            <div >
                <input type="number" min="0" max="65535" placeholder="Port" id="port" className="w-full py-2 px-3 leading-2 h-full" />
            </div>
            <button className="bg-blue-500 col-span-2 mx-auto w-16 text-xl rounded-2xl text-white">Send</button>
        </form>
        {error ? <div>{error}</div> : ""}
    </div>
    
    </>
    )}

export default ServerAdder;