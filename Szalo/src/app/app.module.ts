import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LakasComponent } from './Components/berlo/lakas/lakas.component';
import { KeresoComponent } from './Components/berlo/kereso/kereso.component';
import { HazComponent } from './Components/foberlo/haz/haz.component';
import { SzobaComponent } from './Components/foberlo/szoba/szoba.component';
import { BejelentkezesComponent } from './Components/logreg/bejelentkezes/bejelentkezes.component';
import { RegisztralasComponent } from './Components/logreg/regisztralas/regisztralas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LakasComponent,
    KeresoComponent,
    HazComponent,
    SzobaComponent,
    BejelentkezesComponent,
    RegisztralasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
