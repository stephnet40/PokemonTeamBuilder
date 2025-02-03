import { Ability, PokemonEntry, Type } from "pokenode-ts";
import './css/PokemonCard.css';
import RandomGenerateIndividualButton from "./components/RandomGenerateIndividualButton";
import StatBars from "./components/StatBars";
import { useState } from "react";
import SelectPokemonModal from "./components/SelectPokemonModal";
import { PokemonInfo } from "../interfaces";
import SelectFormModal from "./components/SelectFormModal";
import Abilities from "./components/Abilities";
import Weaknesses from "./components/Weaknesses";

interface PokemonCardProps {
    pokemonInfo: PokemonInfo,
    selectedDex: PokemonEntry[],
    setPokemon: any,
    loadedPokemon: PokemonInfo[],
    updateLoadedPokemon: any,
    loadedAbilities: Ability[],
    updateLoadedAbilities: any,
    loadedTypes: Type[],
    updateLoadedTypes: any
}

const PokemonCard = (
    {pokemonInfo, selectedDex, setPokemon, loadedPokemon, updateLoadedPokemon, 
        loadedAbilities, updateLoadedAbilities, loadedTypes, updateLoadedTypes} 
    : PokemonCardProps ) => {

    const [selectPokemonModalOpen, setSelectPokemonModalOpen] = useState<boolean>(false);
    const [selectFormModalOpen, setSelectFormModalOpen] = useState<boolean>(false);
    
    const generateNewPokemon = (data: any) => {
        setPokemon(data);
    } 
    
    if (pokemonInfo) {
        const pokemon = pokemonInfo.pokemon;

        const pokemonAbilities = pokemon.abilities;
        const pokemonStats = pokemon.stats;
        
        const pokemonTypes = pokemon.types.map(item => item.type.name);
        const typesImgSrc = pokemonTypes.map(type => `typeIcons/${type}.png`);
        const imgSrc = pokemon.sprites.front_default!

        return (
            <div className="container">
                <div className="sprite">
                    <img src={imgSrc}></img>
                    {pokemonInfo.species.varieties.length > 1 ? 
                        <div>
                        <button onClick={() => setSelectFormModalOpen(true)}>Forms</button>
                        <SelectFormModal isOpen={selectFormModalOpen} pokemonInfo={pokemonInfo} onSubmit={generateNewPokemon} onClose={() => {setSelectFormModalOpen(false)}}/>    
                        </div> : <div></div>
                    }      
                </div>
                
                <div className="info">

                    <div className="info-header">
                        <h3 className="name">{pokemon?.species.name.replace(/^./, char => char.toUpperCase())}</h3>

                        <div className="pokemon-select">
                            <button onClick={() => setSelectPokemonModalOpen(true)}>Select</button>
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
                        </div>
                    </div>

                    <div className="type-list">
                        {typesImgSrc.map((type, index) => <img key={index} src={type}></img>)}
                    </div>

                    <Abilities 
                        abilityList={pokemonAbilities} 
                        loadedAbilities={loadedAbilities}
                        updateLoadedAbilities={updateLoadedAbilities}
                    />

                    <StatBars statsArr={pokemonStats} />
                    <Weaknesses 
                        pokemonTypes={pokemonTypes}
                        loadedTypes={loadedTypes}
                        updateLoadedTypes={updateLoadedTypes}
                    />
                </div>
            </div>
        );
    }
    return (
        <div className="container-empty">
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
        </div>
    )
}

export default PokemonCard;