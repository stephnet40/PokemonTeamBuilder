import { Ability, EvolutionChain, Move, PokemonEntry, Type } from "pokenode-ts";
import './css/PokemonCard.css';
import RandomGenerateIndividualButton from "./components/RandomGenerateIndividualButton";
import StatBars from "./components/StatBars";
import { useState } from "react";
import SelectPokemonModal from "./components/SelectPokemonModal";
import { PokemonInfo } from "../../types/PokemonInfo";
import SelectFormModal from "./components/SelectFormModal";
import Abilities from "./components/Abilities";
import Weaknesses from "./components/Weaknesses";
import EvolutionLine from "./components/EvolutionLine";
import PokedexModal from "./components/PokedexModal";
import { formatName } from "../../utilities/formatUtilities";
import MovesModal from "./components/MovesModal";

interface PokemonCardProps {
    pokemonInfo: PokemonInfo,
    selectedDex: PokemonEntry[],
    setPokemon: any,
    loadedPokemon: PokemonInfo[],
    updateLoadedPokemon: any,
    loadedEvolutionChains: EvolutionChain[],
    updateLoadedEvolutionChains: any,
    loadedAbilities: Ability[],
    updateLoadedAbilities: any,
    loadedTypes: Type[],
    updateLoadedTypes: any,
    loadedMoves: Move[],
    updateLoadedMoves: any
}

const PokemonCard = (
    {pokemonInfo, selectedDex, setPokemon, loadedPokemon, updateLoadedPokemon, 
        loadedEvolutionChains, updateLoadedEvolutionChains, loadedAbilities, updateLoadedAbilities, 
        loadedTypes, updateLoadedTypes, loadedMoves, updateLoadedMoves} 
    : PokemonCardProps ) => {

    const [selectPokemonModalOpen, setSelectPokemonModalOpen] = useState<boolean>(false);
    const [selectFormModalOpen, setSelectFormModalOpen] = useState<boolean>(false);
    const [pokedexModalOpen, setPokedexModalOpen] = useState<boolean>(false);
    const [movesModalOpen, setMovesModalOpen] = useState<boolean>(false);
    const [moveLearnMethod, setMoveLearnMethod] = useState<string>("level-up");
    
    const generateNewPokemon = (data: any) => {
        setPokemon(data);
    } 
    
    if (pokemonInfo) {
        const pokemon = pokemonInfo.pokemon;

        const pokemonAbilities = pokemon.abilities;
        const pokemonStats = pokemon.stats;
        const pokemonTypes = pokemon.types.map(item => item.type.name);
        const typesImgSrc = pokemonTypes.map(type => `typeIcons/${type}.png`);
        const imgSrc = pokemon.sprites.other?.["official-artwork"].front_default!;

        return (
            <div className="container">
                <div className="sprite">
                    <img src={imgSrc}></img>
                    {pokemonInfo.species.varieties.length > 1 ? 
                        <div>
                        <button onClick={() => setSelectFormModalOpen(true)}>Forms</button>
                        <SelectFormModal 
                            isOpen={selectFormModalOpen} 
                            pokemonInfo={pokemonInfo} 
                            onSubmit={generateNewPokemon} 
                            onClose={() => {setSelectFormModalOpen(false)}}
                        />    
                        </div> : <div></div>
                    }      
                </div>
                
                <div className="info">

                    <div className="info-header">
                        <div>
                            <h3 className="name">{formatName(pokemon?.name)}</h3>

                            <div className="pokemon-select">
                                <button onClick={() => setSelectPokemonModalOpen(true)}>Select</button>
                                <SelectPokemonModal 
                                    isOpen={selectPokemonModalOpen} 
                                    pokedex={selectedDex} 
                                    loadedPokemon={loadedPokemon}
                                    updateLoadedPokemon={updateLoadedPokemon}
                                    loadedEvolutionChains={loadedEvolutionChains}
                                    updateLoadedEvolutionChains={updateLoadedEvolutionChains}
                                    onSubmit={generateNewPokemon} 
                                    onClose={() => setSelectPokemonModalOpen(false)}
                                />
                                
                                <RandomGenerateIndividualButton 
                                    selectedDex={selectedDex} 
                                    loadedPokemon={loadedPokemon}
                                    updateLoadedPokemon={updateLoadedPokemon}
                                    loadedEvolutionChains={loadedEvolutionChains}
                                    updateLoadedEvolutionChains={updateLoadedEvolutionChains}
                                    generateNewPokemon={generateNewPokemon}
                                />
                            </div>
                        </div>

                        <div className="type-list">
                            {typesImgSrc.map((type, index) => <img key={index} src={type}></img>)}
                        </div>
                    </div>               

                    <div className="main-data">
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

                    <EvolutionLine 
                        evolutionChain={pokemonInfo.evolutionChain}
                        loadedPokemon={loadedPokemon}
                        updateLoadedPokemon={updateLoadedPokemon}
                        loadedEvolutionChains={loadedEvolutionChains}
                        generateNewPokemon={generateNewPokemon}
                    />

                    <div className="button-modals">
                        <button onClick={() => setPokedexModalOpen(true)}>Pokedex</button>
                        <PokedexModal 
                            isOpen={pokedexModalOpen}
                            species={pokemonInfo.species}
                            pokemon={pokemon}
                            onClose={() => setPokedexModalOpen(false)}
                        />

                        <button onClick={() => {setMovesModalOpen(true); setMoveLearnMethod("level-up")}}>Level Up Moves</button>
                        <button onClick={() => {setMovesModalOpen(true); setMoveLearnMethod("machine")}}>TM/HM Moves</button>
                        {/* <button onClick={() => {setMovesModalOpen(true); setMoveLearnMethod("tutor")}}>Tutor Moves</button> */}
                        <MovesModal
                            isOpen={movesModalOpen}
                            learnMethod={moveLearnMethod}
                            pokemonInfo={pokemonInfo}
                            loadedMoves={loadedMoves}
                            updateLoadedMoves={updateLoadedMoves}
                            onClose={() => setMovesModalOpen(false)} 
                        />
                        
                    </div>
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
                loadedEvolutionChains={loadedEvolutionChains}
                updateLoadedEvolutionChains={updateLoadedEvolutionChains}
                onSubmit={generateNewPokemon} 
                onClose={() => setSelectPokemonModalOpen(false)}
            />
            <RandomGenerateIndividualButton 
                selectedDex={selectedDex} 
                loadedPokemon={loadedPokemon}
                updateLoadedPokemon={updateLoadedPokemon}
                loadedEvolutionChains={loadedEvolutionChains}
                updateLoadedEvolutionChains={updateLoadedEvolutionChains}
                generateNewPokemon={generateNewPokemon}
            />
        </div>
    )
}

export default PokemonCard;