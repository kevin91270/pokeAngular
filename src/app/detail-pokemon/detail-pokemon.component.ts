import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.css']
})
export class DetailPokemonComponent {

  PokemonById: any; 
  PokemonID!: number;
  MyPokemon: any[] = [];

  DescriptionAtk: any[] = [];
  PokemonDescription: any[] = [];

  PokemonSpecies: any;
  PokemonEvo: any;
  PokemonEvoURL!: string;

  Evo3!: boolean;
  Evo2!: boolean;
  Evo1!: boolean;

  FirstEvo: any;
  SecondEvo: any;
  ThirdEvo: any;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.PokemonID = this.route.snapshot.params.id;
    this.getPokemon(this.PokemonID);
    this.getPokemonSpecies(this.PokemonID); 

  }

  getPokemon(id: number) {
    this.dataService.getPokemonById(id).subscribe((response: any) =>
    {
     
      this.DescriptionAtk = response.moves;  
      this.DescriptionAtk.forEach(element => 
        {
          this.getAtk(element.move.url);
        })
      this.PokemonById = response;
    });
  }

  getPokemonSpecies(id: number){
    this.dataService.getPokemonSpecies(id).subscribe((Speciesresponse: any) => 
    {
      this.PokemonEvoURL = Speciesresponse.evolution_chain.url;
      this.PokemonSpecies = Speciesresponse;
      this.getPokemonEvolution(this.PokemonEvoURL);
    });
  }

  getPokemonEvolution(url: string){
    this.dataService.getPokemonEvolution(url).subscribe((evolResponse: any) => 
    {
      this.PokemonEvo = evolResponse;
     
      if(this.PokemonEvo.chain.evolves_to[0].evolves_to == ""){
        this.Evo3 = false;
        this.Evo2 = true;
        this.Evo1 = false;

        this.dataService.getData(this.PokemonEvo.chain.species.name).subscribe((moreResponse: any) => 
        {
          this.FirstEvo = moreResponse;

        });

        this.dataService.getData(this.PokemonEvo.chain.evolves_to[0].species.name).subscribe((moreResponse: any) => 
        {
          this.SecondEvo = moreResponse;
        });
      }
      else if (this.PokemonEvo.chain.evolves_to[0].evolves_to != ""){
        this.Evo3 = true;
        this.Evo2 = false;
        this.Evo1 = false;

        this.dataService.getData(this.PokemonEvo.chain.species.name).subscribe((moreResponse: any) => 
        {
          this.FirstEvo = moreResponse;
        });

        this.dataService.getData(this.PokemonEvo.chain.evolves_to[0].species.name).subscribe((moreResponse: any) => 
        {
          this.SecondEvo = moreResponse;
        });

        this.dataService.getData(this.PokemonEvo.chain.evolves_to[0].evolves_to[0].species.name).subscribe((moreResponse: any) => 
        {
          this.ThirdEvo = moreResponse;
        });
      }
    })
  }

  getAtk(url: string){
    this.dataService.getAtk(url).subscribe((moveResponse : any) => 
    {
      try {
        this.PokemonDescription.push(moveResponse.flavor_text_entries[40].flavor_text);
      } catch (error) {
        try {
          this.PokemonDescription.push(moveResponse.flavor_text_entries[32].flavor_text);
        } catch (error) {
          this.DescriptionAtk.push("Description not found.")
        }
        
      }
    })
    
  }

}
