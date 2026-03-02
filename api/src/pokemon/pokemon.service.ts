import { Injectable, NotFoundException } from "@nestjs/common";
import PokedexAPI from "pokedex-promise-v2";
import { PokemonListItem } from "./interfaces/pokemon-list.interface";

@Injectable()
export class PokemonService {
  private pokedexAPI: PokedexAPI;

  constructor() {
    this.pokedexAPI = new PokedexAPI();
  }

  async getAll(
    page: number,
    limit: number,
  ): Promise<{ count: number; results: PokemonListItem[] }> {
    try {
      const res = await this.pokedexAPI.getPokemonsList({
        limit,
        offset: (page - 1) * limit,
      });

      if (res.results.length === 0) {
        throw new NotFoundException("Pokemon not found");
      }
      return {
        count: res.count,
        results: res.results,
      };
    } catch (error) {
      console.log({
        message: "There was an ERROR on PokemonService.getAll:",
        error,
      });
      throw error;
    }
  }

  async getById(id: string): Promise<PokedexAPI.Pokemon> {
    try {
      return await this.pokedexAPI.getPokemonByName(id);
    } catch (error: any) {
      console.log({
        message: "There was an ERROR on PokemonService.getById:",
        error,
      });
      if (error?.status === 404) {
        throw new NotFoundException("Pokemon not found");
      }
      throw error;
    }
  }

  // As the number of pokemons is not that big, its possible to fetch all pokemons and filter by partial name.
  // The api does not support searching by partial name, only by exact name.
  async searchByName(name: string): Promise<PokemonListItem[]> {
    try {
      const res = await this.pokedexAPI.getPokemonsList();
      const pokemons = res.results.filter((pokemon) =>
        pokemon.name.includes(name.toLowerCase()),
      );
      if (pokemons.length === 0) {
        throw new NotFoundException("Pokemon not found");
      }
      return pokemons;
    } catch (error) {
      console.log({
        message: "There was an ERROR on PokemonService.searchByName:",
        error,
      });
      throw error;
    }
  }
}
