import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { routes } from './pokedex-app.routes';
import { PokedexAppComponent } from "./pokedex-app.component";
import { PokemonService } from "./pokemon/pokemon.service";
import { PokemonListComponent } from "./pages/list/pokemon-list.component";
import { PokemonDetailsComponent } from "./pages/details/pokemon-details.component";
import { PokemonCardComponent } from "./components/card/pokemon-card.component";
import { PokemonSearchBarComponent } from "./components/search/pokemon-search-bar.component";
import { PokemonDetailCardComponent } from "./components/detail-card/pokemon-detail-card.component";
import { AIInsightsComponent } from "./components/ai-insights/ai-insights.component";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    PokemonService,
  ],
  declarations: [
    PokemonListComponent,
    PokemonDetailsComponent,
    PokedexAppComponent,
    PokemonCardComponent,
    PokemonSearchBarComponent,
    PokemonDetailCardComponent,
    AIInsightsComponent
  ],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule {}
