/**
 * Pokemon interface for list view
 */
export interface Pokemon {
  name: string;
  types: string[];
  image: string;
}

/**
 * Pokemon stats object interface
 */
export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

/**
 * Pokemon detail interface for individual pokemon API response
 */
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: string[];
  abilities: string[];
  images: string[];
  stats: PokemonStats;
}

