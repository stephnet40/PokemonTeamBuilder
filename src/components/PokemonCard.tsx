import { Pokemon } from "pokenode-ts";
import RandomGenerateIndividualButton from "./RandomGenerateIndividualButton";
import { useEffect, useState } from "react";

const PokemonCard = ({pokemon, setPokemon}: {pokemon: Pokemon, setPokemon: any}) => {

    const generateNewPokemon = (data: any) => {
        setPokemon(data);
    }

    if (pokemon) {
        const pokemonTypes = pokemon.types.map(item => item.type.name);
        const imgSrc = pokemon.sprites.front_default!

        return (
            <div>
                <h3>{pokemon?.species.name.replace(/^./, char => char.toUpperCase())}</h3>

                <div>{pokemonTypes.map(type => <span>{type}</span>)}</div>
                
                <img src={imgSrc}></img>
                <RandomGenerateIndividualButton generateNewPokemon={generateNewPokemon}/>
            </div>
        );
    }
    return (
        <div>
            <h3>Empty</h3>
            <p>Test Test Test</p>
        </div>
    )
}

export default PokemonCard;