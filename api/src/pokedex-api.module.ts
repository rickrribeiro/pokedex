import { Module } from "@nestjs/common";
import { PokemonController } from "./pokemon/pokemon.controller";
import { PokemonService } from "./pokemon/pokemon.service";
import { ConfigModule } from "@nestjs/config";
import { GeminiProvider } from "./pokemon/providers/gemini.provider";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PokemonController],
  providers: [PokemonService, GeminiProvider],
})
export class PokedexApiModule {}
