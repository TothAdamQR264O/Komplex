import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'models';
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

  szerepkor: 'foberlo' | 'berlo' | null = null;

  foberloForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    nev: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    szamlaszam: this.formBuilder.control(''),
    telefonszam: this.formBuilder.control(0)
  });

  constructor(
    private formBuilder: FormBuilder,
    private berloService: BerloService,
    private foberloService: FoberloService,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }


  goToReg() {
    this.router.navigateByUrl('/reg');
  }

  szerepkorok = [
    {
      label: 'Főbérlő',
      value: 'foberlo'
    },
    {
      label: 'Bérlő',
      value: 'berlo'
    },
  ];

  valueValidate(): boolean {
    return Boolean(this.loginForm.value.email && this.loginForm.value.password && this.szerepkor);
  }

  login() {
    const loginData = this.loginForm.value as LoginDTO;

    if (!this.valueValidate()) {
      this.toastrService.error("Minden adat kitöltése kötelező!", 'Hiba');
      return;
    }

    if (this.szerepkor === 'foberlo') {
      this.foberloService.login(loginData).subscribe({
        next: (response) => {
          this.authService.setToken(response.accessToken);
          this.authService.setRole(response.role);
          this.authService.setName(response.name);
          this.authService.loggedInEvent.emit();
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.toastrService.error(err.error.error, 'Error');
        }
      });
    }

    if (this.szerepkor === 'berlo') {
      this.berloService.login(loginData).subscribe({
        next: (response) => {
          this.authService.setToken(response.accessToken);
          this.authService.setRole(response.role);
          this.authService.setName(response.name);
          this.authService.loggedInEvent.emit();
          this.router.navigateByUrl('/lak');
        },
        error: (err) => {
          this.toastrService.error(err.error.error, 'Error');
        }
      });
    }
  }

}
