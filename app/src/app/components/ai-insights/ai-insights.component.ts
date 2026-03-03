import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { PokemonService } from '../../pokemon/pokemon.service';

@Component({
  selector: 'ai-insights',
  templateUrl: './ai-insights.component.html',
  styleUrl: './ai-insights.component.scss',
  standalone: false
})
export class AIInsightsComponent {

  constructor(private pokemonService: PokemonService) {}

  @Input() pokemon: any;

  loadingAIResponse = signal(false);
  AIInsight = signal("");
  chatHistory = signal<{ role: string, content: string }[]>([]);
  isOpen = false;

  emitSearch(value: string) {
    if (value.length >= 15) {
      this.askPokeAI(value);
    }
  }

  askPokeAI(question: string) {
    this.loadingAIResponse.set(true);
    this.pokemonService.askPokeAI(question, this.pokemon()?.name, this.chatHistory()).subscribe({
      next: (data) => {
        console.log(data.response)
        this.AIInsight.set(data.response);
        this.chatHistory.update(history => [...history, { role: "user", content: question }, { role: "assistant", content: data.response }]);
        this.loadingAIResponse.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loadingAIResponse.set(false);
      }
    });
  }
}