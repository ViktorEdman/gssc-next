import validGames from "@/lib/validGames";
import Select from "react-select";

function GamePicker({setGame}) {
    return (
        <>
        <Select name="game" className="text-black"
        options={validGames.map(game => ({value: game.type, label: game.name}))}
        onChange={(e) => {
            setGame(e.value)
        }}
        placeholder="Game"
        />
        </>
    );
}

export default GamePicker;