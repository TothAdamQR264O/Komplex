import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SzobaDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HouseService } from 'src/app/services/house.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-kereso',
  templateUrl: './kereso.component.html',
  styleUrls: ['./kereso.component.css']
})
export class KeresoComponent {
  szobak: SzobaDTO[] = [];

  constructor(
    private houseService: HouseService,
    private szobaService: RoomService,
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.szobaService.getAll().subscribe({
      next: (szoba) => {
        for(var index in szoba)
          { 
            if(szoba[index].kiado == 'Igen'){
              this.szobak.push(szoba[index]);
              console.log(szoba[index]);
            }
          }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A szobák betöltése sikertelen.', 'Hiba');
      }
    });
  }

  selectRoom(){
    
  }

  compareObjects(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id;
  }
}
