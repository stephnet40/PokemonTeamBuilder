import { PokemonClient, PokemonEntry } from "pokenode-ts";
import { PokemonInfo } from "./interfaces";

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
        const pokemonInfo: PokemonInfo[] = [];
        const species = await Promise.all(
            names.map(name => api.getPokemonSpeciesByName(name).then(data => data))
        );
        const pokemon = await Promise.all(
            species.map(response => api.getPokemonById(response.id).then(data => data))
        );
        
        species.forEach((item, ind) => {
            const info = {
                name: names[ind],
                species: item,
                pokemon: pokemon[ind]
            } as PokemonInfo;
            pokemonInfo.push(info)
        })

        generatePokemon(pokemonInfo);
    }

    
    return (
        <button onClick={() => generateRandomNums()}>Generate Random Team</button>
    )
}

export default RandomGenerateButton;