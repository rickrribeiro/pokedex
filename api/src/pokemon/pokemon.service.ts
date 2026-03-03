import { Injectable, NotFoundException } from "@nestjs/common";
import PokedexAPI from "pokedex-promise-v2";
import { PokemonListItem } from "./interfaces/pokemon-list.interface";
import { pokemonSpecialistPrompt } from "./prompts/pokemon-specialist.prompt";
import { Content } from "@google/genai";
import { GeminiProvider } from "./providers/gemini.provider";

@Injectable()
export class PokemonService {
  private pokedexAPI: PokedexAPI;

  constructor(private readonly geminiProvider: GeminiProvider) {
    this.pokedexAPI = new PokedexAPI();
  }

  async getAll(
    offset: number,
    limit: number,
  ): Promise<{ count: number; results: PokemonListItem[] }> {
    try {
      const res = await this.pokedexAPI.getPokemonsList({
        limit,
        offset: offset,
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

  async getByNameOrId(nameOrId: string): Promise<PokedexAPI.Pokemon> {
    try {
      return await this.pokedexAPI.getPokemonByName(nameOrId);
    } catch (error: any) {
      console.log({
        message: "There was an ERROR on PokemonService.getByNameOrId:",
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

  async askPokeAI(
    question: string,
    pokemonName: string,
    chatHistory: any[],
  ): Promise<string> {
    const systemInstruction = pokemonSpecialistPrompt(pokemonName);

    const formattedHistory: Content[] = chatHistory.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    return await this.geminiProvider.generateChatResponse(
      systemInstruction,
      formattedHistory,
      question,
    );
  }
}
