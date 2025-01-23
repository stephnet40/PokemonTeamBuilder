import { Pokemon } from "pokenode-ts";
import './PokemonCard.css';
import RandomGenerateIndividualButton from "../RandomGenerateIndividualButton";

const PokemonCard = ({pokemon, setPokemon}: {pokemon: Pokemon, setPokemon: any}) => {

    const generateNewPokemon = (data: any) => {
        setPokemon(data);
    }

    if (pokemon) {
        const pokemonTypes = pokemon.types.map(item => item.type.name);
        const typesImgSrc = pokemonTypes.map(type => `typeIcons/${type}.png`);
        const imgSrc = pokemon.sprites.front_default!

        return (
            <div>
                <h3>{pokemon?.species.name.replace(/^./, char => char.toUpperCase())}</h3>

                <div className="type-list">{typesImgSrc.map((type, index) => <img key={index} src={type}></img>)}</div>

                <img src={imgSrc}></img>
                <RandomGenerateIndividualButton generateNewPokemon={generateNewPokemon}/>
            </div>
        );
    }
    return (
        <div>
            <h3>Empty</h3>
            <RandomGenerateIndividualButton generateNewPokemon={generateNewPokemon}/>
        </div>
    )
}

export default PokemonCard;