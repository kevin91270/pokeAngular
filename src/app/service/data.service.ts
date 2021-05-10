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
  getMoreData(id: number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
