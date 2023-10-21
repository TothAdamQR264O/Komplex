import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HaviosszesitoDTO, SzerzodesDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HaviosszesitoService } from 'src/app/services/haviosszesito.service';
import { SzerzodesService } from 'src/app/services/szerzodes.service';

@Component({
  selector: 'app-haviosszesito',
  templateUrl: './haviosszesito.component.html',
  styleUrls: ['./haviosszesito.component.css']
})
export class HaviosszesitoComponent {
  szerzodes?: SzerzodesDTO;
  haviosszesito?: HaviosszesitoDTO;
  haviosszesitoForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    datum: this.formBuilder.control(new Date(), [Validators.required]),
    ar: this.formBuilder.control(0, [Validators.required]),
    rezsi: this.formBuilder.control(0, [Validators.required]),
    egyeb: this.formBuilder.control(0, [Validators.required]),
    osszesen: this.formBuilder.control(0, [Validators.required]),
    szid: this.formBuilder.control(this.szerzodes),
  })

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private szerzodesService: SzerzodesService,
    private haviosszesitoService: HaviosszesitoService,
    private activatedRoute: ActivatedRoute,
  ) { }

  selectedtipus: any = ';'
  tipusArr = [
    {
      label:'Tervezett',
      value: 'Tervezett'
    },
    {
      label:'Váratlan',
      value: 'Váratlan'
    },
    {
      label:'Egyébb',
      value: 'Egyébb'
    },
  ];



  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log("ID kint: " + id)
    /*if (id) {
      this.haviosszesitoService.getOne(id).subscribe({
        next: (haviossz) => {
          this.haviosszesito = haviossz;
          console.log("ID bent: " + id)
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Az esemény betöltése sikertelen.', 'Hiba');
        }
      });
    }*/
  }

  saveEvent(){
    const esemeny = this.haviosszesitoForm.value as HaviosszesitoDTO;
    this.haviosszesitoService.create(esemeny).subscribe({
      next: (apply) => { 
        this.toastrService.success('Az esemény sikeresen létre lett hozva.', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Nem sikerült létrehozni az eseményt.', 'Hiba');
        }
    });

  }
}