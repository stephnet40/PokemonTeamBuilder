import { Ability, PokemonAbility, PokemonClient } from "pokenode-ts"
import { PokemonInfo } from "./interfaces";

interface getPokemonDataProps {
    name: string,
    loadedPokemon: PokemonInfo[],
    updateLoadedPokemon: any,
    generateNewPokemon: any
}

interface getAbilityDataProps {
    abilities: PokemonAbility[],
    loadedAbilities: Ability[],
    updateLoadedAbilities: any,
    generateAbility: any
}

const api = new PokemonClient();

export const getPokemonData = async ({name, loadedPokemon, updateLoadedPokemon, generateNewPokemon} : getPokemonDataProps) => {
   
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

export const getAbilityData = async ({abilities, loadedAbilities, updateLoadedAbilities, generateAbility} : getAbilityDataProps) => {

    let abilityList: Ability[] = [];
    const newAbilityNames: string[] = [];

    abilities.forEach((item) => {
        if (loadedAbilities.some(x => x.name == item.ability.name)) {
            abilityList.push(loadedAbilities.find(x => x.name == item.ability.name)!);
        } else {
            newAbilityNames.push(item.ability.name);
        }
    })

    const newAbilities = await Promise.all(
        newAbilityNames.map(name => api.getAbilityByName(name).then(data => data))
    );

    let newLoaded = loadedAbilities;
    newLoaded.push(...newAbilities);

    abilityList.push(...newAbilities);

    updateLoadedAbilities(newLoaded);
    generateAbility(abilityList);
}


