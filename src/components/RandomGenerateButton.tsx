import { PokemonClient, PokemonEntry } from "pokenode-ts";

const RandomGenerateButton = ({selectedDex, generatePokemon: generatePokemon} : {selectedDex: PokemonEntry[], generatePokemon: any}) => {
    
    function generateRandomNums() {
        const maxNum = selectedDex.length;
        const names = [];
        for (let i = 0; i < 6; i++) {
            const num = Math.floor(Math.random() * (maxNum - 1) + 1) - 1
            names.push(selectedDex[num].pokemon_species.name); 
        }

        getData(names);
    }

    const getData = async (names: string[]) => {
        const api = new PokemonClient();
        const responses = await Promise.all(
            names.map(name => api.getPokemonSpeciesByName(name).then(data => data))
        );
        const pokemon = await Promise.all(
            responses.map(response => api.getPokemonById(response.id).then(data => data))
        );

        generatePokemon(pokemon);
    }
    
    return (
        <button onClick={() => generateRandomNums()}>Generate Random Team</button>
    )
}

export default RandomGenerateButton;