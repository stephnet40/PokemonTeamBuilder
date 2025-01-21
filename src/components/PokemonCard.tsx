import { Pokemon } from "pokenode-ts";

const PokemonCard = ({pokemon}: {pokemon: Pokemon}) => {

    if (pokemon) {
        const imgSrc = pokemon.sprites.front_default!
        return (
            <div>
                <h3>{pokemon?.species.name.replace(/^./, char => char.toUpperCase())}</h3>
                <img src={imgSrc}></img>
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