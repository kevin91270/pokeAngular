import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }
  getPokemons(limit: number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  }
  getData(name: string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
  getPokemonById(id:number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getAtk(url:string){
    return this.http.get(url);
  }

  getPokemonSpecies(id:number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  }

  getPokemonEvolution(url:string){
    return this.http.get(url);
  }
}
