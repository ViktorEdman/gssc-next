import GamePicker from "@/components/GamePicker";
import { sendEtagResponse } from "next/dist/server/send-payload";
import {useState} from "react"

function ServerAdder() {
    const [game, setGame] = useState(null)
    const [formData, setFormData] = useState({})
    const [response, setResponse] = useState("")
    return ( 
        <div className="bg-slate-500 rounded-xl my-8 w-full p-5">
        <h2 className="text-white">Add new server </h2>
        <form 
        onSubmit={async (event) => {
            event.preventDefault()
            const elements = event.target.elements
            setFormData({
                name: elements.name.value,
                game,                
                host: elements.host.value,
                port: elements.port.value
            })
            const res = await fetch("/api/games", {method: "POST"})
            setResponse(res)
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
                <input type="text" placeholder="Port" id="port" className="w-full py-2 px-3 leading-2 h-full" />
            </div>
            <button className="bg-blue-500 col-span-2 mx-auto w-16 text-xl rounded-2xl text-white">Test</button>
        </form>
        <div>
            Output: {JSON.stringify(response)}
        </div>
    </div>
    )}

export default ServerAdder;