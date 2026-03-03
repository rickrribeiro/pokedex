import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';


@Injectable()
export class PokemonService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPokemons(limit?: number, offset?: number, name?: string): Observable<any> {
    let params = new HttpParams();
    
    if (limit) params = params.set('limit', limit.toString());
    if (offset) params = params.set('offset', offset.toString());
    if (name) params = params.set('name', name);

    const res = this.http.get<any>(this.API_URL+"/pokemon", { params });
    // console.log(this.API_URL+"/pokemon")
    // console.log(params.toString())
    return res;
  }

  getPokemonByNameOrId(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/pokemon/${id}`);
  }

  // TODO: tipar aq
  askPokeAI(question: string, pokemon?: string, chatHistory?: any[]): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/pokemon/pokeai`, { question, pokemon, chatHistory });
  }

}