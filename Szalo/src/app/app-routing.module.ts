import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LakasComponent } from './Components/berlo/lakas/lakas.component';
import { HazComponent } from './Components/foberlo/haz/haz.component';
import { SzerkesztesComponent } from './Components/foberlo/szerkesztes/szerkesztes.component';
import { SzobaComponent } from './Components/foberlo/szoba/szoba.component';
import { BejelentkezesComponent } from './Components/logreg/bejelentkezes/bejelentkezes.component';
import { RegisztralasComponent } from './Components/logreg/regisztralas/regisztralas.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', component: BejelentkezesComponent },
  { path: 'reg', component: RegisztralasComponent },
  { path: 'home', component: HazComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'home/:email', component: HazComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'room', component: SzobaComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'lak', component: LakasComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'szerk/:id', component: SzerkesztesComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
