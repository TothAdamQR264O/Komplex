import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Szaló';
  email = localStorage.getItem('email');

  constructor(
    private router: Router,
    public authService: AuthService,
    private toastrService: ToastrService
  ) { }

  logout() {
    this.authService.removeToken();
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
    this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
  }
}
