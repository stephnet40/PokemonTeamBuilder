import { Pokemon, PokemonEntry } from "pokenode-ts";
import './css/PokemonCard.css';
import RandomGenerateIndividualButton from "./components/RandomGenerateIndividualButton";
import StatBars from "./components/StatBars";
import { useState } from "react";
import SelectPokemonModal from "./components/SelectPokemonModal";
import { PokemonInfo } from "../interfaces";

const PokemonCard = ({pokemonInfo, selectedDex, setPokemon}: {pokemonInfo: PokemonInfo, selectedDex: PokemonEntry[], setPokemon: any}) => {

    const [selectPokemonModalOpen, setSelectPokemonModalOpen] = useState<boolean>(false);
    
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
                <img src={imgSrc}></img>

                <div className="info">
                    <button onClick={() => setSelectPokemonModalOpen(true)}>Select Pokemon</button>
                    <SelectPokemonModal isOpen={selectPokemonModalOpen} pokedex={selectedDex} onSubmit={generateNewPokemon} onClose={() => setSelectPokemonModalOpen(false)}/>
                    
                    <RandomGenerateIndividualButton selectedDex={selectedDex} generateNewPokemon={generateNewPokemon}/>

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
            <SelectPokemonModal isOpen={selectPokemonModalOpen} pokedex={selectedDex} onSubmit={generateNewPokemon} onClose={() => setSelectPokemonModalOpen(false)}/>
            <RandomGenerateIndividualButton selectedDex={selectedDex} generateNewPokemon={generateNewPokemon}/>
            <h3>Empty</h3>
        </div>
    )
}

export default PokemonCard;