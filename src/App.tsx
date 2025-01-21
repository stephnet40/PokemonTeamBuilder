import { useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard'
import RandomGenerateButton from './components/RandomGenerateButton'
import { Pokemon } from 'pokenode-ts';

function App() {
  const [pokemon, setIds] = useState<Pokemon[]>(new Array(6).fill(null));
  const generatePokemon = (data: any) => {
    setIds(data);
  }

  return (
    <>
    <RandomGenerateButton generatePokemon={generatePokemon}/>
    <div className='pokemon-cards'>
      {pokemon.map((item: any, index: any) => <PokemonCard key={index} pokemon={item} />)}
    </div>
    </>
  )
}

export default App
