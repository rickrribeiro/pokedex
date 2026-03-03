import { Routes } from '@angular/router';
import { PokemonListComponent } from './pages/list/pokemon-list.component';
import { PokemonDetailsComponent } from './pages/details/pokemon-details.component';
export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon/:name', component: PokemonDetailsComponent },
];
