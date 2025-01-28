import { PokemonEntry } from "pokenode-ts";
import { PokemonInfo } from "../../interfaces";
import getPokemonData from "../../utilities";

const RandomGenerateIndividualButton = ({selectedDex, loadedPokemon, updateLoadedPokemon, generateNewPokemon: generateNewPokemon} : {selectedDex: PokemonEntry[], loadedPokemon: PokemonInfo[], updateLoadedPokemon: any, generateNewPokemon: any}) => {
    function generateRandomNum() {
        const maxNum = selectedDex.length;
        const num = Math.floor(Math.random() * (maxNum - 1) + 1) - 1; 
        const name = selectedDex[num].pokemon_species.name;

        if (loadedPokemon.some(x => x.name == name)) {
            generateNewPokemon(loadedPokemon.find(x => x.name == name));
        } else {
            getPokemonData({name, loadedPokemon, updateLoadedPokemon, generateNewPokemon});
        }     
    }
    
    return (
        <button onClick={() => generateRandomNum()}>Randomize</button>
    )
}

export default RandomGenerateIndividualButton;