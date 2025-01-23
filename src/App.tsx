import { useEffect, useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard/PokemonCard'
import RandomGenerateButton from './components/RandomGenerateButton'
import { GameClient, Pokedex, Pokemon, PokemonClient, PokemonEntry } from 'pokenode-ts';
import PokedexSelect from './components/PokedexSelect/PokedexSelect';

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(new Array(6).fill(null));
  const generatePokemon = (data: any) => {
    setPokemonList(data);
  }

  const [loadedDexes, setLoadedDexes] = useState<Pokedex[]>([]);
  const updateLoadedDexes = (data: Pokedex[]) => {
    setLoadedDexes(data);
  }

  const [selectedDex, setSelectedDex] = useState<PokemonEntry[]>();
  const getSelectedDex = (data: PokemonEntry[]) => {
    setSelectedDex(data);
  }

  useEffect(() => {
    const gameApi = new GameClient();
      const getNationalDex = async () => {
        const response = await gameApi.getPokedexByName('national').then(data => data);
        loadedDexes?.push(response);
        setLoadedDexes(loadedDexes);
        setSelectedDex(response.pokemon_entries);
      }
      getNationalDex(); 
  }, [])
  
  console.log(loadedDexes);
  console.log(selectedDex)

  return (
    <>
    <PokedexSelect loadedDexes={loadedDexes} updateLoadedDexes={updateLoadedDexes} getSelectedDex={getSelectedDex}/>
    <RandomGenerateButton selectedDex={selectedDex!} generatePokemon={generatePokemon}/>
    <div className='pokemon-cards'>
      {pokemonList.map((item: Pokemon, index: any) => {
        const [pokemon, setPokemon] = useState<Pokemon>(item);
        useEffect(() => {setPokemon(item)}, [item])
        return <PokemonCard key={index} pokemon={pokemon} selectedDex={selectedDex!} setPokemon={setPokemon} />
      })}
    </div>
    </>
  )
}

export default App
