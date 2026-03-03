export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokedexResponse {
  count: number;
  results: PokemonListItem[];
}
