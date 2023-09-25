import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoberloDTO, HazDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-szerkesztes',
  templateUrl: './szerkesztes.component.html',
  styleUrls: ['./szerkesztes.component.css']
})
export class SzerkesztesComponent {
 
  valide = true;
  

  hazForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    hrsz: this.formBuilder.control(''),
    irsz: this.formBuilder.control<number|null>(null),
    telepules: this.formBuilder.control(''),
    cim: this.formBuilder.control(''),
    reszi: this.formBuilder.control(0),
    meret: this.formBuilder.control(0),
    tulaj: this.formBuilder.control<null | FoberloDTO>(null)
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

  
  goToPage(pageName:string):void {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.houseService.getOne(id).subscribe({
      next: (haz) => this.hazForm.setValue(haz),
      error: (err) => {
        console.error(err);
        this.toastrService.error('A ház adatok betöltése sikertelen.', 'Hiba');
      }
    });
  }


  valueValidate(): boolean{
    this.valide = true;
    if(!this.hazForm.value.cim || !this.hazForm.value.hrsz ||  !this.hazForm.value.meret){
      this.valide = false;
    }
    return this.valide;
  }

  saveHouse() {
    if(this.valueValidate()){
      const haz= this.hazForm.value as HazDTO;
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
  }

  canceled(){
    
  }
}
