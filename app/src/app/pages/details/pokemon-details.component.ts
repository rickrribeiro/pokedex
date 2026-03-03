import { Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../pokemon/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
  standalone: false
})
export class PokemonDetailsComponent implements OnInit {
  pokemon = signal<any>(null);
  loading = signal(false);

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.getDetails(name);
    }
  }

  getDetails(name: string) {
    this.loading.set(true);
    this.pokemonService.getPokemonByNameOrId(name).subscribe({
      next: (res) => {
        this.pokemon.set(res);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}