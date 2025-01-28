import { PokemonEntry } from "pokenode-ts";
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
    
    if (pokemonInfo) {
        const species = pokemonInfo.species;
        const pokemon = pokemonInfo.pokemon;

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