import { Pokemon, PokemonSpecies } from "pokenode-ts";

export interface PokemonInfo {
  name: string;
  pokemon: Pokemon;
  species: PokemonSpecies;
  varieties: Pokemon[];
  evolutionChain: EvolutionData[];
}

export interface EvolutionData {
  name: string;
  stage: number;
  minLevel: number;
  trigger: string | null;
  item: string | null;
}