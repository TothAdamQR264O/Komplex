import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerloService } from 'src/app/services/berlo.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { FoberloDTO, BerloDTO} from 'models';

@Component({
  selector: 'app-regisztralas',
  templateUrl: './regisztralas.component.html',
  styleUrls: ['./regisztralas.component.css']
})
export class RegisztralasComponent {
  changeVisable = true;
  valide = true;

  foberloForm = this.formBuilder.group({
    namefb: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required]),
    szamlaszamfb: this.formBuilder.control('', [Validators.required]),
    telfb: this.formBuilder.control(301234567, [Validators.required]),
    bank: this.formBuilder.control('', [Validators.required]),
  });

  berloForm = this.formBuilder.group({
    nameb: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required]),
    szamlaszamb: this.formBuilder.control('', [Validators.required]),
    telb: this.formBuilder.control(301234567, [Validators.required]),
    irsz: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(1000), Validators.max(9999)]),
    telepules: this.formBuilder.control('', [Validators.required]),
    cim: this.formBuilder.control('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private foberloService: FoberloService,
    private berloService: BerloService,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
    ) { }

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

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  onRadioChange(event:any){
    // Kiválasztja az értéket
    this.selectedUser = event.target.value;
    if(event.target.value == "f"){
      this.changeVisable = true;
    }else if(event.target.value == "b"){
      this.changeVisable = false;
    }
  }

  valueValidate(): boolean{

    if(this.changeVisable){
      this.foberloForm.markAllAsTouched();
      return this.foberloForm.valid;
    }
    else{
      this.berloForm.markAllAsTouched();
      return this.berloForm.valid;
    }

    
  }

  saveUser() {

    if (!this.valueValidate()) {
      console.log('invalid');
      return;
    }

    if (this.changeVisable) {
      const foberlo = this.foberloForm.value as FoberloDTO;
      this.foberloService.create(foberlo).subscribe({
        next: (foberlo) => {
          this.toastrService.success('Regisztráció sikeresen megtörtént', 'Siker');
        },
        error: (err) => {
          if(err.error.error == "Adatbázis hiba történt."){
            this.toastrService.error('Ez az email már regisztrálvavan!.', 'Hiba');
          }
          else{
            this.toastrService.error('A regisztráció nem sikerült.', 'Hiba');
          }
        }
      });
    }
    else if (!this.changeVisable){
      const berlo = this.berloForm.value as BerloDTO;
      this.berloService.create(berlo).subscribe({
        next: (berlo) => {
          this.toastrService.success('Regisztráció sikeresen megtörtént', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('A regisztráció nem sikerült.', 'Hiba');
        }
      });
    }

    this.goToPage("/");
  }

  changeUserVisable(): boolean{
    return this.changeVisable;
  }

  compareObjects(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id;
  }
}
