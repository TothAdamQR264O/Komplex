import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent {
  pagenChoice = "/";

  constructor(private router: Router) { }
  
  goToPage(){
    this.router.navigateByUrl(''+this.pagenChoice);
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
      this.pagenChoice = "/home";
    }else if(event.target.value == "b"){
      this.pagenChoice = "/lak";
    }
  }
}
