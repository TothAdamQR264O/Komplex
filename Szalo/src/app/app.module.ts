import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FoberloComponent } from './Components/foberlo/foberlo.component';
import { HazComponent } from './Components/haz/haz.component';
import { FormsModule } from '@angular/forms';
import { BejelentkezesComponent } from './Components/bejelentkezes/bejelentkezes.component';
import { BerloComponent } from './Components/berlo/berlo.component';

@NgModule({
  declarations: [
    AppComponent,
    FoberloComponent,
    HazComponent,
    BejelentkezesComponent,
    BerloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
