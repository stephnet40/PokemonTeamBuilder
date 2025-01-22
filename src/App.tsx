import { useEffect, useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard'
import RandomGenerateButton from './components/RandomGenerateButton'
import { Pokemon } from 'pokenode-ts';

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(new Array(6).fill(null));
  const generatePokemon = (data: any) => {
    setPokemonList(data);
  }

  return (
    <>
    <RandomGenerateButton generatePokemon={generatePokemon}/>
    <div className='pokemon-cards'>
      {pokemonList.map((item: Pokemon, index: any) => {
        const [pokemon, setPokemon] = useState<Pokemon>(item);
        useEffect(() => {setPokemon(item)}, [item])
        return <PokemonCard key={index} pokemon={pokemon} setPokemon={setPokemon} />
      })}
    </div>
    </>
  )
}

export default App
