import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HazDTO, FoberloDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { HouseService } from 'src/app/services/house.service';

import * as _ from 'lodash';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-haz',
  templateUrl: './haz.component.html',
  styleUrls: ['./haz.component.css']
})
export class HazComponent {
  hazak: HazDTO[] = [];
  hazakNoAd: HazDTO[] = [];
  visable = true;
  valide = true;
  isNewHouse = true;

  sajatSzerzodesek: SzerzodesDTO[] = [];



  hazForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    hrsz: this.formBuilder.control('', [Validators.required]),
    irsz: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(1000), Validators.max(9999)]),
    telepules: this.formBuilder.control('', [Validators.required]),
    cim: this.formBuilder.control('', [Validators.required]),
    reszi: this.formBuilder.control<number>(0, [Validators.required, Validators.min(0)]),
    ar: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    szobakszama: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    meret: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    alapot: this.formBuilder.control("", [Validators.required]),
    konfort: this.formBuilder.control("", [Validators.required]),
    emelet: this.formBuilder.control<number>(0, [Validators.required, Validators.min(0)]),
    szint: this.formBuilder.control<number>(0, [Validators.required, Validators.min(0)]),
    lift: this.formBuilder.control(""),
    legkondi: this.formBuilder.control("", [Validators.required]),
    butorozott: this.formBuilder.control("", [Validators.required]),
    koltozheto: this.formBuilder.control("", [Validators.required]),
    minberido: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    fureswc: this.formBuilder.control("", [Validators.required]),
    kilatas: this.formBuilder.control("", [Validators.required]),
    erkelymeret: this.formBuilder.control<number>(0, [Validators.required, Validators.min(0)]),
    gepesitet: this.formBuilder.control("", [Validators.required]),
    hirdet: this.formBuilder.control("", [Validators.required]),
  });


  constructor(
    private houseService: HouseService,
    public authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private foberloService: FoberloService,
    private szerzodesService: SzerzodesService,
    private activatedRoute: ActivatedRoute
  ) { }

  selectedKonfort: any = ';'
  konfortArr = [
    {
      label:'Luxus',
      value: 'Luxus'
    },
    {
      label:'Duplakonfort',
      value: 'Duplakonfort'
    },
    {
      label:'Összkonfort',
      value: 'Összkonfort'
    },
    {
      label:'Konfortos',
      value: 'Konfortos'
    },
    {
      label:'Félkonfortos',
      value: 'Félkonfortos'
    },
    {
      label:'Konfort nélküli',
      value: 'Konfort nélküli'
    },
  ];

  onRadioChange(event:any){
    
    // Kiválasztja az értéket
    this.selectedKonfort = event.target.value;
    if(event.target.value == "Luxus"){
      this.hazForm.value.konfort = event.target.value;
    }else if(event.target.value == "Duplakonfort"){
      this.hazForm.value.konfort = event.target.value;
    }else if(event.target.value == "Összkonfort"){
      this.hazForm.value.konfort = event.target.value;
    }else if(event.target.value == "Konfortos"){
      this.hazForm.value.konfort = event.target.value;
    }else if(event.target.value == "Félkonfortos"){
      this.hazForm.value.konfort = event.target.value;
    }else if(event.target.value == "Konfort nélküli"){
      this.hazForm.value.konfort = event.target.value;
    }
  }

  switchVolume = -1;
  onSwicChange(event:any){
    this.switchVolume *=-1;
  }

  liftVolume(){
    if(this.switchVolume == 1){
      this.hazForm.value.lift = "Igen";
    }else{
      this.hazForm.value.lift = "Nem";
    }
  }


  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/');
    this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
  }

  goToTheApplys(id: number) {
    this.router.navigate([ '/appys', id ]);
  }

  goToTheApply(szerzodesId: number) {
    this.router.navigate([ '/resident', szerzodesId ]);
  }
  szerzodesLezaras(szerzodesId: number) {
    this.router.navigate([ '/szerzodes-lezaras', szerzodesId ]);
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewHouse = false;

      this.houseService.getOne(id).subscribe({
        next: (haz) => this.hazForm.setValue(haz),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
        }
      });
    }
    else {
      this.houseService.getAll().subscribe({
        next: (hazak) => {
          //this.hazak = hazak;
          var hir = 0;
          var noHir = 0;
          for(var i = 0; i < hazak.length; i++){
            
            if(hazak[i].hirdet == "Igen"){
              this.hazak[hir] = hazak[i];
              hir++;
            }
            else{
              this.hazakNoAd[noHir] = hazak[i];
              noHir++;
            }
          }
        },
        error: (err) => {
          this.toastrService.error('A házak lista betöltésében hiba keletkezett.', 'Hiba');
        }
      });
    }

    this.szerzodesService.getTulaj().subscribe({
      next: (szerzodesek) => this.sajatSzerzodesek = szerzodesek,
      error: (err) => this.toastrService.error('Hiba a szerződések betöltésekor.', 'Hiba')
    })

    this.hazForm.valueChanges.subscribe({
      next: () => this.valueValidate()
    });
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

  valueValidate(): boolean {
    this.hazForm.markAllAsTouched();

    /*const emeletHibas =  (this.hazForm.value.emelet && !this.hazForm.value.szint)
      || (this.hazForm.value.emelet && this.hazForm.value.szint && this.hazForm.value.szint < this.hazForm.value.emelet);

    if (emeletHibas) {
      this.hazForm.get('emelet')?.setErrors({ elteroEmelet: true });
    } else {
      const newErrors = _.omit(this.hazForm.get('emelet')?.errors, 'elteroEmelet');
      this.hazForm.get('emelet')?.setErrors(newErrors);
    }*/

    return this.hazForm.valid;
  }

  saveHouse() {
    const haz = this.hazForm.value as HazDTO;

    if (!this.valueValidate()) {
      return;
    }

    if (this.isNewHouse) {
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
    else {
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
    //location.reload();
  }

  canceled() {
    this.visable = true;
  }

  creatHouse() {
    this.visable = false;
  }

  changeVisable(): boolean {
    return this.visable;
  }
}
