import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LakasComponent } from './Components/berlo/lakas/lakas.component';
import { HazComponent } from './Components/foberlo/haz/haz.component';
import { SzobaComponent } from './Components/foberlo/szoba/szoba.component';
import { BejelentkezesComponent } from './Components/logreg/bejelentkezes/bejelentkezes.component';
import { RegisztralasComponent } from './Components/logreg/regisztralas/regisztralas.component';

const routes: Routes = [
  { path: '', component: BejelentkezesComponent },
  { path: 'reg', component: RegisztralasComponent },
  { path: 'home', component: HazComponent },
  { path: 'room', component: SzobaComponent },
  { path: 'lak', component: LakasComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
