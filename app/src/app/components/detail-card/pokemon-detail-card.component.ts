import { Component, Input } from '@angular/core';

@Component({
  selector: 'pokemon-detail-card',
  templateUrl: './pokemon-detail-card.component.html',
  styleUrl: './pokemon-detail-card.component.scss',
  standalone: false
})
export class PokemonDetailCardComponent {
  @Input() pokemon: any;
}