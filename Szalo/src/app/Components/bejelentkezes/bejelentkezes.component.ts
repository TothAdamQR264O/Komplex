import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent {

  constructor(private router: Router) { }

  goToPage(pageName:string):void {
    this.router.navigate([`${pageName}`]);
  }
}
