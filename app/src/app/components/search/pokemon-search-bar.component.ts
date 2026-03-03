import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pokemon-search-bar',
  templateUrl: './pokemon-search-bar.component.html',
  styleUrl: './pokemon-search-bar.component.scss',
  standalone: false
})
export class PokemonSearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  emitSearch(value: string) {
    if (value.length === 0 || value.length >= 3) {
      this.searchEvent.emit(value);
    }
  }
}