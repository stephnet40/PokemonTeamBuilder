import { PokemonClient, PokemonEntry } from "pokenode-ts";
import { PokemonInfo } from "../../interfaces";

const RandomGenerateIndividualButton = ({selectedDex, generateNewPokemon: generateNewPokemon} : {selectedDex: PokemonEntry[], generateNewPokemon: any}) => {
    function generateRandomNum() {
        const maxNum = selectedDex.length;
        const num = Math.floor(Math.random() * (maxNum - 1) + 1) - 1; 
        const name = selectedDex[num].pokemon_species.name;

        getData(name);
    }

    const getData = async (name: string) => {
        const api = new PokemonClient();
        const species = await api.getPokemonSpeciesByName(name).then(data => data);
        const pokemon = await api.getPokemonById(species.id).then(data => data);

        const pokemonInfo = {
            name: name,
            species: species,
            pokemon: pokemon
        } as PokemonInfo;
        
        generateNewPokemon(pokemonInfo);
    }
    
    return (
        <button onClick={() => generateRandomNum()}>Randomize</button>
    )
}

export default RandomGenerateIndividualButton;