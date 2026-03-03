import { Controller, Get, Param, Query } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";
import { PokedexResponse } from "./interfaces/pokemon-list.interface";
import { Pokemon } from "pokedex-promise-v2";

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAll(
    @Query("offset") offset: number = 0,
    @Query("limit") limit: number = 20,
    @Query("name") name?: string,
  ): Promise<PokedexResponse> {
    if (name) {
      const pokemons = await this.pokemonService.searchByName(name);
      return {
        count: pokemons.length,
        results: pokemons,
      };
    }
    const pokemons = await this.pokemonService.getAll(offset, limit);
    return {
      count: pokemons.count,
      results: pokemons.results,
    };
  }

  @Get(":nameOrId")
  getByNameOrId(@Param("nameOrId") nameOrId: string): Promise<Pokemon> {
    return this.pokemonService.getByNameOrId(nameOrId);
  }
}
