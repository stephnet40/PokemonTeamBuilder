import { Move, Pokemon, PokemonSpecies } from "pokenode-ts";

export interface PokemonInfo {
  name: string;
  pokemon: Pokemon;
  species: PokemonSpecies;
  varieties: Pokemon[];
  evolutionChain: EvolutionData[];
  moves: MoveDetails[];
}

export interface EvolutionData {
  name: string;
  stage: number;
  minLevel: number;
  trigger: string | null;
  item: string | null;
}

export interface MoveDetails {
  move: Move;
  level: number;
  learnMethod: string;
  versionGroup: string;
}