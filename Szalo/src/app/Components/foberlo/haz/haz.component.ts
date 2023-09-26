import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HazDTO, FoberloDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-haz',
  templateUrl: './haz.component.html',
  styleUrls: ['./haz.component.css']
})
export class HazComponent {
  hazak: HazDTO[] = [];
  visable = true;
  valide = 0;
  isNewHouse = true;
  

  hazForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    hrsz: this.formBuilder.control(''),
    irsz: this.formBuilder.control<number|null>(null),
    telepules: this.formBuilder.control(''),
    cim: this.formBuilder.control(''),
    reszi: this.formBuilder.control(0),
    ar: this.formBuilder.control(0),
    szobakszama: this.formBuilder.control(0),
    meret: this.formBuilder.control(0),
    alapot: this.formBuilder.control(""),
    konfort: this.formBuilder.control(""),
    emelet: this.formBuilder.control(0),
    szint: this.formBuilder.control(0),
    lift: this.formBuilder.control(""),
    legkondi: this.formBuilder.control(""),
    butorozott: this.formBuilder.control(""),
    koltozheto: this.formBuilder.control(""),
    minberido: this.formBuilder.control(0),
    fureswc: this.formBuilder.control(""),
    kilatas: this.formBuilder.control(""),
    erkelymeret: this.formBuilder.control(0),
    gepesitet: this.formBuilder.control(""),
  });

  constructor(
    private houseService: HouseService,
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private foberloService: FoberloService,
    private activatedRoute: ActivatedRoute
    ) {}


  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/');
    this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
  }

  goToTheRooms(id: number){
    this.houseService.getOne(id).subscribe({
      next: (haz) => {
        this.hazForm.setValue(haz);
        localStorage.setItem('hid', "" + haz.id);
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
      }
    });
    this.reloadPage();
    this.router.navigateByUrl('/room');
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }
  
  goToPage(pageName:string):void {
    this.router.navigate([ `${pageName}` ]);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id){
      this.isNewHouse = false;

      this.houseService.getOne(id).subscribe({
        next: (haz) => this.hazForm.setValue(haz),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
        }
      });
    }
    else{
      this.houseService.getAll().subscribe({
        next: (hazak) => {
          this.hazak = hazak;
          console.log(hazak);
        },
        error: (err) => {
          this.toastrService.error('A házak lista betöltésében hiba keletkezett.', 'Hiba');
        }
      });
    }
  }

  changeHouseValue(id: number) {
    this.houseService.getOne(id).subscribe({
      next: (haz) => this.hazForm.setValue(haz),
      error: (err) => {
        console.error(err);
        this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
      }
    });
    this.visable = false;
    this.isNewHouse = false;
  }

  valueValidate(): number{
    this.valide = 0;
    if(!this.hazForm.value.hrsz  || !this.hazForm.value.telepules || !this.hazForm.value.cim || !this.hazForm.value.alapot || !this.hazForm.value.konfort || !this.hazForm.value.lift || !this.hazForm.value.legkondi || !this.hazForm.value.butorozott || !this.hazForm.value.koltozheto || !this.hazForm.value.fureswc || !this.hazForm.value.kilatas || !this.hazForm.value.gepesitet){
      this.valide = 1;
    }
    if(this.hazForm.value.irsz && this.hazForm.value.reszi && this.hazForm.value.ar && this.hazForm.value.szobakszama && this.hazForm.value.meret && this.hazForm.value.emelet && this.hazForm.value.szint && this.hazForm.value.minberido && this.hazForm.value.erkelymeret){
      if(this.hazForm.value.irsz > 9999 || this.hazForm.value.irsz <= 999 || this.hazForm.value.reszi < 0 || this.hazForm.value.ar < 1 || this.hazForm.value.szobakszama < 1 || this.hazForm.value.meret < 1 || this.hazForm.value.emelet < 0 || this.hazForm.value.szint < 0 || this.hazForm.value.minberido < 0 || this.hazForm.value.erkelymeret < 0){
        if(this.valide == 1){
          this.valide = 3;
        }
        else{
          this.valide = 2
        }
      }
    }
    else{
      this.valide = 1;
    }
    return this.valide;
  }

  saveHouse() {
    const haz = this.hazForm.value as HazDTO;
    if(this.valueValidate() == 0){
      if(this.isNewHouse){
        this.houseService.create(haz).subscribe({
          next: (haz) => {
            this.toastrService.success('Ház felvitele sikeresen megtörtént', 'Siker');
            this.router.navigateByUrl('/home');
            },
            error: (err) => {
              this.toastrService.error('Nem sikerült felvinni az adatokat.', 'Hiba');
            }
        });
        this.visable = true;
      }
      else{
        this.houseService.update(haz).subscribe({
          next: (haz) => {
            this.toastrService.success('Ház adaainak megváltoztatása sikeresen megtörtént', 'Siker');
            this.router.navigateByUrl('/home');
          },
          error: (err) => {
            this.toastrService.error('Nem sikerült megváltoztatni az adatokat.', 'Hiba');
          }
        });
        this.visable = true;
      }
      location.reload();
    }
    else if(this.valueValidate() == 1) {
      this.toastrService.error('Valamien adat nincsen kitöltve. Kérem töltsön ki mindent!', 'Üres sor!', {});
    }
    else if(this.valueValidate() == 2) {
      this.toastrService.error('Valamilyen számadatban hibás érték van megadva.', 'Rossz szám adat!', {});
    }
    else if(this.valueValidate() == 3) {
      this.toastrService.error('Valamien adat nincsen kitöltve és valamilyen számadatban hibás érték van megadva. Kérem töltsön ki mindent!', 'Üres sor és rossz számadat!', {});
    }
  }

  canceled(){
    this.visable = true;
  }

  creatHouse(){
    this.visable = false;
  }

  changeVisable(): boolean{
    return this.visable;
  }
}
