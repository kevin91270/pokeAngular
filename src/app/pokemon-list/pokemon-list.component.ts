import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  totalPokemons!: number;
  searchText: any;
  IdPokemon!: number;
  
  
  constructor(
    private dataService: DataService, private router: Router
  ) { }

  ngOnInit(): void {
    this.getPokemons();

  }
  getPokemonId(id: number){
    this.router.navigateByUrl(`/detail-pokemon/${id}`)
  }

  getPokemons(){
  this.dataService.getPokemons(151)
  .subscribe((response: any)=>{
    this.totalPokemons = response.count;
    response.results.forEach((result: {name: string}) => { 
    
      this.dataService.getData( result.name)
      .subscribe((Response: any)=>{
        this.pokemons.push(Response);      
      });
    });
  });
  

  }
}

