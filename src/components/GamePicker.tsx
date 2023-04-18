import validGames from "@/lib/validGames";
import Select from "react-select";



function GamePicker({setGame, setPort, setName, hostRef}) {
    return (
        <>
        <Select name="game" className="text-black"
        options={validGames.map(game => ({value: game.type, label: game.name}))}
        onChange={(e) => {
            const matchingGame = validGames.find(game => game.type === e.value)
            if (matchingGame.port) {
                setPort(matchingGame.port)
            } else {
                setPort("")
            }      
            setName(matchingGame.name)
            setGame(e.value)
            hostRef.current.focus()
        }}
        placeholder="Game"
        required
        />
        </>
    );
}

export default GamePicker;