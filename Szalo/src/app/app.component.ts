import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Szaló';
  userFullname = this.authService.getName();

  constructor(
    private router: Router,
    public authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.loggedInEvent.subscribe(() => this.updateUserData());
  }

  goToPage(pageName:string):void {
    if(pageName == "/home"){
      localStorage.removeItem('lakas');
    }
    this.router.navigate([ `${pageName}` ]);
  }

  updateUserData() {
    this.userFullname = this.authService.getName();
  }

  logout() {
    this.authService.removeToken();
    localStorage.removeItem('email');
    localStorage.removeItem('nev');
    localStorage.removeItem('fberlo');
    localStorage.removeItem('lakas');
    this.router.navigateByUrl('/');
    this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
  }
}
