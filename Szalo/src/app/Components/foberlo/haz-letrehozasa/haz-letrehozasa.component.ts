import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoberloDTO, HazDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-szerkesztes',
  templateUrl: './haz-letrehozasa.component.html',
  styleUrls: ['./haz-letrehozasa.component.css']
})
export class SzerkesztesComponent {
 
  valide = true;
  isNewHouse = true;
  

  hazForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    hrsz: this.formBuilder.control('', [Validators.required]),
    irsz: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(1000), Validators.max(9999)]),
    telepules: this.formBuilder.control('', [Validators.required]),
    cim: this.formBuilder.control('', [Validators.required]),
    rezsi: this.formBuilder.control<number>(0, [Validators.required, Validators.min(0)]),
    ar: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    szobakszama: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    meret: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    allapot: this.formBuilder.control("", [Validators.required]),
    komfort: this.formBuilder.control("", [Validators.required]),
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
    gepesitett: this.formBuilder.control("", [Validators.required]),
    hirdet: this.formBuilder.control("", [Validators.required]),
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

    
  selectedkomfort: any = ';'
  komfortArr = [
    {
      label:'Luxus',
      value: 'Luxus'
    },
    {
      label:'Duplakomfort',
      value: 'Duplakomfort'
    },
    {
      label:'Összkomfort',
      value: 'Összkomfort'
    },
    {
      label:'komfortos',
      value: 'komfortos'
    },
    {
      label:'Félkomfortos',
      value: 'Félkomfortos'
    },
    {
      label:'komfort nélküli',
      value: 'komfort nélküli'
    },
  ];

  onRadioChange(event:any){
    
    // Kiválasztja az értéket
    this.selectedkomfort = event.target.value;
    if(event.target.value == "Luxus"){
      this.hazForm.value.komfort = event.target.value;
    }else if(event.target.value == "Duplakomfort"){
      this.hazForm.value.komfort = event.target.value;
    }else if(event.target.value == "Összkomfort"){
      this.hazForm.value.komfort = event.target.value;
    }else if(event.target.value == "komfortos"){
      this.hazForm.value.komfort = event.target.value;
    }else if(event.target.value == "Félkomfortos"){
      this.hazForm.value.komfort = event.target.value;
    }else if(event.target.value == "komfort nélküli"){
      this.hazForm.value.komfort = event.target.value;
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

  
  goToPage(pageName:string):void {
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

    this.hazForm.valueChanges.subscribe({
      next: () => this.valueValidate()
    });
  }


  valueValidate(): boolean{
    this.hazForm.markAllAsTouched();
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
    }
    //location.reload();
  }

  canceled(){
    this.router.navigate(['/home']);
  }
}
