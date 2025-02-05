import { Ability, EvolutionChain, EvolutionClient, PokemonAbility, PokemonClient, Type, TypeRelations } from "pokenode-ts"
import { EvolutionData, PokemonInfo } from "../types/PokemonInfo";

interface getPokemonDataProps {
    name: string,
    loadedPokemon: PokemonInfo[],
    updateLoadedPokemon: any,
    loadedEvolutionChains: EvolutionChain[],
    updateLoadedEvolutionChains: any,
    generateNewPokemon: any
}

interface getPokemonDataBulkProps {
    names: string[],
    loadedPokemon: PokemonInfo[],
    updateLoadedPokemon: any,
    loadedEvolutionChains: EvolutionChain[],
    generateBulkPokemon: any
}

interface getAbilityDataProps {
    abilities: PokemonAbility[],
    loadedAbilities: Ability[],
    updateLoadedAbilities: any,
    generateAbility: any
}

interface getTypeDataProps {
    types: string[],
    loadedTypes: Type[],
    updateLoadedTypes: any,
    generateTypeRelations: any
}

const pokemonApi = new PokemonClient();
const evolutionApi = new EvolutionClient();

export const getPokemonData = async ({name, loadedPokemon, updateLoadedPokemon, loadedEvolutionChains, updateLoadedEvolutionChains, generateNewPokemon} : getPokemonDataProps) => {
   
    // Get Species
    const species = await pokemonApi.getPokemonSpeciesByName(name).then(data => data);

    // Get Evolution Chain
    const evoChainId = Number(species.evolution_chain.url.match(/(?<=\/)\d+/)?.at(0));
    let evoChainData;

    if (loadedEvolutionChains.some(x => x.id == evoChainId)) {
        evoChainData = loadedEvolutionChains.find(x => x.id == evoChainId)!;
    } else {
        evoChainData = await evolutionApi.getEvolutionChainById(evoChainId).then(data => data);
        let newLoadedEvoChains = loadedEvolutionChains;
        newLoadedEvoChains.push(evoChainData);
        updateLoadedEvolutionChains(newLoadedEvoChains);
    }   

    const evoChain: EvolutionData[] = getEvolutionChain(evoChainData);

    // Get All Varieties
    const varieties = species.varieties;
    const varietyList = await Promise.all(
        varieties.map(variety => pokemonApi.getPokemonByName(variety.pokemon.name).then(data => data))
    );

    const pokemonInfo = {
        name: name,
        species: species,
        pokemon: varietyList.find(x => x.is_default),
        varieties: varietyList,
        evolutionChain: evoChain
    } as PokemonInfo;
    let newLoadedPokemon = loadedPokemon;
    newLoadedPokemon.push(pokemonInfo);

    updateLoadedPokemon(newLoadedPokemon);
    generateNewPokemon(pokemonInfo);
}

export const getPokemonDataBulk = async ({names, loadedPokemon, updateLoadedPokemon, loadedEvolutionChains, generateBulkPokemon} : getPokemonDataBulkProps) => {
    
    let pokemonInfoList: PokemonInfo[] = [];
    let newLoadedPokemon = loadedPokemon;

    for (let i = 0; i < names.length; i++) {
        if (!loadedPokemon.some(x => x.name == names[i])) {
            let newSpecies = await pokemonApi.getPokemonSpeciesByName(names[i]).then(data => data);

            const evoChainId = Number(newSpecies.evolution_chain.url.match(/(?<=\/)\d+/)?.at(0));
            const evoChainData = loadedEvolutionChains.find(x => x.id == evoChainId)!;
            const evoChain: EvolutionData[] = getEvolutionChain(evoChainData);

            const varieties = newSpecies.varieties;
            const varietyList = await Promise.all(
                varieties.map(variety => pokemonApi.getPokemonByName(variety.pokemon.name).then(data => data))
            );

            const info = {
                name: names[i],
                species: newSpecies,
                pokemon: varietyList.find(x => x.is_default),
                varieties: varietyList,
                evolutionChain: evoChain
            } as PokemonInfo;
            
            newLoadedPokemon.push(info);
            pokemonInfoList.push(info);
        } else {
            pokemonInfoList.push(loadedPokemon.find(x => x.name == names[i])!);
        }
    }

    updateLoadedPokemon(newLoadedPokemon);
    generateBulkPokemon(pokemonInfoList);
}

const getEvolutionChain = (chainData: EvolutionChain) => {
    const evoChain: EvolutionData[] = [];
    let evoData = chainData.chain;

    let stage = 1;
    do {
        let numberOfEvolutions = evoData.evolves_to.length;
        let data = {
            name: evoData.species.name,
            stage: stage,
            minLevel: !evoData.evolution_details[0] ? 1 : evoData.evolution_details[0].min_level,
            trigger: !evoData.evolution_details[0] ? null : evoData.evolution_details[0].trigger.name,
            item: !evoData.evolution_details[0] ? null : evoData.evolution_details[0].item?.name
        } as EvolutionData

        evoChain.push(data);

        if (numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
                const data = {
                    name: evoData.evolves_to[i].species.name,
                    stage: stage + 1,
                    minLevel: !evoData.evolves_to[i].evolution_details ? 1 : evoData.evolves_to[i].evolution_details[0].min_level!,
                    trigger: !evoData.evolves_to[i].evolution_details ? null : evoData.evolves_to[i].evolution_details[0].trigger.name,
                    item: !evoData.evolves_to[i].evolution_details ? null : evoData.evolves_to[i].evolution_details[0].item?.name!
                } as EvolutionData;

                evoChain.push(data);
            }
        }
              
        stage++;
        evoData = evoData['evolves_to'][0]
        
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    return evoChain;
}

export const getAbilityData = async ({abilities, loadedAbilities, updateLoadedAbilities, generateAbility} : getAbilityDataProps) => {

    let abilityList: Ability[] = [];
    let newLoaded = loadedAbilities;

    for (let i = 0; i < abilities.length; i++) {
        const item = abilities[i];
        if (!loadedAbilities.some(x => x.name == item.ability.name)) {
            const newAbility = await pokemonApi.getAbilityByName(item.ability.name).then(data => data);
            newLoaded.push(newAbility);
            abilityList.push(newAbility);
        } else {
            abilityList.push(loadedAbilities.find(x => x.name == item.ability.name)!);
        }
    }

    updateLoadedAbilities(newLoaded);
    generateAbility(abilityList);
}

export const getTypeData = async ({types, loadedTypes, updateLoadedTypes, generateTypeRelations} : getTypeDataProps) => {

    let typeRelations: TypeRelations[] = [];
    const newTypeNames: string[] = [];

    types.forEach((item) => {
        if (loadedTypes.some(x => x.name == item)) {
            typeRelations.push(loadedTypes.find(x => x.name == item)?.damage_relations!);
        } else {
            newTypeNames.push(item);
        }
    })

    const newTypes = await Promise.all(
        newTypeNames.map(type => pokemonApi.getTypeByName(type).then(data => data))
    );

    let newLoaded = loadedTypes;
    newLoaded.push(...newTypes);

    newTypes.forEach(type => {
        typeRelations.push(type.damage_relations);
    })

    updateLoadedTypes(newLoaded);
    generateTypeRelations(typeRelations);
}


