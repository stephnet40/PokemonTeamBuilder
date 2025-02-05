import { useEffect, useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard/PokemonCard'
//import RandomGenerateButton from './components/RandomGenerateButton'
import { Ability, EvolutionChain, GameClient, Pokedex, PokemonEntry, Type } from 'pokenode-ts';
import PokedexSelect from './components/PokedexSelect/PokedexSelect';
import { PokemonInfo } from './types/PokemonInfo';

function App() {
  // const [pokemonList, setPokemonList] = useState<PokemonInfo[]>(new Array(6).fill(null));
  // const generatePokemon = (data: any) => {
  //   setPokemonList(data);
  // }
  const pokemonList = new Array(6).fill(null);
  const [loadedPokemon, setLoadedPokemon] = useState<PokemonInfo[]>([])
  const updateLoadedPokemon = (data: PokemonInfo[]) => {
    setLoadedPokemon(data);
  }

  const [loadedDexes, setLoadedDexes] = useState<Pokedex[]>([]);
  const updateLoadedDexes = (data: Pokedex[]) => {
    setLoadedDexes(data);
  }

  const [loadedAbilities, setLoadedAbilities] = useState<Ability[]>([]);
  const updateLoadedAbilities = (data: Ability[]) => {
    setLoadedAbilities(data);
  }

  const [loadedEvolutionChains, setLoadedEvolutionChains] = useState<EvolutionChain[]>([]);
  const updateLoadedEvolutionChains = (data: EvolutionChain[]) => {
    setLoadedEvolutionChains(data);
  }

  const [loadedTypes, setLoadedTypes] = useState<Type[]>([]);
  const updateLoadedTypes = (data: Type[]) => {
    setLoadedTypes(data);
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
  
  return (
    <>
    <PokedexSelect loadedDexes={loadedDexes} updateLoadedDexes={updateLoadedDexes} getSelectedDex={getSelectedDex}/>
    {/* Find cleaner way to randomly generate entire team */}
    {/* <RandomGenerateButton selectedDex={selectedDex!} loadedPokemon={loadedPokemon} updateLoadedPokemon={updateLoadedPokemon} generatePokemon={generatePokemon}/> */}
    <div className='pokemon-cards'>
      {pokemonList.map((item: PokemonInfo, index: any) => {
        const [pokemon, setPokemon] = useState<PokemonInfo>(item);
        useEffect(() => {setPokemon(item)}, [item])
        return <PokemonCard 
                  key={index} 
                  pokemonInfo={pokemon} 
                  selectedDex={selectedDex!} 
                  setPokemon={setPokemon} 
                  loadedPokemon={loadedPokemon} 
                  updateLoadedPokemon={updateLoadedPokemon}
                  loadedEvolutionChains={loadedEvolutionChains}
                  updateLoadedEvolutionChains={updateLoadedEvolutionChains}
                  loadedAbilities={loadedAbilities}
                  updateLoadedAbilities={updateLoadedAbilities}
                  loadedTypes={loadedTypes}
                  updateLoadedTypes={updateLoadedTypes}
                />
      })}
    </div>
    </>
  )
}

export default App
