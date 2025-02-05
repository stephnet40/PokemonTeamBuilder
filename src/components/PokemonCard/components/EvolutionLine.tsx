import { useEffect, useState } from "react";
import { EvolutionData, PokemonInfo } from "../../../types/PokemonInfo";
import { EvolutionChain } from "pokenode-ts";
import { getPokemonDataBulk } from "../../../utilities/apiUtilities";
import "../css/EvolutionLine.css"

interface EvolutionLineProps {
    evolutionChain: EvolutionData[];
    loadedPokemon: PokemonInfo[];
    updateLoadedPokemon: any;
    loadedEvolutionChains: EvolutionChain[];
    generateNewPokemon: any
}

const EvolutionLine = ({evolutionChain, loadedPokemon, updateLoadedPokemon, loadedEvolutionChains, generateNewPokemon} : EvolutionLineProps) => {

    const [currEvolutions, setCurrEvolutions] = useState<PokemonInfo[]>([]);
    const getCurrEvolutions = (data: any) => {
        setCurrEvolutions([...data]);
    }

    useEffect(() => {
        const names: string[] = [];
        evolutionChain.forEach(evolution => {
            names.push(evolution.name)
        })
        getPokemonDataBulk({names, loadedPokemon, updateLoadedPokemon, loadedEvolutionChains, generateBulkPokemon: getCurrEvolutions})
    }, [evolutionChain]);


    const displayEvolutions = () => {
        let evolutions: any = [];
        evolutionChain.forEach((evolution, ind) => {
            const name = evolution.name;
            const pokemon = currEvolutions[ind];
            if (pokemon) {
                const imgSrc = pokemon.pokemon.sprites.front_default!;
                evolutions.push(
                    <button key={`${name}-evo`} onClick={() => generateNewPokemon(pokemon)}>
                        <img className="sprite-evo" src={imgSrc}></img>
                    </button>
                )
            }
        })

        return evolutions;
    }

    return (
        <div className="evolution">
            <div>
                Evolution Line
            </div>
            <div className="evolution-chain">
                {displayEvolutions()}
            </div>
        </div>
    )
}

export default EvolutionLine;