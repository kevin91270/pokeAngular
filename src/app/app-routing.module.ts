import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetailPokemonComponent} from './detail-pokemon/detail-pokemon.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
const routes: Routes = [
  {path: 'home', component: PokemonListComponent},
  {path: 'detail-pokemon/:id', component: DetailPokemonComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: '**', pathMatch: 'full', redirectTo: 'home'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
