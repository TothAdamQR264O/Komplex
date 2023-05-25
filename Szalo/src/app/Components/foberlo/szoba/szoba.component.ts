import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HazDTO, SzobaDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HouseService } from 'src/app/services/house.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-szoba',
  templateUrl: './szoba.component.html',
  styleUrls: ['./szoba.component.css']
})
export class SzobaComponent {
  szobak: SzobaDTO[] = [];
  visable = true;
  valide = true;

  szobaForm = this.formBuilder.group({
    ar: this.formBuilder.control(0),
    meret: this.formBuilder.control(0),
    ferohely: this.formBuilder.control(0),
    hid: this.formBuilder.control<null | HazDTO>(null)
  });

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
      next: (szobak) => {
        this.szobak = szobak;
        console.log(szobak);
      },
      error: (err) => {
        this.toastrService.error('A szobák lista betöltésében hiba keletkezett.', 'Hiba');
      }
    });
  }

  valueValidate(): boolean{
    this.valide = true;
    if(!this.szobaForm.value.ar || !this.szobaForm.value.ferohely || !this.szobaForm.value.meret){
      this.valide = false;
    }
    return this.valide;
  }
  
  saveRoom() {
    if(this.valueValidate()){
      const szoba= this.szobaForm.value as SzobaDTO;
      this.szobaService.create(szoba).subscribe({
          next: (szoba) => {
            this.toastrService.success('SZoba felvitele sikeresen megtörtént.', 'Siker');
            this.router.navigateByUrl('/room');
          },
          error: (err) => {
            this.toastrService.error('Nem sikerült felvinni az adatokat.', 'Hiba');
          }
        });
        this.visable = true;
    }
    else{
      this.toastrService.error('Valameilyk adat nincs kitöltve.', 'Hiba');
    }
  }

  canceled(){
    this.visable = true;
  }

  creatRoom(){
    this.visable = false;
  }

  changeVisable(): boolean{
    return this.visable;
  }
}
