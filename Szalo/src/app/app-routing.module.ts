import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoberloComponent } from './Components/foberlo/foberlo.component';
import { HazComponent } from './Components/haz/haz.component';
import { BejelentkezesComponent } from './Components/bejelentkezes/bejelentkezes.component';
import { BerloComponent } from './Components/berlo/berlo.component';

const routes: Routes = [
  { path: '', component: BejelentkezesComponent },
  { path: 'home', component: FoberloComponent },
  { path: 'room', component: BerloComponent },
  { path: 'house', component: HazComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

