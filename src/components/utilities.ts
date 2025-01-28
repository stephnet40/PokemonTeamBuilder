import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts"
import { useEffect, useState } from "react";
import { PokemonInfo } from "./interfaces";

const getPokemonData = async ({name, loadedPokemon, updateLoadedPokemon, generateNewPokemon: generateNewPokemon} : {name: string, loadedPokemon: PokemonInfo[], updateLoadedPokemon: any, generateNewPokemon: any}) => {

    const api = new PokemonClient();
        const species = await api.getPokemonSpeciesByName(name).then(data => data);

        const varieties = species.varieties;
        const varietyList = await Promise.all(
            varieties.map(variety => api.getPokemonByName(variety.pokemon.name).then(data => data))
        );

        const pokemonInfo = {
            name: name,
            species: species,
            pokemon: varietyList.find(x => x.is_default),
            varieties: varietyList
        } as PokemonInfo;
        
        let newLoaded = loadedPokemon;
        newLoaded.push(pokemonInfo);

        updateLoadedPokemon(newLoaded);
        generateNewPokemon(pokemonInfo);
}

export default getPokemonData;

