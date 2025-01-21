import { useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard'
import RandomGenerateButton from './components/RandomGenerateButton'

function App() {
  const [pokemonArr, setArr] = useState([NaN,NaN,NaN,NaN,NaN,NaN]);

  const generatePokemon = (data: any) => {
    setArr(data)
  }
  return (
    <>
    <RandomGenerateButton generatePokemon={generatePokemon}/>
    <div className='pokemon-cards'>
      {pokemonArr.map((item, index) => <PokemonCard key={index} name={item} />)}
    </div>
    </>
  )
}

export default App
