import { Pokemon, PokemonEntry } from "pokenode-ts";
import './css/PokemonCard.css';
import RandomGenerateIndividualButton from "./RandomGenerateIndividualButton";
import StatBars from "./StatBars";

const PokemonCard = ({pokemon, selectedDex, setPokemon}: {pokemon: Pokemon, selectedDex: PokemonEntry[], setPokemon: any}) => {

    const generateNewPokemon = (data: any) => {
        setPokemon(data);
    }

    if (pokemon) {
        const pokemonStats = pokemon.stats;
        
        const pokemonTypes = pokemon.types.map(item => item.type.name);
        const typesImgSrc = pokemonTypes.map(type => `typeIcons/${type}.png`);
        const imgSrc = pokemon.sprites.front_default!

        return (
            <div className="container">
                <img src={imgSrc}></img>

                <div className="info">
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
            <RandomGenerateIndividualButton selectedDex={selectedDex} generateNewPokemon={generateNewPokemon}/>
            <h3>Empty</h3>
        </div>
    )
}

export default PokemonCard;