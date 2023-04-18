import GamePicker from "@/components/GamePicker";
import { useState, useRef } from "react";

function ServerAdder({ setServers }) {
    const [game, setGame] = useState("");
    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [port, setPort] = useState("");

    const hostRef = useRef(null)

    const [error, setError] = useState("");
    return (
        <>
            <div className='bg-slate-500 rounded-xl my-8 w-full p-5'>
                <h2 className='text-white'>Add new server </h2>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        const formData = {
                            name,
                            game,
                            host,
                            port,
                        };
                        const res = await fetch("/api/games", {
                            method: "POST",
                            body: JSON.stringify(formData),
                        });
                        if (!res.ok) {
                            setError("Could not create server");
                        } else {
                            setError("");
                        }

                        const serverRes = await fetch("/api/games");
                        const serverData = await serverRes.json();
                        setName("");
                        setHost("");
                        setPort("");
                        setGame("");
                        setServers(serverData);
                    }}
                    className='grid grid-cols-2 gap-1 text-xs text-black w-full justify-left'
                >
                    <GamePicker
                        setGame={setGame}
                        setPort={setPort}
                        setName={setName}
                        hostRef={hostRef}
                    />
                    <div className='flex-none'>
                        <input
                            type='text'
                            placeholder='Name'
                            id='name'
                            className='w-full px-3 h-full'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex-none  '>
                        <input
                            type='text'
                            placeholder='Hostname'
                            id='host'
                            className='w-full py-2 px-3 leading-2 h-full'
                            value={host}
                            ref={hostRef}
                            onChange={(e) => setHost(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type='number'
                            min='0'
                            max='65535'
                            placeholder='Port'
                            id='port'
                            className='w-full py-2 px-3 leading-2 h-full'
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            required
                        />
                    </div>
                    <button className='bg-blue-500 col-span-2 mx-auto w-16 text-xl rounded-2xl text-white'>
                        Send
                    </button>
                </form>
                {error ? <div>{error}</div> : ""}
            </div>
        </>
    );
}

export default ServerAdder;
