import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerloService } from 'src/app/services/berlo.service';
import { FoberloService } from 'src/app/services/foberlo.service';
import { FoberloDTO, BerloDTO, SzobaDTO } from 'models';

@Component({
  selector: 'app-regisztralas',
  templateUrl: './regisztralas.component.html',
  styleUrls: ['./regisztralas.component.css']
})
export class RegisztralasComponent {
  changeVisable = true;
  valide = true;

  foberloForm = this.formBuilder.group({
    namefb: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    szamlaszamfb: this.formBuilder.control(''),
    telfb: this.formBuilder.control(301234567)
  });

  berloForm = this.formBuilder.group({
    nameb: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    szamlaszamb: this.formBuilder.control(''),
    telb: this.formBuilder.control(301234567),
    szid: this.formBuilder.control<null | SzobaDTO>(null)
  });

  constructor(
    private formBuilder: FormBuilder,
    private foberloService: FoberloService,
    private berloService: BerloService,
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
    this.valide = true;
    if(this.changeVisable){
      if(!this.foberloForm.value.email || !this.foberloForm.value.namefb || !this.foberloForm.value.password || !this.foberloForm.value.szamlaszamfb || !this.foberloForm.value.telfb){
        this.valide = false;
      }
    }
    else{
      if(!this.berloForm.value.email || !this.berloForm.value.nameb || !this.berloForm.value.password || !this.berloForm.value.szamlaszamb || !this.berloForm.value.telb){
        this.valide = false;
      }
    }
    return this.valide;
  }

  saveUser() {
      if(this.valueValidate()){
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
      }
  }

  changeUserVisable(): boolean{
    return this.changeVisable;
  }

  compareObjects(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id;
  }
}
