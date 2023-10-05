import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LakasComponent } from './Components/berlo/lakas/lakas.component';
import { KeresoComponent } from './Components/berlo/kereso/kereso.component';
import { HazComponent } from './Components/foberlo/haz/haz.component';
import { BejelentkezesComponent } from './Components/logreg/bejelentkezes/bejelentkezes.component';
import { RegisztralasComponent } from './Components/logreg/regisztralas/regisztralas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AccessTokenInterceptor } from './services/access-token.interceptor';
import { UnauthorizedInterceptor } from './services/unauthorized.interceptor';
import { SzerkesztesComponent } from './Components/foberlo/szerkesztes/szerkesztes.component';
import { JelentkezokComponent } from './Components/foberlo/jelentkezok/jelentkezok.component';

@NgModule({
  declarations: [
    AppComponent,
    LakasComponent,
    KeresoComponent,
    HazComponent,
    BejelentkezesComponent,
    RegisztralasComponent,
    SzerkesztesComponent,
    JelentkezokComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: UnauthorizedInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
