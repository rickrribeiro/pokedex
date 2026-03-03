import { Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  standalone: false
})
export class PokemonListComponent implements OnInit {
  list = signal<any[]>([]);
  loading = signal(false);
  loadingMore = signal(false);
  totalPokemons = signal(0);
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.loadAll();
  }

  loadAll() {
    this.pokemonService.getPokemons(4, 0).subscribe({
      next: (data) => {
        this.list.set(data.results);
        this.totalPokemons.set(data.count);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.list.set([]);
        this.totalPokemons.set(0);
        this.loading.set(false);
      }
    });
  }

  loadMore(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.loadingMore.set(true);
    const offset = this.list().length;
    this.pokemonService.getPokemons(4, offset).subscribe({
      next: (data) => {
        this.list.update(oldList => [...oldList, ...data.results]);
        this.loadingMore.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loadingMore.set(false);
      }
    });
  }

  getByName(nome: string) {
    if (!nome.trim()) {
      this.loadAll();
      return;
    }
    this.loading.set(true);
    this.pokemonService.getPokemons(undefined, undefined, nome).subscribe({
      next: (data) => {
        this.list.set(data.results);
        this.totalPokemons.set(data.count);
        this.loading.set(false);
      },
      error: (err) => {
        this.list.set([]);
        this.totalPokemons.set(0);
        this.loading.set(false);
      }
    });
  }

}