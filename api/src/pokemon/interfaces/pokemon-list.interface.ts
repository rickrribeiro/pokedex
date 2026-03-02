export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokedexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}
