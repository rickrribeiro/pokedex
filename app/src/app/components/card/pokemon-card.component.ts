import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  standalone: false
})
export class PokemonCardComponent {
  @Input() pokemon: any;
}