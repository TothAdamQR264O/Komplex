import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-berlo',
  templateUrl: './berlo.component.html',
  styleUrls: ['./berlo.component.css']
})
export class BerloComponent {

  constructor(private router: Router) { }

  goToPage(pageName:string):void {
    this.router.navigate([`${pageName}`]);
  }
}
