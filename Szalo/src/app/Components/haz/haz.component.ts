import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { szobak } from '../../modellek/rooms';

@Component({
  selector: 'app-haz',
  templateUrl: './haz.component.html',
  styleUrls: ['./haz.component.css']
})
export class HazComponent {
  szobak = szobak;

  constructor(private router: Router) { }

  goToPage(pageName:string):void {
    this.router.navigate([`${pageName}`]);
  }

}
