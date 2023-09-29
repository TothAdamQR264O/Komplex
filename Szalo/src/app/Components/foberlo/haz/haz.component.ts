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
  valide = true;
  isNewHouse = true;
  errorMessages: string[] = ["","","","","","","","","","","","","","","","","","","","","",""];
  
  

  hazForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    hrsz: this.formBuilder.control(''),
    irsz: this.formBuilder.control<number|null>(null),
    telepules: this.formBuilder.control(''),
    cim: this.formBuilder.control(''),
    reszi: this.formBuilder.control<number|null>(null),
    ar: this.formBuilder.control(0),
    szobakszama: this.formBuilder.control(0),
    meret: this.formBuilder.control(0),
    alapot: this.formBuilder.control(""),
    konfort: this.formBuilder.control(""),
    emelet: this.formBuilder.control<number|null>(null),
    szint: this.formBuilder.control<number|null>(null),
    lift: this.formBuilder.control(""),
    legkondi: this.formBuilder.control(""),
    butorozott: this.formBuilder.control(""),
    koltozheto: this.formBuilder.control(""),
    minberido: this.formBuilder.control(0),
    fureswc: this.formBuilder.control(""),
    kilatas: this.formBuilder.control(""),
    erkelymeret: this.formBuilder.control<number|null>(null),
    gepesitet: this.formBuilder.control(""),
    hirdet: this.formBuilder.control(""),
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

  valueValidate(): boolean{
    var errorMessage = '';
    this.errorMessages.fill("");
    var errorNumber = 0;

    this.valide = true;
    if(!this.hazForm.value.hrsz){
      this.errorMessages.splice(0, 0, 'A helyrajzi szám nincs megadva');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.irsz || this.hazForm.value.irsz > 9999 || this.hazForm.value.irsz <= 999){
      this.errorMessages.splice(1, 0, 'Az irányítószám vagy nincs megadva, vagy formátuma nem megfelelő!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.telepules){
      this.errorMessages.splice(2, 0, 'A település nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.cim){
      this.errorMessages.splice(3, 0, 'A cím nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.reszi){
      this.hazForm.value.reszi = 0;
    }
    if(this.hazForm.value.reszi && this.hazForm.value.reszi < 0){
      this.errorMessages.splice(4, 0, 'A reszi formátuma nem megfelelő! Csak pozitív számot adhatsz meg!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.ar || this.hazForm.value.ar < 1){
      this.errorMessages.splice(5, 0, 'Az ár vagy nincs megadva, vagy formátuma nem megfelelő!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.szobakszama || this.hazForm.value.szobakszama < 1){
      this.errorMessages.splice(6, 0, 'A szobák száma vagy nincs megadva, vagy formátuma nem megfelelő!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.meret || this.hazForm.value.meret < 1){
      this.errorMessages.splice(7, 0, 'A méret vagy nincs megadva, vagy formátuma nem megfelelő!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.alapot){
      this.errorMessages.splice(8, 0, 'Az állapot jellege nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.konfort){
      this.errorMessages.splice(9, 0, 'A konfort tipusa nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.emelet){
      this.hazForm.value.emelet = 0;
    }
    if(!this.hazForm.value.szint){
      this.hazForm.value.szint = 0;
    }
    if(this.hazForm.value.emelet && this.hazForm.value.emelet < 0){
      this.errorMessages.splice(10, 0, 'Az emelet formátuma nem megfelelő!');
      this.valide = false;
      errorNumber += 1;
    }
    if((this.hazForm.value.emelet && !this.hazForm.value.szint) || (this.hazForm.value.emelet && this.hazForm.value.szint && this.hazForm.value.szint < this.hazForm.value.emelet)){
      this.errorMessages.splice(10, 0, 'Az épület szintjéhez képest ez már nem létező emelet!');
      this.valide = false;
      errorNumber += 1;
    }
    if(this.hazForm.value.szint && this.hazForm.value.szint < 0){
      this.errorMessages.splice(11, 0, 'Az épület szintjeinek szám formátuma nem megfelelő!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.lift){
      this.errorMessages.splice(12, 0, 'A liftek száma nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.legkondi){
      this.errorMessages.splice(13, 0, 'A légkondicionálóról való adat nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.butorozott){
      this.errorMessages.splice(14, 0, 'A butorzatról való adat nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.koltozheto){
      this.errorMessages.splice(15, 0, 'Nincs megadva, hogy kültözhető-e!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.minberido || this.hazForm.value.minberido < 0){
      this.errorMessages.splice(16, 0, 'A minimális bérlési idő vagy nincs megadva, vagy formátuma nem megfelelő!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.fureswc){
      this.errorMessages.splice(17, 0, 'A fürdőről és wcről levő adat nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.kilatas){
      this.errorMessages.splice(18, 0, 'A kilátás tipusa nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.gepesitet){
      this.errorMessages.splice(19, 0, 'A gépesítésről való adat nincs megadva!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.erkelymeret){
      this.hazForm.value.erkelymeret = 0;
    }
    if(this.hazForm.value.erkelymeret && this.hazForm.value.erkelymeret < 0){
      this.errorMessages.splice(20, 0, 'Az erkély méretének formátuma nem megfelelő!');
      this.valide = false;
      errorNumber += 1;
    }
    if(!this.hazForm.value.hirdet){
      this.errorMessages.splice(21, 0, 'Nincs megadva, hogy meghirdeti-e!');
      this.valide = false;
      errorNumber += 1;
    }

    if (!this.valide) {
      this.toastrService.error(errorMessage, 'Hiba!\nHibák száma: ' + errorNumber);
    }

    return this.valide;
  }

  saveHouse() {
    const haz = this.hazForm.value as HazDTO;

    if (this.valueValidate()) {
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
