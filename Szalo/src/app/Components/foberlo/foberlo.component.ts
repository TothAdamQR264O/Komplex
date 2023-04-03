import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { hazak } from '../../modellek/houses';

@Component({
  selector: 'app-foberlo',
  templateUrl: './foberlo.component.html',
  styleUrls: ['./foberlo.component.css']
})
export class FoberloComponent {
  hazak = hazak;

  constructor(private router: Router) { }

  goToTheRooms(){
    this.router.navigateByUrl('/house');
  }

  goToPage(pageName:string):void {
    this.router.navigate([`${pageName}`]);
  }

}

