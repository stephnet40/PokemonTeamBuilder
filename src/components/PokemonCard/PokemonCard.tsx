import { Pokemon, PokemonClient, PokemonEntry, PokemonSpecies } from "pokenode-ts";
import './css/PokemonCard.css';
import RandomGenerateIndividualButton from "./components/RandomGenerateIndividualButton";
import StatBars from "./components/StatBars";
import { useState } from "react";
import SelectPokemonModal from "./components/SelectPokemonModal";
import { PokemonInfo } from "../interfaces";
import SelectFormModal from "./components/SelectFormModal";

const PokemonCard = ({pokemonInfo, selectedDex, setPokemon, loadedPokemon, updateLoadedPokemon}: {pokemonInfo: PokemonInfo, selectedDex: PokemonEntry[], setPokemon: any, loadedPokemon: PokemonInfo[], updateLoadedPokemon: any}) => {

    const [selectPokemonModalOpen, setSelectPokemonModalOpen] = useState<boolean>(false);
    const [selectFormModalOpen, setSelectFormModalOpen] = useState<boolean>(false);
    
    const generateNewPokemon = (data: any) => {
        setPokemon(data);
    } 

    const getVarieties = async (species: PokemonSpecies, defaultPokemon: Pokemon) => {
        const api = new PokemonClient();
        const varieties = species.varieties.filter(x => !x.is_default);
        let varietyList: Pokemon[] = [];
        
        if (varieties) {
            varietyList = await Promise.all(
                varieties.map(variety => api.getPokemonByName(variety.pokemon.name).then(data => data))
            );
        }
        
        varietyList.unshift(defaultPokemon);

        const info = {
            name: species.name,
            species: species,
            pokemon: varietyList.find(x => x.is_default),
            varieties: varietyList
        } as PokemonInfo;

        let index = loadedPokemon.findIndex(x => x.name == species.name)
        loadedPokemon[index] = info;

        setPokemon(info);
    } 
    
    if (pokemonInfo) {
        const species = pokemonInfo.species;
        const pokemon = pokemonInfo.pokemon;

        if (!pokemonInfo.varieties) {
            getVarieties(species, pokemon);
        }  

        const pokemonStats = pokemon.stats;
        
        const pokemonTypes = pokemon.types.map(item => item.type.name);
        const typesImgSrc = pokemonTypes.map(type => `typeIcons/${type}.png`);
        const imgSrc = pokemon.sprites.front_default!

        return (
            <div className="container">
                <div>
                    <img src={imgSrc}></img>
                    {pokemonInfo.species.varieties.length > 1 ? 
                        <div>
                        <button onClick={() => setSelectFormModalOpen(true)}>Select Form</button>
                        <SelectFormModal isOpen={selectFormModalOpen} pokemonInfo={pokemonInfo} onSubmit={generateNewPokemon} onClose={() => {setSelectFormModalOpen(false)}}/>    
                        </div> : <div></div>
                    }
                    
                </div>
                
                <div className="info">
                    <button onClick={() => setSelectPokemonModalOpen(true)}>Select Pokemon</button>
                    <SelectPokemonModal 
                        isOpen={selectPokemonModalOpen} 
                        pokedex={selectedDex} 
                        loadedPokemon={loadedPokemon}
                        updateLoadedPokemon={updateLoadedPokemon}
                        onSubmit={generateNewPokemon} 
                        onClose={() => setSelectPokemonModalOpen(false)}
                    />
                    
                    <RandomGenerateIndividualButton 
                        selectedDex={selectedDex} 
                        loadedPokemon={loadedPokemon}
                        updateLoadedPokemon={updateLoadedPokemon}
                        generateNewPokemon={generateNewPokemon}
                    />

                    <div className="name">
                        <h3>{pokemon?.species.name.replace(/^./, char => char.toUpperCase())}</h3>

                        <div className="type-list">{typesImgSrc.map((type, index) => <img key={index} src={type}></img>)}</div>
                    </div>

                    <StatBars statsArr={pokemonStats} />
                </div>
            </div>
        );
    }
    return (
        <div>
            <button onClick={() => setSelectPokemonModalOpen(true)}>Select Pokemon</button>
            <SelectPokemonModal 
                isOpen={selectPokemonModalOpen} 
                pokedex={selectedDex} 
                loadedPokemon={loadedPokemon}
                updateLoadedPokemon={updateLoadedPokemon}
                onSubmit={generateNewPokemon} 
                onClose={() => setSelectPokemonModalOpen(false)}
            />
            <RandomGenerateIndividualButton 
                selectedDex={selectedDex} 
                loadedPokemon={loadedPokemon}
                updateLoadedPokemon={updateLoadedPokemon}
                generateNewPokemon={generateNewPokemon}
            />
            <h3>Empty</h3>
        </div>
    )
}

export default PokemonCard;