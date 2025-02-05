import { PokemonClient, PokemonEntry } from "pokenode-ts";
import { PokemonInfo } from "../types/PokemonInfo";

const RandomGenerateButton = ({selectedDex, loadedPokemon, updateLoadedPokemon, generatePokemon: generatePokemon} : {selectedDex: PokemonEntry[], loadedPokemon: PokemonInfo[], updateLoadedPokemon: any, generatePokemon: any}) => {
    
    function generateRandomNums() {
        const maxNum = selectedDex.length;
        const allNames = [];
        for (let i = 0; i < 6; i++) {
            const num = Math.floor(Math.random() * (maxNum - 1) + 1) - 1
            allNames.push(selectedDex[num].pokemon_species.name); 
        }

        const names: string[] = [];
        const pokemonInfo: PokemonInfo[] = [];

        allNames.forEach(name => {
            if (loadedPokemon.some(x => x.name == name)) pokemonInfo.push(loadedPokemon.find(x => x.name == name)!);
            else names.push(name);
        })

        getData(names, pokemonInfo);
    }

    const getData = async (names: string[], pokemonInfo: PokemonInfo[]) => {
        const api = new PokemonClient();

        const species = await Promise.all(
            names.map(name => api.getPokemonSpeciesByName(name).then(data => data))
        );
        const pokemon = await Promise.all(
            species.map(response => api.getPokemonById(response.id).then(data => data))
        );
        
        let newLoaded = loadedPokemon;

        species.forEach((item, ind) => {
            const info = {
                name: names[ind],
                species: item,
                pokemon: pokemon[ind]
            } as PokemonInfo;
            if (species.indexOf(item) == ind) newLoaded.push(info);
            pokemonInfo.push(info)
        })

        updateLoadedPokemon(newLoaded);
        generatePokemon(pokemonInfo);
    }
    
    return (
        <button onClick={() => generateRandomNums()}>Generate Random Team</button>
    )
}

export default RandomGenerateButton;