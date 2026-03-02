import { Controller, Get, Param, Query } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";
import { PokedexResponse } from "./interfaces/pokemon-list.interface";
import { Pokemon } from "pokedex-promise-v2";

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 20,
    @Query("name") name?: string,
  ): Promise<PokedexResponse> {
    if (name) {
      const pokemons = await this.pokemonService.searchByName(name);
      return {
        count: pokemons.length,
        next: null,
        previous: null,
        results: pokemons,
      };
    }
    const pokemons = await this.pokemonService.getAll(page, limit);
    return {
      count: pokemons.count,
      next:
        page * limit < pokemons.count
          ? `?page=${page + 1}&limit=${limit}`
          : null,
      previous: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
      results: pokemons.results,
    };
  }

  @Get(":id")
  getById(@Param("id") id: string): Promise<Pokemon> {
    return this.pokemonService.getById(id);
  }
}
