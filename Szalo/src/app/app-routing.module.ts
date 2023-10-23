import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeresoComponent } from './Components/berlo/kereso/kereso.component';
import { LakasComponent } from './Components/berlo/lakas/lakas.component';
import { HazComponent } from './Components/foberlo/haz/haz.component';
import { SzerkesztesComponent } from './Components/foberlo/szerkesztes/szerkesztes.component';
import { BejelentkezesComponent } from './Components/logreg/bejelentkezes/bejelentkezes.component';
import { RegisztralasComponent } from './Components/logreg/regisztralas/regisztralas.component';
import { AuthService } from './services/auth.service';
import { JelentkezokComponent } from './Components/foberlo/jelentkezok/jelentkezok.component';
import { SzerzodesComponent } from './Components/foberlo/szerzodes/szerzodes.component';
import { LakoComponent } from './Components/foberlo/lako/lako.component';
import { EsemenyComponent } from './Components/foberlo/esemeny/esemeny.component';
import { HaviosszesitoComponent } from './Components/foberlo/haviosszesito/haviosszesito.component';

const routes: Routes = [
  { path: '', component: BejelentkezesComponent },
  { path: 'reg', component: RegisztralasComponent },
  { path: 'home', component: HazComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'home/:email', component: HazComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'lak', component: LakasComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'keres', component: KeresoComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'appys/:hazId', component: JelentkezokComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'contract/:id', component: SzerzodesComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'event', component: EsemenyComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'monthlysummary', component: HaviosszesitoComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'resident/:szerzodesId', component: LakoComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'szerk/:id', component: SzerkesztesComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
