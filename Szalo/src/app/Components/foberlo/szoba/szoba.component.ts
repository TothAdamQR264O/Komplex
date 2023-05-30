import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoberloDTO, HazDTO, SzobaDTO } from 'models';
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
  hazak: HazDTO[] = [];
  visable = true;
  valide = true;
  isNewRoom = true;
  hid = Number(localStorage.getItem('hid'));
  

  hazForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    hrsz: this.formBuilder.control(''),
    cim: this.formBuilder.control(''),
    reszi: this.formBuilder.control(0),
    furdo: this.formBuilder.control(0),
    wc: this.formBuilder.control(0),
    viz: this.formBuilder.control(''),
    melegviz: this.formBuilder.control(''),
    internet: this.formBuilder.control(''),
    tv: this.formBuilder.control(''),
    mosogep: this.formBuilder.control(''),
    meret: this.formBuilder.control(0),
    tulaj: this.formBuilder.control<null | FoberloDTO>(null)
  });

  szobaForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    nev: this.formBuilder.control(''),
    ar: this.formBuilder.control(0),
    meret: this.formBuilder.control(0),
    ferohely: this.formBuilder.control(0),
    kiado: this.formBuilder.control(''),
    szabadhely: this.formBuilder.control(0),
    hid: this.formBuilder.control<null | HazDTO>(this.hazak[0])
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

    
    this.houseService.getOne(this.hid).subscribe({
      next: (haz) => {
        this.hazak.push(haz);
        this.hazForm.setValue(haz);
        this.szobaService.getAll().subscribe({
          next: (szobak) => {
            for(var index in szobak)
              { 
                if(this.compareObjects(szobak[index].hid, this.hazForm.value)){
                  this.szobak.push(szobak[index]);
                  console.log(szobak[index]);
                }
              }
          },
          error: (err) => {
            this.toastrService.error('A szobák lista betöltésében hiba keletkezett.', 'Hiba');
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
      }
    });

    

  }

  changeRoomValue(id: number) {
    this.szobaService.getOne(id).subscribe({
      next: (szoba) => this.szobaForm.setValue(szoba),
      error: (err) => {
        console.error(err);
        this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
      }
    });
    this.visable = false;
    this.isNewRoom = false;
  }

  valueValidate(): boolean{
    this.valide = true;
    if(!this.szobaForm.value.nev || !this.szobaForm.value.ar || !this.szobaForm.value.ferohely || !this.szobaForm.value.meret){
      this.valide = false;
    }
    return this.valide;
  }
  
  saveRoom() {
    const szoba = this.szobaForm.value as SzobaDTO;
    if(this.isNewRoom){
      if(this.valueValidate()){
        szoba.szabadhely = szoba.ferohely;
        this.szobaService.create(szoba).subscribe({
            next: (szoba) => {
              this.toastrService.success('Szoba felvitele sikeresen megtörtént.', 'Siker');
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
    else{
      if(this.valueValidate()){
        this.szobaService.update(szoba).subscribe({
            next: () => {
              this.toastrService.success('Szoba adaainak megváltoztatása sikeresen megtörtént.', 'Siker');
              this.router.navigateByUrl('/room');
            },
            error: (err) => {
              this.toastrService.error('Nem sikerült megváltoztatni az adatokat.', 'Hiba');
            }
          });
          this.visable = true;
      }
      else{
        this.toastrService.error('Valameilyk adat nincs kitöltve.', 'Hiba');
      }
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

  compareObjects(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id;
  }

  assignObjects(obj1: any, obj2: any) {
    obj1.assign(obj2);
  }
}
