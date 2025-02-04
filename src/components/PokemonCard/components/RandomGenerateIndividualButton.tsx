import { EvolutionChain, PokemonEntry } from "pokenode-ts";
import { PokemonInfo } from "../../interfaces";
import { getPokemonData } from "../../../utilities/apiUtilities";

interface RandomGenerateIndividualButtonProps {
    selectedDex: PokemonEntry[],
    loadedPokemon: PokemonInfo[],
    updateLoadedPokemon: any,
    loadedEvolutionChains: EvolutionChain[],
    updateLoadedEvolutionChains: any,
    generateNewPokemon: any
}

const RandomGenerateIndividualButton = (
    {selectedDex, loadedPokemon, updateLoadedPokemon, loadedEvolutionChains, 
        updateLoadedEvolutionChains, generateNewPokemon: generateNewPokemon} 
    : RandomGenerateIndividualButtonProps) => {
        
    function generateRandomNum() {
        const maxNum = selectedDex.length;
        const num = Math.floor(Math.random() * (maxNum - 1) + 1) - 1; 
        const name = selectedDex[num].pokemon_species.name;

        if (loadedPokemon.some(x => x.name == name)) {
            generateNewPokemon(loadedPokemon.find(x => x.name == name));
        } else {
            getPokemonData({name, loadedPokemon, updateLoadedPokemon, loadedEvolutionChains, updateLoadedEvolutionChains, generateNewPokemon});
        }     
    }
    
    return (
        <button onClick={() => generateRandomNum()}>Randomize</button>
    )
}

export default RandomGenerateIndividualButton;