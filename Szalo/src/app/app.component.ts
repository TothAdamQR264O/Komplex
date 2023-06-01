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
  //name = localStorage.getItem('namefb');

  constructor(
    private router: Router,
    public authService: AuthService,
    private toastrService: ToastrService
  ) { }

  goToPage(pageName:string):void {
    if(pageName == "/home"){
      localStorage.removeItem('hid');
    }
    this.router.navigate([ `${pageName}` ]);
    this.reloadPage();
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }


  logout() {
    this.authService.removeToken();
    localStorage.removeItem('email');
    localStorage.removeItem('namefb');
    localStorage.removeItem('fberlo');
    localStorage.removeItem('hid');
    this.router.navigateByUrl('/');
    this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
  }
}
