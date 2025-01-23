import { PokemonClient, PokemonEntry } from "pokenode-ts";

const RandomGenerateIndividualButton = ({selectedDex, generateNewPokemon: generateNewPokemon} : {selectedDex: PokemonEntry[], generateNewPokemon: any}) => {
    function generateRandomNum() {
        const maxNum = selectedDex.length;
        const num = Math.floor(Math.random() * (maxNum - 1) + 1) - 1; 
        const name = selectedDex[num].pokemon_species.name;

        getData(name);
    }

    const getData = async (name: string) => {
        const api = new PokemonClient();
        const response = await api.getPokemonByName(name).then(data => data)
        generateNewPokemon(response);
    }
    
    return (
        <button onClick={() => generateRandomNum()}>Randomize</button>
    )
}

export default RandomGenerateIndividualButton;