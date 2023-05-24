import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FoberloDTO, LoginDTO} from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BerloService } from 'src/app/services/berlo.service';
import { FoberloService } from 'src/app/services/foberlo.service';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent {
  loginForm = this.formBuilder.group({
    email: this.formBuilder.control(''),
    password: this.formBuilder.control('')
  });
  //pagenChoice = "/";
  serviceChoice = 0;

  constructor(
    private formBuilder: FormBuilder,
    private berloService: BerloService,
    private foberloService: FoberloService,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  /*goToPage(){
    this.router.navigateByUrl(''+this.pagenChoice);
  }*/

  goToReg(){
    this.router.navigateByUrl('/reg');
  }

  selectedUser: any = '';
  userArr = [
    {
      label:'Főbérlő',
      value: 'f'
    },
    {
      label:'Bérlő',
      value: 'b'
    },
  ];
  
  // Rádió gomb értékének változását ellenörzi
  onRadioChange(event:any){
    
    // Kiválasztja az értéket
    this.selectedUser = event.target.value;
    if(event.target.value == "f"){
      this.serviceChoice = 1;
    }else if(event.target.value == "b"){
      this.serviceChoice = 2;
    }
  }

  login() {
    const loginData = this.loginForm.value as LoginDTO;

    if(this.serviceChoice == 1){
      this.foberloService.login(loginData).subscribe({
        next: (response) => {
          this.authService.setToken(response.accessToken);
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.toastrService.error(err.error.error, 'Error');
        }
      });
    }else if(this.serviceChoice == 2){
      this.berloService.login(loginData).subscribe({
        next: (response) => {
          this.authService.setToken(response.accessToken);
          this.router.navigateByUrl('/lak');
        },
        error: (err) => {
          this.toastrService.error(err.error.error, 'Error');
        }
      });
    }

    
  }
}
