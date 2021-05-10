import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  totalPokemons!: number;
  searchText: any;
  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.getPokemons();

  }
  getPokemons(){
  this.dataService.getPokemons(20)
  .subscribe((response: any)=>{
    this.totalPokemons = response.count;
    response.results.forEach((result: { id: number; }) => {
      this.dataService.getMoreData(result.id)
      .subscribe((uniqResponse: any)=>{
        this.pokemons.push(uniqResponse);
        console.log(result.id) 
      });
    });
  });

  }
}

